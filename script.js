const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector(`
[data-winning-message-text]`)
let circleTrun

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true })
})

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  console.log(cellElements);
  circleTrun = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, {once: true})
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTrun ? CIRCLE_CLASS : X_CLASS
  palceMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTruns() 
    setBoardHoverClass()
  }
  
}

function endGame(draw) {
  if (draw) {
    winningMessageElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTrun ? "O's" :
    "X's"} Wins!`
  }

  console.log("end game called...")
  console.log(winningMessageTextElement)
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || 
    cell.classList.contains(CIRCLE_CLASS)
  })
}

function palceMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTruns() {
  circleTrun = !circleTrun
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTrun) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  console.log("check winnings...");
  const result =  WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      console.log("i:", index, "CE:", cellElements[index]);
      return cellElements[index].classList.contains(currentClass)
    })
  })

  console.log("result:", result);
  return result
}