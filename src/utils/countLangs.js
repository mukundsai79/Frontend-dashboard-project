//utility function to test

export const countLangs = (repos) => {
  const langCount = {}; //create object to store number of times language appears
  repos.forEach((repo) => {
    if (repo.language && !langCount[repo.language]) {
      langCount[repo.language] = 1;
    } else if (langCount[repo.language]) {
      langCount[repo.language] += 1;
    }
  });
  return langCount;
};
