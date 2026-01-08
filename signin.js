document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('error');

    // Simple validation (in real applications, you'd check these values with a server)
    if (username && password) {
        alert('Successfully signed in!');
        errorElement.textContent = '';
        localStorage.setItem('username', username);
        window.location.href = 'countdowns.html'; // Redirect to countdowns page
    } else {
        errorElement.textContent = 'Invalid username or password.';
    }
});
