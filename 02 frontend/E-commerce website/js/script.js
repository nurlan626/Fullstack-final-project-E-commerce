const API_BASE = "http://localhost:8080/api";
export default API_BASE;

// Главный запуск
initializePage();

// === Инициализация страницы ===
function initializePage() {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
        displayGuestHeader();
        return;
    }

    axios.get(`${API_BASE}/auth/profile`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    .then(res => onAuthSuccess(res.data))
    .catch(err => onAuthFail(err));
}

// === Обработка успешной авторизации ===
function onAuthSuccess(profile) {
    console.info("Авторизация успешна:", profile);
    renderHeaderWithUser(profile);
    localStorage.setItem("user", JSON.stringify(profile));
}

// === Обработка ошибки авторизации ===
function onAuthFail(error) {
    if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
            alert("Сессия истекла. Пожалуйста, войдите снова.");
            localStorage.removeItem("token");
        } else {
            console.error("Ошибка сервера:", data);
            alert("Произошла ошибка на сервере.");
        }
    } else {
        console.error("Сетевое подключение недоступно:", error.message);
        alert("Проблемы с сетью. Проверьте интернет.");
    }
}

// === Выход из аккаунта ===
function signOutUser() {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
        console.log("Пользователь уже вышел");
        return;
    }

    axios.post(`${API_BASE}/auth/logout`, null, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    .then(() => {
        console.log("Выход выполнен");
        localStorage.removeItem("token");
        location.href = "/index.html";
    })
    .catch(err => {
        console.error("Ошибка при выходе:", err.response ? err.response.data : err.message);
    });
}

// === Отображение шапки с пользователем ===
function renderHeaderWithUser(user) {
    injectHeader();
    injectFooter();

    const menuArea = document.querySelector(".profileMenu");
    menuArea.innerHTML = `
        <a href="/pages/cart/cart.html">
            <i class="bi bi-cart3 fs-2 mx-3"></i>
        </a>
        <a href="/pages/profile/profile.html">
            <i class="bi bi-person-circle fs-2"></i>
        </a>
        <span class="username">${user.username}</span>
        <span class="logoutBtn btn btn-danger">Log out</span>
    `;

    document.querySelector(".logoutBtn").addEventListener("click", signOutUser);
}

// === Отображение шапки для незарегистрированных ===
function displayGuestHeader() {
    injectHeader();
    injectFooter();

    const menuArea = document.querySelector(".profileMenu");
    menuArea.innerHTML = `
        <a class="nav-link" href="/pages/login/login.html">Log in</a>
    `;
}

// === Шапка сайта ===
function injectHeader() {
    const headerElement = document.createElement("header");
    headerElement.innerHTML = `
        <div class="text-light" style="background: #DB4444;">
            <p class="text-center p-3">
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! 
                <a href="/pages/shop/shop.html">Shop now</a>
            </p>
        </div>
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <a class="navbar-brand" href="/index.html">E-commerce</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item"><a class="nav-link active" href="/index.html">Home</a></li>
                        <li class="nav-item"><a class="nav-link active" href="/pages/contact/contact.html">Contact</a></li>
                        <li class="nav-item"><a class="nav-link active" href="/pages/about/about.html">About</a></li>
                        <li class="nav-item"><a class="nav-link active" href="/pages/registration/registration.html">Sign up</a></li>
                        <li class="nav-item"><a href="/pages/shop/shop.html" class="btn btn-danger text-light">Shop</a></li>
                    </ul>
                    <form class="d-flex align-items-center" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search">
                        <i class="bi bi-search fs-3"></i>
                    </form>
                    <div class="profileMenu mx-3 d-flex align-items-center gap-2">
                        <a class="nav-link bg-danger text-light p-2 rounded" href="/pages/login/login.html">Log in</a>
                    </div>
                </div>
            </div>
        </nav>
    `;
    document.body.insertBefore(headerElement, document.body.firstChild);
}

// === Подвал сайта ===
function injectFooter() {
    const footerElement = document.createElement("footer");
    footerElement.innerHTML = `
        <footer class="p-5 text-light mt-5" style="background: #DB4444;">
            <div class="row">
                <div class="col-12 col-sm-2">
                    <h4 class="mb-3">Exclusive</h4>
                    <p>Subscribe</p>
                    <p>Get 10% off your first order</p>
                    <input class="p-2 bg-transparent border border-light text-light" type="text" placeholder="Enter your email">
                </div>
                <div class="col-12 col-sm-2">
                    <h4 class="mb-3">Support</h4>
                    <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
                    <p>exclusive@gmail.com</p>
                    <p>+88015-88888-9999</p>
                </div>
                <div class="col-12 col-sm-2">
                    <h4 class="mb-3">Account</h4>
                    <p>My Account</p>
                    <p>Login / Register</p>
                    <p>Cart</p>
                    <p>Shop</p>
                </div>
                <div class="col-12 col-sm-2">
                    <h4 class="mb-3">Quick Link</h4>
                    <p>Privacy Policy</p>
                    <p>Terms Of Use</p>
                    <p>FAQ</p>
                    <p>Contact</p>
                </div>
                <div class="col-12 col-sm-2">
                    <h4 class="mb-3">Download App</h4>
                    <p><small class="text-light">Save $3 with App New User Only</small></p>
                    <div><img src="/images/footer/qr.png" alt="QR Code"></div>
                </div>
            </div>
            <div class="mt-5">
                <p class="text-light text-center">Copyright Rimel 2022. All right reserved</p>
            </div>
        </footer>
    `;
    document.body.appendChild(footerElement);
}

console.log("Главный скрипт загружен");
