document.addEventListener("DOMContentLoaded", () => {
    const cars = [
        { name: "Mercedes ", year: 2023, model: "LC76", fuel: "Petrol", price: 36620, img: "img/benz.png" },
        { name: "BMW X5", year: 2022, model: "X5", fuel: "Diesel", price: 50000, img: "img/bmw.png" },
        { name: "Audi A6", year: 2021, model: "A6", fuel: "Hybrid", price: 45500, img: "img/audi.png" },
        { name: "Tesla Model ", year: 2023, model: "Model S", fuel: "Electric", price: 80000, img: "img/tesla.png" },
        { name: "Ford Mustang", year: 2020, model: "GT", fuel: "Petrol", price: 55000, img: "img/ford-munstang.png" },
        { name: "Toyota Supra", year: 2022, model: "Supra", fuel: "Petrol", price: 40000, img: "img/toyota-supra.png" },
        { name: "Nissan GTR", year: 2023, model: "GTR", fuel: "Petrol", price: 90000, img: "img/nissan-gtr.png" },
        { name: "Lamborghini ", year: 2021, model: "Huracan", fuel: "Petrol", price: 200000, img: "img/lamborghini-turacan.png" },
        { name: "Ferrari F8", year: 2022, model: "F8", fuel: "Petrol", price: 250000, img: "img/ferrari.png" },
        { name: "Porsche 911", year: 2023, model: "911", fuel: "Petrol", price: 110000, img: "img/porsche.png" }
    ];

    const carList = document.querySelector(".car-list");
    const minPriceInput = document.getElementById("min-price");
    const maxPriceInput = document.getElementById("max-price");
    const cartItems = document.querySelector(".cart-items");
    const totalPriceSpan = document.getElementById("total-price");
    let cart = [];

    //Display Cars  Function 
    function displayCars(filteredCars) {
        carList.innerHTML = ""; 
        filteredCars.forEach(car => {
            const carDiv = document.createElement("div");
            carDiv.classList.add("car-item");
            carDiv.innerHTML = `
                <img src="${car.img}" alt="${car.name}">
                <h3>${car.name}</h3>
                <p>$${car.price.toLocaleString()}</p>
                <button class="add-to-cart">Add to Cart</button>
            `;
            carList.appendChild(carDiv);


            // Connection of the "Add to Cart" button with an event listener.
            const addToCartButton = carDiv.querySelector(".add-to-cart");
            addToCartButton.addEventListener("click", () => {
                addToCart(car);
            });
        });
    }

    // Add To Cart function
    function addToCart(car) {
        const existingCar = cart.find(item => item.name === car.name);
        if (existingCar) {
            existingCar.quantity++;
        } else {
            cart.push({ 
                ...car,
                quantity: 1 
            });
        }
        updateCart();
    }

    // Update Cart Function
    function updateCart() {
        cartItems.innerHTML = ""; 
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("cart-item"); 

            // Content of the item in the cart.
            cartItemDiv.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price.toLocaleString()}</p>
                <p>${item.quantity}</p>
                <button class="remove-from-cart">Remove</button>
            `;

            cartItems.appendChild(cartItemDiv);
            totalPrice += item.price * item.quantity;


        // Connection of the "Remove" button with the function for removing the item.
            const removeFromCartButton = cartItemDiv.querySelector(".remove-from-cart");
            removeFromCartButton.addEventListener("click", () => {
                removeItemFromCart(index);
            });
        });

        totalPriceSpan.textContent = `$${totalPrice.toLocaleString()}`; 
    }

    //Remove Item From Cart Function
    function removeItemFromCart(index) {
        cart.splice(index, 1); 
        updateCart();
    }

    // Filter Cars Function
    function filterCars() {
        const minPrice = parseInt(minPriceInput.value) || 0;
        const maxPrice = parseInt(maxPriceInput.value) || Infinity;

        const filteredCars = cars.filter(car => car.price >= minPrice && car.price <= maxPrice);
        displayCars(filteredCars);
    }

    // Event listeners for filters
    minPriceInput.addEventListener("input", filterCars);
    maxPriceInput.addEventListener("input", filterCars);


    displayCars(cars);
});
