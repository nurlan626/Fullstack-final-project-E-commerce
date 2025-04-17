import restApiUrl from '../../js/script.js';

const container = document.querySelector(".products");
let productData = [];

initProducts();

function initProducts() {
    axios.get(`${restApiUrl}/products/all`)
        .then(res => {
            productData = res.data;
            renderProducts(productData);
            renderCategories(productData);
            setupRatingFilter(productData);
        })
        .catch(err => console.log("Error:", err.message));
}

function renderProducts(list) {
    container.innerHTML = "";

    list.forEach(item => {
        const col = document.createElement("div");
        col.className = "col";

        const rating = createStars(item.rate);
        const reviewCount = item.reviewsCount || Math.floor(Math.random() * 100);

        col.innerHTML = `
            <div class="card border-0 h-100">
                <div class="p-3 bg-light">
                    <img src="${item.imageUrl}" class="img-fluid product-trigger" alt="product" data-info='${JSON.stringify(item)}'>
                </div>
                <div class="card-body">
                    <h6 class="fw-semibold">${item.brand} ${item.model}</h6>
                    <p class="text-danger">${item.price}$</p>
                    <div>${rating} <span class="text-muted">(${reviewCount})</span></div>
                    <button class="btn btn-dark mt-2 w-100 cart-btn" data-info='${JSON.stringify(item)}'>add to cart</button>
                </div>
            </div>
        `;

        container.appendChild(col);
    });

    document.querySelectorAll(".cart-btn").forEach(btn => {
        btn.onclick = () => {
            const item = JSON.parse(btn.dataset.info);
            handleAddToCart(item);
        };
    });

    document.querySelectorAll(".product-trigger").forEach(img => {
        img.onclick = () => {
            const item = JSON.parse(img.dataset.info);
            localStorage.setItem("product", JSON.stringify(item));
            location.href = "/pages/product/product.html";
        };
    });
}

function createStars(count) {
    return Array.from({ length: count }, () => '<i class="bi bi-star-fill text-warning"></i>').join('');
}

function handleAddToCart(product) {
    const token = localStorage.getItem("token");
    if (!token) return console.error("Auth token not found");

    axios.post(`${restApiUrl}/cart/${product.id}?quantity=1`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(() => alert("Product added to cart"))
        .catch(err => console.error("Failed to add to cart:", err.message));
}

function renderCategories(data) {
    const catWrapper = document.querySelector(".categories");
    catWrapper.innerHTML = "";

    const unique = [...new Set(data.map(i => i.category))];

    unique.forEach(cat => {
        const el = document.createElement("div");
        el.textContent = cat;
        el.className = "py-1 px-2 category-item";
        catWrapper.appendChild(el);

        el.onclick = () => {
            const filtered = data.filter(p => p.category === cat);
            renderProducts(filtered);
        };
    });
}

function setupRatingFilter(data) {
    const ratings = document.querySelectorAll(".rate-option");
    ratings.forEach(opt => {
        opt.onclick = () => {
            const rate = Number(opt.dataset.rate);
            const result = data.filter(p => p.rate === rate);
            renderProducts(result);
        };
    });
}

const sortSelect = document.querySelector(".sort-control");
if (sortSelect) {
    sortSelect.onchange = (e) => {
        const order = e.target.value === "1" ? "asc" : "desc";
        const sorted = sortByPrice(productData, order);
        renderProducts(sorted);
    };
}

function sortByPrice(arr, direction = "asc") {
    return [...arr].sort((a, b) => direction === "asc" ? a.price - b.price : b.price - a.price);
}

const resetBtn = document.querySelector(".reset-btn");
if (resetBtn) {
    resetBtn.onclick = () => {
        renderProducts(productData);
    };
}

const searchInput = document.querySelector(".form-control");
if (searchInput) {
    searchInput.oninput = (e) => {
        const term = e.target.value.toLowerCase();
        const found = productData.filter(p =>
            (p.brand + " " + p.model).toLowerCase().includes(term)
        );
        renderProducts(term ? found : productData);
    };
}
