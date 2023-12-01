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
    // this is to place the "flag" on the tiles
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
// this is if you hit the mine
    if (mindsLocation.includes(tile.id)) {
        // using alert to test, will change later!
        // alert("Game Over!")
        gameOver = true
        revealMinds()
        return
    }
// this is if we dont hit a mind, itll tell us how many are nearby
    let divCoord = tile.id.split("-") // spliting "0-0" to (0, 0)
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
    if (r < 0 || r >= rows || c < 0 || c >+ columns) {
        return
    }
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
        board[r][c].classList.add(`one${mindsFound}`)
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >+ columns) {
        return 0
    }
    if (mindsLocation.includes(`${r}-${c}`)) {
        return 1
    }
    return 0
}