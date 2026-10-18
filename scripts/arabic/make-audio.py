"""Renders the letter-name, syllable and word clips into public/lab/arabic/audio.

    python -m venv /tmp/tts && /tmp/tts/bin/pip install edge-tts
    /tmp/tts/bin/python scripts/arabic/make-audio.py          # only missing clips
    /tmp/tts/bin/python scripts/arabic/make-audio.py --force  # redo all

The voice is Microsoft's neural TTS through edge-tts.
"""

import asyncio
import json
import pathlib
import subprocess
import sys

import edge_tts

VOICE = "ar-SA-HamedNeural"
RATE = "-20%"  # a learner wants the sound slower than speech
ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "lab" / "arabic" / "audio"


def manifest() -> dict[str, str]:
    raw = subprocess.check_output(
        ["node", "--experimental-strip-types", "--no-warnings", "scripts/arabic/audio-manifest.mts"],
        cwd=ROOT,
    )
    return json.loads(raw)


async def render(name: str, text: str, gate: asyncio.Semaphore) -> None:
    async with gate:
        await edge_tts.Communicate(text, VOICE, rate=RATE).save(str(OUT / f"{name}.mp3"))
        print(f"{name}  {text}")


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    force = "--force" in sys.argv
    todo = {k: v for k, v in manifest().items() if force or not (OUT / f"{k}.mp3").exists()}
    gate = asyncio.Semaphore(6)
    await asyncio.gather(*(render(k, v, gate) for k, v in todo.items()))
    print(f"{len(todo)} clips -> {OUT.relative_to(ROOT)}")


asyncio.run(main())
