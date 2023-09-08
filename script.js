const player1 = "x";
const player2 = "O";
let player1name = document.getElementById("player1name");
let player2name = document.getElementById("player2name");
let audioElement = new Audio("ding.mp3");
let gameover = new Audio("gameover.mp3");
let display = document.getElementById("display");
let currentPlayer = player1;
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
const playerColors = {
  x: "yellow",
  O: "orange",
};

const boxes = document.querySelectorAll(".box"); // Define boxes outside of enableGame

const startButton = document.getElementById("startButton"); // Add a button to start the game

startButton.addEventListener("click", () => {
  const name1 = player1name.value.trim();
  const name2 = player2name.value.trim();

  if (name1 === "" || name2 === "") {
    alert("Please enter names for both players to start the game.");
  } else {
    enableGame();
  }
});

function enableGame() {
  // Enable game logic here
  boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
      audioElement.play();
      if (!gameOver && board[index] === "") {
        board[index] = currentPlayer;
        box.textContent = currentPlayer;
        box.style.backgroundColor = playerColors[currentPlayer];

        if (checkWinner()) {
          gameover.play();
          if (currentPlayer === "x") {
            display.innerHTML = `${player1name.value} wins`;
          } else {
            display.innerHTML = `${player2name.value} wins`;
          }
          gameOver = true;
        } else if (board.every((cell) => cell !== "")) {
          alert("It's a draw!");
          gameOver = true;
        } else {
          currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
      }
    });
  });
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return winConditions.some((condition) => {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      boxes[a].style.backgroundColor =
        boxes[b].style.backgroundColor =
        boxes[c].style.backgroundColor =
          "violet";
      boxes[a].classList.add("blink");
      boxes[b].classList.add("blink");
      boxes[c].classList.add("blink");
      return true;
    }
  });
}
