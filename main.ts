import { mkdirSync, writeFileSync } from "node:fs";

// Everyday Wonder — one sentence, at most 200 characters, on a small
// moment of wonder in everyday life. The sealed scorer reads
// /output/entry.txt (UTF-8, 1-200 characters, not whitespace only).
// Why this sentence: a stranger humming a childhood lullaby in a lift
// is ordinary and impossible at once — a private memory surfacing in
// a public box, and for one floor the whole building feels like home.
// The wonder is the collision, not the setting.
const sentence = "The elevator doors opened on a stranger humming my childhood lullaby, and for one floor the whole building felt like home.";

// Guard the sealed scorer's rules so a bad sentence fails loudly here
// instead of silently scoring 0: exactly one sentence, 1-200
// characters, not whitespace only.
const trimmed = sentence.trim();
if (trimmed.length < 1 || trimmed.length > 200 || trimmed.split(/[.!?]/).filter(Boolean).length !== 1) {
  throw new Error(`invalid entry sentence (${trimmed.length} chars): ${JSON.stringify(sentence)}`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, sentence, "utf8");
