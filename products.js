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
          tbody.innerHTML = "";
          let d = new Date();
          const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sepr",
            "Oct",
            "Nov",
            "Dec",
          ];

          let currentDate = new Date(
            `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
          );
          currentDate.setHours(0, 0, 0, 0);
          console.log("Today:", currentDate);

          let givenDate = orders[1].expiryDate;

          let providedDate = new Date(
            `${givenDate.slice(-4)}-${
              monthNames.indexOf(givenDate.slice(3, 6)) + 1
            }-${givenDate.slice(0, 2)}
            `
          );
          providedDate.setHours(0, 0, 0, 0);
          console.log(providedDate);
          console.log(providedDate < currentDate);

          orders
            .filter(
              (item) =>
                new Date(
                  `${item.expiryDate.slice(-4)}-${
                    monthNames.indexOf(item.expiryDate.slice(3, 6)) + 1
                  }-${item.expiryDate.slice(0, 2)}`
                ) < currentDate
            )
            .map((item) => {
              console.log(item.expiryDate);
              let tr = ` <tr class="data">
                <td class="userid">${item.id}</td>
                <td class="name">${item.medicineName}</td>
                <td class="brand">${item.medicineBrand}</td>
                <td class="date">
                  ${item.expiryDate.slice(0, 2)} 
                  ${item.expiryDate.slice(3, 6)}, ${item.expiryDate.slice(7)}
                </td>
                <td class="amount">$${item.unitPrice}</td>
                <td class="status">${item.stock}</td>
              </tr>`;
              tbody.innerHTML += tr;
            });
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
        count.innerHTML = `Count: ${
          document.getElementsByTagName("tr").length - 1
        }`;
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
      count.innerHTML = `Count: ${
        document.getElementsByTagName("tr").length - 1
      }`;
    });
  } catch (err) {
    console.log(err);
  }
}
fetchData();
