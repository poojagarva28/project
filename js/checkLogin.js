if (
  localStorage.getItem("loginStatus") === "false" ||
  localStorage.length === 0
) {
  window.location.href = "./index.html";
  window.alert("Please Login First");
}

let action = document.getElementById("action");
action.addEventListener("click", function () {
  if (localStorage.getItem("loginStatus") == "true") {
    window.location.href = this.pathname;
  }
});
