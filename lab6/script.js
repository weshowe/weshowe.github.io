// These values are stored globally to generate a confirmation code later.
var serviceSelected = "";
var expertSelected = "";
var date = "";
var time = "";

var services = ["Spaying/Neutering","Vaccinations","Dentistry Services","Deworming","Checkup","General Surgery"];
var charge = ["$50.00","$100.00","$20.00","$10.00","$75.00","$150.00"];
var serviceFun = ["CHOPCHOP","POKEY","BYEBYETEETH","NOWORMS","BENDOVER","HANNIBAL"];
var experts = ["Dr. Doge", "Buttercup", "Pedro", "Scruffy"];
var expertCode = ["1337","80085","123","42"];

// This is used to selectively show or hide experts that can be selected depending on the service chosen.
function selectService() {

switch (serviceSelected) {
  case 0: //neutering
    $("#e1").css('display', 'block');
    $("#e4").css('display', 'block');
    break;
  case 1: //vaccination
    $("#e2").css('display', 'block');
    $("#e3").css('display', 'block');
    break;
  case 2: // dentistry
    $("#e1").css('display', 'block');
    $("#e4").css('display', 'block');
    break;
  case 3: // deworming
    $("#e2").css('display', 'block');
    $("#e3").css('display', 'block');
    break;
  case 4: // checkup
    $("#e1").css('display', 'block');
    $("#e2").css('display', 'block');
    break;
  case 5: // surgery
    $("#e1").css('display', 'block');
    break;
  default:
    break;
}

}

/* 
This site uses a Wizard pattern to handle appointment booking. It allows moving back and forth.

Each of the following functions controls the navigation so the wizard is at the correct point when it moves forward or back.

*/

// Controls the Next button on the first page (service selection -> expert choice)
function nextService() {

// We use hacky old school HTML for the error on this page because this form isn't sophisticated.
var err = document.getElementById('a1err');

if(!$("input[name='ser']").is(':checked')) {
    err.innerHTML="Please select a service";
    return;
}

// If we've selected a service, we can move forward. We pull the relevant data from the selected service, use it to update the next page, and move forward.
err.innerHTML = "";
serviceSelected = $('input[name="ser"]:checked').attr("id");
serviceSelected = parseInt(serviceSelected.substring(3,4)) - 1;

selectService();

$("#serSel").text(services[serviceSelected]);

$("#a1").css('display', 'none');
$("#a2").css('display', 'block');
}

// Controls the Go back button on the second page (expert choice -> service selection)
function prevExpert() {
$('input[name="ex"]:checked').prop('checked', false); //Uncheck the radio button.

// Hide all the radio buttons and the current page.
$("#a2").css('display', 'none');
$("#e1").css('display', 'none');
$("#e2").css('display', 'none');
$("#e3").css('display', 'none');
$("#e4").css('display', 'none');
$("#a1").css('display', 'block');
}

