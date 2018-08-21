var myCanvas = document.querySelector(".canvas-container");
var ctx = myCanvas.getContext("2d");

// --------- Random 2 ou 4 --------------------------
function randomNumber() {
    if (Math.floor(Math.random() * 10) % 2 === 1) {
        return 2;
    } else {
        return 4;
    }
};

// --- toutes les positions possibles dans la grille ----
var blockPosition = [
    [0, 0],
    [76, 0],
    [154, 0],
    [230, 0],
    [0, 37],
    [77, 37],
    [154, 37],
    [230, 37],
    [0, 75],
    [77, 75],
    [154, 75],
    [230, 75],
    [0, 113],
    [77, 113],
    [154, 113],
    [230, 113],
];

allBlocks = [];

function Block(myX, myY, width, heigth) {
    this.x = myX;
    this.y = myY;
    this.width = 69;
    this.heigth = 33;
    
};
Block.prototype.drawMe = function () {
    ctx.fillStyle = "#EADEDA";
    ctx.fillRect(this.x, this.y, this.width, this.heigth);
    ctx.font = "20px Helvetica Neue";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#735751";
    ctx.fillText(randomNumber(), this.x + (this.width / 2), this.y + this.heigth / 2);
};

function positionFirstTwoBlocks() {
    var rand = Math.floor(Math.random() * blockPosition.length);
    for (var i = 0; i < 2; i++) {
        var oldRand = rand;
        while (rand === oldRand) {
            var rand = Math.floor(Math.random() * blockPosition.length);
        }
        var block = new Block(blockPosition[rand][0], blockPosition[rand][1], this.width, this.heigth);
        block.drawMe();
        allBlocks.push(block);
    }
};

positionFirstTwoBlocks();



// document.onkeydown = function() {
//     event.preventDefault();
//     switch (event.keyCode) {
//         case 37: //left arrow
//         ctx.clearRect(this.x, this.y, this.width, this.heigth);
        

//         break;

//         case 38: //up arrow
        
//         break;

//         case 39: //right arrow
        
//         break;

//         case 40: //down arrow
        
//         break;
//     }
// }