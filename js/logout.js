let logout = document.getElementById("logout");

logout.addEventListener("click", function () {
  localStorage.setItem("loginStatus", false);
  window.location.href = "./index.html";
});
