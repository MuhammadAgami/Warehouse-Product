let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mod = "create";
let tem;
function get_total() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.style.background = "#a00d02";
  }
}
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}
submit.onclick = function () {
  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (title.value != "" && price.value && category.value) {
    if (mod == "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[tem] = newpro;
      mod = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
  } else {
    clearData();
  }
  localStorage.setItem("product", JSON.stringify(datapro));
  clearData();
  showData();
};

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showData() {
  get_total();
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick=updateData(${i})>Update</button></td>
            <td><button onclick=deleteData(${i})>Delete</button></td>
        </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;
  if (datapro.length > 0) {
    document.getElementById("deleteall").innerHTML = `
        <button onclick="deleteall()">Delete All ( ${datapro.length} )</button>
        `;
  } else {
    document.getElementById("deleteall").innerHTML = "";
  }
}
function deleteData(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showData();
}
function deleteall() {
  localStorage.clear();
  datapro.splice(0);
  showData();
}
function updateData(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  category.value = datapro[i].category;
  count.style.display = "none";
  submit.innerHTML = "Update";
  get_total();
  mod = "update";
  tem = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
let searchmod = "title";
let search = document.getElementById("search");
function searchtitles(id) {
  if (id == "searchtitle") {
    searchmod = "title";
    search.placeholder = "search by title";
  } else {
    searchmod = "category";
    search.placeholder = "search by category";
  }
  search.focus();
}
function searchDate(value) {
  let table = "";
  if (searchmod == "title") {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].title.includes(value)) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick=updateData(${i})>Update</button></td>
            <td><button onclick=deleteData(${i})>Delete</button></td>
        </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].category.includes(value)) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick=updateData(${i})>Update</button></td>
            <td><button onclick=deleteData(${i})>Delete</button></td>
        </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
showData();
