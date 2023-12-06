// loads page to a board (grid 8x8, minds left:?, the x button) 

// have the option to click a box in the grid or x toggle button

// has three outcomes when clicking on a square:
// 1. click on a mind
    // - game will be over and have the button to play again

// 2. click on square and get a number to tell you how many mind are near

// 3. click on a tile, when no mind are near by, will "flood the tiles" to the nearest hint.

// have the ability to place 'X' on the square to indicate there is a mind under it and wont be able to click on it

let board = []
let rows = 8
let columns = 8
let minds = 8
// this will tell us the loction of the minds ex. 2-4, 0-1, etc
let mindsLocation = []
let tilesClicked = 0
// this is to tell us when the flag button is toggled 
let headEn = false
let gameOver = false
const playAgainButton = document.getElementById('playAgain')
playAgainButton.addEventListener('click', init)

    renderBoard()
    init()

function init() {
    // Clear the existing board and reset variables
    clearBoard()
    renderBoard()
    renderControl()
}

function clearBoard() {
    document.getElementById("mind-count").innerText = minds
    document.getElementById("head").style.backgroundColor = "#ff83ff"
    tilesClicked = 0
    gameOver = false

    // Clear the tiles
    const tilesContainer = document.getElementById("tiles")
    while (tilesContainer.firstChild) {
        tilesContainer.removeChild(tilesContainer.firstChild)
    }

    // Clear mindsLocation array
    mindsLocation = []
    board = []
}

// we are setting specific locations for now, until the end to where we can randomize them!
function setMinds() {

    // mindsLocation.push("0-0", "0-1") used this to test out my game and if you wanna know certain locations!

    let mindsLeft = minds;
    while (mindsLeft > 0) { 
        let r = Math.floor(Math.random() * rows)
        let c = Math.floor(Math.random() * columns)
        let id = r.toString() + "-" + c.toString()

        if (!mindsLocation.includes(id)) {
            mindsLocation.push(id)
            mindsLeft -= 1
        }
    }
}

function renderBoard() {
    document.getElementById("mind-count").innerText = minds
    document.getElementById("head").addEventListener("click", setHead)
    setMinds()
    // populate my tiles using a for loop
    for (let r = 0;r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            // making a div tag in HTML
            let tile = document.createElement("div")
            tile.id = `${r}-${c}`
            tile.addEventListener("click", tileClicked)
            // this is an event listener to play music on tile click
            tile.addEventListener("click", playMusic)
            document.getElementById("tiles").append(tile)
            row.push(tile)
        }
        board.push(row)
    }
}

function setHead() {
    if (headEn) {
        headEn = false
        document.getElementById("head").style.backgroundColor = "#ff83ff"
    } 
    else {
        headEn = true
        document.getElementById("head").style.backgroundColor = "green"
    }
}

function tileClicked() {
    let tile = this
    // this statement will happen === true then the rest wont happen
    if (gameOver || this.classList.contains("tile-clicked")) {
        return
    }

    // this is to place the "flag" on the tiles
    if (headEn) {
        if (tile.innerText === "🥴") {
            tile.innerText = ""
        } 
        else if (tile.innerText === "") {
            tile.innerText = "🥴"
        }
        // putting return so I don't hit a mind when I set a head
        return
    }
    // this if statement is so you can remove the 🥴
    if (tile.innerText === "🥴") {
        return
    }
    // this is if you hit the mine
    if (mindsLocation.includes(tile.id)) {
        gameOver = true
        revealMinds()
        renderControl(); // Move renderControl call here
        return
    }
    // this is if we don't hit a mind, it'll tell us how many are nearby
    let divCoord = tile.id.split("-") // splitting "0-0" to [0,0]
    let r = parseInt(divCoord[0])
    let c = parseInt(divCoord[1])
    checkMinds(r, c)
}

function revealMinds() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c]
            if (mindsLocation.includes(tile.id)) {
                tile.innerText = "🧠"
                tile.style.backgroundColor = "red"
            }
        }
    }
}

function checkMinds(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return
    }
    // if this line is true, it will not do the code below
    if (board[r][c].classList.contains("tile-clicked")) {
        return
    }

    board[r][c].classList.add("tile-clicked")
    tilesClicked += 1

    let mindsFound = 0

    // checking the top 3 divs
    mindsFound += checkTile(r-1, c-1) // this is top left
    mindsFound += checkTile(r-1, c) // this is top 
    mindsFound += checkTile(r-1, c+1) // this is top right

    // checking left and right
    mindsFound += checkTile(r, c-1) // this is left
    mindsFound += checkTile(r, c+1) // this is right

    // this is bottom
    mindsFound += checkTile(r+1, c-1) // this is bottom left
    mindsFound += checkTile(r+1, c) // this is bottom 
    mindsFound += checkTile(r+1, c+1) // this is bottom right

    // this is to add the "hint" to the tile if no minds are there and are nearby
    if (mindsFound > 0) {
        board[r][c].innerText = mindsFound
        board[r][c].classList.add(`m${mindsFound}`)
    }

    // setting up recursion(aka "flood effect")
    else {
        board[r][c].innerText = ""

        // top 3
        checkMinds(r-1, c-1) // top left
        checkMinds(r-1, c) // top 
        checkMinds(r-1, c+1) // top right

        // checking left and right
        checkMinds(r, c-1) // left
        checkMinds(r, c+1) // right

        // check bottom
        checkMinds(r+1, c-1) // bottom left
        checkMinds(r+1, c) // bottom 
        checkMinds(r+1, c+1) // bottom right
    }

    // changes minds to text when all minds are "cleared"
    if (tilesClicked === rows * columns - minds) {
        document.getElementById("mind-count").innerText = "You saved you're mind!"
        gameOver = true
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0
    }
    if (mindsLocation.includes(`${r}-${c}`)) {
        return 1
    }
    return 0
}

function renderControl() {
    playAgainButton.innerText = gameOver ? 'Game Over... Try again?' : 'Reset'
}

// this function allows audio to play wile clicking tiles
function playMusic () {
    let tile = event.target // gets selected tile
    // checkes to see if head emoji is selected
    if (tile.innerText === "🥴") {
        return
    }
    if (tile.innerText === "🧠") {
        let audio = new Audio("soundEffects/splat.mp3")
        audio.play()
    } if (gameOver) {
        return
    } else {
        let audio = new Audio("soundEffects/gun.mp3")
        audio.play()
    }
}