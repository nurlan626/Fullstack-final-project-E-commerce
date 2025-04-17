import restApiUrl from "../../js/script.js";

document.addEventListener('DOMContentLoaded', () => {
    initializeCheckout();
    loadCartData();
});

function initializeCheckout() {
    const checkoutForm = document.getElementById('checkoutForm');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleFormSubmission);
    }
}

function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    
    if (!form.checkValidity()) {
        event.stopPropagation();
    } else {
        const formData = new FormData(form);
        const customerData = Object.fromEntries(formData.entries());
        
        console.log(customerData);
        processOrder();
    }
    
    form.classList.add('was-validated');
}

function loadCartData() {
    const authToken = localStorage.getItem('token');
    
    if (!authToken) {
        console.error("Authentication token not found");
        return;
    }
    
    const requestConfig = {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    };
    
    axios.get(`${restApiUrl}/cart`, requestConfig)
        .then(response => {
            const cartItems = response.data;
            
            if (Array.isArray(cartItems)) {
                updateOrderSummary(cartItems);
            } else {
                alert("Invalid data format received from server");
            }
        })
        .catch(error => {
            console.error("Failed to fetch cart data:", error);
            alert("Error loading cart data. Please try again.");
        });
}

function updateOrderSummary(cartItems) {
    const totalAmount = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    
    const subtotalElement = document.querySelector(".subtotal");
    const totalElement = document.querySelector(".total");
    
    if (subtotalElement) subtotalElement.textContent = `${totalAmount}$`;
    if (totalElement) totalElement.textContent = `${totalAmount}$`;
}

function processOrder() {
    const authToken = localStorage.getItem('token');
    
    if (!authToken) {
        console.error("Authentication token not found");
        return;
    }
    
    const requestConfig = {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    };
    
    axios.delete(`${restApiUrl}/cart/clear`, requestConfig)
        .then(() => {
            alert("Order placed successfully!");
            
            setTimeout(() => {
                window.location.href = "/index.html";
            }, 3000);
        })
        .catch(error => {
            console.error("Failed to process order:", error);
            alert("Error processing your order. Please try again.");
        });
}