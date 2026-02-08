const register = document.getElementById('register');
const login = document.getElementById('login');

register.addEventListener('click', async () => {
    const username = document.getElementById("usernameregister").value;
    const password = document.getElementById("passwordregister").value;
    const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    console.log(data);
});

login.addEventListener('click', async () => {
    const username = document.getElementById("usernamelogin").value;
    const password = document.getElementById("passwordlogin").value;
    const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    console.log(data);
});