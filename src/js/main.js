import '../sass/main.scss'
import "./slider.js";
import "./books.js"; 
let headerBurgerBtn = document.querySelector(`.header__adaptive-link`);
let headerContainer = document.querySelector(`.adaptive-container`); 
headerBurgerBtn.addEventListener('click', () => {
    headerContainer.classList.toggle('toggle')
}) 

let categoryButton = document.querySelector(`.category-container__adaptive-button`);
let categoryContainer = document.querySelector(`.category-container`);
let list = categoryContainer.querySelector(`ul`)
categoryButton.addEventListener(`click`, () => {
    categoryContainer.classList.toggle('toggle')
    if(!categoryContainer.classList.contains('toggle')) {
        categoryButton.innerHTML = `<img width="40" height="40" src="https://img.icons8.com/ios/50/left--v1.png" alt="left--v1"/>`
    } else {
        categoryButton.innerHTML = ` <img width="40" height="40" src="https://img.icons8.com/ios/50/right--v1.png" alt="right--v1"/>`
    }
});

