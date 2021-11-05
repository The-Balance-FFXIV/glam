const roleSliderContainer = document.getElementById("roleSlider");
const roleSliderTabs = document.querySelectorAll(".tab");
roleSliderTabs[0].children[0].classList.add('selected');

roleSliderContainer.addEventListener('mousedown', (e) => {
    roleSliderTabs.forEach(tab => {
        tab.children[0].classList.remove('selected');
    })
    e.target.classList.add('selected');
});
