
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

var database = firebase.database();

// VARIABLES
var search = "";
var apiKey = "279156-PlayersD-B5WE9ZBL"; 
var queryURL;
var wikiURL;
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

      // Checking to see if user input returned. Then adding user input to firebase variables
      if(response.Similar.Results[0].Name) {
        console.log("valid search");
        database.ref().push(search);
      } else {
        console.log("not valid")
      }


      // Getting a random suggestion from the 20 returned results

    	var randResult = Math.floor(Math.random()*20);
    	console.log(randResult);
    	var pickedThing = response.Similar.Results[randResult].Name;
    	console.log(pickedThing);


//wikipedia api
        wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + pickedThing + "&limit=1&namespace=0&format=json";
        $.ajax({
          url: wikiURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
          //add the wiki response to the html
            $('#wiki').prepend("<h3>" + response[1][0] + "</h3><p>" + response[2][0] + "</p><a href='" + 
              response[3][0] + "' target='_blank'>" + response[3][0] + "</a>");

        })
      // Youtube API query

      var youTubeApiKey = "AIzaSyD5FZHeHpWCyo0-34E15x9TEmjf2smoFiU"; 
      var youTubeQueryURL = "https://www.googleapis.com/youtube/v3/search?q=" + pickedThing + "&key=" + youTubeApiKey + "&part=snippet"
      console.log(youTubeQueryURL);
      var outputVideo;

    $.ajax({
      url: youTubeQueryURL,
      method: "GET"
    }).done(function(response) {
        console.log(response);
    })
    })
// outputVideo = response...

  })



outputVideo ='<iframe width="854" height="480" src="https://www.youtube.com/embed/ETJmJsTbzM0" frameborder="0" allowfullscreen></iframe>';
$("#video").append(outputVideo);

//     var youTubeApiKey = "AIzaSyD5FZHeHpWCyo0-34E15x9TEmjf2smoFiU"; 
// var youTubeQueryURL = "https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=" + youTubeApiKey + "&part=snippet,contentDetails,statistics,status"
// console.log(youTubeQueryURL);
// 	$.ajax({
//       url: youTubeQueryURL,
//       method: "GET"
//     }).done(function(response) {
//     	console.log(response);
//     })
