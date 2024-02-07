import {
  createCanvas,
  loadImage,
  CanvasRenderingContext2D,
  Image,
  registerFont,
} from "canvas";

import path from "path";

import fs from "fs";
import { logger } from "./logger";
import { svgContent } from "./logo";

registerFont(path.resolve(process.cwd(), "grotesk.ttf"), {
  family: "Space Grotesk",
});

registerFont(path.resolve(process.cwd(), "poppins.ttf"), {
  family: "Poppins",
});

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
  ctx.font = "20px Space Grotesk";
  ctx.fillStyle = "#fff";
  ctx.fillText("DEX SCREENER", 40, 27);

  ctx.font = "400 16px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(label, 10, 55);

  pairs.forEach((p, index) => {
    drawRow(
      ctx,
      index + 1,
      p.baseToken.symbol,
      p.quoteToken.symbol,
      p.priceUsd,
      90,
      p.baseToken.name,
      p.chainId.toUpperCase()
    );
  });

  const fileExt = `${Math.random().toString().slice(-15)}_${Date.now()}.png`;
  const filePath = path.join(__dirname, `../public/${fileExt}`);
  const out = fs.createWriteStream(filePath);
  const stream = canvas.createPNGStream();
  return new Promise((resolve, reject) => {
    stream.pipe(out);

    out.on("finish", () => {
      logger.info(`The png file ${filePath} was created.`);
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
  baseVertical = 90,
  baseTokenFull: string,
  chain: string
) {
  price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price as number) || 0);
  const y = (index - 1) * 45 + baseVertical;
  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`#${index}`, 10, y);

  let x = 50;

  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(baseToken.toUpperCase(), x, y);

  x += ctx.measureText(baseToken.toUpperCase()).width;
  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`/${quoteToken.toUpperCase()}`, x, y);

  x += 5 + ctx.measureText(quoteToken.toUpperCase()).width;

  ctx.font = "400 10px Space Grotesk";
  ctx.fillStyle = "#D6854E";
  ctx.fillText(chain, 50, y - 17);

  // ctx.setLineDash([5, 5]);
  // ctx.lineWidth = 2;
  // ctx.strokeStyle = "#F27C23";

  // // Draw the box with a dotted border
  // const boxX = 20;
  // const boxY = 20;
  // const boxWidth = 160;
  // const boxHeight = 160;

  // ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(
    baseTokenFull,
    80 +
      ctx.measureText(baseToken.toUpperCase()).width +
      ctx.measureText(`/${quoteToken.toUpperCase()}`).width,
    y
  );

  ctx.font = "400 18px Poppins";
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
  baseVertical = 90,
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
  ctx.font = "20px Space Grotesk";
  ctx.fillStyle = "#fff";
  ctx.fillText(label, 40, 27);

  ctx.font = "400 16px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(subLabel, 10, 55);
  let y = baseVertical + 10;
  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`Volume:`, 10, y);

  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(volume, 140, y);

  y = y + 40;
  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`Price change:`, 10, y);

  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`24H:`, 140, y);
  let x = 140 + ctx.measureText("24H:").width + 5;

  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(price24h, x, y);

  x = x + 15 + ctx.measureText(price24h).width;
  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`6H:`, x, y);

  x = x + 5 + ctx.measureText(`6H:`).width;
  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(price6h, x, y);

  x = x + 15 + ctx.measureText(price6h).width;
  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`1H:`, x, y);

  x = x + 5 + ctx.measureText(`1H:`).width;
  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(price1h, x, y);

  y = y + 40;
  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`Liquidity:`, 10, y);

  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(liquidity, 140, y);

  y = y + 40;
  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`FDV:`, 10, y);

  ctx.font = "400 18px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(fdv, 140, y);

  const fileExt = `${Math.random().toString().slice(-15)}_${Date.now()}.png`;
  const filePath = path.join(__dirname, `../public/${fileExt}`);
  const out = fs.createWriteStream(filePath);
  const stream = canvas.createPNGStream();
  return new Promise((resolve, reject) => {
    stream.pipe(out);

    out.on("finish", () => {
      logger.info(`The png file ${filePath} was created.`);
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

export const printMenu = async (
  label: string,
  subLabel: string,
  items: {
    id: number;
    heading: string;
    subheading: string;
    text: string;
    selected: boolean;
  }[]
) => {
  const canvas = createCanvas(760, 400);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#1d1d22";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(img, 10, 10, 20, 20);
  ctx.font = "16px Space Grotesk";
  ctx.fillStyle = "#fff";
  ctx.fillText(label, 40, 25);

  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(subLabel, 10, 50);
  items.forEach((t, index) => {
    drawRowNew(ctx, index + 1, 80, t.heading, t.selected);
  });
  const fileExt = `${Math.random().toString().slice(-15)}_${Date.now()}.png`;
  const filePath = path.join(__dirname, `../public/${fileExt}`);
  const out = fs.createWriteStream(filePath);
  const stream = canvas.createPNGStream();
  return new Promise((resolve, reject) => {
    stream.pipe(out);

    out.on("finish", () => {
      logger.info(`The png file ${filePath} was created.`);
      resolve(fileExt);
    });

    out.on("error", (err) => {
      reject(err);
    });
  });
};

function drawRowNew(
  ctx: CanvasRenderingContext2D,
  index: number,
  baseVertical = 80,
  content: string,
  underline?: boolean
) {
  const y = (index - 1) * 30 + baseVertical;
  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#808080";
  ctx.fillText(`#${index}`, 10, y);

  ctx.font = "400 14px Poppins";
  ctx.fillStyle = "#fff";
  ctx.fillText(content, 50, y);

  if (underline) {
    ctx.strokeStyle = "rgba(200, 200, 200, 0.7)";
    ctx.setLineDash([2, 2]);
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(50, y + 7);
    ctx.lineTo(50 + ctx.measureText(content).width, y + 7);
    ctx.stroke();
  }
}

export const printMainNew = async (
  baseVertical = 80,
  label = "",
  subLabel = "",
  content = ""
) => {
  const canvas = createCanvas(760, 400);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#1d1d22";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 10, 10, 20, 20);
  ctx.font = "16px Space Grotesk";
  ctx.fillStyle = "#fff";
  ctx.fillText(label, 40, 25);

  ctx.font = "16px Space Grotesk";
  ctx.fillStyle = "#808080";
  ctx.fillText(subLabel.toUpperCase(), 10, 50);

  ctx.font = "16px Poppins";
  ctx.fillStyle = "#fff";

  let y = baseVertical;
  wrapText(ctx, content, 10, y, 740, 20);
  const fileExt = `${Math.random().toString().slice(-15)}_${Date.now()}.png`;
  const filePath = path.join(__dirname, `../public/${fileExt}`);
  const out = fs.createWriteStream(filePath);
  const stream = canvas.createPNGStream();
  return new Promise((resolve, reject) => {
    stream.pipe(out);

    out.on("finish", () => {
      logger.info(`The png file ${filePath} was created.`);
      resolve(fileExt);
    });

    out.on("error", (err) => {
      reject(err);
    });
  });
};

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && i > 0) {
      context.fillText(line, x, y);
      line = words[i] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }

  context.fillText(line, x, y);
}
