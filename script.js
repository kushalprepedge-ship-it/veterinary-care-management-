/* LOGIN */

function login(){

let user =
document.getElementById("username").value;

let pass =
document.getElementById("password").value;

if(user === "admin" && pass === "admin123")
{
window.location = "dashboard.html";
}
else
{
document.getElementById("error").innerText =
"Invalid Username or Password";
}

}


/* LOGOUT */

function logout(){

window.location = "index.html";

}


/* SHOW SECTION */

function showSection(id){

let sections =
document.querySelectorAll(".section");

sections.forEach(section=>{

section.style.display = "none";

});

document.getElementById(id).style.display =
"block";

}


/* OPEN DASHBOARD */

window.onload = function(){

showSection("home");

disablePastDates();

}


/* COUNTS */

let doctorCount = 0;
let appointmentCount = 0;
let petCount = 0;


/* ADD DOCTOR */

function addDoctor(e){

e.preventDefault();

let name =
document.getElementById("doctorName").value;

let specialization =
document.getElementById("specialization").value;

let phone =
document.getElementById("doctorPhone").value;

if(phone.length !== 10)
{
alert("Enter valid 10 digit number");
return;
}

let table =
document.getElementById("doctorTable");

let row = table.insertRow();

row.insertCell(0).innerText = name;
row.insertCell(1).innerText = specialization;
row.insertCell(2).innerText = phone;

row.insertCell(3).innerHTML =
'<button onclick="deleteDoctor(this)">Delete</button>';

doctorCount++;

document.getElementById("doctorCount").innerText =
doctorCount;

e.target.reset();

}


/* DELETE DOCTOR */

function deleteDoctor(btn){

btn.parentElement.parentElement.remove();

doctorCount--;

document.getElementById("doctorCount").innerText =
doctorCount;

}


/* ADD APPOINTMENT */

function addAppointment(e){

e.preventDefault();

let client =
document.getElementById("clientName").value;

let phone =
document.getElementById("clientPhone").value;

let pet =
document.getElementById("petType").value;

let date =
document.getElementById("appointmentDate").value;

let time =
document.getElementById("appointmentTime").value;


if(phone.length !== 10)
{
alert("Enter valid 10 digit number");
return;
}


/* APPOINTMENT TABLE */

let table =
document.getElementById("appointmentTable");

let row = table.insertRow();

row.insertCell(0).innerText = client;
row.insertCell(1).innerText = phone;
row.insertCell(2).innerText = pet;
row.insertCell(3).innerText = date;
row.insertCell(4).innerText = time;

row.insertCell(5).innerHTML =
'<span style="color:orange;">Pending</span>';

row.insertCell(6).innerHTML =
`
<button onclick="completeAppointment(this)">
Complete
</button>

<button onclick="rescheduleAppointment(this)">
Reschedule
</button>

<button onclick="callClient('${phone}')">
Call
</button>

<button onclick="deleteAppointment(this)">
Delete
</button>
`;


/* UPDATE COUNT */

appointmentCount++;

document.getElementById("appointmentCount").innerText =
appointmentCount;


/* DASHBOARD RECENT TABLE */

let recent =
document.getElementById("recentAppointmentTable");

let recentRow = recent.insertRow();

recentRow.insertCell(0).innerText = client;
recentRow.insertCell(1).innerText = phone;
recentRow.insertCell(2).innerText = pet;

recentRow.insertCell(3).innerText =
date + " " + time;

recentRow.insertCell(4).innerHTML =
'<span style="color:orange;">Pending</span>';

e.target.reset();

}


/* COMPLETE */

function completeAppointment(btn){

let row =
btn.parentElement.parentElement;

row.cells[5].innerHTML =
'<span style="color:lightgreen;">Completed</span>';

}


/* RESCHEDULE */

function rescheduleAppointment(btn){

let newDate =
prompt("Enter new date (yyyy-mm-dd)");

let newTime =
prompt("Enter new time");

if(newDate && newTime)
{
let row =
btn.parentElement.parentElement;

row.cells[3].innerText = newDate;
row.cells[4].innerText = newTime;

alert("Appointment Rescheduled");
}

}


/* DELETE APPOINTMENT */

function deleteAppointment(btn){

btn.parentElement.parentElement.remove();

appointmentCount--;

document.getElementById("appointmentCount").innerText =
appointmentCount;

}


/* CALL CLIENT */

function callClient(phone){

window.location.href = "tel:" + phone;

}


/* ADD PET RECORD */

function addRecord(e){

e.preventDefault();

let pet =
document.getElementById("petName").value;

let disease =
document.getElementById("disease").value;

let treatment =
document.getElementById("treatment").value;

let table =
document.getElementById("recordTable");

let row = table.insertRow();

row.insertCell(0).innerText = pet;
row.insertCell(1).innerText = disease;
row.insertCell(2).innerText = treatment;

row.insertCell(3).innerHTML =
'<button onclick="deleteRecord(this)">Delete</button>';

petCount++;

document.getElementById("petCount").innerText =
petCount;

e.target.reset();

}


/* DELETE RECORD */

function deleteRecord(btn){

btn.parentElement.parentElement.remove();

petCount--;

document.getElementById("petCount").innerText =
petCount;

}


/* DISABLE PAST DATES */

function disablePastDates(){

let today = new Date();

let minDate =
today.toISOString().split("T")[0];

document.getElementById("appointmentDate").min =
minDate;

}
