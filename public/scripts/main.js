// nav styling depending on the current page

let currentOwner = document.querySelector('.current-page');
let currentOwnerLocation = currentOwner.attributes.href.value;
let currentPage = window.location.pathname;

if (currentOwner !== currentPage) {
    currentOwner.classList.remove('current-page');
   document.getElementById(currentPage).classList.add('current-page');
}

