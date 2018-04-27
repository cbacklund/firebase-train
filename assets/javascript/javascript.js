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

$("#addEmployee").on("click", function (event) {

    event.preventDefault();

    trainName = $("#name-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    trainTime = moment($("#time-input").val().trim(), "HH:mm").subtract(1, "days");
    trainFrequency = $("#frequency-input").val().trim();

    var currentTime = moment();
    diffTime = moment().diff(moment(trainTime), "minutes");
    timeRemainder = diffTime % trainFrequency;
    minutesUntilTrain = trainFrequency - timeRemainder;
    nextTrainTime = moment().add(minutesUntilTrain, "minutes");
    // Formatting it in HH:mm
    nextTrainTimeFormatted = moment(nextTrainTime).format("HH:mm");

    database.ref().push({
        name: trainName,
        dest: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().dest);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().frequency);


    // var employeeStartDateUniform = moment.unix(childSnapshot.val().startDate).format("MM/DD/YY");

    // var momentNow = moment().format(X);
    // console.log("momentNow" + momentNow);

    // var employeeMonthsWorked = moment().diff(moment.unix(childSnapshot.val().startDate, "X"), "months");
    // console.log(employeeMonthsWorked);

    // var employeeTotalBilled = employeeMonthsWorked * childSnapshot.val().startRate;
    // console.log(employeeTotalBilled);

    var nextArrival = 10;
    var minutesAway = 5;

    $("#trainTimes").append("<tr>" +
        "<td>" + childSnapshot.val().name + "</td>" +
        "<td>" + childSnapshot.val().dest + "</td>" +
        "<td>" + childSnapshot.val().frequency + "</td>" +
        "<td>" + nextArrival + "</td>" + // next arrival goes here - 
        "<td>" + minutesAway + "</td>" + // minutes away goes here 
        "</tr>");

    //console.log(moment(convertedDate).diff(moment(), "months"));
    //var empStartPretty = moment.unix(startDate).format("MM/DD/YYY");

    //var empMonths = moment()

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

//database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
//    $("#tableEmployeMonthWorkedR").text(snapshot.val().name);
//    $("#tableEmployeRoleR").text(snapshot.val().role);
//    $("#tableEmployeStartDateR").text(snapshot.val().startDate);
//    $("#tableEmployeStartRateR").text(snapshot.val().startRate);
//});

}); // document ready close out