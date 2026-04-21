export const apiRequest = async (url, method = "GET", body = null) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`https://notes-qpy7.onrender.com/api${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : null,
    });

    if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return;
    }

    const json = await res.json();

    if (!json.success) {
        throw new Error(json.message || "Something went wrong");
    }

    return json.data;
};