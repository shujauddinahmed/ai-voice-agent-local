import asyncio
import sys
import edge_tts

text = sys.argv[1].replace("<break>", "<break time='400ms'/>")

async def main():
    communicate = edge_tts.Communicate(
        text=f"<speak>{text}</speak>",
        voice="en-IN-PrabhatNeural"
    )
    await communicate.save("output.wav")

asyncio.run(main())
