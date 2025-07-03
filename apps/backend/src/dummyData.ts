import { User } from "./types/user";
import { Artwork } from "./types/artwork";
import { Prompt } from "./types/prompt";

export const users: User[] = [
  {
    first_name: "Alice",
    last_name: "Dupont",
    username: "Alice",
    email: "alice@example.com",
    password: "test123",
    posted_artwork: 10,
    artworks: ["id1, id2, id3"],
  },
  {
    first_name: "Bob",
    last_name: "Martin",
    username: "BobM",
    email: "bob.martin@example.com",
    password: "test123",
    posted_artwork: 5,
    artworks: ["id1, id2, id3"],
  },
];

export const artworks: Artwork[] = [
  {
    title: "Forest of the day",
    created_at: "2025-07-02",
    image: "contentpath",
    tags: ["forest", "blue", "sad"],
  },
];

export const prompts: Prompt[] = [
  {
    quote: {
      quote:
        "Be assured those will be thy worst enemies, not to whom thou hast done evil, but who have done evil to thee. And those will be thy best friends, not to whom thou hast done good, but who have done good to thee.",
      author: "Tacitus",
      category: "history",
    },
    palette: [
      {
        hex: "#8B1E18",
        name: "Falu Red",
      },
      {
        hex: "#189824",
        name: "Slimy Green",
      },
      {
        hex: "#2117A6",
        name: "Torea Bay",
      },
      {
        hex: "#2216B3",
        name: "Persian Blue",
      },
      {
        hex: "#2115C1",
        name: "Persian Blue",
      },
    ],
    photo: {
      urls: {
        raw: "https://images.unsplash.com/photo-1526559881144-9df4bf3eb37a?ixid=M3w3NzIxMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTE0NDM2NTZ8&ixlib=rb-4.1.0",
        full: "https://images.unsplash.com/photo-1526559881144-9df4bf3eb37a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzIxMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTE0NDM2NTZ8&ixlib=rb-4.1.0&q=85",
        regular:
          "https://images.unsplash.com/photo-1526559881144-9df4bf3eb37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIxMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTE0NDM2NTZ8&ixlib=rb-4.1.0&q=80&w=1080",
        small:
          "https://images.unsplash.com/photo-1526559881144-9df4bf3eb37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIxMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTE0NDM2NTZ8&ixlib=rb-4.1.0&q=80&w=400",
        thumb:
          "https://images.unsplash.com/photo-1526559881144-9df4bf3eb37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIxMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTE0NDM2NTZ8&ixlib=rb-4.1.0&q=80&w=200",
        small_s3:
          "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1526559881144-9df4bf3eb37a",
      },
      author: "Cristina Gottardi",
      promo: "cristina.gottardi",
    },
  },
];

export const testColors = [
  {
    hex: "#8B1E18",
    name: "Falu Red",
  },
  {
    hex: "#189824",
    name: "Slimy Green",
  },
  {
    hex: "#2117A6",
    name: "Torea Bay",
  },
  {
    hex: "#2216B3",
    name: "Persian Blue",
  },
  {
    hex: "#2216B3",
    name: "Persian Blue duplicate",
  },
];
