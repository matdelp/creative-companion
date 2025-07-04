import { User } from "./types/user";
import { Artwork } from "./types/artwork";
import { FetchedPrompt, PromptRes } from "./types/prompt";

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

export const prompt = [
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

const NewPrompt: PromptRes = {
  quote: {
    quote:
      "Human beings are accustomed to think of intellect as the power of having and controlling ideas and of ability to learn as synonymous with ability to have ideas. But learning by having ideas is really one of the rare and isolated events in nature.",
    author: "Edward Thorndike",
    category: "learning",
  },
  palette: [
    { hex: "#EC9681", name: "Apricot" },
    { hex: "#8BEFA2", name: "Magic Mint" },
    { hex: "#A995F2", name: "Portage" },
    { hex: "#B19FF5", name: "Perfume" },
    { hex: "#BAA9F7", name: "Perfume" },
  ],
  photo: {
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIxMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTE2MjM0NjJ8&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Dylan Gillis",
    promo: "mainermedia",
  },
};

const FetchedPrompt: FetchedPrompt = {
  quote: {
    quote:
      "Human beings are accustomed to think of intellect as the power of having and controlling ideas and of ability to learn as synonymous with ability to have ideas. But learning by having ideas is really one of the rare and isolated events in nature.",
    author: "Edward Thorndike",
    category: "learning",
  },
  photo: {
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIxMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTE2MjM0NjJ8&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Dylan Gillis",
    promo: "mainermedia",
  },
  palette: {
    id: 45,
    prompt_id: 46,
    palette_has_color: [
      {
        id: 222,
        palette_id: 45,
        color_id: 231,
        color: {
          name: "Apricot",
          hex: "#EC9681",
          id: 231,
        },
      },
      {
        id: 223,
        palette_id: 45,
        color_id: 232,
        color: {
          name: "Magic Mint",
          hex: "#8BEFA2",
          id: 232,
        },
      },
      {
        id: 224,
        palette_id: 45,
        color_id: 234,
        color: {
          name: "Portage",
          hex: "#A995F2",
          id: 234,
        },
      },
      {
        id: 225,
        palette_id: 45,
        color_id: 235,
        color: {
          name: "Perfume",
          hex: "#B19FF5",
          id: 235,
        },
      },
      {
        id: 226,
        palette_id: 45,
        color_id: 233,
        color: {
          name: "Perfume",
          hex: "#BAA9F7",
          id: 233,
        },
      },
    ],
  },
};
