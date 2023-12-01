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
let minds = 6
// this will tell us the loction of the minds ex. 2-4, 0-1, etc
let mindsLocation = []
let tilesClicked = 0
// this is to tell us when the flag button is toggled 
let headEn = false
let gameOver = false

// const messageEl = document.querySelector('h1')
// const headButton = document.querySelector('#head')
// const playAgainButton = document.querySelector('button')
// const tiles = [...document.querySelectorAll('#tiles > div')]


window.onload = function() {
    renderBoard()
}

// we are setting specific locations for now, until the end to where we can randomize them!
function setMinds() {
    mindsLocation.push("2-2", "2-4", "0-0", "5-6", "3-4", "1-1")
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
            document.getElementById("tiles").append(tile)
            row.push(tile)
        }
        board.push(row)
    }
    console.log(board)
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
    if (headEn) {
        if (tile.innerText === "") {
            tile.innerText = "🥴"
        } 
        else if (tile.innerText === "🥴") {
            tile.innerText = ""
        }
        // putting return so i dont hit a mind when I set a head
        return
    }

    if (mindsLocation.includes(tile.id)) {
        // using alert to test, will change later!
        alert("Game Over!")
        gameOver = true
        return
    }
}