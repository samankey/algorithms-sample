import { describe, it, expect } from "vitest";
import { solve } from "./solution";
import { multiline } from "../../../utils/test-helpers";

describe("BOJ 2178 미로 탐색", () => {
  it("sample", () => {
    const input = multiline`
      4 6
      101111
      101010
      101011
      111011
    `;
    const out = solve(input);
    expect(out.trim()).toBe("15");
  });
});
