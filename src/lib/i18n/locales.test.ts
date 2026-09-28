import { describe, expect, it } from "vitest";
import { DEFAULT_LOCALE, LOCALES, isLocale } from "./locales";

describe("locales", () => {
  it("includes the default locale", () => {
    expect(LOCALES).toContain(DEFAULT_LOCALE);
  });

  it("accepts supported locales only", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("bn")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("EN")).toBe(false);
    expect(isLocale("")).toBe(false);
  });
});
