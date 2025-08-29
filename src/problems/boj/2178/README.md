# BOJ 2178 미로 탐색
- 링크: https://www.acmicpc.net/problem/2178
- 유형: BFS
- 아이디어: (0,0)부터 BFS로 최단 거리(dist) 갱신 → (n-1,m-1) 도달 시 dist 반환
- 복잡도: O(n*m)
- 엣지: 시작/끝이 벽이 아닌지 확인, 방문 처리 중복 방지
