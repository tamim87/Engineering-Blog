import { describe, expect, it } from "vitest";
import { absoluteUrl, getSiteUrl } from "./site";

describe("getSiteUrl", () => {
  it("strips trailing slashes", () => {
    expect(getSiteUrl("https://example.com/")).toBe("https://example.com");
    expect(getSiteUrl("https://example.com///")).toBe("https://example.com");
  });

  it("falls back to localhost when unset or blank", () => {
    expect(getSiteUrl("")).toBe("http://localhost:3000");
    expect(getSiteUrl("   ")).toBe("http://localhost:3000");
  });
});

describe("absoluteUrl", () => {
  const origin = "https://example.com";

  it("joins origin and path", () => {
    expect(absoluteUrl("/blog", origin)).toBe("https://example.com/blog");
    expect(absoluteUrl("blog", origin)).toBe("https://example.com/blog");
  });

  it("returns the bare origin for the root path", () => {
    expect(absoluteUrl("/", origin)).toBe("https://example.com");
  });
});
