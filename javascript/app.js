
var search = "";
var apiKey = "279156-PlayersD-B5WE9ZBL";

//==============================================================
// FIREBASE
  var config = {
    apiKey: "AIzaSyDEncMpEGmZB-YzqtxpfuzxkXG1QvXRlGA",
    authDomain: "click-4bcad.firebaseapp.com",
    databaseURL: "https://click-4bcad.firebaseio.com",
    projectId: "click-4bcad",
    storageBucket: "click-4bcad.appspot.com",
    messagingSenderId: "1076834614283"
  };

firebase.initializeApp(config);

var database = firebase.database();
//==============================================================
// VARIABLES
var search = ""; // this is the user input in the form
var apiKey = "279156-PlayersD-B5WE9ZBL"; // key for tastedive
var queryURL; // basic URL for tastedive api
var wikiURL; // basic URL for wiki api
var youTubeApiKey; // key for youtube
var youTubeQueryURL; // basic URL for youtube api
var randResult; // random number that picks from the tastedive array
var pickedThing; // response from tastedive associated with randResult 
var outputVideo; //
//==============================================================
// TASTEDIVE

 $(".button").on('click', function(event){
     event.preventDefault();

    // Retrieving user input
    search = $("#userInput").val().trim();
    console.log(search);
    // put input into the query
    queryURL = "https://tastedive.com/api/similar?q=" + search  + "&k=" + apiKey;
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      contentType: 'application/json; charset=utf-8',
      method: "GET"
    }).done(function(response) {
      // console tastedive object
    	console.log(response);
      // add search to term to firebase
      // Check to see if user input exists, then add user input to firebase variables
      if(response.Similar.Results[0].Name) {
        console.log("valid search");
        database.ref().push(search);
      } else {
        console.log("not valid")
      }
      // Get a random suggestion from the 20 returned results
    	randResult = Math.floor(Math.random()*20);
    	console.log(randResult);
    	pickedThing = response.Similar.Results[randResult].Name;
    	console.log(pickedThing);
//==============================================================
// WIKIPEDIA
        wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + pickedThing + "&limit=1&namespace=0&format=json";
        $.ajax({
          url: wikiURL,
          method: "GET"
        }).done(function(response) {
          //console the array
          console.log(response);
          //add the wiki response to the html div 'wiki'
            $('#results').prepend("<div class='col col-4'><h3>" + response[1][0] + "</h3><p>" + response[2][0] + "</p><a href='" + 
              response[3][0] + "' target='_blank'>" + response[3][0] + "</a></div>");

        })
//==============================================================
// YOUTUBE
      youTubeApiKey = "AIzaSyD5FZHeHpWCyo0-34E15x9TEmjf2smoFiU"; 
      youTubeQueryURL = "https://www.googleapis.com/youtube/v3/search?q=" + pickedThing + "&key=" + youTubeApiKey + "&part=snippet"

      $.ajax({
        url: youTubeQueryURL,
        method: "GET"
      }).done(function(response) {
          console.log(response.items[1].id.videoId);
          outputVideo ='<iframe width="520" height="480" src="https://www.youtube.com/embed/' 
          + response.items[1].id.videoId + '"></iframe>';
          // append the video to the html <div> 'video'
          $("#results").prepend("<div class='col col-6'>" + outputVideo + "</div>");
          //$("#video").prepend(outputVideo);
      })
    })
//==============================================================
// outputVideo = response...
    
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
