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
    _sneakers = data.record;
    appendSneakers(_sneakers);
}
//loadSneakers();

/**
 * Appends users to the DOM
 * @param {Array} sneakers
 */
function appendSneakers(sneakers) {
    let htmlTemplate = "";
    for (const sneaker of sneakers) {
      htmlTemplate += /*html*/ `
        <article onclick="showDetailedPage(${sneaker.id})">
        <img src="${sneaker.img_url}">
            <div>
                <h4>${sneaker.name}</h4>
                <h3>${sneaker.color}</h3>
                <h5>Lowest Ask</h5>
                <p>$${sneaker.price}</p>
            </div>
        </article>
        `;
    }
    document.querySelector("#gridSneakers").innerHTML = htmlTemplate;
    //showLoader(false);
  }
  