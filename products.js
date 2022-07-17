let tbody = document.getElementById("tbody");
let expired = document.getElementById("expired");
let lowstock = document.getElementById("low stock");
let count = document.getElementById("count");
let checkbox = document.getElementsByName("filterorders");
count.innerHTML = `Count : 0`;

async function fetchData() {
  try {
    let response = await fetch(
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products"
    );
    let orders = await response.json();

    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].addEventListener("change", function () {
        if (checkbox[0].checked && checkbox[1].checked) {
          tbody.innerHTML = "";
          orders.map((item) => {
            let tr = ` <tr class="data">
                              <td class="userid">${item.id}</td>
                              <td class="name">${item.medicineName}</td>
                              <td class="brand">${item.medicineBrand}</td>
                              <td class="date">
                                ${item.expiryDate.slice(0, 2)} 
                                ${item.expiryDate.slice(
                                  3,
                                  6
                                )}, ${item.expiryDate.slice(7)}
                              </td>
                              <td class="amount">$${item.unitPrice}</td>
                              <td class="status">${item.stock}</td>
                            </tr>`;
            tbody.innerHTML += tr;
          });
        } else if (checkbox[0].checked) {
          let d = new Date();
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          let currentDate =
            d.getDate() +
            monthNames[d.getMonth()].slice(0, 3) +
            d.getFullYear();
          console.log(currentDate);
        } else if (checkbox[1].checked) {
          tbody.innerHTML = "";
          orders
            .filter((item) => item.stock < 100)
            .map((item) => {
              let tr = ` <tr class="data">
                              <td class="userid">${item.id}</td>
                              <td class="name">${item.medicineName}</td>
                              <td class="brand">${item.medicineBrand}</td>
                              <td class="date">
                                ${item.expiryDate.slice(0, 2)} 
                                ${item.expiryDate.slice(
                                  3,
                                  6
                                )}, ${item.expiryDate.slice(7)}
                              </td>
                              <td class="amount">$${item.unitPrice}</td>
                              <td class="status">${item.stock}</td>
                            </tr>`;
              tbody.innerHTML += tr;
            });
        } else if (!checkbox[0].checked && !checkbox[1].checked) {
          tbody.innerHTML = "";
        }
      });
    }

    //
    // products
    orders.map((item) => {
      let tr = ` <tr class="data">
                          <td class="userid">${item.id}</td>
                          <td class="name">${item.medicineName}</td>
                          <td class="brand">${item.medicineBrand}</td>
                          <td class="date">
                            ${item.expiryDate.slice(0, 2)} 
                            ${item.expiryDate.slice(
                              3,
                              6
                            )}, ${item.expiryDate.slice(7)}
                          </td>
                          <td class="amount">$${item.unitPrice}</td>
                          <td class="status">${item.stock}</td>
                        </tr>`;
      tbody.innerHTML += tr;
    });
    count.innerHTML = `Count: ${
      document.getElementsByTagName("tr").length - 1
    }`;
  } catch (err) {
    console.log(err);
  }
}
fetchData();
