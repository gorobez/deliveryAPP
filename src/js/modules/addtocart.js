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


export default addToCart;