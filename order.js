let tbody = document.getElementById("tbody");
let neww = document.getElementById("new");
let count = document.getElementById("count");
count.innerHTML = `Count : 0`;

async function fetchData() {
  try {
    let response = await fetch(
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders"
    );
    let orders = await response.json();
    let checkbox = document.getElementsByName("filterorders");

    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].addEventListener("click", function () {
        if (this.checked) {
          orders
            .filter(
              (item) =>
                item.orderStatus.toLowerCase() === this.value.toLowerCase()
            )
            .map((item) => {
              let tr = ` <tr class="data">
                  <td class="userid">${item.id}</td>
                  <td class="name">${item.customerName}</td>
                  <td class="date">
                    ${item.orderDate.slice(0, 2)} 
                    ${item.orderDate.slice(3, 6)}, ${item.orderDate.slice(7)}
                <br /><span class="time">${item.orderTime}</span>
                  </td>
                  <td class="amount">$${item.amount}</td>
                  <td class="status">${item.orderStatus}</td>
                </tr>`;
              tbody.innerHTML += tr;
            });
        } else {
          tbody.innerHTML = "";
          let checkbox = document.getElementsByName("filterorders");
          let arr = [];
          for (let i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
              arr.push(checkbox[i].id);
            }
            console.log(arr);
          }
          orders
            .filter((item) => arr.includes(item.orderStatus.toLowerCase()))
            .map((item) => {
              let tr = ` <tr class="data">
                <td class="userid">${item.id}</td>
                <td class="name">${item.customerName}</td>
                <td class="date">
                  ${item.orderDate.slice(0, 2)}
                  ${item.orderDate.slice(3, 6)}, ${item.orderDate.slice(7)}
              <br /><span class="time">${item.orderTime}</span>
                </td>
                <td class="amount">$${item.amount}</td>
                <td class="status">${item.orderStatus}</td>
              </tr>`;
              tbody.innerHTML += tr;
            });
        }
        count.innerHTML = `Count: ${
          document.getElementsByTagName("tr").length - 1
        }`;
      });
    }

    let arr = [];
    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        arr.push(checkbox[i].id.toLowerCase());
      }
      console.log(arr);
    }

    //
    orders
      .filter((item) => arr.includes(item.orderStatus.toLowerCase()))
      .map((item) => {
        let tr = ` <tr class="data">
                <td class="userid">${item.id}</td>
                <td class="name">${item.customerName}</td>
                <td class="date">
                  ${item.orderDate.slice(0, 2)}
                  ${item.orderDate.slice(3, 6)}, ${item.orderDate.slice(7)}
              <br /><span class="time">${item.orderTime}</span>
                </td>
                <td class="amount">$${item.amount}</td>
                <td class="status">${item.orderStatus}</td>
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
