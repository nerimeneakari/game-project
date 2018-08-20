var myCanvas = document.querySelector(".canvas-container");
var ctx = myCanvas.getContext("2d");
var squareWidth = 69;
var squareHeigth = 33;

function randomNumber () {
    if(Math.floor(Math.random() * 10) % 2 === 1) {
        return 2;
    } else {
        return 4;
    }
}


function Position(array) {
var i = Math.floor(Math.random() * array.length);
console.log(array[i]);
var x = this.x;
var y = this.y;
var width = this.width;
var height = this.height;

ctx.strokeStyle = "black";
ctx.strokeRect(array.x[i], array.y[i], array.width[i], array.height[i]);
}

var blockPosition = [
{ x: 0, y: 0, width: 69, height: 33 },
{ x: 76, y: 0, width: squareWidth, height: squareHeigth },
{ x: 154, y: 0, width: squareWidth, height: squareHeigth },
{ x: 230, y: 0, width: squareWidth, height: squareHeigth },
{ x: 0, y: 37, width: squareWidth, height: squareHeigth },
{ x: 77, y:37, width: squareWidth, height: squareHeigth },
{ x: 154, y: 37, width: squareWidth, height: squareHeigth },
{ x: 230, y: 37, width: squareWidth, height: squareHeigth },
{ x: 0, y: 75, width: squareWidth, height: squareHeigth },
{ x: 77, y: 75, width: squareWidth, height: squareHeigth },
{ x: 154, y: 75, width: squareWidth, height: squareHeigth },
{ x: 230, y: 75, width: squareWidth, height: squareHeigth },
{ x: 0, y: 113, width: squareWidth, height: squareHeigth },
{ x: 77, y: 113, width: squareWidth, height: squareHeigth },
{ x: 154, y: 113, width: squareWidth, height: squareHeigth },
{ x: 230, y: 113, width: squareWidth, height: squareHeigth },
];


new Position(blockPosition);