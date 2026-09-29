import { describe, expect, it } from "vitest";
import { absoluteUrl, getSiteUrl, localizedPath } from "./site";

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

describe("localizedPath", () => {
  it("returns the locale root for the root path", () => {
    expect(localizedPath("en")).toBe("/en");
    expect(localizedPath("en", "/")).toBe("/en");
  });

  it("prefixes nested paths with the locale", () => {
    expect(localizedPath("bn", "/blog")).toBe("/bn/blog");
    expect(localizedPath("en", "blog/post")).toBe("/en/blog/post");
  });
});
