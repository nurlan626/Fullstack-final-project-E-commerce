import restApiUrl from "/js/script.js";

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
    }

    const payload = {
        name: document.getElementById("inputName").value.trim(),
        surname: document.getElementById("inputSurname").value.trim(),
        email: document.getElementById("inputEmail").value.trim(),
        username: document.getElementById("inputUsername").value.trim(),
        password: document.getElementById("inputPassword").value.trim(),
    };

    try {
        const response = await axios.post(`${restApiUrl}/auth/register`, payload);
        const msg = response.data.message || "Регистрация прошла успешно!";
        alert("Успешная регистрация: " + msg);
        window.location.assign("/pages/logIn/login.html");
    } catch (err) {
        console.error(err);
        if (err.response) {
            alert("Ошибка при регистрации: " + err.response.data);
        } else if (err.request) {
            alert("Ошибка сети: сервер недоступен.");
        } else {
            alert("Произошла непредвиденная ошибка: " + err.message);
        }
    }

    form.classList.add("was-validated");
});
