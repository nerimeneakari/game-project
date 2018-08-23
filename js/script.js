var myCanvas = document.querySelector("canvas");
var ctx = myCanvas.getContext("2d");


// var isNew;

// --- toutes les positions possibles dans la grille ----
var blockPosition = [
    [0, 0], [76, 0], [154, 0], [230, 0],
    [0, 37], [77, 37], [154, 37], [230, 37],
    [0, 75], [77, 75], [154, 75], [230, 75],
    [0, 113], [77, 113], [154, 113], [230, 113],
];

var rand = Math.floor(Math.random() * blockPosition.length);

var allBlocks = [];
var xGravity = 0;
var yGravity = 0;

function Block(myX, myY, isNew) {
    this.x = myX;
    this.y = myY;
    this.width = 69;
    this.height = 33;
    this.value = Math.random() > 0.5 ? 2 : 4;
    this.isNew = isNew;
    this.xGravity = 0;
    this.yGravity = 0;
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
    for (var i = 0; i < 2; i++) {
        var oldRand = rand;
        while (rand === oldRand) {
            var rand = Math.floor(Math.random() * blockPosition.length);
        }
        var block = new Block(blockPosition[rand][0], blockPosition[rand][1], false);
        block.drawMe();
        allBlocks.push(block);
    }
};

positionFirstTwoBlocks();

function updateBlock() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    allBlocks.forEach(function (oneBlock) {
        oneBlock.drawMe();
        oneBlock.x += oneBlock.xGravity;
        oneBlock.y += oneBlock.yGravity;
        oneBlock.controlBoundries();
        allBlocks.forEach(function (anotherBlock) {
            var anotherx = anotherBlock.x
            if (collision(oneBlock, anotherBlock) && oneBlock !== anotherBlock) {
                // VERSION RANGEE
                if (oneBlock.y === anotherBlock.y) {  // if same y
                    if (anotherBlock.xGravity > 0) { // if gravity goes right
                        if (oneBlock.x > anotherBlock.x) {
                            anotherBlock.x = oneBlock.x - oneBlock.width - 8;
                            anotherBlock.xGravity = 0;
                        }
                    }
                    else if (anotherBlock.xGravity < 0) { // else if gravity goes left
                        if (oneBlock.x < anotherBlock.x) {
                            anotherBlock.x = oneBlock.x + oneBlock.width + 8;
                            anotherBlock.xGravity = 0;
                            checkForFinish()
                        }
                    }
                }
                // VERSION COLONNE
                else if (oneBlock.x === anotherBlock.x) {  // else if same x
                    if (anotherBlock.yGravity < 0) { // if gravity goes up
                        if (oneBlock.y < anotherBlock.y) {
                            anotherBlock.y = oneBlock.y + oneBlock.height + 4;
                            anotherBlock.yGravity = 0;
                        }
                    }
                    else if (anotherBlock.yGravity > 0) { // else if gravity down
                        if (oneBlock.y > anotherBlock.y) {
                            anotherBlock.y = oneBlock.y - oneBlock.height - 4;
                            anotherBlock.yGravity = 0;
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
    return rectA.x < rectB.x + rectB.width + 6
        && rectA.x + rectA.width + 6 > rectB.x
        && rectA.y < rectB.y + rectB.height + 4
        && rectA.height + 4 + rectA.y > rectB.y;
};

document.onkeydown = function () {
    switch (event.keyCode) {
        case 37: //left arrow
            event.preventDefault();
            xGravity = -19;
            yGravity = 0;
            break;
        
        case 38: //up arrow
            event.preventDefault();
            yGravity = -15;
            xGravity = 0;
            break;
        
        case 39: //right arrow
            event.preventDefault();
            xGravity = +19;
            yGravity = 0;
            break;
        
        case 40: //down arrow
            event.preventDefault();
            yGravity = +15;
            xGravity = 0;
            break;        
    }
    allBlocks.forEach(function (oneBlock) {
        oneBlock.isNew = false;
        oneBlock.xGravity = xGravity;
        oneBlock.yGravity = yGravity;
    })
};