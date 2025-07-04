import { DBClient } from "@creative-companion/database";
import axios from "axios";

export const getInspiration = async () => {
  const size = await DBClient.inspiration.count();
  const skip = Math.floor(Math.random() * size);
  return await DBClient.inspiration.findFirstOrThrow({ skip });
};
