const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`; //optional

async function getProfile(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  return response.json();
}

async function getRepos(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
  return response.json();
}

function getStarCount(repos) {
  return repos.reduce((count, {
    stargazers_count
  }) => count + stargazers_count, 0);
}

function calculateScore({
  followers
}, repos) {
  return followers * 3 + getStarCount(repos);
}

function handleError(error) {
  console.warn(error);
  return null;
}

async function getUserData(player) {
  //what .all does is when all of the promises in the array are resloved, 
  //.then will be called
  const [profile, repos] = await Promise.all([getProfile(player), getRepos(player)]);
  return {
    profile,
    score: calculateScore(profile, repos),
  }
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}
//anytime we want to interact with the external api inside of our project,
//we are going to have a bunch of methods here we can call in order to do that
export async function battle(players) {
  try {
    const result = await Promise.all(players.map(getUserData))
    return sortPlayers(result);
  } catch (error) {
    handleError(error);
  }
}
export async function fetchPopularRepos(language) {
  const encodedURI = window
    .encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
  const response = await fetch(encodedURI)
    .catch(handleError);
  const repos = await response.json();
  return repos.items;
}