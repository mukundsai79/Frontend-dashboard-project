//Test the getTopStarred function that is used to return the top 5 starred repos

import { getTopStarred } from "../utils/getTopStarred";

describe("getTopStarred", () => {
  it("returns the top 5 repositories with the highest star count", () => {
    const testRepos = [
      { stargazers_count: 100 },
      { stargazers_count: 2 },
      { stargazers_count: 25 },
      { stargazers_count: 44 },
      { stargazers_count: 70 },
      { stargazers_count: 12345 },
      { stargazers_count: 5 },
    ];

    const result = getTopStarred(testRepos);
    expect(result).toHaveLength(5); //should only return top 5

    //test array results
    expect(result[0].stargazers_count).toBe(12345);
    expect(result[1].stargazers_count).toBe(100);
    expect(result[2].stargazers_count).toBe(70);
    expect(result[3].stargazers_count).toBe(44);
    expect(result[4].stargazers_count).toBe(25);
  });

  it("returns all the repositories with stars is there are less than 5 repositories", () => {
    const testRepos = [
      { stargazers_count: 100 },
      { stargazers_count: 2 },
      { stargazers_count: 25 },
    ];

    const result = getTopStarred(testRepos);
    expect(result).toHaveLength(3); //should return all repos

    //test array results
    expect(result[0].stargazers_count).toBe(100);
    expect(result[1].stargazers_count).toBe(25);
    expect(result[2].stargazers_count).toBe(2);
  });

  it("returns all repositories with stars if there are less than 5 repositories with stars", () => {
    const testRepos = [
      { stargazers_count: 100 },
      { stargazers_count: 0 },
      { stargazers_count: 2 },
      { stargazers_count: 0 },
      { stargazers_count: 25 },
      { stargazers_count: 0 },
    ];

    const result = getTopStarred(testRepos);
    expect(result).toHaveLength(3);

    //test array results
    expect(result[0].stargazers_count).toBe(100);
    expect(result[1].stargazers_count).toBe(25);
    expect(result[2].stargazers_count).toBe(2);
  });

  it("returns an empty array if none of the repositories are starred", () => {
    const testRepos = [
      { stargazers_count: 0 },
      { stargazers_count: 0 },
      { stargazers_count: 0 },
    ];

    const result = getTopStarred(testRepos);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it("returns an empty array is there are no repositories", () => {
    const testRepos = [];

    const result = getTopStarred(testRepos);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
});
