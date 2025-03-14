document.addEventListener("DOMContentLoaded", () => {
    const buyNowButton = document.getElementById("buy-now-button");
    const paymentModal = document.getElementById("paymentModal");
    const paymentModalContent = document.querySelector(".payment-modal-content");
    const payButton = document.querySelector(".pay-button");

    const cardNumberInput = document.getElementById("card-number");
    const expirationDateInput = document.getElementById("expiration-date");
    const cvvInput = document.getElementById("cvv");

    // Open the payment modal when the "Buy it now!" button is clicked
    buyNowButton.addEventListener("click", () => {
        paymentModal.style.display = "flex";
    });

    // Close the modal when clicking outside of it
    paymentModal.addEventListener("click", (e) => {
        if (e.target === paymentModal) {
            paymentModal.style.display = "none";
        }
    });

    // Format the card number (4 digits - space)
    cardNumberInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "").slice(0, 16);
        value = value.replace(/(\d{4})/g, "$1 ").trim();
        e.target.value = value;
    });

    // Format the expiration date (MM/YY)
    expirationDateInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "").slice(0, 4);
        if (value.length > 2) {
            value = value.slice(0, 2) + "/" + value.slice(2);
        }
        e.target.value = value;
    });

    // Allow only 3 digits for CVV
    cvvInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3);
    });

    // When "Pay" is clicked, validate the payment and display a message
    payButton.addEventListener("click", () => {
        if (validatePayment()) {
            paymentModal.style.display = "none"; 
            alert("✅ Payment was successful!"); 
            clearCart(); 
        }
    });

    // Function to validate the payment
    function validatePayment() {
        const cardNumber = cardNumberInput.value.replace(/\s/g, "");
        const expirationDate = expirationDateInput.value;
        const cvv = cvvInput.value;

        if (cardNumber.length !== 16) {
            alert("❌ Card number must be exactly 16 digits.");
            return false;
        }

        if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
            alert("❌ Expiration date must be in MM/YY format.");
            return false;
        }

        if (cvv.length !== 3) {
            alert("❌ CVV must be exactly 3 digits.");
            return false;
        }

        return true;
    }

    // Function to clear the cart after a successful payment
    function clearCart() {
        const cartItems = document.querySelector(".cart-items");
        const totalPriceSpan = document.getElementById("total-price");

        if (cartItems) {
            cartItems.innerHTML = "";
        }
        if (totalPriceSpan) {
            totalPriceSpan.textContent = "$0.00"; 
        }

        localStorage.removeItem("cart"); 
    }
});
