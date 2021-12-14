"use strict";

// by MI = by Marcell Ilyes
// by NP = by Nikola Prolic

// Menu by NP

function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

/* ------- PRODUCT LIST page ------- */ //by MI

let _products = [];
let _brands = [];

// fetch data from the sneakers json file by MI

async function fetchData() {
    const response = await fetch('json/sneakers.json');
    const data = await response.json();
    _products = data;
    console.log(_products);
    appendProducts(_products);

    const brands = _products.map(product => product.brand);
    console.log(brands);

    _brands = [...new Set(brands)]
    console.log(_brands);
    appendBrands(_brands);
}

fetchData();

//append products to the DOM by MI

function appendProducts(products) {
    let htmlTemplate = "";
    for (let product of products) {
        htmlTemplate += /*html*/`
        <article onclick="showDetailedPage(${product.id})">
          <img src="${product.img_url}">
          <div>
            <h4>${product.name}</h4>
            <h3>${product.color}</h3>
            <h5>Lowest Ask</h5>
            <p>$${product.price}</p>
          </div>
        </article>
    `;
    }
    document.querySelector('#gridProducts').innerHTML = htmlTemplate;
    document.querySelector('#gridWishes').innerHTML = htmlTemplate;
}

// sorting functions by MI

function orderBy(option) {
    if (option === "name") {
      orderByName();
    } else if (option === "price") {
      orderByPrice();
    } else if (option === "brand") {
      orderByBrand();
    }
  }

  function orderByName() {
    _products.sort((product1, product2) => {
        return product1.name.localeCompare(product2.name);
    });
    appendProducts(_products);
}

function orderByPrice() {
    _products.sort((product1, product2) => {
        return product1.price.localeCompare(product2.price);
    });
    appendProducts(_products);
}

// append all brands as select options (dropdown) by MI

function appendBrands(brands) {
    let htmlTemplate = "";
    for (let brand of brands) {
        htmlTemplate += /*html*/`
        <option value="${brand}">${brand}</option>
    `;
    }
    document.querySelector('#sortByBrand').innerHTML += htmlTemplate;
}

// filter products by selected brand by MI

function filterByBrand(brand) {
    const results = _products.filter(product => product.brand === brand);
    appendProducts(results);
}

/* ------- Detailed product page ------- */ //by MI

function showDetailedPage(id) {
  const productToShow = _products.find(product => product.id === id);
  navigateTo("#/detailed_page");
  document.querySelector("#detailed_page_container").innerHTML = `
      <article>
      <h2>${productToShow.name}</h2>
      <h3>${productToShow.color}</h3>
      <img src ="${productToShow.img_url}">
      <h4>${productToShow.price}</h4>
      </article>
  `;
}

// Account page tabs by NP

function openTab(evt,tabName) {
  var i, tabcontent, tablinks;

  // Get all elements with class="tab-content" and hide them
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablink" and remove the class "active"
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}