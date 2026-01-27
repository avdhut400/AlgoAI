// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import { clerkMiddleware, requireAuth } from '@clerk/express'
// import aiRouter from './routes/aiRoutes.js';
// import connectCloudinary from './configs/cloudinary.js';
// import userRouter from './routes/userRoutes.js';
// import dashboardRoutes from "./routes/dashboard.js";
// // import reactionRoutes from './routes/reactions.js';
// const app = express()

// await connectCloudinary()
// // app.use(cors())
// // app.use(cors({
// //   origin: "http://localhost:5173", 
// //   credentials: true
// // }));

// const isProd = process.env.NODE_ENV === "production";

// app.use(cors({
//   origin: isProd 
//     ? process.env.FRONTEND_URL   // Vercel URL
//     : "http://localhost:5173",
//   credentials: true
// }));

// app.use(express.json())
// app.use(clerkMiddleware())

// app.get('/', (req, res)=>res.send('Server is Live!'))

// app.use(requireAuth())
// // app.use('/api/reactions', reactionRoutes);
// app.use('/api/ai', aiRouter)
// app.use('/api/user', userRouter)
// app.use('/api',dashboardRoutes)
// app.get("/api/test-ai", async (req, res) => {
//   try {
//     const response = await AI.chat.completions.create({
//       model: "gemini-2.0-flash",
//       messages: [{ role: "user", content: "Say hello in one line." }],
//       max_tokens: 20,
//     });

//     res.json({
//       success: true,
//       message: response.choices[0].message.content,
//     });
//   } catch (err) {
//     res.status(err.status || 500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, ()=>{
//     console.log('Server is running on port', PORT);
// })




import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";

import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboard.js";

const app = express();

/* -------------------- INIT -------------------- */
await connectCloudinary();

const isProd = process.env.NODE_ENV === "production";

/* -------------------- CORS (MUST BE FIRST) -------------------- */
app.use(
  cors({
    origin: isProd
      ? process.env.FRONTEND_URL // https://algo-ai-zeta.vercel.app
      : "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ✅ IMPORTANT: allow preflight WITHOUT auth */
app.options("*", cors());

/* -------------------- MIDDLEWARES -------------------- */
app.use(express.json());
app.use(clerkMiddleware());

/* -------------------- PUBLIC ROUTE -------------------- */
app.get("/", (req, res) => {
  res.send("Server is Live!");
});

/* -------------------- PROTECTED ROUTES -------------------- */
/* ❌ NEVER use global requireAuth() */

app.use("/api/ai", requireAuth(), aiRouter);
app.use("/api/user", requireAuth(), userRouter);
app.use("/api", requireAuth(), dashboardRoutes);

/* -------------------- TEST ROUTE -------------------- */
app.get("/api/test-ai", requireAuth(), async (req, res) => {
  try {
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: "Say hello in one line." }],
      max_tokens: 20,
    });

    res.json({
      success: true,
      message: response.choices[0].message.content,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      error: err.message,
    });
  }
});

/* -------------------- START SERVER -------------------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
