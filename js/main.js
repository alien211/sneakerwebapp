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

/* ------- PRODUCT LIST page ------- */

let _products = [];
let _brands = [];

// fetch data from the artists json file by MI

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
}

// sorting functions

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

// append all brands as select options (dropdown)

function appendBrands(brands) {
    let htmlTemplate = "";
    for (let brand of brands) {
        htmlTemplate += /*html*/`
        <option value="${brand}">${brand}</option>
    `;
    }
    document.querySelector('#sortByBrand').innerHTML += htmlTemplate;
}

// filter products by selected brand

function filterByBrand(brand) {
    const results = _products.filter(product => product.brand === brand);
    appendProducts(results);
}