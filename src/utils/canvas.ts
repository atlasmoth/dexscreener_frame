import {
  createCanvas,
  loadImage,
  CanvasRenderingContext2D,
  Image,
} from "canvas";

import path from "path";

import fs from "fs";

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="#fff" fill-rule="evenodd" viewBox="0 0 252 300" focusable="false" class="chakra-icon custom-euf446"><path d="M151.818 106.866c9.177-4.576 20.854-11.312 32.545-20.541 2.465 5.119 2.735 9.586 1.465 13.193-.9 2.542-2.596 4.753-4.826 6.512-2.415 1.901-5.431 3.285-8.765 4.033-6.326 1.425-13.712.593-20.419-3.197m1.591 46.886l12.148 7.017c-24.804 13.902-31.547 39.716-39.557 64.859-8.009-25.143-14.753-50.957-39.556-64.859l12.148-7.017a5.95 5.95 0 003.84-5.845c-1.113-23.547 5.245-33.96 13.821-40.498 3.076-2.342 6.434-3.518 9.747-3.518s6.671 1.176 9.748 3.518c8.576 6.538 14.934 16.951 13.821 40.498a5.95 5.95 0 003.84 5.845zM126 0c14.042.377 28.119 3.103 40.336 8.406 8.46 3.677 16.354 8.534 23.502 14.342 3.228 2.622 5.886 5.155 8.814 8.071 7.897.273 19.438-8.5 24.796-16.709-9.221 30.23-51.299 65.929-80.43 79.589-.012-.005-.02-.012-.029-.018-5.228-3.992-11.108-5.988-16.989-5.988s-11.76 1.996-16.988 5.988c-.009.005-.017.014-.029.018-29.132-13.66-71.209-49.359-80.43-79.589 5.357 8.209 16.898 16.982 24.795 16.709 2.929-2.915 5.587-5.449 8.814-8.071C69.31 16.94 77.204 12.083 85.664 8.406 97.882 3.103 111.959.377 126 0m-25.818 106.866c-9.176-4.576-20.854-11.312-32.544-20.541-2.465 5.119-2.735 9.586-1.466 13.193.901 2.542 2.597 4.753 4.826 6.512 2.416 1.901 5.432 3.285 8.766 4.033 6.326 1.425 13.711.593 20.418-3.197"></path><path d="M197.167 75.016c6.436-6.495 12.107-13.684 16.667-20.099l2.316 4.359c7.456 14.917 11.33 29.774 11.33 46.494l-.016 26.532.14 13.754c.54 33.766 7.846 67.929 24.396 99.193l-34.627-27.922-24.501 39.759-25.74-24.231L126 299.604l-41.132-66.748-25.739 24.231-24.501-39.759L0 245.25c16.55-31.264 23.856-65.427 24.397-99.193l.14-13.754-.016-26.532c0-16.721 3.873-31.578 11.331-46.494l2.315-4.359c4.56 6.415 10.23 13.603 16.667 20.099l-2.01 4.175c-3.905 8.109-5.198 17.176-2.156 25.799 1.961 5.554 5.54 10.317 10.154 13.953 4.48 3.531 9.782 5.911 15.333 7.161 3.616.814 7.3 1.149 10.96 1.035-.854 4.841-1.227 9.862-1.251 14.978L53.2 160.984l25.206 14.129a41.926 41.926 0 015.734 3.869c20.781 18.658 33.275 73.855 41.861 100.816 8.587-26.961 21.08-82.158 41.862-100.816a41.865 41.865 0 015.734-3.869l25.206-14.129-32.665-18.866c-.024-5.116-.397-10.137-1.251-14.978 3.66.114 7.344-.221 10.96-1.035 5.551-1.25 10.854-3.63 15.333-7.161 4.613-3.636 8.193-8.399 10.153-13.953 3.043-8.623 1.749-17.689-2.155-25.799l-2.01-4.175z"></path></svg>`;

const buffer = Buffer.from(svgContent, "utf-8");
let img: Image;

export const initLogo = () =>
  new Promise((resolve: any, reject) => {
    loadImage(buffer)
      .then((t) => {
        img = t;
        resolve("Success");
      })
      .catch(reject);
  });

export async function printMenuItems(pairs: Pair[], label: string) {
  const canvas = createCanvas(760, 400);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#1d1d22";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(img, 10, 10, 20, 20);
  ctx.font = "16px Space Grotesk";
  ctx.fillStyle = "#fff";
  ctx.fillText("DEX SCREENER", 40, 25);

  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(label, 10, 50);

  pairs.forEach((p, index) => {
    drawRow(
      ctx,
      index + 1,
      p.baseToken.symbol,
      p.quoteToken.symbol,
      p.priceUsd,
      80,
      p.baseToken.name
    );
  });

  const fileExt = `${Math.random().toString().slice(-15)}_${Date.now()}.png`;
  const filePath = path.join(__dirname, `../public/${fileExt}`);
  const out = fs.createWriteStream(filePath);
  const stream = canvas.createPNGStream();
  return new Promise((resolve, reject) => {
    stream.pipe(out);

    out.on("finish", () => {
      console.log(`The png file ${filePath} was created.`);
      resolve(fileExt);
    });

    out.on("error", (err) => {
      reject(err);
    });
  });
}

function drawRow(
  ctx: CanvasRenderingContext2D,
  index: number,
  baseToken: string,
  quoteToken: string,
  price: number | string,
  baseVertical = 80,
  baseTokenFull: string
) {
  price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price as number) || 0);
  const y = (index - 1) * 30 + baseVertical;
  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`#${index}`, 10, y);

  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(baseToken.toUpperCase(), 50, y);

  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(
    `/${quoteToken.toUpperCase()}`,
    50 + ctx.measureText(baseToken.toUpperCase()).width,
    y
  );

  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(
    baseTokenFull,
    80 +
      ctx.measureText(baseToken.toUpperCase()).width +
      ctx.measureText(`/${quoteToken.toUpperCase()}`).width,
    y
  );

  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#00BFFF";
  ctx.fillText(
    `${price}`,
    100 +
      ctx.measureText(baseToken.toUpperCase()).width +
      ctx.measureText(`/${quoteToken.toUpperCase()}`).width +
      ctx.measureText(baseTokenFull).width,
    y
  );
}

