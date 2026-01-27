import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
import pdf from 'pdf-parse/lib/pdf-parse.js'
import FormData from "form-data";

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});




export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt required" });
    }

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue."
      });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    const content =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error("Gemini returned empty response");
    }

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1
        }
      });
    }

    res.json({ success: true, content });

  } catch (error) {
    console.error("GENERATION ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (!prompt) {
      return res.json({ success: false, message: "Prompt is required" });
    }

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    // ✅ GEMINI SAFE CONTENT READ
    const content =
      response?.choices?.[0]?.message?.parts?.[0]?.text;

    if (!content) {
      throw new Error("AI returned empty content");
    }

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


export const generateImage = async (req, res)=>{
    try {
        const { userId } = req.auth();
        const { prompt, publish } = req.body;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({ success: false, message: "This feature is only available for premium subscriptions"})
        }

        
        const formData = new FormData()
        formData.append('prompt', prompt)
        const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {'x-api-key': process.env.CLIPDROP_API_KEY,},
            responseType: "arraybuffer",
        })

        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

        const {secure_url} = await cloudinary.uploader.upload(base64Image)
        

        await sql` INSERT INTO creations (user_id, prompt, content, type, publish) 
        VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false })`;

        res.json({ success: true, content: secure_url})

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}




export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth();
        const image = req.file;
        const plan = req.plan;
        
        // Get publish from FormData - it comes as a string
        const publish = req.body.publish === 'true' || req.body.publish === true;

        if(plan !== 'premium'){
            return res.json({ success: false, message: "This feature is only available for premium subscriptions"})
        }

        const {secure_url} = await cloudinary.uploader.upload(image.path, {
            transformation: [
                {
                    effect: 'background_removal',
                    background_removal: 'remove_the_background'
                }
            ]
        })

        // Insert with publish parameter
        await sql` INSERT INTO creations (user_id, prompt, content, type, publish) 
        VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image', ${publish})`;

        res.json({ success: true, content: secure_url })

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}




export const removeImageObject = async (req, res)=>{
    try {
        const { userId } = req.auth();
        const { object } = req.body;
        const image = req.file;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({ success: false, message: "This feature is only available for premium subscriptions"})
        }

        const {public_id} = await cloudinary.uploader.upload(image.path)

        const imageUrl = cloudinary.url(public_id, {
            transformation: [{effect: `gen_remove:${object}`}],
            resource_type: 'image'
        })

        await sql` INSERT INTO creations (user_id, prompt, content, type) 
        VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;

        res.json({ success: true, content: imageUrl})

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

  
    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    // File size check
    if (!resume || resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds allowed size (5MB).",
      });
    }

    // Read PDF
    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    if (!pdfData.text || pdfData.text.length < 50) {
      return res.json({
        success: false,
        message: "Unable to extract readable text from resume PDF",
      });
    }

    // 🔑 Token-safe resume text
    const resumeText = pdfData.text
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 1800);

    // STRICT STRUCTURED PROMPT
    const prompt = `
You are a senior software engineering recruiter.

Write a COMPLETE resume review using EXACTLY the following format.
Follow it STRICTLY.

### Overall Impression
- Write 3–4 lines summarizing the resume quality.

### Strengths
- Bullet point 1
- Bullet point 2
- Bullet point 3

### Weaknesses
- Bullet point 1
- Bullet point 2
- Bullet point 3

### Missing Areas
- Bullet point 1
- Bullet point 2
- Bullet point 3

### Specific Improvements
- Bullet point 1 (actionable)
- Bullet point 2 (actionable)
- Bullet point 3 (actionable)

### Final Verdict for Software Engineering Placements
- 2–3 clear lines stating readiness level and why.

Rules:
- Use ONLY the headings above.
- Every section MUST have bullet points.
- Do NOT use conversational text.
- Do NOT address the candidate by name.
- Do NOT skip any section.

Resume Content:
${resumeText}
`;

    // AI CALL 
    const response = await AI.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      max_tokens: 2200,
    });

    const content = response.choices[0].message.content;

    if (!content || content.length < 300) {
      return res.json({
        success: false,
        message: "AI returned incomplete resume review. Please retry.",
      });
    }

    //Save to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (
        ${userId},
        'Structured Resume Review',
        ${content},
        'resume-review'
      )
    `;

    //Response
    return res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};



export const startAsyncUpscale = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file required",
      });
    }

    const form = new FormData();
    form.append("image_file", fs.createReadStream(req.file.path));

    // DEFAULT upscale size 
    form.append("target_width", 4096);
    form.append("target_height", 4096);

    const response = await axios.post(
      "https://clipdrop-api.co/image-upscaling/v1/async-upscale",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
      }
    );

    fs.unlinkSync(req.file.path); 

    return res.json({
      success: true,
      taskId: response.data.taskId,
      remainingCredits: response.headers["x-remaining-credits"],
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.error || "Upscale start failed",
    });
  }
};

/**
 * CHECK task status
 */
export const checkUpscaleStatus = async (req, res) => {
  try {
    const { taskId } = req.params;

    const { data } = await axios.get(
      `https://clipdrop-api.co/async-tasks/v1/task-status/${taskId}`,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
      }
    );

    return res.json(data);
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      success: false,
      message: "Status check failed",
    });
  }
};

/**
 * GET download URL
 */
export const getUpscaleResult = async (req, res) => {
  try {
    const { taskId } = req.params;

    const { data } = await axios.get(
      `https://clipdrop-api.co/async-tasks/v1/result/${taskId}`,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
      }
    );

    return res.json({
      success: true,
      downloadUrl: data.downloadUrl,
    });
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      success: false,
      message: "Result fetch failed",
    });
  }
};

