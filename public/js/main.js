import { baseUrl } from "./api.js"

async function fetchProducts(url) {
    const res = await fetch(url);
    const json = await res.json();
    
    return json;
}


fetchProducts(baseUrl + "/products");

let favorites = [];

favorites += getFavorites();
console.log(favorites);

async function createProductHtml() {
    const productList = await fetchProducts(baseUrl + "/products")
    const productContainer = document.querySelector(".product-container");
    productList.forEach((element) => {

        if(checkFavorite(element.product_id)) {
            productContainer.innerHTML += `<div class="product-card">
            <img src="${element.image_url}" class="product-image">
            <div class="product-info-container">
            <p class="product-info-left">${element.name}</p>
            <p class="product-info-right">${element.price}$</p>
            </div>
            <div class="product-info-container space-bottom">
            <i class="fas fa-shopping-cart product-info-left icon-cart"></i>
            <i class="fas fa-heart product-info-right icon-heart" data-id=${element.product_id}></i>
            </div>    
        </div>`
        } else {
            productContainer.innerHTML += `<div class="product-card">
                <img src="${element.image_url}" class="product-image">
                <div class="product-info-container">
                <p class="product-info-left">${element.name}</p>
                <p class="product-info-right">${element.price}$</p>
                </div>
                <div class="product-info-container space-bottom">
                <i class="fas fa-shopping-cart product-info-left icon-cart"></i>
                <i class="far fa-heart product-info-right icon-heart" data-id=${element.product_id}></i>
                </div>    
            </div>`
        }

        
    })

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
    const product_id = product.getAttribute("data-id");
    let favorites = getFavorites();
    if(!favorites.includes(product_id)) {
        favorites.push(product_id)
        localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
        let index = favorites.indexOf(product_id);
        favorites.splice(index, 1);
        console.log(`removed product from favorites: ${product_id}`);
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
        return true;
    }
}