$(function() {
  console.log('loaded');
  getDataFromApi();
});

function getDataFromApi() {
  //var Hooktheory_URL = 'https://api.hooktheory.com/v1/users/auth';
  var params = {
    url: 'https://api.hooktheory.com/v1/',
    type: 'POST',
    accepts: 'application/json',
    contentType: 'application/json',
    username: 'jdobrowner',
    password: 'Kepler22b',
    success: function(result) {
      console.log(result);
    }
  }
    $.ajax(params);
  }
