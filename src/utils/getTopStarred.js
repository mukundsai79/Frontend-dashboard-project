//utility function that gets the top 5 starred repos

export const getTopStarred = (repos) => {
  let topStars = [];
  if (repos.length < 5) {
    topStars = repos
      .filter((repos) => repos.stargazers_count > 0) //filter out repos that have no stars
      .sort(function (a, b) {
        return b.stargazers_count - a.stargazers_count;
      });
  } else {
    topStars = repos
      .filter((repos) => repos.stargazers_count > 0) //filter out repos that have no stars
      .sort(function (a, b) {
        //sort in descending order
        return b.stargazers_count - a.stargazers_count;
      })
      .slice(0, 5); //get top 5
  }

  return topStars;
};
