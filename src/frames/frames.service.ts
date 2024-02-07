import { Pair, printMain, printMenuItems } from "../utils/canvas";
import { Response } from "express";
import axios from "axios";

export const handleEmptySearch = (res: Response) => {
  const imageUrl = "273175967237441_1707314928948.png";

  const baseUrl = process.env.HOST as string;

  res.setHeader("Content-Type", "text/html");
  res
    .send(
      `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Select Token</title>
        <meta property="og:title" content="Select token" />
        <meta
          property="og:image"
          content="${baseUrl + imageUrl}"
        />
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="${baseUrl + imageUrl}"
        />
        <meta
          name="fc:frame:post_url"
          content="${baseUrl}frames?pageIndex=0&next=0"
        />
        <meta property="fc:frame:input:text" content="Enter token name" />
        <meta property="fc:frame:button:1" content="Submit" />

      </head>
      <body>
        <p>Select Token</p>
      </body>
    </html>
      `
    )
    .end();
};

export const fetchPairsSearch = async (search = ""): Promise<Pair[]> => {
  const response = await axios.get(
    `https://api.dexscreener.com/latest/dex/search?q=${search}`
  );
  return response.data.pairs;
};

export const handleSearch = async (
  res: Response,
  pairs: Pair[],
  inputText: string,
  next: number
) => {
  const imageUrl = await printMenuItems(
    pairs,
    `Search results for "${inputText}"`
  );

  const baseUrl = process.env.HOST as string;

  res.setHeader("Content-Type", "text/html");
  res
    .send(
      `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Select Token</title>
          <meta property="og:title" content="Select token" />
          <meta
            property="og:image"
            content="${baseUrl + imageUrl}"
          />
          <meta property="fc:frame" content="vNext" />
          <meta
            property="fc:frame:image"
            content="${baseUrl + imageUrl}"
          />
          <meta
            name="fc:frame:post_url"
            content="${baseUrl}frames?pageIndex=1&searchInput=${inputText}&next=${next}"
          />
          <meta property="fc:frame:input:text" content="Enter option number" />
          <meta property="fc:frame:button:1" content="Submit" />
          <meta property="fc:frame:button:2" content="Load more" />
        </head>
        <body>
          <p>Select Token</p>
        </body>
      </html>
        `
    )
    .end();
};

export const selectItem = async (res: Response, pair: Pair) => {
  const imageUrl = await printMain(
    80,
    `${pair.baseToken.symbol}/${
      pair.quoteToken.symbol
    }   •   ${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(
      pair.priceUsd as unknown as number
    )}   •   ${new Intl.NumberFormat().format(
      pair.priceNative as unknown as number
    )}${pair.quoteToken.symbol}`,
    `${pair.chainId.toUpperCase()}  ${pair.baseToken.address}`,
    pair?.volume?.h24 || 0,
    pair?.priceChange?.h24 || 0,
    pair?.priceChange?.h6 || 0,
    pair?.priceChange?.h1 || 0,
    pair?.liquidity?.base || 0,
    pair?.fdv || 0
  );

  const baseUrl = process.env.HOST as string;

  res.setHeader("Content-Type", "text/html");
  res
    .send(
      `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Select Token</title>
            <meta property="og:title" content="Select token" />
            <meta
              property="og:image"
              content="${baseUrl + imageUrl}"
            />
            <meta property="fc:frame" content="vNext" />
            <meta
              property="fc:frame:image"
              content="${baseUrl + imageUrl}"
            />
            <meta
              name="fc:frame:post_url"
              content="${baseUrl}frames/?pageIndex=hello"
            />
            
            <meta property="fc:frame:button:1" content="Refresh" />
          </head>
          <body>
            <p>Select Token</p>
          </body>
        </html>
          `
    )
    .end();
};
