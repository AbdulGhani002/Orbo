let dropdown = document.querySelector('.dropdown');
let dropdownContent = document.querySelector('.dropdown-content');
let hideTimeout;

function showDropdown() {
    clearTimeout(hideTimeout);
    dropdownContent.classList.add('show');
}

function hideDropdown() {
    hideTimeout = setTimeout(function () {
        dropdownContent.classList.remove('show');
    }, 1000);
}

dropdown.addEventListener('mouseover', showDropdown);
dropdown.addEventListener('mouseout', function (event) {
    if (!dropdown.contains(event.relatedTarget)) {
        hideDropdown();
    }
});

dropdownContent.addEventListener('mouseover', showDropdown);
dropdownContent.addEventListener('mouseout', function (event) {
    if (!dropdown.contains(event.relatedTarget)) {
        hideDropdown();
    }
});