// Controls the next button on the second page (expert choice -> appointment making)
function nextExpert() {

var err = document.getElementById('a2err'); // More hacky HTML validation on the expert page, since it's just a radio button.


if(!$("input[name='ex']").is(':checked')) {
    err.innerHTML = "<br>You need to select an expert to perform the service.";
    return;
}

err.innerHTML = "";

//Load the expert so we can use it to determine a schedule.
var expert = "";
expert = $("input[name='ex']:checked").attr("id");
expert = parseInt(expert.substring(2,3)) - 1;
expertSelected = expert;

//This generates a datepicker. Each expert has a schedule that is used to build it. Although no additional validation was required here, I did constrain the input to the requried format of dd/mm/yyyy.
switch (expert) {
  case 0: //dr doge
  $( "#datepicker" ).datepicker({
    constrainInput: true,
    beforeShowDay: function(date) {
      
      var day = date.getDay();

      if (day == 0)
        return [false];
      if (day == 1)
        return [true];
      if (day == 2)
        return [false];
      if (day == 3)
        return [false];
      if (day == 4)
        return [false];
      if (day == 5)
        return [true];
      if (day == 6)
        return [false];
    }
    });
    break;
  case 1: //buttercup
  $( "#datepicker" ).datepicker({
    constrainInput: true,
    beforeShowDay: function(date) {
      
      var day = date.getDay();

      if (day == 0)
        return [false];
      if (day == 1)
        return [true];
      if (day == 2)
        return [true];
      if (day == 3)
        return [true];
      if (day == 4)
        return [true];
      if (day == 5)
        return [true];
      if (day == 6)
        return [true];
    }
    });
    break;
  case 2: //pedro
  $( "#datepicker" ).datepicker({
    constrainInput: true,
    beforeShowDay: function(date) {
      
      var day = date.getDay();

      if (day == 0)
        return [false];
      if (day == 1)
        return [true];
      if (day == 2)
        return [true];
      if (day == 3)
        return [true];
      if (day == 4)
        return [true];
      if (day == 5)
        return [true];
      if (day == 6)
        return [false];
    }
    });
    break;
  case 3: //scruffy
  $( "#datepicker" ).datepicker({
    constrainInput: true,
    beforeShowDay: function(date) {
      
      var day = date.getDay();

      if (day == 0)
        return [true];
      if (day == 1)
        return [true];
      if (day == 2)
        return [true];
      if (day == 3)
        return [true];
      if (day == 4)
        return [true];
      if (day == 5)
        return [true];
      if (day == 6)
        return [true];
    }
    });
    break;
  default:
    break;
}

// Load the next page.

$("#e1").css('display', 'none');
$("#e2").css('display', 'none');
$("#e3").css('display', 'none');
$("#e4").css('display', 'none');

$("#a2").css('display', 'none');
$("#a3").css('display', 'block');
}

// This controls the Go back button on the appointment page (appointment -> expert)
function prevApp() {

// We null the fields and destroy the datepicker so we can make a new one on the previous page.
$('#timey').val('');
$("#datepicker").datepicker('setDate', null);
$("#datepicker").datepicker("destroy");
document.getElementById('formA').classList.remove('was-validated');
$("#a3").css('display', 'none');
selectService(); // Service selection must be rerun to generate the previous page properly.
$("#a2").css('display', 'block');
}

// This controls the Next button on the appointment page (appointment -> payment details)
function nextApp() {

// We force the bootstrap validation here. Wizard will not advance if data has been entered incorrectly.
var f = document.getElementById('formA');
f.classList.add('was-validated');

if(!f.checkValidity()) {
    return;
}

// We load the selected values into the date an time variables for the confirmaton code. Next page is loaded.
time = $('#timey').val();
date = $('#datepicker').val();

var p = document.getElementById('chrg');
p.innerHTML = "You will be charged " + charge[serviceSelected] + " for " + services[serviceSelected] + ".<br>";

$("#a3").css('display', 'none');
$("#a4").css('display', 'block');

return;
}

// This controls the go back button on the payment page (payment -> appointment choice)
function prevPay() {

// We clear the inputs and remove the validation flag to prepare for next time.
$('#cc').val('');
$('#telly').val('');
document.getElementById('formB').classList.remove('was-validated');
var p = document.getElementById('chrg');
p.innerHTML = "";
$("#a4").css('display', 'none');
$("#a3").css('display', 'block');

return;
}

// This controls the Next button on the payment page (payment -> Confirmation).
function nextPay() {

//same as abvoe
var f = document.getElementById('formB');
f.classList.add('was-validated');

if(!f.checkValidity()) {
    return;
}

// We generate a nice big weird confirmation message and number here using the saved fields. The Wizard ends there.
var confString = "You're going for a fun appointment for " + services[serviceSelected] +" with " + experts[expertSelected] + " at " + time.toString() + " on " + date.toString() + "!<br><br>" + "Your confirmation number is: " + serviceFun[serviceSelected] + expertCode[expertSelected] + time.toString().replace(':','') + date.toString().replace('/','').replace('/','') + "<br><br>Please refresh the page if you want to book another appointment.";

document.getElementById("conf").innerHTML = confString;

$("#a4").css('display', 'none');
$("#a5").css('display', 'block');

return;
}

/*
This is used to select a service if we click a button next to a service on the description window.

We don't want to change the service selected if we've moved past the selection window, so this function checks for that and changes accordingly.
*/
function preselectServ(inNum) {

if($("#a1").css('display') !== "none") {
var inString = "#ser" + inNum.toString();
$(inString).prop('checked', true);
}

}
