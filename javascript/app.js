
 //"279156-PlayersD-TA0FFDNE";
var apiKey = "279156-PlayersD-B5WE9ZBL"; 
var queryURL = "https://tastedive.com/api/similar?q=red+hot+chili+peppers%2C+pulp+fiction&k=" + apiKey;

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
