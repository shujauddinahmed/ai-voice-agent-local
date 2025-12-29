import { spawn } from "child_process";

export function speak(text) {
  return new Promise((resolve, reject) => {
    const cleanText = text
      .replace(/[^\x00-\x7F]/g, "") // remove emojis safely
      .replace(/\n/g, " ");

    const py = spawn("python", ["tts.py", cleanText], {
      stdio: "inherit"
    });

    py.on("error", reject);

    py.on("close", (code) => {
      if (code === 0) {
        resolve("output.wav");
      } else {
        reject(new Error("edge-tts failed"));
      }
    });
  });
}
