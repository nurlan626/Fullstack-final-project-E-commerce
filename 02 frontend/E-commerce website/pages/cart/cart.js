import API_BASE from "../../js/script.js";

let finalAmount = 0;

function fetchCart() {
  const authToken = localStorage.getItem("token");

  axios
    .get(`${API_BASE}/cart`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    .then(({ data }) => {
      if (Array.isArray(data)) {
        renderCartItems(data);
      } else {
        alert("Сервер вернул неправильный формат данных");
      }
    })
    .catch(showError);
}

function renderCartItems(items) {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";
  let total = 0;

  items.forEach((item) => {
    const image = item.imageUrl || "placeholder.jpg";
    const name = `${item.brand || "Brand"} ${item.model || "Model"}`;
    const price = item.price || 0;
    const quantity = item.quantity || 1;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="${image}" alt="${name}" width="70" class="me-2"/>
        ${name}
      </td>
      <td>${price}$</td>
      <td>
        <input type="number" min="1" value="${quantity}" 
          class="form-control cart-qty" style="width: 70px;" 
          data-id="${item.productId}">
      </td>
      <td>${price * quantity}$</td>
      <td>
        <button class="btn btn-sm btn-danger remove-item" data-id="${item.productId}">×</button>
      </td>
    `;
    container.appendChild(row);
    total += price * quantity;
  });

  finalAmount = total;
  updateCartSummary(total);
  activateEvents();
}

function activateEvents() {
  document.querySelectorAll(".cart-qty").forEach((input) => {
    input.addEventListener("change", (e) => {
      const productId = e.target.dataset.id;
      const newQty = parseInt(e.target.value);
      if (newQty > 0) {
        modifyQuantity(productId, newQty);
      } else {
        alert("Количество должно быть больше нуля");
      }
    });
  });

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      deleteItem(productId);
    });
  });
}

function modifyQuantity(productId, newAmount) {
  const token = localStorage.getItem("token");

  axios
    .put(`${API_BASE}/cart/${productId}`, null, {
      headers: { Authorization: `Bearer ${token}` },
      params: { quantity: newAmount },
    })
    .then(fetchCart)
    .catch(showError);
}

function deleteItem(productId) {
  const token = localStorage.getItem("token");

  axios
    .delete(`${API_BASE}/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      alert("Продукт успешно удалён");
      fetchCart();
    })
    .catch(showError);
}

function updateCartSummary(total) {
  document.getElementById("subtotalPrice").textContent = `${total}$`;
  document.getElementById("totalPrice").textContent = `${total}$`;
}

function showError(err) {
  if (err.response) {
    alert(`Ошибка сервера: ${err.response.data.message || err.response.data}`);
  } else if (err.request) {
    alert("Нет ответа от сервера");
  } else {
    alert(`Произошла ошибка: ${err.message}`);
  }
}

document.querySelector(".proceedCheckout").addEventListener("click", () => {
  if (finalAmount > 0) {
    window.location.href = "/pages/checkout/checkout.html";
  } else {
    alert("Корзина пуста");
  }
});

fetchCart();
