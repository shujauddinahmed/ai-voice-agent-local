import express from "express";
import multer from "multer";
import cors from "cors";
import { spawn } from "child_process";
import fs from "fs";
import { getAIReply } from "./brain.js";
import { speak } from "./tts.js";

const app = express();
app.use(cors());
app.use(express.static(".")); // allow output.wav access

const upload = multer({ dest: "uploads/" });

// 🔹 DEMO CALL STATE (single user)
let callState = "intro";

// 🔹 SIMPLE INTENT DETECTION
function detectIntent(text) {
  const t = text.toLowerCase();

  if (t.includes("busy") || t.includes("later") || t.includes("call back"))
    return "busy";

  if (t.includes("not interested") || t.includes("no") || t.includes("nahi"))
    return "not_interested";

  if (t.includes("interested") || t.includes("yes") || t.includes("haan"))
    return "interested";

  return "neutral";
}

app.post("/talk", upload.single("audio"), async (req, res) => {
  try {
    const audioPath = req.file.path;

    // 1️⃣ SPEECH → TEXT (Whisper)
    const py = spawn("python", ["stt.py", audioPath]);

    let userText = "";

    py.stdout.on("data", (data) => {
      userText += data.toString();
    });

    py.on("close", async () => {
      fs.unlink(audioPath, () => {}); // cleanup

      try {
        userText = userText.trim();
        console.log("User said:", userText);

        // 2️⃣ INTENT DETECTION
        const intent = detectIntent(userText);

        // 3️⃣ UPDATE CALL STATE BASED ON INTENT
        if (intent === "busy" || intent === "not_interested") {
          callState = "end";
        } else if (intent === "interested") {
          callState = "handle_response";
        } else {
          if (callState === "intro") callState = "pitch";
          else if (callState === "pitch") callState = "interest_check";
        }

        // 4️⃣ AI REPLY
        const aiText = await getAIReply(userText, callState);
        console.log("AI replied:", aiText);

        // 5️⃣ SAFETY: LIMIT RESPONSE LENGTH
        const aiTextShort = aiText.split(".").slice(0, 2).join(".");

        // 6️⃣ TEXT → VOICE
        await speak(aiTextShort);

        // 7️⃣ SEND RESPONSE
        res.json({
          user: userText,
          ai: aiTextShort,
          audio: "output.wav",
          state: callState,
          intent
        });

      } catch (err) {
        console.error("AI/TTS Error:", err);
        res.status(500).json({ error: "AI processing failed" });
      }
    });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("AI Call Server running at http://localhost:3000");
});
