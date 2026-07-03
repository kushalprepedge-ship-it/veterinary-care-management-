/* ==========================
   LOCAL STORAGE
========================== */

let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let records = JSON.parse(localStorage.getItem("records")) || [];

let doctorCount = 0;
let appointmentCount = 0;
let petCount = 0;


/* ==========================
   LOGIN
========================== */

function login(){

let user=document.getElementById("username").value;
let pass=document.getElementById("password").value;

if(user==="admin" && pass==="admin123")
{
window.location="dashboard.html";
}
else
{
document.getElementById("error").innerText=
"Invalid Username or Password";
}

}


/* ==========================
   LOGOUT
========================== */

function logout(){

window.location="index.html";

}


/* ==========================
   SHOW SECTION
========================== */

function showSection(id){

let sections=document.querySelectorAll(".section");

sections.forEach(section=>{

section.style.display="none";

});

document.getElementById(id).style.display="block";

}


/* ==========================
   OPEN DASHBOARD
========================== */

window.onload=function(){

if(document.getElementById("home"))
{

showSection("home");

disablePastDates();

loadDoctors();

loadAppointments();

loadRecords();

}

};


/* ==========================
   SAVE FUNCTIONS
========================== */

function saveDoctors(){

localStorage.setItem(
"doctors",
JSON.stringify(doctors)
);

}

function saveAppointments(){

localStorage.setItem(
"appointments",
JSON.stringify(appointments)
);

}

function saveRecords(){

localStorage.setItem(
"records",
JSON.stringify(records)
);

}


/* ==========================
   LOAD DOCTORS
========================== */

function loadDoctors(){

let table=document.getElementById("doctorTable");

if(!table) return;

doctors.forEach((doc,index)=>{

let row=table.insertRow();

row.insertCell(0).innerText=doc.name;
row.insertCell(1).innerText=doc.specialization;
row.insertCell(2).innerText=doc.phone;

row.insertCell(3).innerHTML=
`<button onclick="deleteDoctor(${index})">
Delete
</button>`;

});

doctorCount=doctors.length;

document.getElementById("doctorCount").innerText=
doctorCount;

}


/* ==========================
   ADD DOCTOR
========================== */

function addDoctor(e){

e.preventDefault();

let name=document.getElementById("doctorName").value;

let specialization=
document.getElementById("specialization").value;

let phone=
document.getElementById("doctorPhone").value;

if(phone.length!==10)
{
alert("Enter valid 10 digit number");
return;
}

doctors.push({

name,
specialization,
phone

});

saveDoctors();

refreshDoctors();

e.target.reset();

}


/* ==========================
   REFRESH DOCTOR TABLE
========================== */

function refreshDoctors(){

let table=document.getElementById("doctorTable");

table.innerHTML=

`
<tr>

<th>Name</th>

<th>Specialization</th>

<th>Phone</th>

<th>Action</th>

</tr>
`;

loadDoctors();

}


/* ==========================
   DELETE DOCTOR
========================== */

function deleteDoctor(index){

doctors.splice(index,1);

saveDoctors();

refreshDoctors();

}


/* ==========================
   LOAD APPOINTMENTS
========================== */

function loadAppointments(){

let table=document.getElementById("appointmentTable");

let recent=document.getElementById("recentAppointmentTable");

if(!table) return;

appointments.forEach((app,index)=>{

let row=table.insertRow();

row.insertCell(0).innerText=app.client;
row.insertCell(1).innerText=app.phone;
row.insertCell(2).innerText=app.pet;
row.insertCell(3).innerText=app.date;
row.insertCell(4).innerText=app.time;

row.insertCell(5).innerHTML=

app.status;

row.insertCell(6).innerHTML=

`
<button onclick="completeAppointment(${index})">
Complete
</button>

<button onclick="rescheduleAppointment(${index})">
Reschedule
</button>

<button onclick="callClient('${app.phone}')">
Call
</button>

<button onclick="deleteAppointment(${index})">
Delete
</button>
`;

let r=recent.insertRow();

r.insertCell(0).innerText=app.client;
r.insertCell(1).innerText=app.phone;
r.insertCell(2).innerText=app.pet;
r.insertCell(3).innerText=
app.date+" "+app.time;

r.insertCell(4).innerHTML=
app.status;

});

appointmentCount=appointments.length;

document.getElementById("appointmentCount").innerText=
appointmentCount;

}
 /* ==========================
   ADD APPOINTMENT
========================== */

