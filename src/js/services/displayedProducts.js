import cards from "../modules/cards";
import addToCart from "../modules/addtocart";

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
            cards("http://localhost:4000/products/60c81d4d1f29cd001b0dbafb", "kfc-product", addToCart);
        }

        // Function to fetch and display products for "Burger King" request
        function displayBurgerKingProducts() {
            cards("http://localhost:4000/products/647758309bc4624350fe97c3", "burgerking-product", addToCart);
        }

        // Function to fetch and display products for "McDonald's" request
        function displayMcDonaldsProducts() {
            cards("http://localhost:4000/products/64778a23f790daab75c30200", "mac-product", addToCart);
        }

        // Function to fetch and display products for "Big Burger" request
        function displayBigburgerProducts() {
            cards("http://localhost:4000/products/64779eab28569c9f968b9a01", "bigburger-product", addToCart);
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

export default displayedProducts;