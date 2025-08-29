export function solution(participant: string[], completion: string[]): string {
  const map = new Map<string, number>();
  for (const p of participant) map.set(p, (map.get(p) ?? 0) + 1);
  for (const c of completion) map.set(c, (map.get(c) ?? 0) - 1);
  for (const [name, cnt] of map) if (cnt > 0) return name;
  return "";
}
