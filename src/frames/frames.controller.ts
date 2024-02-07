import { errorInterceptor } from "../middleware";
import { Pair } from "../utils/canvas";
import { table } from "../utils/storage";
import * as framesService from "./frames.service";
import z from "zod";
import { FrameData } from "./frames.interface";

const frame = {
  label: "Tesing",
  subLabel: "This is just a test bruh",
  data: [
    {
      id: 1,
      heading: "Item 1",
      subheading: "Subtitle 1",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      hasInput: true,
      inputLabel: "Input Label 1",
      imageUrl:
        "https://res.cloudinary.com/dbzdfro14/image/upload/v1707164741/frames/549701473592866_1707164738764.png",
      contentImageUrl:
        "https://res.cloudinary.com/dbzdfro14/image/upload/v1707164744/frames/563783780407741_1707164741814.png",
    },
    {
      id: 2,
      heading: "Item 2",
      subheading: "Subtitle 2",
      text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      hasInput: false,
      imageUrl:
        "https://res.cloudinary.com/dbzdfro14/image/upload/v1707164741/frames/513434653805211_1707164738839.png",
      contentImageUrl:
        "https://res.cloudinary.com/dbzdfro14/image/upload/v1707164743/frames/956879474762979_1707164741539.png",
    },
    {
      id: 3,
      heading: "Item 3",
      subheading: "Subtitle 3",
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      hasInput: true,
      inputLabel: "Input Label 3",
      imageUrl:
        "https://res.cloudinary.com/dbzdfro14/image/upload/v1707164741/frames/353390276195492_1707164738864.png",
      contentImageUrl:
        "https://res.cloudinary.com/dbzdfro14/image/upload/v1707164743/frames/543325317400676_1707164741841.png",
    },
    {
      id: 4,
      heading: "Item 4",
      subheading: "Subtitle 4",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      hasInput: false,
      imageUrl:
        "https://res.cloudinary.com/dbzdfro14/image/upload/v1707164741/frames/600132279700739_1707164738887.png",
      contentImageUrl:
        "https://res.cloudinary.com/dbzdfro14/image/upload/v1707164743/frames/810659480865275_1707164741567.png",
    },
    {
      id: 5,
      heading: "Item 5",
      subheading: "Subtitle 5",
      text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      hasInput: true,
      inputLabel: "Input Label 5",
      imageUrl:
        "https://res.cloudinary.com/dbzdfro14/image/upload/v1707164741/frames/259571660356325_1707164738910.png",
      contentImageUrl:
        "https://res.cloudinary.com/dbzdfro14/image/upload/v1707164743/frames/392472950971596_1707164741786.png",
    },
  ],
};

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
        pairs.slice(0, 6),
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
      let firstPairs = pairs.slice(next * 6, next * 6 + 6);

      if (req.body?.untrustedData?.buttonIndex === 2) {
        return await framesService.handleSearch(
          res,
          firstPairs,
          searchInput,
          next + 1
        );
      } else {
        const secondBase = (next - 1) * 6;

        let secondPairs = pairs.slice(secondBase, secondBase + 6);
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

export const createGuestFrame = errorInterceptor(async (req, res) => {
  const FrameDataItemValidation = z.array(
    z.object({
      id: z.number(),
      heading: z.string(),
      subheading: z.string(),
      text: z.string(),
      hasInput: z.boolean(),
      inputLabel: z.string().optional(),
    })
  );
  const validatedBody = FrameDataItemValidation.parse(req.body.data);
  const results = await framesService.persistToCloudinary(
    req.body.label as string,
    req.body.subLabel as string,
    validatedBody as unknown as FrameData
  );
  return res.send({ success: true, data: results });
});

export const getGuestFrame = errorInterceptor(async (req, res) => {
  const currentData = frame.data[0];

  const imageUrl = currentData.imageUrl;

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
          content="${imageUrl}"
        />
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="${imageUrl}"
        />
        <meta
          name="fc:frame:post_url"
          content="${baseUrl}guest/frames/1?pageIndex=0&next=0"
        />
        <meta property="fc:frame:button:1" content="⬆️" />
        <meta property="fc:frame:button:2" content="⬇️" />
        <meta property="fc:frame:button:3" content="Select" />
      </head>
      <body>
        <p>Frame</p>
      </body>
    </html>
      `
    )
    .end();
});

export const updateGuestFrame = errorInterceptor(async (req, res) => {
  const currentDataIndex = Math.min(
    Math.max(Number(req.query.next || 0), 0),
    frame.data.length - 1
  );

  const baseUrl = process.env.HOST as string;

  const pageIndex = Number(req.query.pageIndex || 0);

  let content = ``;
  let imageUrl = ``;
  switch (pageIndex) {
    case 0: {
      content = `
    <meta property="fc:frame:button:1" content="⬆️" />
    <meta property="fc:frame:button:2" content="⬇️" />
    <meta property="fc:frame:button:3" content="Select" />`;

      if (req.body?.untrustedData?.buttonIndex === 2) {
        const idx = Math.min(currentDataIndex + 1, frame.data.length - 1);
        const currentData = frame.data[idx];
        imageUrl = currentData.imageUrl;
        content += `<meta
      name="fc:frame:post_url"
      content="${baseUrl}guest/frames/1?pageIndex=0&next=${idx}"
    />`;
      } else if (req.body?.untrustedData?.buttonIndex === 1) {
        const idx = Math.max(currentDataIndex - 1, 0);
        const currentData = frame.data[idx];
        imageUrl = currentData.imageUrl;
        content += `<meta
      name="fc:frame:post_url"
      content="${baseUrl}guest/frames/1?pageIndex=0&next=${idx}"
    />`;
      } else {
        const currentData = frame.data[currentDataIndex];
        imageUrl = currentData.contentImageUrl;
        content = `<meta
      name="fc:frame:post_url"
      content="${baseUrl}guest/frames/1?pageIndex=1&next=${currentDataIndex}"
    />
    ${
      currentData.hasInput
        ? ` <meta property="fc:frame:input:text" content="${currentData.inputLabel}" />`
        : ""
    }
    <meta property="fc:frame:button:1" content="🔙" />
    <meta property="fc:frame:button:2" content="Submit" />
    `;
      }
      break;
    }
    default: {
      const currentData = frame.data[currentDataIndex];
      if (req.body?.untrustedData?.buttonIndex === 1) {
        imageUrl = currentData.imageUrl;
        content = `<meta
        name="fc:frame:post_url"
        content="${baseUrl}guest/frames/1?pageIndex=0&next=${currentDataIndex}"
      />
      <meta property="fc:frame:button:1" content="⬆️" />
      <meta property="fc:frame:button:2" content="⬇️" />
      <meta property="fc:frame:button:3" content="Select" />`;
      } else {
        imageUrl = currentData.contentImageUrl;
        content = `<meta
        name="fc:frame:post_url"
        content="${baseUrl}guest/frames/1?pageIndex=1&next=${currentDataIndex}"
      />
      ${
        currentData.hasInput
          ? ` <meta property="fc:frame:input:text" content="${currentData.inputLabel}" />`
          : ""
      }
      <meta property="fc:frame:button:1" content="🔙" />
      ${
        currentData.hasInput
          ? `<meta property="fc:frame:button:2" content="Submit" />`
          : ""
      }
    
      `;
      }

      break;
    }
  }

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
          content="${imageUrl}"
        />
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="${imageUrl}"
        />
        ${content}
      </head>
      <body>
        <p>Frame</p>
      </body>
    </html>
      `
    )
    .end();
});
