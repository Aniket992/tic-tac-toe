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
const firstname = player1name.value;


const boxes = document.querySelectorAll(".box");

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    audioElement.play();
    if (!gameOver && board[index] === "") {
      board[index] = currentPlayer;
      box.textContent = currentPlayer;
      box.style.backgroundColor = playerColors[currentPlayer]; // Set color based on player

      if (checkWinner()) {
        gameover.play();
        // if(currentPlayer = "x"){
        // // display.innerHTML = `${currentPlayer} wins`;
        //    display.innerHTML = player1name+"wins";
        // }
        if (currentPlayer === "x") {
          // display.innerHTML = `${currentPlayer} wins`;
          display.innerHTML = `${player1name.innerHTML} wins`;
        }
        if ((gameOver = true));
      } else if (board.every((cell) => cell !== "")) {
        alert("it's a draw!");
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
      }
    }
  });
});

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
  return winConditions.some((condititon) => {
    const [a, b, c] = condititon;
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
