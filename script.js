// Set target date for countdown
const targetDate = new Date('2024-11-28T19:00:00').getTime(); // Change date as needed

// Countdown Timer
const countdownElement = document.getElementById('countdown');
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        countdownElement.textContent = "Time's Up!";
        clearInterval(timerInterval);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days}:${hours}:${minutes}:${seconds}`;
}
const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Voting Logic
let votes = { boxer1: 0, boxer2: 0 };

function vote(boxer) {
    votes[boxer]++;
    document.getElementById(`${boxer}-votes`).textContent = `Votes: ${votes[boxer]}`;
}
