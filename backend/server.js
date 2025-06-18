// // backend/server.js
// import express from "express";
// import multer from "multer";
// import dotenv from "dotenv";
// import fs from "fs";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config({ path: ".env.local" });

// const app = express();
// const port = 3001;

// // multer to handle uploads
// const upload = multer({ dest: "uploads/" });
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// function fileToGenerativePart(path, mimeType) {
//   return {
//     inlineData: {
//       data: Buffer.from(fs.readFileSync(path)).toString("base64"),
//       mimeType,
//     },
//   };
// }

// app.post("/analyze-photo", upload.single("image"), async (req, res) => {
//     console.log("recieved")
//   try {
//     const imagePath = req.file.path;

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `
// Analyze the image and tell me the following:

// 1. If a human face is detected:
//    - How many people are in the image?
//    - Describe their facial expressions (e.g., happy, sad, neutral).
//    - Are their eyes open or closed?
//    - Are they wearing glasses?

// 2. If there is no human face detected:
//    - Identify and name the main object(s) in the image, such as a phone, bottle, or any other item.
//    - If the image is unclear or random, say "No recognizable object or face detected."

// Give a natural language description like you're explaining what you see in a photo.
// `;

//     const imageParts = [fileToGenerativePart(imagePath, "image/jpeg")];

//     const result = await model.generateContent([prompt, ...imageParts]);
//     const response = await result.response;
//     const text = await response.text();

//     fs.unlinkSync(imagePath); // delete temp file

//     res.json({ result: text });
//   } catch (err) {
//     console.error("Gemini API Error:", err);
//     res.status(500).send("Something went wrong");
//   }
// });

// app.listen(port, () => {
//   console.log(`✅ Server running on http://localhost:${port}`);
// });

import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ path: ".env.local" });

const app = express();
const port = 3001;

app.use(cors());

// Setup multer to store files in /uploads
const upload = multer({ dest: "uploads/" });

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Convert image file to base64 for Gemini
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

app.post("/analyze-photo", upload.single("image"), async (req, res) => {
  console.log("📥 Received image");

  try {
    const imagePath = req.file.path;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `
// Analyze the image and tell me the following:

// 1. If a human face is detected:
//    - How many people are in the image?
//    - Describe their facial expressions (e.g., happy, sad, neutral).
//    - Are their eyes open or closed?
//    - Are they wearing glasses?

// 2. If there is no human face detected:
//    - Identify and name the main object(s) in the image, such as a phone, bottle, or any other item.
//    - If the image is unclear or random, say "No recognizable object or face detected."

// Give a natural language description like you're explaining what you see in a photo.
// `;

const prompt = `
You are analyzing a user-captured image. Provide a natural-language description of what is visually observed.

Instructions:

1. First, determine if a human is visible in the photo.

2. If a face is visible:
   - Estimate how many people are present.
   - Describe facial expressions (e.g., happy, sad, neutral).
   - Are their eyes open or closed?
   - Are they wearing glasses?
   - Is the face very close to the camera? If yes, mention it.

3. If a full or half body is visible:
   - Mention whether it is a full-body or upper-body shot.
   - Describe the person's body posture (e.g., standing straight, slouched, sitting, leaning forward/backward).
   - Mention any visible gestures (e.g., waving, crossed arms).

4. If no human is visible:
   - Describe the main visible object(s), such as a phone, bottle, etc.
   - If the image is unclear or doesn't contain meaningful content, say "No recognizable object or face detected."

Give your response in a friendly, descriptive tone as if explaining what you observe in a photograph. Do not repeat the instructions or questions.
`;

    const imageParts = [fileToGenerativePart(imagePath, "image/jpeg")];

    // ✅ Correct structure: image first, then prompt
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            ...imageParts,
            { text: prompt }, // Place after image
          ],
        },
      ],
    });

    const response = await result.response;
    const text = await response.text();

    // Delete temp file
    fs.unlinkSync(imagePath);

    res.json({ result: text });
  } catch (err) {
    console.error("❌ Gemini API Error:", err);
    res.status(500).send("Something went wrong");
  }
});

// ✅ Bind to all IPs so phone/emulator can access it
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server running on http://0.0.0.0:${port}`);
});
