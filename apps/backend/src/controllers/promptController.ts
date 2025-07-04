import { Request, Response } from "express";
import { PromptRes } from "../types/prompt";
import {
  getTodayPrompt,
  createNewPrompt,
  parseFetchedPrompt,
} from "../utils/utilsLimitPrompt";

export const promptController = {
  getPrompt: async (req: Request, res: Response) => {
    try {
      const todayPrompt = await getTodayPrompt();
      if (todayPrompt) {
        const parsedPrompt = parseFetchedPrompt(todayPrompt);
        console.log("Today has already a prompt");
        res.send(parsedPrompt);
        return;
      }
      const promptRes: PromptRes = await createNewPrompt();
      console.log("New prompt created");
      res.send(promptRes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
