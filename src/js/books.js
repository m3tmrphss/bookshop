let categories = document.querySelectorAll(`.category-container__category`);
let categoriesArr = [...categories]
let startIndex = 0;
let cardContainer = document.querySelector(`.card-container`); 
let averageRatingContainer = document.querySelector(`.card__average-rating`);
let starSvg = `<img src="../dist/assets/Star (1).svg">`;
let defaultStarSvg = `<img src="../dist/assets/Star.svg">`;
let starsArr = [];
let loadBtn = document.querySelector(`.container__button-load`); 
let buyCards = [];


document.addEventListener(`DOMContentLoaded`, () => {    
        categories.forEach(element => {
            if(element.classList.contains(`active`)) {
                fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${element.textContent}&key=AIzaSyA9DuwyL3fV4zXeYCxvQPGys162wbB8Ff0&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`)
                .then((response) => { return response.json(); })
                .then((data) => {
                    
                    data.items.forEach(book => {  
                        let cover = ` `; 
                        if(book.volumeInfo.imageLinks !== undefined) {
                            cover = book.volumeInfo.imageLinks.thumbnail;
                        } else {
                            cover = "https://placehold.co/212x300"
                        }
                        let title = book.volumeInfo.title;
                        let authors = book.volumeInfo.authors;
                        if(Array.isArray(authors)) {
                            authors = authors.join(', ') 
                        } else {
                            authors = authors
                        }
                        let description = ` `;
                        if (book.volumeInfo.description !== undefined) {
                            description = book.volumeInfo.description;
                        } else {
                            description = ` `;
                        }
                        let averageRating = ` `;
                        let ratingsCount = ` `;
                        if(book.volumeInfo.averageRating !== undefined) {
                            let averageRatingCount = book.volumeInfo.averageRating;
                            ratingsCount = book.volumeInfo.ratingsCount  + ` review`; 
                            for(let i = 1; i <= averageRatingCount; i++) {
                                averageRating += starSvg;
                            }
                            if(averageRatingCount < 5) {
                                for(let i = 0; i < (5 - averageRatingCount); i++) {
                                    averageRating += defaultStarSvg
                                }
                            } 
                        } else {
                            averageRating = ``;
                            ratingCount = ``
                        }
                        let price = ``;
                        if(book.saleInfo.listPrice !== undefined) {
                            price = book.saleInfo.listPrice.amount + ` ` + book.saleInfo.listPrice.currencyCode;
                        } else {
                            price = ``
                        } 
                        cardContainer.innerHTML += `
                        <div class="card">
                            <div class="card__card-img">
                                <img src="${cover}" class="card__cover" alt="Обложка книги">
                            </div>
                            <div class="card__text-content">
                                <h4 class="card__author">${authors}</h4>
                                <h2 class="card__title">${title}</h2>
                                <div class="card__rating">
                                    <div class="card__average-rating">${averageRating}</div>
                                    <div class="card__ratings-count">${ratingsCount} </div>
                                </div>
                                <div class="card__description">${description}</div>
                                <div class="card__price">${price}</div>
                                <button class="card__button">Buy now</button>
                            </div>
                        </div> 
                        `;  
                        saveBook();
                    });
                })
                .catch((error) => { console.log('error', error) });  
            } 
        });
});   
categories.forEach(element => {
    element.addEventListener(`click`, function() {
        startIndex = 0 ; 
        categoriesArr.forEach(category => {
            if (category !== element && category.classList.contains(`active`)) {
                category.classList.remove('active');
            }        
        }); 
        element.classList.add('active') 
        if(element.classList.contains(`active`)) {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${element.textContent}&key=AIzaSyA9DuwyL3fV4zXeYCxvQPGys162wbB8Ff0&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`)
            .then((response) => { return response.json(); })
            .then((data) => {
                cardContainer.innerHTML = ``;
                
                data.items.forEach(book => {  
                    let cover = ` `;
                    if(book.volumeInfo.imageLinks !== undefined) {
                        cover = book.volumeInfo.imageLinks.thumbnail;
                    } else {
                        cover = "https://placehold.co/212x300"
                    }
                    let title = book.volumeInfo.title;
                    let authors = book.volumeInfo.authors; 
                    if(Array.isArray(authors)) {
                        authors = authors.join(', ') 
                    } else if (authors == undefined) {
                        authors = `Без автора`
                    } else {
                        authors = authors
                    }
                    let description = ` `;
                    if (book.volumeInfo.description !== undefined) {
                        description = book.volumeInfo.description;
                    } else {
                        description = ` `;
                    }
                    let averageRating = ` `;
                    let ratingsCount = ` `;
                    if(book.volumeInfo.averageRating !== undefined) {
                        let averageRatingCount = book.volumeInfo.averageRating;
                        ratingsCount = book.volumeInfo.ratingsCount  + ` review`; 
                        for(let i = 1; i <= averageRatingCount; i++) {
                            averageRating += starSvg;
                        }
                        if(averageRatingCount < 5) {
                            for(let i = 0; i < (5 - averageRatingCount); i++) {
                                averageRating += defaultStarSvg
                            }
                        } 
                    } else {
                        averageRating = ``;
                        ratingCount = ``
                    }
                    let price = ``;
                    if(book.saleInfo.listPrice !== undefined) {
                        price = book.saleInfo.listPrice.amount + ` ` +  book.saleInfo.listPrice.currencyCode;
                    } else {
                        price = ``
                    } 
                    cardContainer.innerHTML += `
                    <div class="card">
                        <div class="card__card-img">
                            <img src="${cover}" class="card__cover" alt="Обложка книги">
                        </div>
                        <div class="card__text-content">
                            <h4 class="card__author">${authors}</h4>
                            <h2 class="card__title">${title}</h2>
                            <div class="card__rating">
                                <div class="card__average-rating">${averageRating}</div>
                                <div class="card__ratings-count">${ratingsCount} </div>
                            </div>
                            <div class="card__description">${description}</div>
                            <div class="card__price">${price}</div>
                            <button class="card__button" id="btn">Buy now</button>
                        </div>
                    </div> 
                    `; 
                    saveBook(); 
                });
            })
            .catch((error) => { console.log('error', error) });  
        } 
    })
});
loadBtn.addEventListener(`click`, () => { 
    startIndex = startIndex + 6;
    categories.forEach(element => {
        if(element.classList.contains(`active`)) {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${element.textContent}&key=AIzaSyA9DuwyL3fV4zXeYCxvQPGys162wbB8Ff0&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`)
            .then((response) => { return response.json()})
            .then((data) => {
                
                data.items.forEach(book => {  
                    let cover = ` `;  
                    if(book.volumeInfo.imageLinks !== undefined) {
                        cover = book.volumeInfo.imageLinks.thumbnail;
                    } else {
                        cover = "https://placehold.co/212x300"
                    }
                    let title = book.volumeInfo.title;
                    let authors = book.volumeInfo.authors;
                    if(Array.isArray(authors)) {
                        authors = authors.join(', ') 
                    } else {
                        authors = authors
                    }
                    let description = ` `;
                    if (book.volumeInfo.description !== undefined) {
                        description = book.volumeInfo.description;
                    } else {
                        description = ` `;
                    }
                    let averageRating = ` `;
                    let ratingsCount = ` `;
                    if(book.volumeInfo.averageRating !== undefined) {
                        let averageRatingCount = book.volumeInfo.averageRating;
                        ratingsCount = book.volumeInfo.ratingsCount  + ` review`; 
                        for(let i = 1; i <= averageRatingCount; i++) {
                            averageRating += starSvg;
                        }
                        if(averageRatingCount < 5) {
                            for(let i = 0; i < (5 - averageRatingCount); i++) {
                                averageRating += defaultStarSvg
                            }
                        } 
                    } else {
                        averageRating = ``;
                        ratingCount = ``
                    }
                    let price = ``;
                    if(book.saleInfo.listPrice !== undefined) {
                        price = book.saleInfo.listPrice.amount +  ` ` + book.saleInfo.listPrice.currencyCode;
                    } else {
                        price = ``
                    } 
                    cardContainer.innerHTML += `
                        <div class="card">
                            <div class="card__card-img">
                                <img src="${cover}" class="card__cover" alt="Обложка книги">
                            </div>
                            <div class="card__text-content">
                                <h4 class="card__author">${authors}</h4>
                                <h2 class="card__title">${title}</h2>
                                <div class="card__rating">
                                    <div class="card__average-rating">${averageRating}</div>
                                    <div class="card__ratings-count">${ratingsCount} </div>
                                </div>
                                <div class="card__description">${description}</div>
                                <div class="card__price">${price}</div>
                                <button class="card__button" id="btn">Buy now</button>
                            </div>
                        </div> 
                        `; 
                        saveBook(); 
                    })
            })
            .catch((error) => {console.log(error)})
        }
    });
})    
function saveBook() {
    let cards = document.querySelectorAll(`.card`);
    let count = document.querySelector(`.count`);    
    let savedBooks = localStorage.getItem('books');
    let booksArray = savedBooks ? JSON.parse(savedBooks) : [];
    
    cards.forEach(card => {
        let buyBtn = card.querySelector(`.card__button`);
        let bookTitle = card.querySelector(`.card__title`).innerHTML;
        let bookAuthor = card.querySelector(`.card__author`).innerHTML;
        let bookAverageRating = card.querySelector(`.card__average-rating`).innerHTML;
        let bookRatingsCount = card.querySelector(`.card__ratings-count`).innerHTML;
        let bookPrice = card.querySelector(`.card__price`).innerHTML;
        let bookCover = card.querySelector(`.card__cover`).getAttribute('src');
        let bookStatus = card.classList.value;
        
        let book = {
            title: bookTitle,
            author: bookAuthor,
            averageRating: bookAverageRating,
            ratingsCount: bookRatingsCount,
            price: bookPrice,
            cover: bookCover,
            status: bookStatus,
        };

        buyBtn.addEventListener('click', () => {
            if (!card.classList.contains('buy')) {
                card.classList.add('buy');
                booksArray.push(book);
                buyBtn.innerHTML = 'IN THE CART'; 
            } else {
                card.classList.remove('buy');
                buyBtn.innerHTML = 'BUY NOW';
                booksArray = booksArray.filter(item => item.title !== book.title || item.author !== book.author);
            }

            count.textContent = booksArray.length;
            localStorage.setItem('books', JSON.stringify(booksArray));

            if (booksArray.length == 0) {
                count.classList.add('d-none');
            } else {
                count.classList.remove('d-none');
            }

        });
 
        booksArray.forEach(savedBook => {
            if (savedBook.title === book.title && savedBook.author === book.author) {
                card.classList.add('buy');
                buyBtn.innerHTML = 'IN THE CART';
            }
        });

        if (booksArray.length !== 0) {
            count.classList.remove('d-none');
            count.innerHTML = booksArray.length;
        } else {
            count.classList.add('d-none');
        }
    });
}
