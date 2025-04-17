import restApiUrl from "../../js/script.js";

const container = document.getElementById("productContainer");
const productData = JSON.parse(localStorage.getItem("product"));

if (!productData) {
    console.warn("Продукт отсутствует в localStorage.");
} else {
    renderProduct(productData);
}

function renderProduct(product) {
    const productHTML = `
        <div class="col-md-7 mb-4">
            <div class="p-4 shadow-sm bg-white">
                <img src="${product.imageUrl}" alt="${product.model}" class="img-fluid rounded">
            </div>
        </div>
        <div class="col-md-5">
            <section class="p-2">
                <h2 class="h4 mb-3">${product.brand} ${product.model}</h2>
                <div class="mb-2 text-warning d-flex align-items-center gap-1">
                    ${'<i class="bi bi-star-fill"></i>'.repeat(4)}
                    <i class="bi bi-star"></i>
                    <span class="text-muted ms-2 small">(150 reviews)</span>
                </div>
                <div class="h5 mb-3 text-dark">${product.price}$</div>
                <p class="mb-3">${product.description}</p>
                <hr>
                <button type="button" class="btn btn-dark w-100 py-2 fw-semibold" id="addCartBtn">
                    Add to Cart
                </button>
            </section>

            <div class="mt-4 p-3 border border-dark rounded-2 d-flex">
                <div class="me-3 fs-3"><i class="bi bi-box"></i></div>
                <div>
                    <h6 class="fw-bold mb-1">Free Delivery</h6>
                    <p class="mb-0 small text-decoration-underline">Enter your postal code for Delivery Availability</p>
                </div>
            </div>

            <div class="mt-3 p-3 border border-dark rounded-2 d-flex">
                <div class="me-3 fs-3"><i class="bi bi-arrow-counterclockwise"></i></div>
                <div>
                    <h6 class="fw-bold mb-1">Return Delivery</h6>
                    <p class="mb-0 small text-decoration-underline">Free 30 Days Delivery Returns. Details</p>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = productHTML;

    document.getElementById("addCartBtn").addEventListener("click", () => {
        const token = localStorage.getItem("token");

        if (!token || !product.id) {
            console.error("Token или ID продукта отсутствует.");
            return;
        }

        axios.post(`${restApiUrl}/cart/${product.id}?quantity=1`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            alert("Product added to cart!");
            console.info("Ответ сервера:", res.data);
        })
        .catch(err => {
            console.error("Ошибка при добавлении в корзину:", err.message);
        });
    });
}
