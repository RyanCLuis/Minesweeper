// loads page to a board (grid 8x8, minds left:?, the x button) 

// have the option to click a box in the grid or x toggle button

// has three outcomes when clicking on a square:
// 1. click on a mind
    // - game will be over and have the button to play again

// 2. click on square and get a number to tell you how many mind are near

// 3. click on a tile, when no mind are near by, will "flood the tiles" to the nearest hint.

// have the ability to place 'X' on the square to indicate there is a mind under it and wont be able to click on it

/*----- constants -----*/


/*----- state variables -----*/
let board
let winner
let minds = 8


/*----- cached elements  -----*/
const messageEl = document.querySelector('h1')
const headButton = document.querySelector('#head')
const playAgainButton = document.querySelector('button')
const tiles = [...document.querySelectorAll('#tiles > div')]


/*----- event listeners -----*/


/*----- functions -----*/
