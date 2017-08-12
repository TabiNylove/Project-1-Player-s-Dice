$("#results").hide();
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
var randResultPrev; // randResult before the last
var pickedThings = []; // response from tastedive associated with randResult 
var outputVideo; //
var loginState = false;
var data = [];
//==============================================================
// MODAL
// login modal
$("#toLogin").on("click", function() {
    $("#logModal").modal('show'); 
})
// register modal
$("#toRegi").on("click", function() {
    $("#regModal").modal('show');
})

//==============================================================
// TASTEDIVE
$(".button").on('click', function(event) {
    event.preventDefault();
    $("#results").show();
    $('#wiki').empty();
    $("#video").empty();
    // Retrieving user input
    search = $("#userInput").val().trim();
    console.log(search);
    // put input into the query
    queryURL = "https://tastedive.com/api/similar?q=" + search + "&k=" + apiKey;
    console.log(queryURL);

    // ajax call
    $.ajax({
            url: queryURL,
            contentType: 'application/json; charset=utf-8',
            method: "GET"
        }).done(function(response) {
            
        // response...
            // add search term to firebase
            // Check to see if user input exists, then add user input to firebase variables
            if (response.Similar.Results[0].Name) {
                console.log("valid search");
                database.ref().push(search);
            } else {
                console.log("not valid");
                console.log(response);
            }

            // Do this three times:  
            for (var i = 0; i < 3; i++) {

                // Get a random suggestion from the 20 returned results
                randResult = Math.floor(Math.random() * 20);
                // if number is repeated ...
                while (randResultPrev === randResult) {
                    //keep changing the number until it is not equal
                    randResult = Math.floor(Math.random() * 20);
                }
                // push the result to the 'pickedThings' array
                pickedThings.push(response.Similar.Results[randResult].Name);
                // set this result to prev for the next loop
                randResult = randResultPrev;
            }
            console.log("PickedThings: " + pickedThings);
//==============================================================
            for (var i = 0; i < pickedThings.length; i++) {
                wikiAPI(pickedThings[i]);
            }
        })
});
//==============================================================
// WIKIPEDIA FUNCTION
function wikiAPI(queryItem) {
  wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + queryItem + "&limit=1&namespace=0&format=json";
    $.ajax({
        url: wikiURL,
        method: "GET"
    }).done(function(response) {
        //add the wiki response to the html div 'wiki'
        $('#wiki').prepend("<div class='col col-6'><h3>" + response[1][0] + "</h3><p>" + response[2][0] + "</p><a href='" +
            response[3][0] + "' target='_blank'>" + response[3][0] + "</a></div>");
        //run the youtube function after the wiki
        youtubeAPI(queryItem);
    })
}
//==============================================================
// YOUTUBE FUNCTION
function youtubeAPI(queryItem) {
  youTubeApiKey = "AIzaSyD5FZHeHpWCyo0-34E15x9TEmjf2smoFiU";
  youTubeQueryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=" + queryItem + "&key=" + youTubeApiKey;
    $.ajax({
        url: youTubeQueryURL,
        method: "GET"
    }).done(function(response) {
        //set the iframe to a variable
        outputVideo = '<iframe width="300" height="230" src="https://www.youtube.com/embed/' +
            response.items[1].id.videoId + '"></iframe>';
        // append the iframe to the html <div> 'video'
        $("#video").prepend("<div class='video-container col col-6'>" + outputVideo + "</div>");
        // empty the pickedThings array
        pickedThings = [];
    })
}

//==============================================================
// // REGISTER NEW ID
$("#regiButton").on('click', function(event){
  event.preventDefault();

  var loginInfo = {
    userId : $("#REG-uid").val().trim(),
    password : $('#REG-password').val().trim()
}

  data.push(loginInfo);

  database.ref('users').set({
    uinfo: data
  });
  $("#regModal").modal('hide'); 
});

// //==============================================================
// // LOGIN

$("#loginButton").on('click', function(event){
  event.preventDefault();

  var loginInfo = {
    userId : $("#uid").val().trim(),
    password : $('#password').val().trim()
  }

  loginState = false;
  for (var i = 0; i < data.length; i++) {
  
    if (loginInfo.userId === data[i].email && loginInfo.password === data[i].password) {
      loginState = true;
    }
  }
$("#logModal").modal('hide');
  })