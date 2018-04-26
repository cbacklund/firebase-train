<script src="https://www.gstatic.com/firebasejs/4.13.0/firebase.js"></script>
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

//Variable
var database = firebase.database();
var trainName = "";
var trainDestination = "";
var trainTime = "";
var trainFrequency = "";
//var employeeMonthsWorked = "";
//var employeeTotalBilled = "";
//var employeeStartDateUniform = "";
//var dateFormat = "YYYY-MM-DD";
//var convertedDate = moment(employeeStartDate, dateFormat);

$("#addEmployee").on("click", function (event) {

    event.preventDefault();

    trainName = $("#name-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
    trainFrequency = $("#frequency-input").val().trim();

    database.ref().push({
        name: trainName,
        dest: trainDestination,
        time: trainTime,
        frequency: trainFrequency
        //        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().dest);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().frequency);


    var employeeStartDateUniform = moment.unix(childSnapshot.val().startDate).format("MM/DD/YY");

    var momentNow = moment().format(X);
    console.log(momentNow);

    var employeeMonthsWorked = moment().diff(moment.unix(childSnapshot.val().startDate, "X"), "months");
    console.log(employeeMonthsWorked);

    var employeeTotalBilled = employeeMonthsWorked * childSnapshot.val().startRate;
    console.log(employeeTotalBilled);

    $("#trainTimes").append("<tr>" +
        "<td>" + childSnapshot.val().name + "</td>" +
        "<td>" + childSnapshot.val().dest + "</td>" +
        "<td>" + childSnapshot.val().frequency + "</td>" +
        "<td>" + employeeStartDateUniform + "</td>" + // next arrival goes here - 
        "<td>" + employeeMonthsWorked + "</td>" + // minutes away goes here 
        "<td>" + childSnapshot.val().startRate + "</td>" +
        "<td>" + employeeTotalBilled + "</td>" +
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