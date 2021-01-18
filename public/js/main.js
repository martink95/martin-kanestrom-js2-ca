import { baseUrl } from "./api.js"

async function fetchProducts(url) {
    const res = await fetch(url);
    const json = await res.json();
    
    return json;
}


fetchProducts(baseUrl + "/articles");

let favorites = [];

favorites += getFavorites();
console.log(favorites);



async function createProductHtml() {
    const productList = await fetchProducts(baseUrl + "/articles")
    const productContainer = document.querySelector(".product-container");

    
    for(let i = 0; i < productList.length; i++) {
        let article_id = parseInt(productList[i].id)
        console.log(article_id);
        if(checkFavorite(article_id)) {
            
            
            productContainer.innerHTML += `<div class="product-card">
            <div class="product-info-container">
            <p class="product-info-left">${productList[i].title}</p>
            <p class="product-info-right">${productList[i].author}</p>
            </div>
            <div class="product-info-container">
            <p class="product-info-left">${productList[i].published_at}</p>
            </div>
            <div class="product-info-container">
            <p class="product-info-left">${productList[i].summary}</p>
            </div>
            <div class="product-info-container space-bottom">
            <i class="fas fa-shopping-cart product-info-left icon-cart"></i>
            <i class="fas fa-heart product-info-right icon-heart" data-id=${productList[i].id}></i>
            </div>    
        </div>`
        } else {
            productContainer.innerHTML += `<div class="product-card">
                <div class="product-info-container">
                <p class="product-info-left">${productList[i].title}</p>
                <p class="product-info-right">${productList[i].author}</p>
                </div>
                <div class="product-info-container">
            <p class="product-info-left">${productList[i].published_at}</p>
            </div>
            <div class="product-info-container">
            <p class="product-info-left">${productList[i].summary}</p>
            </div>
                <div class="product-info-container space-bottom">
                <i class="fas fa-shopping-cart product-info-left icon-cart"></i>
                <i class="far fa-heart product-info-right icon-heart" data-id=${productList[i].id}></i>
                </div>    
            </div>`
        }
    }

    const favButton = document.querySelectorAll(".icon-heart");
    favButton.forEach((e) => {
    e.addEventListener("click", () => {
        addToFavorites(e);
        productContainer.innerHTML = "";
        createProductHtml();
    })
    })
    
}


createProductHtml();


function addToFavorites(product) {
    const id = parseInt(product.getAttribute("data-id"));
    let favorites = getFavorites();
    if(!favorites.includes(id)) {
        favorites.push(id)
        localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
        let index = favorites.indexOf(id);
        favorites.splice(index, 1);
        console.log(`removed product from favorites: ${id}`);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    
}

function getFavorites() {
    const value = localStorage.getItem("favorites");
    if(!value) {
        return [];
    }

    return JSON.parse(value);
}

function checkFavorite(productId) {
    let favorites = getFavorites();
    if(favorites.includes(productId)) {
        console.log("found entry")
        return true;
    }
}