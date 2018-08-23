var myCanvas = document.querySelector("canvas");
var ctx = myCanvas.getContext("2d");

var xGravity = 0;
var yGravity = 0;

// --- toutes les positions possibles dans la grille ----
var blockPosition = [
    [0, 0], [76, 0], [152, 0], [230, 0],
    [0, 38], [77, 38], [152, 38], [230, 38],
    [0, 75], [77, 75], [152, 75], [230, 75],
    [0, 113], [77, 113], [152, 113], [230, 113],
];

allBlocks = [];

function Block(myX, myY, isNew) {
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
    if (this.y > myCanvas.height - this.height - 5) {
        this.y = myCanvas.height - this.height - 5;
    }
};


function positionFirstTwoBlocks() {
    var rand = Math.floor(Math.random() * blockPosition.length);
    for (var i = 0; i < 2; i++) {
        var oldRand = rand;
        while (rand === oldRand) {
            var rand = Math.floor(Math.random() * blockPosition.length);
        }
        var block = new Block(blockPosition[rand][0], blockPosition[rand][1]);
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
        allBlocks.forEach(function (anotherBlock) {
            if (collision(oneBlock, anotherBlock) && oneBlock !== anotherBlock) {
                console.log("collision");
                if (oneBlock.y === anotherBlock.y) {  // if same y
                    if (xGravity > 0) { // if gravity goes right
                        if (oneBlock.x > anotherBlock.x) {
                            anotherBlock.x = oneBlock.x - oneBlock.width - 7;
                        }
                    } else if (xGravity < 0) { // else if gravity goes left
                        if (oneBlock.x < anotherBlock.x) {
                            anotherBlock.x = oneBlock.x + oneBlock.width + 7;
                        }
                    }
                } else if (oneBlock.x === anotherBlock.x) {  // else if same x
                    if (yGravity < 0) { // if gravity goes up
                        if (oneBlock.y < anotherBlock.y) {
                            anotherBlock.y = oneBlock.y + oneBlock.height + 4;
                        }
                    } else if (yGravity > 0) { // else if gravity down
                        if (oneBlock.y > anotherBlock.y) {
                            anotherBlock.y = oneBlock.y - oneBlock.height - 4;
                        }
                    }
                }
            }
        })
    });
    requestAnimationFrame(function () {
        updateBlock();
    });
};
updateBlock();

function collision(rectA, rectB) {
    return rectA.x < rectB.x + rectB.width + 7
        && rectA.x + rectA.width + 7 > rectB.x
        && rectA.y < rectB.y + rectB.height + 4
        && rectA.height + 4 + rectA.y > rectB.y;
};

document.onkeydown = function () {

    switch (event.keyCode) {
        case 37: //left arrow
            event.preventDefault();
            xGravity = -14;
            yGravity = 0;
            break;

        case 38: //up arrow
            event.preventDefault();
            yGravity = -10;
            xGravity = 0;
            break;

        case 39: //right arrow
            event.preventDefault();
            xGravity = +14;
            yGravity = 0;
            break;

        case 40: //down arrow
            event.preventDefault();
            yGravity = +10;
            xGravity = 0;
            break;
    }

}