import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  ENABLED_LOCALES,
  LOCALES,
  isEnabledLocale,
  isLocale,
} from "./locales";

describe("locales", () => {
  it("enables the default locale", () => {
    expect(ENABLED_LOCALES).toContain(DEFAULT_LOCALE);
  });

  it("only enables known locales", () => {
    for (const locale of ENABLED_LOCALES) {
      expect(LOCALES).toContain(locale);
    }
  });

  it("accepts supported locales only", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("bn")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("EN")).toBe(false);
    expect(isLocale("")).toBe(false);
  });

  it("treats a known but not yet enabled locale as not enabled", () => {
    expect(isEnabledLocale("en")).toBe(true);
    expect(isEnabledLocale("bn")).toBe(false);
    expect(isEnabledLocale("fr")).toBe(false);
  });
});