function addAppointment(e){

e.preventDefault();

let client=document.getElementById("clientName").value;
let phone=document.getElementById("clientPhone").value;
let pet=document.getElementById("petType").value;
let date=document.getElementById("appointmentDate").value;
let time=document.getElementById("appointmentTime").value;

if(phone.length!==10)
{
alert("Enter valid 10 digit number");
return;
}

appointments.push({

client,
phone,
pet,
date,
time,
status:'<span style="color:orange;">Pending</span>'

});

saveAppointments();

refreshAppointments();

e.target.reset();

}


/* ==========================
   REFRESH APPOINTMENTS
========================== */

function refreshAppointments(){

let table=document.getElementById("appointmentTable");

table.innerHTML=
`
<tr>
<th>Client</th>
<th>Phone</th>
<th>Pet</th>
<th>Date</th>
<th>Time</th>
<th>Status</th>
<th>Action</th>
</tr>
`;

let recent=document.getElementById("recentAppointmentTable");

recent.innerHTML=
`
<tr>
<th>Client</th>
<th>Phone</th>
<th>Pet</th>
<th>Date & Time</th>
<th>Status</th>
</tr>
`;

loadAppointments();

}


/* ==========================
   COMPLETE APPOINTMENT
========================== */

function completeAppointment(index){

appointments[index].status =
'<span style="color:lightgreen;">Completed</span>';

saveAppointments();

refreshAppointments();

}


/* ==========================
   RESCHEDULE
========================== */

function rescheduleAppointment(index){

let newDate=prompt("Enter new date (yyyy-mm-dd)");
let newTime=prompt("Enter new time");

if(newDate && newTime)
{

appointments[index].date=newDate;
appointments[index].time=newTime;

saveAppointments();

refreshAppointments();

alert("Appointment Rescheduled");

}

}


/* ==========================
   DELETE APPOINTMENT
========================== */

function deleteAppointment(index){

appointments.splice(index,1);

saveAppointments();

refreshAppointments();

}


/* ==========================
   CALL CLIENT
========================== */

function callClient(phone){

window.location.href="tel:"+phone;

}


/* ==========================
   LOAD RECORDS
========================== */

function loadRecords(){

let table=document.getElementById("recordTable");

if(!table) return;

records.forEach((record,index)=>{

let row=table.insertRow();

row.insertCell(0).innerText=record.pet;
row.insertCell(1).innerText=record.disease;
row.insertCell(2).innerText=record.treatment;

row.insertCell(3).innerHTML=
`
<button onclick="deleteRecord(${index})">
Delete
</button>
`;

});

petCount=records.length;

document.getElementById("petCount").innerText=
petCount;

}


/* ==========================
   ADD RECORD
========================== */

function addRecord(e){

e.preventDefault();

let pet=document.getElementById("petName").value;
let disease=document.getElementById("disease").value;
let treatment=document.getElementById("treatment").value;

records.push({

pet,
disease,
treatment

});

saveRecords();

refreshRecords();

e.target.reset();

}


/* ==========================
   REFRESH RECORDS
========================== */

function refreshRecords(){

let table=document.getElementById("recordTable");

table.innerHTML=
`
<tr>
<th>Pet</th>
<th>Disease</th>
<th>Treatment</th>
<th>Action</th>
</tr>
`;

loadRecords();

}


/* ==========================
   DELETE RECORD
========================== */

function deleteRecord(index){

records.splice(index,1);

saveRecords();

refreshRecords();

}


/* ==========================
   DISABLE PAST DATES
========================== */

function disablePastDates(){

let input=document.getElementById("appointmentDate");

if(!input) return;

let today=new Date();

input.min=today.toISOString().split("T")[0];

} 
