import { Request, Response } from "express";
import { PromptRes } from "../types/prompt";
import {
  checkIfTodayHasPrompt,
  createNewPrompt,
  getPromptOfTheDay,
} from "../utils/utilsLimitPrompt";

export const promptController = {
  getPrompt: async (req: Request, res: Response) => {
    try {
      const todayPrompt = await checkIfTodayHasPrompt();
      if (todayPrompt) {
        getPromptOfTheDay(todayPrompt);
        console.log("Today has already a prompt");
        res.send(todayPrompt);
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
// TODO change format to have the same in both cases
