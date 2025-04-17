import restApiUrl from "../../js/script.js";

const renderUserProfile = (data) => {
    const container = document.getElementById("userInfoContainer");

    const title = document.createElement("h2");
    title.textContent = "User Details";
    title.classList.add("text-danger", "fw-bold", "mb-4", "display-6");

    const details = document.createElement("ul");
    details.className = "list-unstyled fs-5";

    const fields = ["name", "surname", "email", "username"];
    fields.forEach(field => {
        const item = document.createElement("li");
        item.innerHTML = `<span class="fw-semibold text-capitalize">${field}:</span> ${data[field]}`;
        item.classList.add("mb-2");
        details.appendChild(item);
    });

    container.innerHTML = "";
    container.appendChild(title);
    container.appendChild(details);
};

const loadUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("No profile available");
        return;
    }

    try {
        const response = await axios.get(`${restApiUrl}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        renderUserProfile(response.data);
    } catch (err) {
        console.error("Failed to load user profile", err.response?.data || err.message);
    }
};

loadUserProfile();
