import { getResource } from "../services/services";


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
    getResource(endpoint, (data) => {
        data.forEach(({ picture, name, description, price, dataProduct, shopId }) => {
            new Card(picture, name, description, price, dataProduct, shopId, '.menu', addclass).render();
        });
        console.log(data)
        const productList = document.querySelectorAll('[data-product]');
        callback(productList); 
    });
}


export default cards;