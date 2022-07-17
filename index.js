let loginbtn = document.getElementById("loginbtn");
let username = document.getElementById("username");
let password = document.getElementById("password");

if (localStorage.length > 0) {
  username.value = localStorage.getItem("username");
  password.value = localStorage.getItem("password");
}

loginbtn.addEventListener("click", function () {
  if (
    username.value === password.value &&
    username.value !== "" &&
    password.value !== ""
  ) {
    localStorage.setItem("username", username.value);
    localStorage.setItem("password", password.value);
    alert("Login Successful");
    window.location.href = "./order.html";
  } else {
    alert("Please enter valid credentials!");
  }
});
