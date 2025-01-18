// Game State
let gameState = {
    health: 100,
    shield: 50,
    ammo: 30,
    kills: 0,
    playersAlive: 100,
    isGameStarted: false
};

// DOM Elements
const healthBar = document.getElementById('healthBar');
const healthValue = document.getElementById('healthValue');
const shieldBar = document.getElementById('shieldBar');
const shieldValue = document.getElementById('shieldValue');
const ammoCount = document.getElementById('ammoCount');
const killCount = document.getElementById('killCount');
const playerCount = document.getElementById('playerCount');
const attackBtn = document.getElementById('attackBtn');
const healBtn = document.getElementById('healBtn');
const reloadBtn = document.getElementById('reloadBtn');

// Form Validation
document.getElementById('playerForm').addEventListener('submit', function(event) {
    if (!this.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        event.preventDefault();
        startGame();
    }
    this.classList.add('was-validated');
});

// Email Validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('input', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
        this.setCustomValidity('Please enter a valid email address');
    } else {
        this.setCustomValidity('');
    }
});

// Game Functions
function startGame() {
    gameState.isGameStarted = true;
    updateUI();
    document.querySelector('.form-card').style.display = 'none';
}

function updateUI() {
    healthBar.style.width = `${gameState.health}%`;
    healthValue.textContent = `${gameState.health}/100`;
    shieldBar.style.width = `${gameState.shield}%`;
    shieldValue.textContent = `${gameState.shield}/100`;
    ammoCount.textContent = `${gameState.ammo}/30`;
    killCount.textContent = gameState.kills;
    playerCount.textContent = gameState.playersAlive;
}

function takeDamage(amount) {
    if (gameState.shield > 0) {
        gameState.shield = Math.max(0, gameState.shield - amount);
    } else {
        gameState.health = Math.max(0, gameState.health - amount);
    }
    updateUI();
}

function heal() {
    if (gameState.health < 100) {
        gameState.health = Math.min(100, gameState.health + 25);
        updateUI();
    }
}

function reload() {
    gameState.ammo = 30;
    updateUI();
}

// Event Listeners
attackBtn.addEventListener('click', () => {
    if (gameState.ammo > 0) {
        gameState.ammo--;
        if (Math.random() < 0.3) { // 30% chance to get a kill
            gameState.kills++;
            gameState.playersAlive = Math.max(1, gameState.playersAlive - 1);
        }
        updateUI();
    }
});

healBtn.addEventListener('click', () => {
    heal();
});

reloadBtn.addEventListener('click', () => {
    reload();
});

// Simulated enemy attacks
setInterval(() => {
    if (gameState.isGameStarted && Math.random() < 0.2) { // 20% chance to take damage every second
        takeDamage(10);
    }
}, 1000);