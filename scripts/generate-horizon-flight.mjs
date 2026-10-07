#!/usr/bin/env node
/**
 * Generates the optional scroll-scrubbed footage for the home page's Horizon act.
 *
 *   KIE_API_KEY=... node scripts/generate-horizon-flight.mjs
 *
 * Starts from a real frame of the hero's planet footage (scripts/assets/horizon-head.jpg),
 * asks kie.ai (Kling 2.1 Pro) for one slow continuous camera move along the horizon, then
 * re-encodes it with a dense keyframe interval so it scrubs smoothly under the scroll wheel.
 * Output: public/horizon-flight.mp4. The Horizon act picks it up automatically if it exists.
 *
 * Cost: one 10s Kling clip (roughly 320 credits at kie.ai's published rate).
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const KEY = process.env.KIE_API_KEY || process.env.KIE_AI_API_KEY;
if (!KEY) {
  console.error("Set KIE_API_KEY first: KIE_API_KEY=your-key node scripts/generate-horizon-flight.mjs");
  process.exit(1);
}

const API = "https://api.kie.ai";
const UPLOAD = "https://kieai.redpandaai.co/api/file-base64-upload";
const H = { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` };
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const HEAD = path.join(ROOT, "scripts/assets/horizon-head.jpg");
const RAW = path.join(ROOT, "scripts/out/horizon-flight-raw.mp4");
const OUT = path.join(ROOT, "public/horizon-flight.mp4");
const DURATION = process.env.DURATION || "10";

const PROMPT =
  "Cinematic orbital shot above a dark planet at night, city lights glowing amber on the surface. " +
  "The camera glides slowly and steadily to the right along the curved horizon, holding the same altitude, " +
  "as the sunrise on the rim grows gradually brighter and a thin band of blue atmosphere catches the light. " +
  "One single continuous take, smooth and controlled, no cuts, no camera shake, no zoom snap. " +
  "Nothing enters or leaves the frame. Deep black space, a few distant stars.";
const NEGATIVE = "blur, distortion, low quality, warping, morphing, jitter, flicker, text, watermark, cut, scene change, spacecraft, people";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function json(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Unexpected response (${res.status}): ${text.slice(0, 200)}`);
  }
}

async function credit() {
  const j = await json(await fetch(`${API}/api/v1/chat/credit`, { headers: H }));
  return j.data;
}

async function upload(file) {
  const dataUrl = `data:image/jpeg;base64,${fs.readFileSync(file).toString("base64")}`;
  const j = await json(
    await fetch(UPLOAD, {
      method: "POST",
      headers: H,
      body: JSON.stringify({ base64Data: dataUrl, uploadPath: "portfolio", fileName: path.basename(file) }),
    })
  );
  const url = j?.data?.downloadUrl || j?.data?.fileUrl || j?.data?.url;
  if (!url) throw new Error("Upload failed: " + JSON.stringify(j));
  return url;
}

async function createTask(input) {
  const j = await json(
    await fetch(`${API}/api/v1/jobs/createTask`, {
      method: "POST",
      headers: H,
      body: JSON.stringify({ model: "kling/v2-1-pro", input }),
    })
  );
  if (j.code !== 200 || !j?.data?.taskId) throw new Error("createTask failed: " + JSON.stringify(j));
  return j.data.taskId;
}

async function waitTask(taskId) {
  const t0 = Date.now();
  let delay = 5000;
  for (;;) {
    if (Date.now() - t0 > 25 * 60 * 1000) throw new Error("Timed out waiting for kie.ai");
    const j = await json(
      await fetch(`${API}/api/v1/jobs/recordInfo?taskId=${encodeURIComponent(taskId)}`, { headers: H })
    );
    const d = j?.data || {};
    const state = d.state || d.status;
    if (state === "success") {
      let out = d.resultJson;
      if (typeof out === "string") out = JSON.parse(out);
      const urls = out?.resultUrls || out?.result_urls || out?.urls || [];
      if (!urls.length) throw new Error("Finished with no video URL: " + JSON.stringify(d));
      return urls[0];
    }
    if (state === "fail" || state === "failed") throw new Error("Generation failed: " + (d.failMsg || d.failCode));
    process.stdout.write(`  ${state || "queued"} · ${Math.round((Date.now() - t0) / 1000)}s\n`);
    await sleep(delay);
    delay = Math.min(delay * 1.25, 15000);
  }
}

function hasFfmpeg() {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

console.log("kie.ai credit before:", await credit());
console.log("Uploading the start frame…");
const imageUrl = await upload(HEAD);
console.log(`Generating a ${DURATION}s clip (this usually takes a few minutes)…`);
const taskId = await createTask({
  prompt: PROMPT,
  image_url: imageUrl,
  duration: DURATION,
  negative_prompt: NEGATIVE,
  cfg_scale: 0.5,
});
const videoUrl = await waitTask(taskId);

fs.mkdirSync(path.dirname(RAW), { recursive: true });
const res = await fetch(videoUrl);
if (!res.ok) throw new Error(`Download failed: ${res.status}`);
fs.writeFileSync(RAW, Buffer.from(await res.arrayBuffer()));
console.log("Saved raw clip:", path.relative(ROOT, RAW));

if (hasFfmpeg()) {
  // Dense keyframes: seeking walks from the previous keyframe, so a normal web encode scrubs like mud
  execFileSync(
    "ffmpeg",
    ["-y", "-hide_banner", "-loglevel", "error", "-i", RAW, "-an",
      "-vf", "scale=-2:1080,fps=30", "-c:v", "libx264", "-preset", "slow", "-crf", "20",
      "-g", "8", "-keyint_min", "8", "-sc_threshold", "0", "-pix_fmt", "yuv420p",
      "-movflags", "+faststart", OUT],
    { stdio: "inherit" }
  );
  console.log("Scrub-ready clip:", path.relative(ROOT, OUT));
} else {
  fs.copyFileSync(RAW, OUT);
  console.log("ffmpeg not found, so the clip was copied without re-encoding:", path.relative(ROOT, OUT));
  console.log("It will play, but scrubbing stays choppy until it is re-encoded with ffmpeg (or ask Claude to do it).");
}

console.log("kie.ai credit after:", await credit());
