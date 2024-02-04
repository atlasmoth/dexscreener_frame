import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: any,
  req: Request,
  res: Response<any>,
  next: NextFunction
) {
  let message = "";

  if (err instanceof ZodError) {
    message = err.issues
      .map((t) => {
        const path = t.path.join(",");
        const message = t.message;
        return `${path}: ${message}`;
      })
      .join(",");
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    success: false,
    message: message || err.message,
  });
}

export const errorInterceptor =
  (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err: any) => {
      req.log.warn(err);
      next(err);
    });
  };
