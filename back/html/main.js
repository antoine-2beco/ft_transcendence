const backendcheck = document.getElementById('backendcheck');

backendcheck.addEventListener('click', async () => {
    const res = await fetch('/api/test123');
    console.log(await res.json());
});