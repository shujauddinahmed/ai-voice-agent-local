import fetch from "node-fetch";
import { speak } from "./tts.js";

async function run() {
  console.log("Sending to AI...");

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt: `
You are Anaya, a polite Indian sales executive.
You speak in Hinglish.
Reply in one short sentence.

User said: "Hello"
      `,
      stream: false
    })
  });

  const data = await response.json();
  console.log("AI:", data.response);

  console.log("Generating voice...");
  await speak(data.response);
  console.log("Voice generated successfully");

  process.exit(0);
}

run();
