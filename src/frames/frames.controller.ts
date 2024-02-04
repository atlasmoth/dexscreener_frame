import { errorInterceptor } from "../middleware";
import { Pair } from "../utils/canvas";
import * as framesService from "./frames.service";

const table: Record<string, Pair[]> = {};

export const beginFrame = errorInterceptor(async (req, res) => {
  framesService.handleEmptySearch(res);
});

export const continueFrame = errorInterceptor(async (req, res) => {
  let pageIndex = req.query?.pageIndex;

  if (!pageIndex || isNaN(Number(pageIndex))) {
    return framesService.handleEmptySearch(res);
  }
  const inputText = req.body?.untrustedData?.inputText?.trim()?.toLowerCase();

  switch (pageIndex) {
    case "0": {
      if (inputText?.length < 1) {
        return framesService.handleEmptySearch(res);
      }
      let pairs: Pair[] = [];
      if (table[inputText]) {
        pairs = table[inputText];
      } else {
        pairs = await framesService.fetchPairsSearch(inputText);
        table[inputText] = pairs;
      }

      return await framesService.handleSearch(
        res,
        pairs.slice(0, 8),
        inputText,
        1
      );
    }
    case "1": {
      const searchInput = req.query.searchInput as string;
      let next = Number(req.query.next || 0);
      let pairs: Pair[] = [];
      if (table[searchInput]) {
        pairs = table[searchInput];
      } else {
        pairs = await framesService.fetchPairsSearch(searchInput);
        table[searchInput] = pairs;
      }
      let firstPairs = pairs.slice(next * 8, next * 8 + 8);

      if (req.body?.untrustedData?.buttonIndex === 2) {
        return await framesService.handleSearch(
          res,
          firstPairs,
          searchInput,
          next + 1
        );
      } else {
        const secondBase = (next - 1) * 8;

        let secondPairs = pairs.slice(secondBase, secondBase + 8);
        let arrayIndex = Number(inputText) - 1;
        const pair = secondPairs[arrayIndex];
        return await framesService.selectItem(res, pair);
      }
    }
    default: {
      return framesService.handleEmptySearch(res);
    }
  }
});
