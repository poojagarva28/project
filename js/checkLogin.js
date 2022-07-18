if (localStorage.getItem("loginStatus") === "false") {
  window.alert("Please Login First");
  window.location.href = "./index.html";
}

let action = document.getElementById("action");
action.addEventListener("click", function () {
  if (localStorage.getItem("loginStatus") == "true") {
    console.log("action cliced");
    window.location.href = "./orders.html";
  }
});
