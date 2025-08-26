// splitText.ts
/** Split a string into `lines` near-equal parts (by character count). */
export function splitTextToLines(text: string, lines: number): string[] {
  if (lines <= 1) return [text];
  const len = text.length;
  const base = Math.floor(len / lines);
  const extra = len % lines; // first `extra` lines get +1 char

  const out: string[] = [];
  let i = 0;
  for (let k = 0; k < lines; k++) {
    const take = base + (k < extra ? 1 : 0);
    out.push(text.slice(i, i + take));
    i += take;
  }
  return out;
}
