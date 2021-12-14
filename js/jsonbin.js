// https://api.jsonbin.io/b/61b6a4a362ed886f915f0bc9
// $2b$10$PaR.S66xewo5ffB1sqe0xO0VImRtC/PsBXiYxi3ERMax5GyZAi4Gi

// ========== GLOBAL VARIABLES ==========

let _sneakers = [];
let _selectedSneakerId;
const _baseUrl = "https://api.jsonbin.io/b/61b6a4a362ed886f915f0bc9";
const _headers = {
  "X-Master-Key": "$2b$10$PaR.S66xewo5ffB1sqe0xO0VImRtC/PsBXiYxi3ERMax5GyZAi4Gi",
  "Content-Type": "application/json"
};

// ========== READ ==========

/**
 * Fetchs sneakers data from jsonbin
 */
async function loadSneakers() {
    const url = _baseUrl + "/latest"; // make sure to get the latest version
    const response = await fetch(url, {
      headers: _headers
    });
    const data = await response.json();
    console.log(data);
    _sneakers = data;
    appendSneakers(_sneakers);
}
loadSneakers();

/**
 * Appends users to the DOM
 * @param {Array} sneakers
 */
function appendSneakers(sneakers) {
    let htmlTemplate = "";
    for (const sneaker of sneakers) {
      htmlTemplate += /*html*/ `
        <article>
        <img src="${sneaker.img_url}" onclick="showDetailedPage(${sneaker.id})">
            <div>
                <h4>${sneaker.name}</h4>
                <h3>${sneaker.color}</h3>
                <h5>Lowest Ask</h5>
                <p>$${sneaker.price}</p>
                <button onclick="deleteSenakers(${sneaker.id})">Delete</button>
            </div>
        </article>
        `;
    }
    document.querySelector("#gridSneakers").innerHTML = htmlTemplate;
    //showLoader(false);
  }

  // ========== CREATE ==========

/**
 * Creates a new user with properties: name, mail & id
 */
async function createSale() {
  // references to input fields
  let nameInput = document.querySelector("#name");
  let brandInput = document.querySelector("#brand");
  let colorInput = document.querySelector("#color");
  let priceInput = document.querySelector("#price");
  let imgInput = document.querySelector("#img");
  // dummy generated user id
  const sneakerId = Date.now();
  // declaring a new user object
  const newSneakers = {
    name: nameInput.value,
    brand: brandInput.value,
    color: colorInput.value,
    price: priceInput.value,
    img: imgInput.value,
    id: sneakerId
  };
  // pushing the new user object to the _users array
  _sneakers.push(newSneakers);
  // wait for update
  await updateJSONBIN(_sneakers);
  // reset
  nameInput.value = "";
  brandInput.value = "";
  colorInput.value = "";
  priceInput.value = "";
  imgInput.value = "";
  //navigating back
  navigateTo("#/");
}

// ========== DELETE ==========
/**
 * Deletes user by given user id
 * @param id 
 */
 async function deleteSenakers(id) {
  _sneakers = _sneakers.filter(sneaker => sneaker.id !== id);
  await updateJSONBIN(_sneakers);
  navigateTo("#/my-account");
}

// ========== Services ==========
/**
 * Updates the data source on jsonbin with a given users arrays
 * @param {Array} sneakers 
 */
 async function updateJSONBIN(sneakers) {
  // put users array to jsonbin
  const response = await fetch(_baseUrl, {
    method: "PUT",
    headers: _headers,
    body: JSON.stringify(sneakers)
  });
  // waiting for the result
  const result = await response.json(); // the new updated users array from jsonbin
  console.log(result);
  //updating the DOM with the new fetched users
  appendSneakers(result.record);
}
  