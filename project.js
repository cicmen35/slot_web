// Slot Machine Game - Web Version
// Based on the original console game

// Constants
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
};

// Game state
let balance = 0;
let numberOfLines = 1;
let bet = 0;

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Setup buttons
    const depositBtn = document.getElementById('deposit-btn');
    const spinBtn = document.getElementById('spin-btn');
    const playAgainBtn = document.getElementById('play-again-btn');
    
    // Input elements
    const depositInput = document.getElementById('deposit');
    const linesInput = document.getElementById('lines');
    const betInput = document.getElementById('bet-amount');
    
    // Game sections
    const bettingSection = document.getElementById('betting-section');
    const gameDisplay = document.getElementById('game-display');
    
    // Event listeners
    depositBtn.addEventListener('click', handleDeposit);
    spinBtn.addEventListener('click', handleSpin);
    playAgainBtn.addEventListener('click', resetGame);
    
    // Initialize focus
    depositInput.focus();
});

function handleDeposit() {
    const depositInput = document.getElementById('deposit');
    const depositAmount = parseFloat(depositInput.value);
    
    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Please enter a valid deposit amount.");
        return;
    }
    
    // Update balance and UI
    balance = depositAmount;
    document.getElementById('balance').textContent = balance.toFixed(2);
    
    // Show betting section
    document.getElementById('betting-section').classList.remove('hidden');
    document.getElementById('game-display').classList.remove('hidden');
    
    // Focus on lines input
    document.getElementById('lines').focus();
}

function handleSpin() {
    // Get bet info
    const linesInput = document.getElementById('lines');
    const betInput = document.getElementById('bet-amount');
    
    numberOfLines = parseInt(linesInput.value);
    bet = parseFloat(betInput.value);
    
    // Validate inputs
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
        alert("Please enter a valid number of lines (1-3).");
        return;
    }
    
    if (isNaN(bet) || bet <= 0 || bet > balance / numberOfLines) {
        alert("Please enter a valid bet amount.");
        return;
    }
    
    // Deduct bet amount from balance
    const totalBet = bet * numberOfLines;
    balance -= totalBet;
    document.getElementById('balance').textContent = balance.toFixed(2);
    
    // Spin the slot machine
    const reels = spin();
    const rows = transpose(reels);
    
    // Display the results
    displaySlotMachine(rows);
    
    // Calculate winnings
    const winnings = getWinnings(rows, bet, numberOfLines);
    
    // Update balance with winnings
    balance += winnings;
    document.getElementById('balance').textContent = balance.toFixed(2);
    
    // Display winnings message
    const winningsMessage = document.getElementById('winnings-message');
    if (winnings > 0) {
        winningsMessage.textContent = `You won $${winnings.toFixed(2)}!`;
        winningsMessage.style.color = 'green';
    } else {
        winningsMessage.textContent = 'No win this time. Try again!';
        winningsMessage.style.color = 'red';
    }
}

function resetGame() {
    // Reset winning highlights
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const symbolElement = document.getElementById(`r${row}c${col}`);
            symbolElement.classList.remove('winning-row');
        }
    }
    
    // Clear winnings message
    document.getElementById('winnings-message').textContent = '';
    
    // Focus on lines input for next round
    document.getElementById('lines').focus();
}

// Reusing original game logic functions with slight modifications
function spin() {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [[], [], []];
    for (let i = 0; i < COLS; i++) {
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
}

function transpose(reels) {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}

function displaySlotMachine(rows) {
    // Clear any previous winning row highlights
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const symbolElement = document.getElementById(`r${row}c${col}`);
            symbolElement.className = 'symbol';
        }
    }
    
    // Update symbols
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const symbol = rows[row][col];
            const symbolElement = document.getElementById(`r${row}c${col}`);
            
            symbolElement.textContent = symbol;
            symbolElement.className = `symbol symbol-${symbol}`;
        }
    }
}

function getWinnings(rows, bet, lines) {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
            
            // Highlight winning row
            for (let col = 0; col < COLS; col++) {
                const symbolElement = document.getElementById(`r${row}c${col}`);
                symbolElement.classList.add('winning-row');
            }
        }
    }

    return winnings;
}