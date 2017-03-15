

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
    var firstTimeConverted = "";
    var getKey = "";

    // Capture Button Click

$("#addTrain").on("click", function() {
     
      event.preventDefault();


      trainName = $('#trainName-input').val().trim();

      destination = $('#destination-input').val().trim();
      firstTrainTime = $('#firstTrain-input').val().trim();
      frequency = $('#frequency-input').val().trim();
      firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
      currentTime = moment();
      diffTime = currentTime.diff(moment(firstTimeConverted),"minutes");
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

      $('#trainName-input').val("");
      $('#destination-input').val("");
      $('#firstTrain-input').val("");
      $('#frequency-input').val("");

      return false;
      

    });

    
    database.ref().on("child_added", function(childSnapshot){
      console.log(childSnapshot.val);

      /*$(".table-striped").append(
        "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>"
         + frequency + "</td><td>" + nextTrainFormatted + "</td><td>"
          + minutesTillTrain + "</td></tr>");*/
       $('.table-striped').append("<tr class='table-row' id=" + "'" + childSnapshot.key + "'" + ">" +
               "<td>" + childSnapshot.val().trainName +
               "</td>" +
               "<td>" + childSnapshot.val().destination +
               "</td>" +
               "<td>" + childSnapshot.val().frequency +
               "</td>" +
               "<td>" + childSnapshot.val().nextTrainFormatted + // Next Arrival Formula ()
               "</td>" +
               "<td>" + childSnapshot.val().minutesTillTrain + // Minutes Away Formula
               "</td>" +
               "<td>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");   

      
    }, function(errorObject){
      
    });

$(".table-striped").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().parent().attr('id');
     database.ref().child(getKey).remove();
});
console.log("click");
        





    