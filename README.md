# algorithms

프론트엔드 **알고리즘 풀이 레포** 템플릿입니다.

## 사용법

```bash
# 설치
- package-lock.json 없을 때
npm i
- package-lock.json 있을 때
npm ci

# 새 문제 스캐폴딩
npm run new -- <platform> <id>
# 예) npm run new -- boj 2178
# 예) npm run new -- programmers 42576

# BOJ 표준입력 케이스 실행
- 한 케이스 실행 + 비교
npm run run -- src/problems/boj/2178
- 모든 케이스 일괄 실행 + 요약
npm run run -- src/problems/boj/2178 --all
- 공백까지 엄격 비교 / 조용히 결과만
npm run run -- src/problems/boj/2178 --all --exact --silent

# 테스트 실행
npm test

# 워치 모드
npm run dev
```

## 디렉터리 규칙

- `src/problems/<platform>/<id>/`
  - `solution.ts` : 풀이 소스 (가능하면 `solve()` 형태)
  - `index.test.ts`: 테스트 (Vitest)
  - `README.md` : 링크/유형/아이디어/복잡도/엣지 정리
  - `cases/*.in|*.out` (BOJ 등 stdin 기반일 때 샘플 케이스)

## 커밋 컨벤션 예시

```
feat(boj/graph): 2178 미로 탐색 BFS
fix(programmers/hash): 42576 중복 키 처리 수정
docs(boj): 2178 풀이 아이디어 보완
refactor(dp): 삼각형 DP 점화식 간소화
test(two-pointers): 부분합 엣지케이스 추가
```
