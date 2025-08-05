🎨 Creative Companion

Creative Companion is a full-stack social web application designed for the artistic community. The platform provides daily creative prompts — including a quote, a color palette, and an image — all tied to a shared theme, to help artists overcome creative blocks and stay inspired.

Built as a graduation project for the Code Labs Academy Web Development Bootcamp, this app combines rich API integrations, modern UI design, and scalable backend architecture.

Features

    🧠 Daily Prompt Generator
    Pulls in quotes, color palettes, and images using external APIs — all unified by a central theme.

    🖼️ User-Generated Content
    Artists can respond to prompts by uploading their creations, engaging with the community, and browsing others’ work.

    🔐 Authentication
    Secure login with email/password and Google OAuth (not validated by Google yet, dev mode only).

    ☁️ Image Hosting with Supabase
    User artwork and avatars are stored securely in Supabase.

    👥 User Profiles & Feed
    Personalized profiles, a shared feed, and profile customizytion features.

    📱 Responsive Design
    Optimized for desktop and mobile experiences.

🧰 Tech Stack

Frontend:

    React.js

    TypeScript

    Tailwind CSS

    Zustand (state management)

Backend:

    Express.js

    Prisma ORM

    PostgreSQL

Other Tools & Integrations:

    Supabase (file storage)

    External APIs for content generation

    Google OAuth

Getting Started (For Developers)

    If you'd like to run the project locally:

Clone the repo

git clone https://github.com/yourusername/creative-companion.git
cd creative-companion

Setup Frontend

cd client
npm install
npm run dev

Setup Backend

cd server
npm install
npx prisma generate
npm run dev

Environment Variables

You’ll need to set up environment variables for:

    API keys (quote/image/color APIs)

    Supabase credentials

    Google OAuth credentials

    Database URL

📄 License

MIT License
👩‍💻 Author

Mathilde Delpeuch
Graduation project – Code Labs Academy
GitHub – @matdelp
