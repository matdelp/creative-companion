import { ColorPaletteData } from "../types/colorPaletteData";
import { QuotesData } from "../types/quoteData ";

export const extractCategoryFromQuote = (quotes: QuotesData) => {
  const selectedquote = quotes.map((quote) => ({
    category: quote.category,
  }));
  return selectedquote;
};
