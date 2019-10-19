//nav styling depending on the current page

const currentOwner = document.querySelector('.current-page');
const currentPage = window.location.pathname;

if (currentOwner) {
    let currentOwnerLocation = currentOwner.attributes.href.value;

    if (currentOwner !== currentOwnerLocation) {
        currentOwner.classList.remove('current-page');
        document.getElementById(currentPage).firstChild.classList.add('current-page');
    }
}

// if none of the links has the class - add it and remove href
document.getElementById(currentPage).firstChild.classList.add('current-page');
document.getElementById(currentPage).firstChild.href = '#';