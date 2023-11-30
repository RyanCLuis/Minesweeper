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

// const messageEl = document.querySelector('h1')
// const headButton = document.querySelector('#head')
// const playAgainButton = document.querySelector('button')
// const tiles = [...document.querySelectorAll('#tiles > div')]


window.onload = function() {
    renderBoard()
}

function renderBoard() {
    document.getElementById("mind-count").innerText = minds
    // populate my tiles using a for loop
    for (let r = 0;r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            // making a div tag in HTML
            let tile = document.createElement("div")
            tile.id = `${r}-${c}`
            document.getElementById("tiles").append(tile)
            row.push(tile)
        }
        board.push(row)
    }
    console.log(board)
}

