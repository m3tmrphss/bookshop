let urls = [`assets/banner.png`, `assets/banner 2.svg`, `assets/banner 3.svg`];
let index = 0;
let imageContainer = document.querySelector(`.image-container`);
let image = document.querySelector(`.image-container__img`);
let src = image.getAttribute(`.src`)
let buttons = document.querySelectorAll(`.btn-container__btn`);  

document.addEventListener(`DOMContentLoaded`, () => { 
    image.src = urls[index]; 
    buttons[index].classList.toggle(`active`);   
}) 
setInterval(() => {
    index = (index + 1) % urls.length; 
    image.src = urls[index];  
    buttons[index].classList.toggle(`active`);  
    buttons[index === 0 ? urls.length - 1 : index - 1].classList.toggle(`active`) 
}, 5000)   

buttons.forEach((elem, currentIndex) => {
    elem.addEventListener(`click`, () => {
        image.src = urls[currentIndex]
        index = currentIndex;
        buttons.forEach((button, num) => {
            button.classList.toggle(`active`, num === currentIndex);         
        });
    })
});