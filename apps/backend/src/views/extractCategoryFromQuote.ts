import { QuotesData } from "../types/quoteData";

export const extractCategoryFromQuote = (quotes: QuotesData) => {
  const selectedquote = quotes.map((quote) => ({
    category: quote.category,
  }));
  return selectedquote[0].category;
};
