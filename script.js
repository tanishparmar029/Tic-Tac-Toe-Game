const cells = document.querySelectorAll('[data-cell]');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popupMessage');
const closePopupBtn = document.getElementById('closePopupBtn');
const newGameBtn = document.getElementById('newGameBtn');
const resetGameBtn = document.getElementById('resetGameBtn');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

let isXTurn = true;
let gameBoard = Array(9).fill(null);
let scoreX = 0;
let scoreO = 0;

function handleClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (gameBoard[index] || checkWinner()) return;

    gameBoard[index] = isXTurn ? 'X' : 'O';
    cell.textContent = gameBoard[index];
    cell.classList.add(isXTurn ? 'x' : 'o');

    if (checkWinner()) {
        showPopup(isXTurn ? 'Player X Wins!' : 'Player O Wins!');
        updateScore(isXTurn ? 'X' : 'O');
    } else if (!gameBoard.includes(null)) {
        showPopup('It\'s a Draw!');
    }

    isXTurn = !isXTurn;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = 'flex';
}

function hidePopup() {
    popup.style.display = 'none';
}

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
        scoreXElement.textContent = scoreX;
    } else if (winner === 'O') {
        scoreO++;
        scoreOElement.textContent = scoreO;
    }
}

function resetGame() {
    gameBoard = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    isXTurn = true;
}

newGameBtn.addEventListener('click', resetGame);
resetGameBtn.addEventListener('click', () => {
    resetGame();
    scoreX = 0;
    scoreO = 0;
    scoreXElement.textContent = scoreX;
    scoreOElement.textContent = scoreO;
});
cells.forEach(cell => cell.addEventListener('click', handleClick));
closePopupBtn.addEventListener('click', hidePopup);
