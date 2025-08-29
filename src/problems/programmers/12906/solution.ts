// programmers 12906 같은-숫자는-싫어
export function solve(input: string): string {
  return '';
}

// stdin 실행 (BOJ 등)
import fs from 'node:fs';
if (import.meta.url === 'file://' + process.argv[1]) {
  const data = fs.readFileSync(0, 'utf8');
  process.stdout.write(solve(data));
}
