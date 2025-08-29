// scripts/run.mts
// BOJ 스타일(stdin) 문제 실행 + 기대 출력(cases/*.out) 자동 비교
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';

type Opts = {
  all?: boolean;
  exact?: boolean; // 공백까지 정확 비교
  silent?: boolean; // 프로그램 stdout만 출력
};

const [, , problemPath, caseNameOrFlag, ...rest] = process.argv;
if (!problemPath) {
  console.error('usage:');
  console.error('  npm run run -- <problemPath> [caseName]');
  console.error('  npm run run -- <problemPath> --all [--exact] [--silent]');
  process.exit(1);
}

const flags = new Set([caseNameOrFlag, ...rest].filter(Boolean));
const opts: Opts = {
  all: flags.has('--all'),
  exact: flags.has('--exact'),
  silent: flags.has('--silent'),
};

const nodeBin = process.execPath;
const sol = join(problemPath, 'solution.ts');

if (!existsSync(sol)) {
  console.error(`❌ solution.ts not found: ${sol}`);
  process.exit(1);
}

function normalize(s: string) {
  // 기본 비교: 양끝 공백/개행 정리 + CRLF 정규화 + 라인별 트림
  return s
    .replace(/\r\n/g, '\n')
    .trimEnd()
    .split('\n')
    .map((l) => l.replace(/\s+$/g, '')) // 각 라인 뒤 공백 제거
    .join('\n')
    .trim();
}

function runCase(caseName: string): { pass: boolean; out: string; expected?: string } {
  const inputPath = join(problemPath, 'cases', `${caseName}.in`);
  const outPath = join(problemPath, 'cases', `${caseName}.out`);
  if (!existsSync(inputPath)) {
    throw new Error(`Input not found: ${inputPath}`);
  }
  const input = readFileSync(inputPath, 'utf8');
  const out = execFileSync(
    nodeBin,
    ['--import', 'tsx', sol], // tsx 런타임로 TS 실행
    { input, encoding: 'utf8' },
  );

  if (!existsSync(outPath)) {
    // 기대값 없으면 비교 생략
    return { pass: true, out };
  }

  if (opts.exact) {
    const expected = readFileSync(outPath, 'utf8');
    return { pass: out === expected, out, expected };
  } else {
    const expected = normalize(readFileSync(outPath, 'utf8'));
    return { pass: normalize(out) === expected, out, expected };
  }
}

function diffSnippet(actual: string, expected: string) {
  const a = actual.replace(/\r\n/g, '\n').split('\n');
  const e = expected.replace(/\r\n/g, '\n').split('\n');
  const len = Math.max(a.length, e.length);
  for (let i = 0; i < len; i++) {
    if ((a[i] ?? '') !== (e[i] ?? '')) {
      return [`- expected[${i + 1}]: ${e[i] ?? ''}`, `+ actual  [${i + 1}]: ${a[i] ?? ''}`].join(
        '\n',
      );
    }
  }
  return '(no visible diff)';
}

function logResult(caseName: string, pass: boolean, out: string, expected?: string) {
  if (opts.silent) {
    // 조용 모드: 결과만 한 줄
    console.log(`${pass ? 'PASS' : 'FAIL'} ${basename(problemPath)}/${caseName}`);
    return;
  }
  if (pass) {
    console.log(`✅ PASS ${basename(problemPath)}/${caseName}`);
  } else {
    console.log(`❌ FAIL ${basename(problemPath)}/${caseName}`);
    if (expected != null) {
      console.log('---- diff ----');
      console.log(diffSnippet(out, expected));
      console.log('--------------');
    }
    console.log('---- actual stdout ----');
    process.stdout.write(out.endsWith('\n') ? out : out + '\n');
    console.log('-----------------------');
  }
}

try {
  if (opts.all) {
    const dir = join(problemPath, 'cases');
    const inputs = readdirSync(dir).filter((f) => f.endsWith('.in'));
    if (inputs.length === 0) {
      console.error(`No input cases (*.in) found in ${dir}`);
      process.exit(1);
    }
    let passCount = 0;
    for (const f of inputs) {
      const name = f.replace(/\.in$/, '');
      const { pass, out, expected } = runCase(name);
      logResult(name, pass, out, expected);
      if (pass) passCount++;
    }
    const ok = passCount === inputs.length;
    console.log(`\nSummary: ${passCount}/${inputs.length} passed`);
    process.exit(ok ? 0 : 1);
  } else {
    const caseName = caseNameOrFlag && !caseNameOrFlag.startsWith('-') ? caseNameOrFlag : '1';
    const { pass, out, expected } = runCase(caseName);
    logResult(caseName, pass, out, expected);
    process.exit(pass ? 0 : 1);
  }
} catch (e: any) {
  console.error('Runtime error:', e?.message ?? e);
  process.exit(1);
}
