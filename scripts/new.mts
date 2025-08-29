// scripts/new.mts
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [, , platform, id] = process.argv;

if (!platform || !id) {
  console.error('usage: npm run new -- <platform> <id>');
  process.exit(1);
}

// ✅ 폴더명은 "id"만 사용 (slug 없음)
const folderName = `${id}`;
const base = join('src/problems', platform, folderName);

// 공통 README
const readmeContent = `# ${platform.toUpperCase()} ${id}
- 링크: (문제 링크)
- 유형: (예: BFS / DP / Greedy)
- 풀이 요약:
  - 아이디어:
  - 복잡도:
  - 엣지케이스:
`;

// 플랫폼별 템플릿
let solutionContent = '';
let testContent = '';

if (platform === 'boj') {
  // BOJ: stdin/stdout 기반
  mkdirSync(join(base, 'cases'), { recursive: true });

  solutionContent = `// ${platform} ${id}
export function solve(input: string): string {
  // TODO: implement
  return "";
}

// stdin 실행 (BOJ 전용)
import fs from "node:fs";
if (import.meta.url === "file://" + process.argv[1]) {
  const data = fs.readFileSync(0, "utf8");
  process.stdout.write(solve(data));
}
`;

  testContent = `import { describe, expect, it } from "vitest";
import { solve } from "./solution";

describe("${platform} ${id}", () => {
  it("sample 1", () => {
    const input = "";
    const out = solve(input);
    expect(out.trim()).toBe("");
  });
});
`;

  mkdirSync(base, { recursive: true });
  writeFileSync(join(base, 'cases/1.in'), '');
  writeFileSync(join(base, 'cases/1.out'), '');
} else {
  // programmers / leetcode: 함수 호출 기반
  mkdirSync(base, { recursive: true });

  solutionContent = `// ${platform} ${id}
export function solution(input: any): any {
  // TODO: implement
  return input;
}
`;

  testContent = `import { describe, expect, it } from "vitest";
import { solution } from "./solution";

describe("${platform} ${id}", () => {
  it("sample 1", () => {
    expect(solution("test")).toBe("test");
  });
});
`;
}

// 파일 쓰기
writeFileSync(join(base, 'solution.ts'), solutionContent);
writeFileSync(join(base, 'index.test.ts'), testContent);
writeFileSync(join(base, 'README.md'), readmeContent);

console.log('Scaffolded:', base);
