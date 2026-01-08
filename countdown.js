// Retrieve username from localStorage
const username = localStorage.getItem('username');

// If no username is found, redirect to sign-in page
if (!username) {
    window.location.href = 'index.html';
}

// Display the username and fetch stored countdowns
document.querySelector('.container').insertAdjacentHTML('afterbegin', `<h2>${username}'s countdowns </h2>`);

// Load countdowns from localStorage
function loadCountdowns() {
    const countdowns = JSON.parse(localStorage.getItem('countdowns')) || [];
    const countdownList = document.getElementById('countdownList');
    countdownList.innerHTML = ''; // Clear any existing countdowns

    // If there are no countdowns, show the "No countdowns yet" message
    if (countdowns.length === 0) {
        countdownList.innerHTML = '<p>No countdowns yet. Add one!</p>';
    }

    // Loop through countdowns and display them
    countdowns.forEach((countdown, index) => {
        const countdownElement = document.createElement('div');
        countdownElement.classList.add('countdown');
        countdownElement.innerHTML = `
            <h4>${countdown.eventName}</h4>
            <p id="timer-${index}">${calculateTimeLeft(countdown.eventDate)}</p>
        `;
        countdownList.appendChild(countdownElement);
        startCountdown(index, countdown.eventDate);
    });
}

// Add a new countdown
document.getElementById('addCountdownForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;

    if (eventName && eventDate) {
        const countdowns = JSON.parse(localStorage.getItem('countdowns')) || [];
        countdowns.push({ eventName, eventDate });
        localStorage.setItem('countdowns', JSON.stringify(countdowns)); // Store new countdown
        loadCountdowns(); // Reload countdowns
    } else {
        alert('Please provide both event name and date!');
    }
});

// Calculate the time left for each countdown
function calculateTimeLeft(eventDate) {
    const now = new Date();
    const eventTime = new Date(eventDate);
    const timeDiff = eventTime - now;

    let totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Loop over each day and exclude weekends
    let weekdaysLeft = totalDays;
    for (let i = 0; i < totalDays; i++) {
        const day = new Date(now.getTime() + i * (1000 * 60 * 60 * 24)).getDay(); // Get day of week
        if (day === 6 || day === 0) { // If it's Saturday (6) or Sunday (0), exclude
            weekdaysLeft--; // Subtract one weekday
        }
    }

    // Calculate hours, minutes, and seconds as normal
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Return the countdown with weekends excluded
    return `${weekdaysLeft}d ${hours}h ${minutes}m ${seconds}s`;
}

// Start countdown timer for each event
function startCountdown(index, eventDate) {
    setInterval(function() {
        const timeLeft = calculateTimeLeft(eventDate);
        document.getElementById(`timer-${index}`).textContent = timeLeft;
    }, 1000); // Update every second
}

// Initial call to load countdowns
loadCountdowns();
