import {
  formatDate,
  getMaterieColor,
  renderClassName,
  blobToFile,
  RetriveImageUrl,
} from "./index";

describe("formatDate", () => {
  test("formateaza data cu zero-padding", () => {
    expect(formatDate(new Date(2024, 0, 5))).toBe("05.01");
    expect(formatDate(new Date(2024, 11, 25))).toBe("25.12");
  });

  test("formateaza data fara zero-padding cand nu e nevoie", () => {
    expect(formatDate(new Date(2024, 9, 15))).toBe("15.10");
  });
});

describe("getMaterieColor", () => {
  test("returneaza o culoare hex valida", () => {
    expect(getMaterieColor(0)).toMatch(/^#[0-9A-Fa-f]+$/);
    expect(getMaterieColor(5)).toMatch(/^#[0-9A-Fa-f]+$/);
  });

  test("cicleaza culorile cu modulo", () => {
    expect(getMaterieColor(0)).toBe(getMaterieColor(16));
    expect(getMaterieColor(1)).toBe(getMaterieColor(17));
  });
});

describe("renderClassName", () => {
  test("returneaza -transferat- pentru undefined", () => {
    expect(renderClassName(undefined)).toBe(" -transferat- ");
  });

  test("formateaza clasa Pregatitoare", () => {
    expect(
      renderClassName({ anClasa: "Pregătitoare", identificator: "A" })
    ).toBe("Pregătitoare A");
  });

  test("formateaza clasa I", () => {
    expect(renderClassName({ anClasa: "I", identificator: "B" })).toBe("I B");
  });

  test("formateaza clasa normala cu identificator", () => {
    expect(renderClassName({ anClasa: "V", identificator: "D" })).toBe(
      "a V-a D"
    );
  });

  test("formateaza clasa normala fara identificator", () => {
    expect(renderClassName({ anClasa: "V", identificator: "" })).toBe("a V-a");
    expect(renderClassName({ anClasa: "V", identificator: " " })).toBe(
      "a V-a"
    );
  });
});

describe("blobToFile", () => {
  test("adauga name si lastModifiedDate pe blob", () => {
    const blob = new Blob(["test"]);
    const result = blobToFile(blob, "test.txt");
    expect(result.name).toBe("test.txt");
    expect(result.lastModifiedDate).toBeInstanceOf(Date);
  });
});

describe("RetriveImageUrl", () => {
  test("returneaza un URL valid", () => {
    expect(RetriveImageUrl(0)).toContain("https://");
  });

  test("cicleaza URL-urile cu modulo", () => {
    expect(RetriveImageUrl(0)).toBe(RetriveImageUrl(18));
  });
});
