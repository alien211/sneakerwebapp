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

// fetch data from the artists json file by MI

async function fetchData() {
    const response = await fetch('json/sneakers.json');
    const data = await response.json();
    _products = data;
    console.log(_products);
    appendProducts(_products);
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
        <p>Lowest Ask<br>$${product.price}</p>
        </div>
        </article>
    `;
    }
    document.querySelector('#gridProducts').innerHTML = htmlTemplate;
}