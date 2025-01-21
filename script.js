const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];
const colorDisplay = document.getElementById("color-display");
const buttonsContainer = document.querySelector(".buttons");
const scoreDisplay = document.getElementById("score");
const timeLeftDisplay = document.getElementById("time-left");
const gameOverText = document.getElementById("game-over");
const restartButton = document.getElementById("restart-button");
const coinsound=document.getElementById('sound')
const errorsound=document.getElementById('soundwrong')
let score = 0;
let timeLeft = 30; 
let timer;
 // Generate random color name and buttons
 function generateGame() {
    buttonsContainer.innerHTML = ""; 
    const correctColor = colors[Math.floor(Math.random() * colors.length)];
    colorDisplay.textContent = correctColor.toUpperCase();
    let textColor;
    do {
        textColor = colors[Math.floor(Math.random() * colors.length)];
    } while (textColor === correctColor); 
    colorDisplay.style.color = textColor;
    // Create buttons with random colors
    const shuffledColors = shuffleArray([...colors]);
    shuffledColors.forEach(color => {
        const button = document.createElement("button");
        button.classList.add("color-button");
        button.style.backgroundColor = color;
        button.onclick = () => checkAnswer(color, correctColor);
        buttonsContainer.appendChild(button);
    });
}function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// Check if the selected button matches the displayed color name
function checkAnswer(selectedColor, correctColor) {
    if (selectedColor === correctColor) {
        score++;
        coinsound.play() 
    } else {
        score = Math.max(0, score - 1); // Prevent negative scores
        errorsound.play()
    }
    scoreDisplay.textContent = score;
    generateGame(); // Generate new game
} function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}
// End the game
function endGame() {
    gameOverText.style.display = "block";
    buttonsContainer.innerHTML = "";
    colorDisplay.textContent = "Game Over!";
    restartButton.style.display = "inline-block";
}
function restartGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;
    gameOverText.style.display = "none";
    restartButton.style.display = "none";
    generateGame();
    startTimer();
}
// Initialize the game
function initGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = `score : ${score}`;
    timeLeftDisplay.textContent = timeLeft;
    gameOverText.style.display = "none";
    restartButton.style.display = "none";
    generateGame();
    startTimer();
}
// Start the game when the page loads
initGame();