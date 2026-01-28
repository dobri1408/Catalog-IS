import { validCNP } from "./cnpValidator";

describe("validCNP", () => {
  test("returneaza false pentru CNP cu lungime diferita de 13", () => {
    expect(validCNP("123")).toBe(false);
    expect(validCNP("12345678901234")).toBe(false);
    expect(validCNP("")).toBe(false);
  });

  test("returneaza false pentru CNP cu caractere non-numerice", () => {
    expect(validCNP("123456789012a")).toBe(false);
    expect(validCNP("abcdefghijklm")).toBe(false);
  });

  test("returneaza false pentru CNP cu prima cifra 0", () => {
    expect(validCNP("0234567890123")).toBe(false);
  });

  test("valideaza un CNP corect", () => {
    expect(validCNP("1990101123450")).toBe(true);
  });

  test("returneaza false pentru CNP cu checksum gresit", () => {
    expect(validCNP("1990101123459")).toBe(false);
  });
});
