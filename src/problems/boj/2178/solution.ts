export function solve(input: string): string {
  const [nm, ...rows] = input.trim().split("\n");
  const [n, m] = nm.split(" ").map(Number);
  const grid = rows.map((r) => r.trim().split("").map(Number));

  const q: [number, number][] = [[0, 0]];
  const dist = Array.from({ length: n }, () => Array(m).fill(0));
  dist[0][0] = 1;
  const dx = [1, -1, 0, 0], dy = [0, 0, 1, -1];

  while (q.length) {
    const [x, y] = q.shift()!;
    if (x === n - 1 && y === m - 1) return String(dist[x][y]);
    for (let k = 0; k < 4; k++) {
      const nx = x + dx[k], ny = y + dy[k];
      if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
      if (grid[nx][ny] === 1 && dist[nx][ny] === 0) {
        dist[nx][ny] = dist[x][y] + 1;
        q.push([nx, ny]);
      }
    }
  }
  return String(dist[n - 1][m - 1]);
}

// stdin 실행
import fs from "node:fs";
if (import.meta.url === "file://" + process.argv[1]) {
  const data = fs.readFileSync(0, "utf8");
  process.stdout.write(solve(data));
}
