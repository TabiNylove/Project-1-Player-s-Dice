
var search = "";
var apiKey = "279156-PlayersD-B5WE9ZBL";

//=======
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
var search = "";
var apiKey = "279156-PlayersD-B5WE9ZBL"; 
var queryURL;

//==============================================================




 //"279156-PlayersD-TA0FFDNE";
 $(".button").on('click', function(event){
     event.preventDefault();

     // Retrieving user input

    search = $("#userInput").val().trim();
    console.log(search);

    // TasteDive API query

    queryURL = "https://tastedive.com/api/similar?q=" + search  + "&k=" + apiKey;
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      contentType: 'application/json; charset=utf-8',
      method: "GET"
    }).done(function(response) {

    	console.log(response);

      // Getting a random suggestion from the 20 returned results

    	var randResult = Math.floor(Math.random()*20);
    	console.log(randResult);
    	var pickedThing = response.Similar.Results[randResult].Name;
    	console.log(pickedThing);

      // Youtube API query

      var youTubeApiKey = "AIzaSyD5FZHeHpWCyo0-34E15x9TEmjf2smoFiU"; 
      var youTubeQueryURL = "https://www.googleapis.com/youtube/v3/search?q=" + pickedThing + "&key=" + youTubeApiKey + "&part=snippet,contentDetails,statistics,status"
      console.log(youTubeQueryURL);

    $.ajax({
      url: youTubeQueryURL,
      method: "GET"
    }).done(function(response) {
        console.log(response);
    })
    })


  })



//     var youTubeApiKey = "AIzaSyD5FZHeHpWCyo0-34E15x9TEmjf2smoFiU"; 
// var youTubeQueryURL = "https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=" + youTubeApiKey + "&part=snippet,contentDetails,statistics,status"
// console.log(youTubeQueryURL);
// 	$.ajax({
//       url: youTubeQueryURL,
//       method: "GET"
//     }).done(function(response) {
//     	console.log(response);
//     })
