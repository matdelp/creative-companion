import { Request, Response } from "express";
import { PromptRes } from "@creative-companion/common";
import {
  createNewPrompt,
  getTodayPrompt,
  parseFetchedPrompt,
} from "../utils/utilsLimitPrompt";

export const promptController = {
  getPrompt: async (
    req: Request,
    res: Response<PromptRes | { error: string }>
  ) => {
    try {
      const todayPrompt = await getTodayPrompt();
      if (todayPrompt) {
        const parsedPrompt = parseFetchedPrompt(todayPrompt);
        console.log("Today has already a prompt");
        res.json(parsedPrompt);
        return;
      }
      const promptRes: PromptRes = await createNewPrompt();
      console.log("New prompt created");
      res.json(promptRes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
