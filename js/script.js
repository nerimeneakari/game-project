var myCanvas = document.querySelector("canvas");
var ctx = myCanvas.getContext("2d");

var xGravity = 0;
var yGravity = 0;

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

function Block(myX, myY) {
    this.x = myX;
    this.y = myY;
    this.width = 69;
    this.height = 33;
    this.value = Math.random() > 0.5 ? 2 : 4;
};
Block.prototype.drawMe = function () {
    ctx.fillStyle = "#EADEDA";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.font = "normal bold 20px Helvetica Neue";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#735751";

    ctx.fillText(this.value, this.x + (this.width / 2), this.y + this.height / 2);

};
Block.prototype.controlBoundries = function () {
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y < 0) {
        this.y = 0;
    }
    if (this.x > myCanvas.width - this.width) {
        this.x = myCanvas.width - this.width;
    }
    if (this.y > myCanvas.height - this.height - 4) {
        this.y = myCanvas.height - this.height - 4;
    }
};


function positionFirstTwoBlocks() {
    var rand = Math.floor(Math.random() * blockPosition.length);
    for (var i = 0; i < 2; i++) {
        var oldRand = rand;
        while (rand === oldRand) {
            var rand = Math.floor(Math.random() * blockPosition.length);
        }
        var block = new Block(blockPosition[rand][0], blockPosition[rand][1], this.width, this.height);
        block.drawMe();
        allBlocks.push(block);
    }
};

positionFirstTwoBlocks();

function updateBlock() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    allBlocks.forEach(function (oneBlock) {
        oneBlock.drawMe();
        oneBlock.x += xGravity;
        oneBlock.y += yGravity;
        oneBlock.controlBoundries();
    });
    requestAnimationFrame(function () {
        updateBlock();
    });
};
updateBlock();


document.onkeydown = function () {
    event.preventDefault();
        switch (event.keyCode) {
            case 37: //left arrow
                xGravity = -5;
                yGravity = 0;
                break;

            case 38: //up arrow
                yGravity = -5;
                xGravity = 0;
                break;

            case 39: //right arrow
                xGravity = +5;
                yGravity = 0;
                break;

            case 40: //down arrow
                yGravity = +5;
                xGravity = 0;
                break;
        }
}