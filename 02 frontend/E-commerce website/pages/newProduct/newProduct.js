import restApiUrl from "../../js/script.js";

const form = document.querySelector(".product-form");
const imgPreview = document.querySelector(".preview-image");
const resetButton = document.querySelector(".btn-reset");
const imageField = document.querySelector(".input-image");
const formMode = sessionStorage.getItem("formMode");
const existingProduct = JSON.parse(sessionStorage.getItem("product"));

document.querySelector(".page-title").textContent =
    formMode === "editProduct" ? "Edit Product" : "Create Product";

imageField.addEventListener("input", () => {
    imgPreview.src = imageField.value.trim();
});

resetButton.addEventListener("click", () => {
    imgPreview.src = "";
});

if (formMode === "editProduct" && existingProduct) {
    const fields = {
        brand: ".input-brand",
        model: ".input-model",
        category: ".input-category",
        description: ".input-description",
        price: ".input-price",
        rate: ".input-rate",
        imageUrl: ".input-image"
    };

    for (let key in fields) {
        const input = document.querySelector(fields[key]);
        if (input) input.value = existingProduct[key] || "";
    }
    imgPreview.src = existingProduct.imageUrl || "";
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    form.classList.add("was-validated");

    if (!form.checkValidity()) return;

    const formData = new FormData(form);
    const productData = Object.fromEntries(formData.entries());
    const token = localStorage.getItem("token");

    try {
        if (formMode === "addNewProduct") {
            await axios.post(`${restApiUrl}/products`, productData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Product successfully added.");
        } else if (formMode === "editProduct") {
            await axios.put(`${restApiUrl}/products/${existingProduct.id}`, productData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Product successfully updated.");
        }
        setTimeout(() => {
            location.href = "/pages/userProducts/userProducts.html";
        }, 2500);
    } catch (err) {
        console.error("Request error:", err);
        alert("An error occurred while saving the product.");
    }
});
