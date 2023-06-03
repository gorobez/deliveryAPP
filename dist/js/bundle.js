/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/addtocart.js":
/*!*************************************!*\
  !*** ./src/js/modules/addtocart.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
async function addToCart(productList) {
    const bagIcon = document.querySelector('[data-cart]');

    let bagList = document.querySelector('.bag-list');
    let totalCart = document.querySelector('.order-cart__total span');

    productList?.forEach(element => {
        console.log(element)
    });
    
    // Initialize the cart object
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      cart = {
        items: [],
        total: 0,
        count: 0,
      };
    }
    // Initialize the cart for display totalpriceItem
    updateCart();
    // Define the updateCart function
    function updateCart() {
      
        // Update the total price in the cart
        if (totalCart) {
        totalCart.textContent = cart.total;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
     
      // Update the bag list
      if (bagList && cart.items.length === 0) {
        bagList.innerHTML = '<p class = "bag-list__empty">Your cart is empty. Look at our catalog and choose the products that interest you.</p>';
      } else if (bagList) {
        bagList.innerHTML = '';
      }

      cart.items.forEach(item => {
        // Create the product element
        const product = document.createElement('div');
        product.classList.add('bag-list__product');

        // Add the product image
        const picture = document.createElement('div');
        picture.classList.add('bag-list__image')
        const image = document.createElement('img')
        image.src = item.image;
        image.alt = item.name;
        picture.append(image)
        product.append(picture);

        // Add the product details
        const details = document.createElement('div');
        details.classList.add('bag-list__details');

        const description = document.createElement('div');
        description.classList.add('bag-list__description');

        const name = document.createElement('h4');
        name.classList.add('bag-list__title')
        name.textContent = item.name;
        description.appendChild(name);

        const price = document.createElement('p');
        price.classList.add('bag-list__price')
        price.textContent = `${item.price.toFixed(2)} EUR`;
        details.appendChild(price);


        // create the quantity input element
        const quantityInput = document.createElement('div');
        quantityInput.classList.add('bag-list__quantity-wrapper')
        quantityInput.innerHTML = `
        <span>quantity:</span>
        <div data-quantity class="quantity">
          <button data-quantity-minus type="button" class="quantity__button quantity__button_minus"></button>
          <div class="quantity__input">
            <input data-quantity-value autocomplete="off" type="text" name="form[]" value="${item.quantity}">
          </div>
          <button data-quantity-plus type="button" class="quantity__button quantity__button_plus"></button>
        </div>
        `;

        // add an event listener to the quantity input
        quantityInput.querySelector('[data-quantity]').addEventListener('click', (event) => {
          const input = event.currentTarget.querySelector('[data-quantity-value]');
          const value = parseInt(input.value);
          const isPlus = event.target.matches('[data-quantity-plus]');

          if (isPlus) {
            input.value = value + 1;
          } else {
            input.value = Math.max(value - 1, 1);
          }

          item.quantity = parseInt(input.value);
          item.total = item.price * item.quantity;
          item.count = item.quantity;


          localStorage.setItem('cart', JSON.stringify(cart));

          // calculate the total for all items in the cart
          let cartTotal = 0;
          let cartCount = 0;
          for (const cartItem of cart.items) {
            cartTotal += cartItem.total;
            cartCount += cartItem.count;
          }
          cart.total = cartTotal;
          cart.count = cartCount;

          if (cart.count <= 0) {
            cart.count = 0;
          }
    
          updateCart();
        });
     

        // initialize the item total
        item.total = item.price * item.quantity;

        // add the quantity input to the details element
        details.append(quantityInput);

        const itemTotalPrice = document.createElement('div');
        itemTotalPrice.classList.add('bag-list__total-price')
        itemTotalPrice.innerHTML = `<span>Total price:</span> <p>${item.total.toFixed(2)} EUR </p>`;
        details.append(itemTotalPrice);


        const removeButton = document.createElement('button');
        removeButton.textContent = '×';
        removeButton.classList.add('bag-list__product-remove');
        removeButton.addEventListener('click', () => {
          const index = cart.items.indexOf(item);
          cart.items.splice(index, 1);
          cart.total -= item.price * item.quantity;
          cart.count -= item.quantity;
           if (cart.count <= 0) {
            cart.count = 0;
          }
          updateCart();
          
          if (bagListProd.length == 0) {
            bagList.classList.remove('bag-list--visible');
          }
        });

        details.append(removeButton);

        product.append(details);

        if (bagList) {
          bagList.append(product);
        }
      });
    }

     // Add click event listeners to the product cards
        productList?.forEach(card => {
      // Create a new scope for each product
      (function () {
        const addButton = card.querySelector('[data-addtobag]');
    
        addButton.addEventListener('click', (e) => {
          // Get the product details from the data attributes
            const price =  parseFloat(card.querySelector('[data-prod-price]').textContent);
            const image = card.querySelector('[data-prod-img]').src;
            const name = card.querySelector('[data-prod-title]').textContent;
            const shopID = card.dataset.shopid;
 
            const item = cart.items.find(item => item.name === name && item.price === price);
                
            const cardItem = {
                price,
                image,
                name,
                shopID,
                quantity: 1,
            };
            
            if (item) {
                item.quantity++;
            } else {
            cart.items.push(cardItem);
            }
            cart.total += price;
            cart.count++;
            
            localStorage.setItem('cart', JSON.stringify(cart));


          // Animate the product image
          const productId = e.target.closest('[data-product]').dataset.product;
          const product = document.querySelector(`[data-product = "${productId}"]`);
          const productImage = product.querySelector('img');

          const imageClone = productImage.cloneNode(true),
            imageCloneWidth = productImage.offsetWidth,
            imageCloneHeight = productImage.offsetHeight,
            imageCloneTop = productImage.getBoundingClientRect().top,
            imageCloneLeft = productImage.getBoundingClientRect().left;
                
          imageClone.setAttribute('class', 'fly-image');
          imageClone.style.cssText = `
            left: ${imageCloneLeft}px;
            top: ${imageCloneTop}px;
            width: ${imageCloneWidth}px;
            height: ${imageCloneHeight-50}px;
          `;  
          document.body.append(imageClone);

          const bagTop = bagIcon.getBoundingClientRect().top,
            bagLeft = bagIcon.getBoundingClientRect().left;

          // new value
          imageClone.style.cssText = `
            left: ${bagLeft}px;
            top: ${bagTop}px;
            width: 0px;
            height: 0px;
            opacity: 0;
          `; 

          imageClone.addEventListener('transitionend', () => {
            updateCart();
            imageClone.remove();
          })
        });
      })();
    });
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addToCart);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");



function cards(endpoint, addclass, callback) {
        class Card {
        constructor(picture, name, description, price, dataProduct, shopId, parentelector, addclass) {
            this.picture = picture;
            this.name = name;
            this.description = description;
            this.price = price;
            this.dataProduct = dataProduct;
            this.shopId = shopId;
            this.parent = document.querySelector(parentelector);
            this.addclass = addclass;
        }

            render() {
            const element = document.createElement('div');
            element.setAttribute('data-product', `${this.dataProduct}`);
            element.classList.add("item-menu", `${this.addclass}`);
            element.setAttribute('data-shopid', `${this.shopId}`);

            element.innerHTML = `
                <div class="item-menu__image">
                    <img data-prod-img src="http://localhost:4000/uploads/${this.picture}" alt="${this.name}">
                </div>
                <div class="item-menu__body">
                <h2 data-prod-title class="item-menu__name">${this.name}</h2>
                <p class="item-menu__price">Price: <span data-prod-price >${this.price}</span> $</p>
                <p class="item-menu__description">${this.description}</p>
                <button data-addtobag class="item-menu__button">Add to cart</button>
                </div>
            `;

            this.parent.append(element)
        }
    }

   // Make a GET request to fetch the products
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)(endpoint, (data) => {
        data.forEach(({ picture, name, description, price, dataProduct, shopId }) => {
            new Card(picture, name, description, price, dataProduct, shopId, '.menu', addclass).render();
        });
        console.log(data)
        const productList = document.querySelectorAll('[data-product]');
        callback(productList); 
    });
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/sendForm.js":
/*!************************************!*\
  !*** ./src/js/modules/sendForm.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Get a reference to the form element
function saveDadaForm() {
    const form = document.getElementById('save');

    if (form) {
        // Add an event listener to the form submit event
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission

            // Get the form data
            const formData = new FormData(form);

            // Create an object to hold the form data
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Retrieve the product list from local storage
            const productList = JSON.parse(localStorage.getItem('cart'));

            // Add the product list to the data object
            data.productList = productList;

            // Make an HTTP POST request to the server
            fetch('http://localhost:4000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('Form submitted successfully');
                        // Reset the form
                        form.reset();
                    } else {
                        console.error('Failed to submit the form');
                    }
                })
                .catch((error) => {
                    console.error('An error occurred while submitting the form:', error);
                });
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (saveDadaForm);

/***/ }),

