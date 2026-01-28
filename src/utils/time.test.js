import { commentPostedTime } from "./time";

describe("commentPostedTime", () => {
  test("returneaza 'secunde' pentru sub 60 secunde", () => {
    expect(commentPostedTime(5000)).toBe("secunde");
    expect(commentPostedTime(30000)).toBe("secunde");
  });

  test("returneaza minute pentru 1-59 minute", () => {
    expect(commentPostedTime(60000 * 5)).toBe("5 min");
    expect(commentPostedTime(60000 * 30)).toBe("30 min");
  });

  test("returneaza ore pentru 1-23 ore", () => {
    expect(commentPostedTime(1000 * 60 * 60 * 3)).toBe("3 ore");
  });

  test("returneaza zile pentru 1-6 zile", () => {
    expect(commentPostedTime(1000 * 60 * 60 * 24 * 3)).toBe("3 zile");
  });

  test("returneaza saptamani pentru 1-3 saptamani", () => {
    expect(commentPostedTime(1000 * 60 * 60 * 24 * 14)).toBe("2 saptamani");
  });
});
