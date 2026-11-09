import path from "node:path";
import compression from "compression";
import cors from "cors";
import express from "express";
import type { ErrorRequestHandler } from "express";
import { type Request, type Response } from 'express';
import { ABOUT, getConfig } from "./constants.ts";
import multer from "multer";
import { randomInt } from "node:crypto";
import { readdir, unlink } from 'node:fs/promises';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const shortId = randomInt(36 ** 5).toString(36).padStart(5, "0");
    const cleanName = file.originalname.replace(
      /[^a-zA-Z0-9._-]/g,
      "_"
    );
    const newName = `${shortId}-${cleanName}`;
    cb(null, newName);
  }

  
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif"
    ];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } 
});

interface AppOptions {
  publicDirectory?: string;
  allowedOrigins?: string[];
}

export const createApp = ({ publicDirectory = path.resolve("public"), allowedOrigins = getConfig().allowedOrigins }: AppOptions = {}) => {
  const app = express();
  app.disable("x-powered-by");
  app.use(compression({
    filter: (request, response) => request.headers["x-no-compression"] === undefined && compression.filter(request, response)
  }));
  app.use(cors({ origin: allowedOrigins, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/about", (_request, response) => {
    response.status(200).type("text/plain").send(ABOUT);
  });
  
  app.get("/api/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.post('/api/upload', upload.single('uploaded_file'), (req, res) => {
    if(!req.file) {
      res.status(400).json({
        error: "No valid image file was provided"
      });
      return;
    }
    res.status(201).json({ message: "Upload successful" });
  });

  app.get('/api/images', async (req, res) => {
    try {
      const files = await readdir("uploads");
      res.send(files);
    } catch (err) {
      res.status(500).json({ message: "Failed to retrieve images" });
    }
  });

  app.delete('/api/delete/:filename', async (req, res) => {
    try {
      const filename = req.params.filename;
      if (!filename) {
        res.status(400).json({ message: "Not a valid filename" });
        return;
      };
      await unlink(path.join("uploads", filename));
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: "Cannot delete file." });
    }
  });

  app.use(express.static(publicDirectory));
  app.use("/uploads", express.static("uploads"));

  const handleError: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
    if (error instanceof SyntaxError && "status" in error && error.status === 400) {
      response.status(400).json({ error: "Invalid JSON" });
      return;
    }
    if (error instanceof Error && "status" in error && typeof error.status === "number"
      && Number.isInteger(error.status) && error.status >= 400 && error.status < 500) {
      response.status(error.status).json({ error: "Invalid request" });
      return;
    }
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  };
  app.use(handleError);

  return app;
};
