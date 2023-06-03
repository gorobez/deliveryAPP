'use strict'
import addToCart from './modules/addtocart';
import displayedProducts from './services/displayedProducts';
import saveDadaForm from './modules/sendForm';


window.addEventListener('DOMContentLoaded', () => {
    displayedProducts();
    addToCart();
    saveDadaForm()
});


  
