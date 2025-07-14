import { Request, Response } from "express";
import { PromptRes } from "@creative-companion/common";
import {
  createNewPrompt,
  getTodayPrompt,
  parseFetchedPrompt,
} from "../utils/utilsLimitPrompt";
import { DBClient } from "@creative-companion/database";

export const promptController = {
  getPrompt: async (
    req: Request,
    res: Response<PromptRes | { error: string }>
  ) => {
    try {
      const todayPrompt = await getTodayPrompt();
      if (todayPrompt) {
        const parsedPrompt = parseFetchedPrompt(todayPrompt);
        res.json(parsedPrompt);
        return;
      }
      const promptRes: PromptRes = await createNewPrompt();
      res.json(promptRes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  getAmountOfPrompt: async (
    req: Request,
    res: Response<number | { error: string } | number>
  ) => {
    const { from, to } = req.query;
    console.log("backend");

    const datesFilter: any = {};
    if (from || to) {
      datesFilter.created_at = {
        ...(from ? { gte: new Date(from as string) } : {}),
        ...(to ? { lte: new Date(to as string) } : {}),
      };
    }

    const promptNumber = await DBClient.prompt.count({
      where: datesFilter,
    });

    res.status(200).json(promptNumber);
  },
};
