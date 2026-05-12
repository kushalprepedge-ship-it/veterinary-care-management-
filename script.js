/* LOGIN */

function login(){

let user = document.getElementById("username").value;
let pass = document.getElementById("password").value;

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

let sections = document.querySelectorAll(".section");

sections.forEach(section=>{
section.style.display = "none";
});

document.getElementById(id).style.display = "block";

}


/* OPEN HOME */

window.onload = function(){

showSection("home");

}