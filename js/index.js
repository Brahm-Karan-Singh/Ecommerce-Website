function explore(){
    window.open("./products.html","self");
}
function about_us(){
    window.open("./portfolio.html","self");
}

// code for scrolling 
window.addEventListener('scroll',()=>{
    const scrol = window.scrollY;
    if(scrol>=740){
        document.querySelector('.scroll-up').style.opacity = '1'
    }else{
        document.querySelector('.scroll-up').style.opacity = '0'
    }
})



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