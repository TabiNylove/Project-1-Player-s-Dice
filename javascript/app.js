  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDEncMpEGmZB-YzqtxpfuzxkXG1QvXRlGA",
    authDomain: "click-4bcad.firebaseapp.com",
    databaseURL: "https://click-4bcad.firebaseio.com",
    projectId: "click-4bcad",
    storageBucket: "click-4bcad.appspot.com",
    messagingSenderId: "1076834614283"
  };
  firebase.initializeApp(config);

// VARIABLES
var apiKey = "279156-PlayersD-B5WE9ZBL"; 
var queryURL = "https://tastedive.com/api/similar?q=red+hot+chili+peppers%2C+pulp+fiction&k=" + apiKey;

//==============================================================

 //"279156-PlayersD-TA0FFDNE";
console.log(queryURL);
	$.ajax({
      url: queryURL,
      contentType: 'application/json; charset=utf-8',
      method: "GET"
    }).done(function(response) {
    	console.log(response);
    })




//     var youTubeApiKey = "AIzaSyD5FZHeHpWCyo0-34E15x9TEmjf2smoFiU"; 
// var youTubeQueryURL = "https://tastedive.com/api/similar?q=red+hot+chili+peppers%2C+pulp+fiction=" + youTubeApiKey;
// console.log(youTubeQueryURL);
// 	$.ajax({
//       url: youTubeQueryURL,
//       method: "GET"
//     }).done(function(response) {
//     	console.log(response);
//     })
