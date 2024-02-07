import { Pair } from "./canvas";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export let table: Record<string, Pair[]> = {};

export const resetTable = () => {
  table = {};
};

export { cloudinary };
