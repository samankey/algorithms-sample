import { describe, it, expect } from 'vitest';
import { solution } from './solution';

describe('programmers 42576 완주하지 못한 선수', () => {
  it('case1', () => {
    expect(solution(['leo', 'kiki', 'eden'], ['eden', 'kiki'])).toBe('leo');
  });
  it('case2', () => {
    expect(
      solution(
        ['marina', 'josipa', 'nikola', 'vinko', 'filipa'],
        ['josipa', 'filipa', 'marina', 'nikola'],
      ),
    ).toBe('vinko');
  });
});
