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
export default saveDadaForm;