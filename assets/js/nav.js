const navChevron = document.querySelectorAll(".chevron-down");
const chevronUp = "/theme-assets/chevron-up.svg";
const chevronDown = "/theme-assets/chevron-down.svg";

for (let i = 0; i < navChevron.length; i++) {
    let siblingList = navChevron[i].nextElementSibling;
    navChevron[i].addEventListener('click', () => {
        if (navChevron[i].children[0].src.indexOf('chevron-down') >= 0) {
            navChevron[i].children[0].src = chevronUp
        } else { 
            navChevron[i].children[0].src = chevronDown
        }
        navChevron[i].parentNode.classList.toggle('nav-active');
        siblingList.classList.toggle('hidden')
    });
}

