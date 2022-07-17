let tbody = document.getElementById("tbody");
let input = document.getElementById("searchbox");
let reset = document.getElementById("reset");
async function fetchData() {
  try {
    let response = await fetch(
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users"
    );
    let users = await response.json();
    let searchQuery = "";
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        searchQuery = e.target.value;
        if (searchQuery.length < 2) {
          alert("Please enter atleast 2 characters");
          showData();
        } else {
          users
            .filter((item) =>
              item.fullName.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((item) => {
              console.log(item);
              tbody.innerHTML = "";
              let tr = ` <tr class="data">
                          <td class="userid">${item.id}</td>
                          <td class="name"><img src="${
                            item.profilePic
                          }" alt="Profile image ${item.id}"/></td>
                          <td class="brand">${item.fullName}</td>
                          <td class="date"> ${item.dob.slice(0, 2)} 
                          ${item.dob.slice(3, 6)}, ${item.dob.slice(7)}</td>
                          <td class="amount">$${item.gender}</td>
                          <td class="status">${item.currentCity} ${
                item.currentContry
              }</td>
                        </tr>`;
              tbody.innerHTML += tr;
            });
          if (
            users.filter(
              (item) =>
                !item.fullName.toLowerCase().includes(searchQuery.toLowerCase())
            )
          ) {
            tbody.innerHTML = "";
          }
        }
      }
    });
    showData();
    function showData() {
      users.map((item) => {
        let tr = ` <tr class="data">
                            <td class="userid">${item.id}</td>
                            <td class="name"><img src="${
                              item.profilePic
                            }" alt="Profile image ${item.id}"/></td>
                            <td class="brand">${item.fullName}</td>
                            <td class="date"> ${item.dob.slice(0, 2)} 
                            ${item.dob.slice(3, 6)}, ${item.dob.slice(7)}</td>
                            <td class="amount">$${item.gender}</td>
                            <td class="status">${item.currentCity} ${
          item.currentContry
        }</td>
                          </tr>`;
        tbody.innerHTML += tr;
      });
    }
    reset.addEventListener("click", () => {
      showData();
    });
  } catch (err) {
    console.log(err);
  }
}
fetchData();
