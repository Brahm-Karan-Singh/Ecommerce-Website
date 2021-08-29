function myFunction(x) {
    if (x.matches) { // If media query matches
      document.querySelector('.logo').innerHTML = `<span>C</span>A`;
      document.querySelector('.logo').style.fontFamily = 'Quicksand, sans-serif';
    }else{
      document.querySelector('.logo').innerHTML = `<span>Chhabra</span>Associates`;
    }
  }
  
  var x = window.matchMedia("(max-width: 500px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes

  
// Dynamic Change of Rates 

// Declaring Variables 
const selectTag = document.getElementById('quantity');
const preTag = document.getElementById('rate-display');
const quantity = document.getElementById('quantityOfProduct');
var previousValue , currentValue;

// Adding listeners to capture previous and current values
  //  and do calculations 

selectTag.addEventListener('focus',(e)=>{
  previousValue = parseInt(e.target.value);
})
selectTag.addEventListener('change', changedValue);

function changedValue(e){
  currentValue = parseInt(e.target.value);

  // Logic 
  if(previousValue > currentValue){
    let number = previousValue / currentValue;
    let newRate = parseInt(preTag.innerText) / number;
    preTag.innerText = newRate;
  }else{
    let number = currentValue / previousValue;
    let newRate = parseInt(preTag.innerText) * number;
    preTag.innerText = newRate;
  }

  previousValue = currentValue;
}

// Getting every variable and exporting to cart.js 
const cartButton = document.querySelector('.addToCart');
let quantityOfProduct , nameOfProduct , packageOfProduct , priceOfProduct;
let arrOfInfo = []
let products;

cartButton.addEventListener('click',(e)=>{
  applyStyleToButton();
  getAllVariables();
  storeIntoSessionStorage();
})

// Applying Style To Button After Getting Clicked
function applyStyleToButton(){
  cartButton.innerText = "Added To Cart";
  cartButton.style.color = "coral";
  cartButton.style.backgroundColor = "white";
  cartButton.style.border = "1px solid coral";
}

// Getting all the variables 
function getAllVariables(){
  arrOfInfo.push(document.getElementById('rate-display').innerText);
  arrOfInfo.push(document.querySelector('.description').firstElementChild.innerText);
  arrOfInfo.push(selectTag.value);
  arrOfInfo.push(quantity.value);

}
function storeIntoSessionStorage(){

  if(sessionStorage.getItem('products') === null){
    products =[];
  }else{
    products = JSON.parse(sessionStorage.getItem('products'));
  }

  products.forEach((product)=>{
    console.log(product[1]);
    if(product[1] === arrOfInfo[1]){
      arrOfInfo = [];
    }
    console.log(arrOfInfo);
  })

  if(arrOfInfo.length !== 0){
    products.push(arrOfInfo);
  }
  
  sessionStorage.setItem('products',JSON.stringify(products));
  arrOfInfo =[];
}

// Showing Cart Description 
var cartOpen = false;
document.querySelector('.cart').addEventListener('click',()=>{
    if(cartOpen){
        document.querySelector('.cart-desc').style.display = "none";
        cartOpen = false
    }else{
        cartOpen = true;
        document.querySelector('.cart-desc').style.display = "flex";
    }
})