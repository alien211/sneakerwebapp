/**
 * All routes of the SPA
 * "path": "id of page in DOM"
 */
const routes = {
  "#/": "home",
  "#/products": "products",
  "#/myaccount": "account"
};

/**
 * Initialising the router, calling attachNavLinkEvents() and navigateTo()
 */
function initRouter() {
  attachNavLinkEvents();

  let defaultPath = "#/";
  if (routes[location.hash]) {
    defaultPath = location.hash;
  }
  navigateTo(defaultPath);
}

initRouter();

/**
 * Attaching event to nav links and preventing default anchor link event
 */
function attachNavLinkEvents() {
  const navLinks = document.querySelectorAll(".nav-link");
  for (const link of navLinks) {
    link.addEventListener("click", function (event) {
      const path = link.getAttribute("href");
      navigateTo(path);
      event.preventDefault();
    });
  }
}

/**
 * Navigating SPA to specific page by given pathnameß
 */
function navigateTo(pathname) {
  hideAllPages();
  const basePath = location.pathname.replace("index.html", "");
  window.history.pushState({}, pathname, basePath + pathname);
  document.querySelector(`#${routes[pathname]}`).style.display = "block";
  setActiveTab(pathname);
}

/**
 * Changing display to none for all pages
 */
function hideAllPages() {
  const pages = document.querySelectorAll(".page");
  for (const page of pages) {
    page.style.display = "none";
  }
}

/**
 * sets active tab bar/ menu item
 */
function setActiveTab(pathname) {
  const navLinks = document.querySelectorAll("nav a");
  for (const link of navLinks) {
    if (pathname === link.getAttribute("href")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  }
}

//Hiding the menu for onboarding
let cUrl = window.location.href;

if (
  cUrl.indexOf("products") != -1 ||
  cUrl.indexOf("account") != -1 
) {
  menu.style.display = "flex";
} else {
  menu.style.display = "none";
}

window.showMenu = function () {
  let navBar = document.querySelector(".tabbar");
  if ((navBar.style.display = "none")) {
    navBar.style.display = "flex";
  }
};
