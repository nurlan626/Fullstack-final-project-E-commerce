import restApiUrl from "../../js/script.js";

const tableBody = document.getElementById("productBody");
const modalImage = document.getElementById("modalImage");
const createProductBtn = document.getElementById("createProductBtn");

initPage();

function initPage() {
  fetchProducts();
  createProductBtn.addEventListener("click", () => {
    sessionStorage.setItem("formMode", "addNewProduct");
    window.location.href = "/pages/newProduct/newProduct.html";
  });
}

function fetchProducts() {
  const token = localStorage.getItem("token");

  axios
    .get(`${restApiUrl}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      renderTable(res.data);
    })
    .catch((err) => {
      console.error("Ошибка загрузки:", err);
      alert("Не удалось загрузить продукты.");
    });
}

function renderTable(products) {
  tableBody.innerHTML = "";

  products.forEach((item, idx) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${idx + 1}</td>
      <td>${item.brand}</td>
      <td>${item.model}</td>
      <td>${item.category}</td>
      <td>
        <img src="${item.imageUrl}" class="img-thumbnail product-thumb" width="200" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#previewModal"/>
      </td>
      <td>${item.price} $</td>
      <td>${item.rate}/5</td>
      <td>
        <button class="btn btn-primary me-2 edit-product" data-info='${JSON.stringify(item)}'>Edit</button>
        <button class="btn btn-danger remove-product" data-id="${item.id}">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  attachThumbnailEvents();
  attachEditEvents();
  attachDeleteEvents();
}

function attachThumbnailEvents() {
  document.querySelectorAll(".product-thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      modalImage.src = thumb.src;
    });
  });
}

function attachEditEvents() {
  document.querySelectorAll(".edit-product").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productData = btn.getAttribute("data-info");
      sessionStorage.setItem("product", productData);
      sessionStorage.setItem("formMode", "editProduct");
      window.location.href = "/pages/newProduct/newProduct.html";
    });
  });
}

function attachDeleteEvents() {
  const token = localStorage.getItem("token");

  document.querySelectorAll(".remove-product").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!confirm("Удалить продукт?")) return;

      const productId = btn.dataset.id;

      axios
        .delete(`${restApiUrl}/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert("Продукт удалён");
          fetchProducts();
        })
        .catch((err) => {
          console.error("Удаление не удалось:", err);
          alert("Ошибка при удалении");
        });
    });
  });
}
