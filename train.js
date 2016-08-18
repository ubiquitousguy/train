
// 1. Initialize Firebase
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBSx1zg9oZCZXq9iNQTiKQGLeXvYCjR9J8",
  authDomain: "traintable-398e3.firebaseapp.com",
  databaseURL: "https://traintable-398e3.firebaseio.com",
  storageBucket: "traintable-398e3.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

currentTime = moment().format('hh:mm a');
$('#currentTime').text(currentTime);
  // Button for adding Trains
  $('#addTrainBtn').on('click', function(){

    //Grabs user input
    var tName = $("#trainNameInput").val().trim();
    var tDestination = $('#destinationInput').val().trim();
    var tTime = moment($("#timeInput").val().trim(), "HH/mm").format("LT");
    var tFreq = $('#freqInput').val().trim();

    // Create local 'temporary' object for holding train data
    var newTrain = {
        name: tName,
        dest: tDestination,
        time: tTime,
        freq: tFreq
    }


//code for the push
//Uploads train data to the database
database.ref().push(newTrain);

// Logs everything to console
console.log(newTrain.name);
console.log(newTrain.dest);
console.log(newTrain.time);
console.log(newTrain.freq);


//Clears all of the text-boxes
$('#trainNameInput').val('');
$('#destinationInput').val('');
$('#timeInput').val('');
$('#freqInput').val('');
//Prevents moving to a new page
return false;

});

// Creates Firebase even for adding train to the database and a row in the html when a user adds an entry
 database.ref().on('child_added', function(childSnapshot, prevChildKey) {
   console.log(childSnapshot.val());

   //Stores everything into a variable
   var tName = childSnapshot.val().name;
   var tDest = childSnapshot.val().dest;
   var tTime = childSnapshot.val().time;
   var tFreq = childSnapshot.val().freq;

   // Employee info
   console.log(tName);
   console.log(tDest);
   console.log(tTime);
   console.log(tFreq);

   var firstTime = "11:50";

   // First time converted
   var firstTime = moment(firstTime, "hh:mm").subtract(1, "years");
   console.log(firstTime);

   // Difference between times
   var diffTime = moment().diff(moment(firstTime), "minutes");
   console.log("DIFFERENCE BETWEEN TIME: " + diffTime);

   var tRemainder = diffTime % tFreq;
   console.log("REMAINDER: " + tRemainder);

   // Minutes Away
   var minutesAway = tFreq - tRemainder;
   console.log("Mintues til next train: " + minutesAway);

   // Next Arrival
   var nextArrival = moment().add(minutesAway, "minutes");
   console.log("Arrival Time: " + moment(nextArrival).format("hh:mm a"));

   // Add each train's data into the table
   $("#timeTable > tbody").append('<tr><td>' + tName + '</td><td>' + tDest + '</td><td>' + tFreq + " mins" + '</td><td>' + moment(nextArrival).format("hh:mm a") + '</td><td>' + minutesAway + " mins" + '</td></tr>');

 });
