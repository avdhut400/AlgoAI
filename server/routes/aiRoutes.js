import express from "express";
import { auth } from "../middlewares/auth.js";
import { generateArticle, generateBlogTitle, generateImage, removeImageBackground, removeImageObject, resumeReview } from "../controllers/aiController.js";
import { upload } from "../configs/multer.js";
import multer from "multer";
import {  startAsyncUpscale,
  checkUpscaleStatus,
  getUpscaleResult, } from "../controllers/aiController.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1,                
  message: {
    success: false,
    keyGenerator: (req) => req.ip,
    // message: "Too many requests, try again later"
    message: { message: "Too many requests from this IP" }
  }
});

const aiRouter = express.Router();

aiRouter.post('/generate-article',auth, generateArticle)
aiRouter.post('/generate-blog-title', auth, generateBlogTitle)
aiRouter.post('/generate-image',limiter, auth, generateImage)

aiRouter.post('/remove-image-background',limiter, upload.single('image'), auth, removeImageBackground)

aiRouter.post('/remove-image-object',limiter, upload.single('image'), auth, removeImageObject)

aiRouter.post('/resume-review',limiter, upload.single('resume'), auth, resumeReview)

aiRouter.post(
  "/async-upscale",
  upload.single("image"),
  startAsyncUpscale
);

aiRouter.get(
  "/async-upscale/status/:taskId",
  checkUpscaleStatus
);

aiRouter.get(
  "/async-upscale/result/:taskId",
  getUpscaleResult
);

export default aiRouter