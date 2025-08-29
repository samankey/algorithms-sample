/**
 * BOJ 등 stdin 파싱 보조 유틸
 */
export const toLines = (input: string) => input.trim().split(/\r?\n/);
export const toNums = (line: string) => line.trim().split(/\s+/).map(Number);
