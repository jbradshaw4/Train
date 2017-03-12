

 <!--Link to Firebase-->

  // Initialize Firebase
 "https://www.gstatic.com/firebasejs/3.7.1/firebase.js"
var config = {
    apiKey: "AIzaSyBAPT2poyRwgmj14cmI22Hyjqrgz4uWV5o",
    authDomain: "train-hw-a7fee.firebaseapp.com",
    databaseURL: "https://train-hw-a7fee.firebaseio.com",
    storageBucket: "train-hw-a7fee.appspot.com",
    messagingSenderId: "482287653109"
  };
  firebase.initializeApp(config);

var database = firebase.database();


    var trainName = "";
    var destination = "";
    var firstTrain = "";
    var frequency = "";

    // Capture Button Click
$("#addTrain").on("click", function() {
     
      event.preventDefault();
      console.log(click);
     
      trainName = $('#trainName-input').val().trim();
      destination = $('#destination-input').val().trim();
      firstTrain = $('#firstTrain-input').val().trim();
      frequency = $('#frequency-input').val().trim();
      // Code in the logic for storing and retrieving the most recent user.
      database.ref().set({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
      });
      

    });

    
    database.ref().on("value", function(snapshot){
      console.log (snapshot.val());

      $('#trainName-display').html(snapshot.val().trainName);
      $('#destination-display').html(snapshot.val().destination);
      $('#firstTrain-display').html(snapshot.val().firstTrain);
      $('#frequency-display').html(snapshot.val().frequency);
      
    });