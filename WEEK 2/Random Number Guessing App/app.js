const userInput = document.querySelector("#guess-input");
const checkBtn = document.querySelector("#check-btn");
const guessFeedback = document.querySelector("#feedback");
let attemptsLeft = document.querySelector("#attempts");
const resetBtn = document.querySelector("#reset-btn");

let randomNumber;
let attempts;

function initializeGame() {
  randomNumber = parseInt(Math.random() * 100 + 1);
  attempts = 5;
  userInput.value = "";
  attemptsLeft.textContent = attempts;
  guessFeedback.textContent = "";
  checkBtn.disabled = false;
  checkBtn.style.display = "inline-block";
  resetBtn.style.display = "none";
}

initializeGame();

checkBtn.addEventListener("click", () => {
  let inputValue = Number(userInput.value);

  if (isNaN(inputValue) || inputValue < 1 || inputValue > 100) {
    guessFeedback.textContent = "Please enter a valid number between 1 and 100";
    return;
  }

  attempts--;
  attemptsLeft.textContent = attempts;

  if (inputValue === randomNumber) {
    guessFeedback.textContent = "🎉 Correct Guess! You won the game.";
    checkBtn.disabled = true;
    resetBtn.style.display = "inline-block";
    return;
  }

  if (attempts === 0) {
    guessFeedback.textContent = `💥 Game Over. The number was: ${randomNumber}`;
    checkBtn.style.display = "none";
    resetBtn.style.display = "inline-block";
    return;
  }

  guessFeedback.textContent =
    inputValue > randomNumber ? "📈 Too High" : "📉 Too Low";
  userInput.value = "";
});

resetBtn.addEventListener("click", initializeGame);
