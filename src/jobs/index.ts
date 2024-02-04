import schedule from "node-schedule";
import { resetTable } from "../utils/storage";
import { logger } from "../utils/logger";
import fs from "fs";
import path from "path";

schedule.scheduleJob("RESET CACHE", "0 * * * *", () => {
  logger.info("Resetting cache...");
  resetTable();
});

schedule.scheduleJob("DELETE IMAGES", "*/30 * * * *", () => {
  logger.info("Deleting images...");
  const filesPath = path.join(__dirname, "../public");
  logger.info(filesPath);
  const files = fs.readdirSync(filesPath);
  const fileToKeep = "851830738313542_1706996673307.png";

  files.forEach((file) => {
    const filePath = `${filesPath}/${file}`;

    if (file !== fileToKeep) {
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          logger.error("Error deleting file:", filePath, unlinkErr);
        } else {
          logger.info("Deleted file:", filePath);
        }
      });
    }
  });
});

export default schedule;
