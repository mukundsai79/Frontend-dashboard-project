//Test the langCount function that is used to count the number of languages
//in all of a users repositories

import { countLangs } from "../utils/countLangs";

describe("countLangs", () => {
  it("counts the top language of each repository", () => {
    const testRepos = [
      { language: "Python" },
      { language: "Python" },
      { language: "C" },
      { language: "JavaScript" },
    ];

    const result = countLangs(testRepos);

    expect(result).toEqual({
      Python: 2,
      C: 1,
      JavaScript: 1,
    });
  });

  it("ignores repositories with no language specified", () => {
    const testRepos = [
      { language: "Python" },
      { language: null },
      { language: "C" },
      { language: null },
      { language: "JavaScript" },
    ];

    const result = countLangs(testRepos);

    expect(result).toEqual({
      Python: 1,
      C: 1,
      JavaScript: 1,
    });
  });
});