export const printMain = async (
  baseVertical = 80,
  label = "",
  subLabel = "",
  volume: number | string,
  price24h: number | string,
  price6h: number | string,
  price1h: number | string,
  liquidity: number | string,
  fdv: number | string
) => {
  const canvas = createCanvas(760, 400);
  const ctx = canvas.getContext("2d");
  volume = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(volume as number);
  price24h = new Intl.NumberFormat().format(price24h as number) + "%";
  price6h = new Intl.NumberFormat().format(price6h as number) + "%";
  price1h = new Intl.NumberFormat().format(price1h as number) + "%";
  liquidity = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(liquidity as number);
  fdv = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(fdv as number);

  ctx.fillStyle = "#1d1d22";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 10, 10, 20, 20);
  ctx.font = "16px Space Grotesk";
  ctx.fillStyle = "#fff";
  ctx.fillText(label, 40, 25);

  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(subLabel, 10, 50);
  let y = baseVertical;
  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`Volume:`, 10, y);

  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(volume, 140, y);

  y = y + 30;
  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`Price change:`, 10, y);

  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`24H:`, 140, y);
  let x = 140 + ctx.measureText("24H:").width + 5;

  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(price24h, x, y);

  x = x + 15 + ctx.measureText(price24h).width;
  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`6H:`, x, y);

  x = x + 5 + ctx.measureText(`6H:`).width;
  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(price6h, x, y);

  x = x + 15 + ctx.measureText(price6h).width;
  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`1H:`, x, y);

  x = x + 5 + ctx.measureText(`1H:`).width;
  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(price1h, x, y);

  y = y + 30;
  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`Liquidity:`, 10, y);

  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(liquidity, 140, y);

  y = y + 30;
  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`FDV:`, 10, y);

  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(fdv, 140, y);

  const fileExt = `${Math.random().toString().slice(-15)}_${Date.now()}.png`;
  const filePath = path.join(__dirname, `../public/${fileExt}`);
  const out = fs.createWriteStream(filePath);
  const stream = canvas.createPNGStream();
  return new Promise((resolve, reject) => {
    stream.pipe(out);

    out.on("finish", () => {
      console.log(`The png file ${filePath} was created.`);
      resolve(fileExt);
    });

    out.on("error", (err) => {
      reject(err);
    });
  });
};

export type Token = {
  address: string;
  name: string;
  symbol: string;
};

export type Txns = {
  buys: number;
  sells: number;
};

export type Volume = {
  h24: number;
  h6: number;
  h1: number;
  m5: number;
};

export type PriceChange = {
  m5: number;
  h1: number;
  h6: number;
  h24: number;
};

export type Liquidity = {
  usd: number;
  base: number;
  quote: number;
};

export type Pair = {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: Token;
  quoteToken: Token;
  priceNative: string;
  priceUsd: string;
  txns: {
    m5: Txns;
    h1: Txns;
    h6: Txns;
    h24: Txns;
  };
  volume: Volume;
  priceChange: PriceChange;
  liquidity: Liquidity;
  fdv: number;
  pairCreatedAt: number;
};
