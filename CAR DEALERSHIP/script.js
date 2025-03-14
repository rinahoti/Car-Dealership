document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0;
    const carBrandText = document.getElementById("car-brand-text");
    const carImage = document.getElementById("car-image");
    const dotsContainer = document.getElementById("dots-container");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
  
    fetch("cars.json")
      .then(response => response.json())
      .then(cars => {
        // Dots
        cars.forEach((_, index) => {
          const dot = document.createElement("div");
          dot.classList.add("dot");
          dot.dataset.index = index;
          dotsContainer.appendChild(dot);
  
          dot.addEventListener("click", () => {
            updateCar(index, cars);
          });
        });

        updateCar(0, cars);


    // Left/Right navigation buttons
        prevBtn.addEventListener("click", () => {
          currentIndex = (currentIndex - 1 + cars.length) % cars.length;
          updateCar(currentIndex, cars);
        });
  
        nextBtn.addEventListener("click", () => {
          currentIndex = (currentIndex + 1) % cars.length;
          updateCar(currentIndex, cars);
        });
      })
      .catch(error => console.error("Gabim në ngarkimin e JSON:", error));
  
    function updateCar(index, cars) {
      currentIndex = index;
      const car = cars[index];
      carBrandText.textContent = car.brand; 
      carImage.src = car.image; 
  
      // Active Dot
      document.querySelectorAll(".dot").forEach(dot => dot.classList.remove("active"));
      document.querySelector(`.dot[data-index="${index}"]`).classList.add("active");
    }
  });
  


  document.addEventListener("DOMContentLoaded", function () {
    const carsContainer = document.getElementById("cars-container");

    const cars = [
        { name: "Mercedes Model 3", year: 2023, model: "LC76", fuel: "Petrol", price: "$36,620", img: "img/benz.png" },
        { name: "BMW X5", year: 2022, model: "X5", fuel: "Diesel", price: "$50,000", img: "img/bmw.png" },
        { name: "Audi A6", year: 2021, model: "A6", fuel: "Hybrid", price: "$45,500", img: "img/audi.png" },
        { name: "Tesla Model S", year: 2023, model: "Model S", fuel: "Electric", price: "$80,000", img: "img/tesla.png" },
        { name: "Ford Mustang", year: 2020, model: "GT", fuel: "Petrol", price: "$55,000", img: "img/ford-munstang.png" },
        { name: "Toyota Supra", year: 2022, model: "Supra", fuel: "Petrol", price: "$40,000", img: "img/toyota-supra.png" },
        { name: "Nissan GTR", year: 2023, model: "GTR", fuel: "Petrol", price: "$90,000", img: "img/nissan-gtr.png" },
        { name: "Lamborghini Huracan", year: 2021, model: "Huracan", fuel: "Petrol", price: "$200,000", img: "img/lamborghini-turacan.png" },
        { name: "Ferrari F8", year: 2022, model: "F8", fuel: "Petrol", price: "$250,000", img: "img/ferrari.png" },
        { name: "Porsche 911", year: 2023, model: "911", fuel: "Petrol", price: "$110,000", img: "img/porsche.png" },
        { name: "Range Rover", year: 2022, model: "Sport", fuel: "Diesel", price: "$85,000", img: "img/rangerover.png" },
        { name: "Chevrolet Camaro", year: 2020, model: "Camaro", fuel: "Petrol", price: "$38,000", img: "img/camaro.png" },
        { name: "Honda Civic", year: 2023, model: "Civic", fuel: "Hybrid", price: "$30,000", img: "img/honca-civic.png" },
        { name: "Hyundai Elantra", year: 2022, model: "Elantra", fuel: "Hybrid", price: "$28,000", img: "img/hyundai-elantra.png" },
        { name: "Kia Sportage", year: 2021, model: "Sportage", fuel: "Diesel", price: "$32,000", img: "img/kia.png" },
        { name: "Volkswagen Golf", year: 2020, model: "Golf GTI", fuel: "Petrol", price: "$29,000", img: "img/golf.png" }
    ];

    cars.forEach(car => {
        const carCard = document.createElement("div");
        carCard.classList.add("card");

        carCard.innerHTML = `
            <div class="card-header">
                <h3>${car.name}</h3>
                <p>Used</p>
            </div>
            <div class="card-content">
                <div class="image">
                    <img src="${car.img}" alt="${car.name}">
                </div>
                <ul>
                    <li><span>Model Year:</span> ${car.year}</li>
                    <li><span>Model:</span> ${car.model}</li>
                    <li><span>Fuel:</span> ${car.fuel}</li>
                </ul>
                <h3 class="price">${car.price}</h3>
                <button class="order-btn">Order now
                    <span><i class="fa solid fa-chevron-right"></i></span>
                </button>
            </div>
        `;


        // Event listener for the "Order now" button.
        const orderBtn = carCard.querySelector(".order-btn");
        orderBtn.addEventListener("click", () => {
            window.location.href = "menu.html";
        });

        carsContainer.appendChild(carCard);
    });
});