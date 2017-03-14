

 <!--Link to Firebase-->

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB0J7r0p43Ej85EDnjZUHSJn_86LNDVUjw",
    authDomain: "train-37953.firebaseapp.com",
    databaseURL: "https://train-37953.firebaseio.com",
    storageBucket: "train-37953.appspot.com",
    messagingSenderId: "530090049424"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


    var trainName = "";
    var destination = "";
    var firstTrainTime = "";
    var frequency = "";
    var nextTrain = "";
    var nextTrainFormatted = "";
    var currentTime = "";
    var diffTime = "";
    var tRemainder = "";
    var minutesTillTrain = "";

    // Capture Button Click

$("#addTrain").on("click", function() {
     
      event.preventDefault();

      trainName = $('#trainName-input').val().trim();
      destination = $('#destination-input').val().trim();
      firstTrainTime = $('#firstTrain-input').val().trim();
      frequency = $('#frequency-input').val().trim();
      currentTime = moment();
      diffTime = currentTime.diff(moment(),"minutes");
      tRemainder = nextTrain - currentTime;
      tRemainder = diffTime % frequency;
      minutesTillTrain = frequency - tRemainder;
      nextTrain = moment().add(minutesTillTrain, "minutes");
      nextTrainFormatted = moment(nextTrain).format("HH:mm");

     console.log("current time "+ currentTime);
     console.log("firstTtime " +firstTrainTime);
     console.log("freq "+frequency);
     console.log("diffTime "+ diffTime);
     console.log("min minutesTillTrain "+ minutesTillTrain);
     console.log("next"+nextTrainFormatted);



      // Code for storing and retrieving train inputs
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        nextTrainFormatted: nextTrainFormatted,
        minutesTillTrain: minutesTillTrain
      });
      

    });

    
    database.ref().on("value", function(snapshot){
      console.log(snapshot.val);

      $(".table-striped").append(
        "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>"
         + frequency + "</td><td>" + nextTrainFormatted + "</td><td>"
          + minutesTillTrain + "</td></tr>");
          


        
      /*$('#trainName-display').html(snapshot.val().trainName);
      $('#destination-display').html(snapshot.val().destination);
      $('#frequency-display').html(snapshot.val().frequency);
      $('#nextArrival-display').html(snapshot.val().nextTrainFormatted);
      $('#minutesAway').html(snapshot.val().minutesTillTrain);*/

      
    });


        





    