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

// Changing Chhabra Associates to CA 
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



// Populating the product and values 
let subtotal = 0;

window.addEventListener('DOMContentLoaded',populateProducts);

function populateProducts(){
  let products;
  products = JSON.parse(sessionStorage.getItem('products'));
  products.forEach(element => {
    createUI(element);
  });
}


function createUI(product){
  let price = product[0];
  let productName = product[1];
  let packageValue = product[2];
  let quantityValue = product[3];

  // Creating UI element 
  let tr = document.createElement('tr');
  
  // First td 
  let td1 = document.createElement('td');
  td1.classList = "product-name";
  td1.innerHTML = `<div class="pn">${productName}</div>
                  <div class="qty-wrapper">
                    Qty-<pre class="qty">${packageValue}</pre> Lt
                  </div>
                  <small class="remove">Remove</small>`;

  // Second td 
  let td2 = document.createElement('td');
  td2.innerText = quantityValue;

  // Third td 
  let td3 = document.createElement('td');
  td3.innerText = `${packageValue} Lt`;

  // Fourth td 
  let td4 = document.createElement('td');
  td4.innerHTML = `Rs <pre class="qty">${parseInt(price) * parseInt(quantityValue)}</pre>`;
  let total = parseInt(price) * parseInt(quantityValue);
  subtotal += total;

  // Fifth td 
  let td5 = document.createElement('td');
  td5.classList = "delete-icon";
  td5.innerHTML = `<i class="fas fa-trash-alt delete"></i>`

  let arrOfTd = [td1 , td2 , td3 , td4 , td5];

  arrOfTd.forEach(tdElem => {
    tr.appendChild(tdElem);
  })

  document.querySelector('tbody').insertBefore(tr , document.querySelector('tbody').lastElementChild);

  document.querySelector('.subtotal-value').innerText = `${subtotal}`;
  
}


// Removing the products when clicked on garbage icon
document.addEventListener('click', e=>{
  if(e.target.classList.contains('delete')){
    let price = parseInt(e.target.parentElement.parentElement.children[3].innerText.substring(2));
    subtotal -= price;
    document.querySelector('.subtotal-value').innerText = `${subtotal}`;
    e.target.parentElement.parentElement.remove();
    console.log(e.target.parentElement.parentElement.children[0].firstElementChild.innerText);
    // Also Remove From Session Storage 
    removeFromSs(e.target.parentElement.parentElement.children[0].firstElementChild.innerText)
  }
})


function removeFromSs(selectedEm){
  let products;
  if(sessionStorage.getItem('products') === null){
    products = [];
  }else{
    products = JSON.parse(sessionStorage.getItem('products'));
  }

  products.forEach((product , index) =>{
    if(product[1] === selectedEm){
      products.splice(index , 1);
    }
  })

  sessionStorage.setItem('products' , JSON.stringify(products));
}


// Removing products when clicked on remove text 
document.addEventListener('click' , e => {
  if(e.target.classList.contains('remove')){
    e.target.parentElement.parentElement.remove();
    let price = parseInt(e.target.parentElement.parentElement.children[3].innerText.substring(2));
    subtotal -= price;
    document.querySelector('.subtotal-value').innerText = `${subtotal}`;

    // Removing it from Session storage as well 
    removeFromSs(e.target.previousElementSibling.previousElementSibling.innerText);
  }
})