import { UserGoogle } from "@creative-companion/common";
import { DBClient } from "@creative-companion/database";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { createUsernameGoogle } from "../../utils/utilsUsername";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser<UserGoogle>((obj, done) => {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:5000/artist/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails?.[0]?.value;
      if (!email) return done(new Error("No email found in Google profile"));

      const user = await DBClient.user.findUnique({
        where: { email },
      });

      if (!user) {
        const first_name =
          profile.name?.givenName ||
          profile.displayName.split(" ")[0] ||
          "Unknown";
        const last_name =
          profile.name?.familyName || profile.displayName.split(" ")[1] || "";
        const uniqueUsername = createUsernameGoogle(email);

        const newUser = await DBClient.user.create({
          data: {
            first_name,
            last_name,
            username: uniqueUsername,
            email,
            password: null, // or undefined if optional
          },
        });

        return done(null, {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
        });
      }

      return done(null, {
        id: user.id,
        email: user.email,
        username: user.username,
      });
    }
  )
);

export default passport;
