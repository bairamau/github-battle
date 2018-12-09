var axios = require('axios');


module.exports = {
  //anytime we want to interact with the external api inside of our project,
  //we are going to have a bunch of methods here we can call in order to do that
  fetchPopularRepos: function(language) {
    var encodedURI = window
    .encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'
    +language+'&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
    .then(function(response){
      return response.data.items;
    })
  }
}