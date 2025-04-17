import apiUrl from "/js/script.js";


const form = document.getElementById("authForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const usernameInput = document.getElementById("loginUser");
    const passwordInput = document.getElementById("loginPass");

    const user = usernameInput.value.trim();
    const pass = passwordInput.value.trim();

    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
    }

    const payload = {
        username: user,
        password: pass,
    };

    try {
        const result = await axios.post(apiUrl + "/auth/login", payload);
        const token = result.data;
        if (token) {
            localStorage.setItem("token", token);
            alert("Successful login");
        } else {
            alert("Successful login");
        }
        window.location.href = "/index.html";
    } catch (err) {
        if (err.response?.data?.message) {
            alert("Login error: " + err.response.data.message);
        } else if (err.request) {
            alert("Request error: No response from the server.");
        } else {
            alert("Unknown error: " + err.message);
        }
    }

    form.classList.add("was-validated");
});