/***/ "./src/js/services/displayedProducts.js":
/*!**********************************************!*\
  !*** ./src/js/services/displayedProducts.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_addtocart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/addtocart */ "./src/js/modules/addtocart.js");



    function displayedProducts() {
        const shopPage = document.querySelector('.shop')
        if(shopPage) {

        const buttonKFC = document.querySelector('[data-shop="kfc"]');
        buttonKFC.classList.add('_active');
        displayKFCProducts();
        const menu = document.querySelector('.menu')

        // Function to check if products request are displayed
        function areProductsDisplayed(className) {
            const products = document.querySelectorAll(className);
            return products.length > 0;
        }

        // Function to remove active class from all shop buttons
        function removeActiveClassFromButtons() {
            const shopButtons = document.querySelectorAll('[data-shop]');
            shopButtons.forEach(button => {
                button.classList.remove('_active');
            });
        }

        // Function to fetch and display products for "kfc" request
        function displayKFCProducts() {
            (0,_modules_cards__WEBPACK_IMPORTED_MODULE_0__["default"])("http://localhost:4000/products/60c81d4d1f29cd001b0dbafb", "kfc-product", _modules_addtocart__WEBPACK_IMPORTED_MODULE_1__["default"]);
        }

        // Function to fetch and display products for "Burger King" request
        function displayBurgerKingProducts() {
            (0,_modules_cards__WEBPACK_IMPORTED_MODULE_0__["default"])("http://localhost:4000/products/647758309bc4624350fe97c3", "burgerking-product", _modules_addtocart__WEBPACK_IMPORTED_MODULE_1__["default"]);
        }

        // Function to fetch and display products for "McDonald's" request
        function displayMcDonaldsProducts() {
            (0,_modules_cards__WEBPACK_IMPORTED_MODULE_0__["default"])("http://localhost:4000/products/64778a23f790daab75c30200", "mac-product", _modules_addtocart__WEBPACK_IMPORTED_MODULE_1__["default"]);
        }

        // Function to fetch and display products for "Big Burger" request
        function displayBigburgerProducts() {
            (0,_modules_cards__WEBPACK_IMPORTED_MODULE_0__["default"])("http://localhost:4000/products/64779eab28569c9f968b9a01", "bigburger-product", _modules_addtocart__WEBPACK_IMPORTED_MODULE_1__["default"]);
        }


        document.addEventListener("click", function (e) {
            const targerElement = e.target;

            // Event listener for "kfc" button click
            if (targerElement.dataset.shop === "kfc" && !areProductsDisplayed(".kfc-product")) {
                menu.innerHTML = ''
                removeActiveClassFromButtons();
                targerElement.classList.add('_active');
                displayKFCProducts();
            }

            // Event listener for "burger king" button click
            if (targerElement.dataset.shop === "burgerking" && !areProductsDisplayed(".burgerking-product")) {
                menu.innerHTML = ''
                removeActiveClassFromButtons();
                targerElement.classList.add('_active');
                displayBurgerKingProducts();
            }

            // Event listener for "McDonalds" button click
            if (targerElement.dataset.shop === "mcdonalds" && !areProductsDisplayed(".mac-product")) {
                menu.innerHTML = ''
                removeActiveClassFromButtons();
                targerElement.classList.add('_active');
                displayMcDonaldsProducts();
            }

            // Event listener for "Big Burger" button click
            if (targerElement.dataset.shop === "bigburger" && !areProductsDisplayed(".bigburger-product")) {
                menu.innerHTML = ''
                removeActiveClassFromButtons();
                targerElement.classList.add('_active');
                displayBigburgerProducts();
            }
        });

    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayedProducts);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
async function getResource(url, callback) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    const data = await res.json();
    callback(data);
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_addtocart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/addtocart */ "./src/js/modules/addtocart.js");
/* harmony import */ var _services_displayedProducts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/displayedProducts */ "./src/js/services/displayedProducts.js");
/* harmony import */ var _modules_sendForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/sendForm */ "./src/js/modules/sendForm.js");

;




window.addEventListener('DOMContentLoaded', () => {
    (0,_services_displayedProducts__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_addtocart__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_sendForm__WEBPACK_IMPORTED_MODULE_2__["default"])()
});


  

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map