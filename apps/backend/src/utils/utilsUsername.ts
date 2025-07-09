import { User } from "@creative-companion/common";
import { DBClient } from "@creative-companion/database";

export const checkUsernameExists = async (username: string) => {
  return await DBClient.user.findUnique({
    where: { username: username },
  });
};

export const createUsernameGoogle = (email: string) => {
  const name = email.split("@")[0];
  const number = Math.floor(Math.random() * 1000);
  const username = name.concat("_", number.toString());
  return username;
};
