$(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCXfDWHCanDsyVXCPJRnMkaXfJr1YnChxM",
    authDomain: "train-time-project-2943b.firebaseapp.com",
    databaseURL: "https://train-time-project-2943b.firebaseio.com",
    projectId: "train-time-project-2943b",
    storageBucket: "train-time-project-2943b.appspot.com",
    messagingSenderId: "594892675023"
  };
  firebase.initializeApp(config);

//Variable setup
var database = firebase.database();
var trainName = "";
var trainDestination = "";
var trainTime = "";
var trainFrequency = "";
var trainTimeConverted = "";
var diffTime = "";
var timeRemainder = "";
var trainMinutesAway = "";
var nextTrainTime = ""; 
var nextTrainTimeFormatted = "";
var currentTime = "";

$("#addTrain").on("click", function (event) {
    event.preventDefault();

    trainName = $("#name-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    trainTime = $("#time-input").val().trim();
    trainFrequency = $("#frequency-input").val().trim();

    // subtracting 1 day off of the current time to make sure its correct 
    trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "days");
    // my favorite function. the easy one. gets the current time. 
    currentTime = moment();
    // subtracting the current time by the converted time and storing that
    diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    // remainder of the difference in time per the frequency of the train
    timeRemainder = diffTime % trainFrequency;
    // figuring out how much time is left compared to now until the next train arrives
    trainMinutesAway = trainFrequency - timeRemainder;
    // need to add those minutes from the current time so it shows the current minutes away
    nextTrainTime = moment().add(trainMinutesAway, "minutes");
    // Formatting it in HH:mm
    nextTrainTimeFormatted = moment(nextTrainTime).format("HH:mm");

    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        trainTime: trainTime,
        trainFrequency: trainFrequency,
        nextTrainTimeFormatted: nextTrainTimeFormatted,
        trainMinutesAway: trainMinutesAway
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

}); // closes the on-click function

database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().trainDestination);
    console.log(childSnapshot.val().trainTime);
    console.log(childSnapshot.val().trainFrequency);


    // var employeeStartDateUniform = moment.unix(childSnapshot.val().startDate).format("MM/DD/YY");

    // var momentNow = moment().format(X);
    // console.log("momentNow" + momentNow);

    // var employeeMonthsWorked = moment().diff(moment.unix(childSnapshot.val().startDate, "X"), "months");
    // console.log(employeeMonthsWorked);

    // var employeeTotalBilled = employeeMonthsWorked * childSnapshot.val().startRate;
    // console.log(employeeTotalBilled);

    $("#trainTimes").append("<tr>" +
        "<td>" + childSnapshot.val().trainName + "</td>" +
        "<td>" + childSnapshot.val().trainDestination + "</td>" +
        "<td>" + childSnapshot.val().trainFrequency + "</td>" +
        "<td>" + childSnapshot.val().nextTrainTimeFormatted + "</td>" + // next arrival goes here - 
        "<td>" + childSnapshot.val().trainMinutesAway + "</td>" + // minutes away goes here 
        "</tr>");


}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

}); // document ready close out