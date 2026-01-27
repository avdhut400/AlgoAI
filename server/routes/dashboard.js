import express from "express";
import { requireAuth } from "@clerk/express";
import sql from "../configs/db.js";

const drouter = express.Router();

const getDashboard = async (req, res) => {
  try {
    const userId = req.auth.userId;

    let [usage] = await sql`
      SELECT plan, used, usage_limit
      FROM user_usage
      WHERE clerk_user_id = ${userId}
    `;

    // FIRST TIME USER
    if (!usage) {
      await sql`
        INSERT INTO user_usage (clerk_user_id, plan, usage_limit, used)
        VALUES (${userId}, 'free', 10, 0)
      `;

      usage = {
        plan: "free",
        used: 0,
        usage_limit: 10
      };
    }

    const activity = await sql`
      SELECT action, created_at
      FROM usage_logs
      WHERE clerk_user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 5
    `;

    res.json({
      success: true,
      plan: usage.plan,
      used: usage.used,
      usage_limit: usage.usage_limit,
      activity: activity || []
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Dashboard fetch failed"
    });
  }
};

drouter.get("/dashboard", requireAuth(), getDashboard);

export default drouter;
