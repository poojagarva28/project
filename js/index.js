let loginbtn = document.getElementById("loginbtn");
let username = document.getElementById("username");
let password = document.getElementById("password");

loginbtn.addEventListener("click", function () {
  if (
    username.value === password.value &&
    username.value !== "" &&
    password.value !== ""
  ) {
    localStorage.setItem("loginStatus", true);
    alert("Login Successful");
    window.location.href = "./orders.html";
  } else {
    alert("Please enter valid credentials!");
  }
});
