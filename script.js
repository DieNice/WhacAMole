holes = [];
up = true;

function startGame() {
    gamearea.start();
}

function clickHandler(event) {
    if ((event.pageX - 274) > mole.x && (event.pageX - 274) < (mole.x + 40) &&
        (event.pageY - 9) > mole.y && (event.pageY - 9) < (mole.y + mole.height)) {
        gamearea.stop("You win!");
    }
}

function moleOut() {
    index = Math.floor(Math.random() * 5);
    outInterval = setInterval(appearance, 10);
}

function appearance() {
    mole.clear();
    if (up) {
        mole.height += 1;
        if (mole.height == 50) {
            up = false;
        }
    } else {
        mole.height -= 1;
        if (mole.height == 0) {
            up = true;
            clearInterval(outInterval);
        }
    }
    mole.draw();
}

let gamearea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 800;
        this.canvas.height = 600;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(this.update, 250);
        timer = 100;

        holes[0] = new hole(290, 237.5);
        holes[1] = new hole(505, 237.5);
        holes[2] = new hole(480, 337.5);
        holes[3] = new hole(265, 337.5);
        holes[4] = new hole(390, 300.5);
        moleInterval = setInterval(moleOut, 3000);
        window.addEventListener("click", clickHandler, event);
    },
    update: function () {
        gamearea.clear();
        gamearea.context.fillStyle = "blue";
        gamearea.context.font = "50px Times New Roman";
        gamearea.context.fillText("Timer: " + timer, 10, 50);

        if (timer == 0) {
            gamearea.stop("You lose");
        }
        gamearea.context.lineWidth = 2;
        gamearea.context.strokeStyle = "#3d3d3d";
        gamearea.context.fillStyle = "#d1d1d1";
        gamearea.context.beginPath();
        gamearea.context.moveTo(250, 200);
        gamearea.context.lineTo(580, 200);
        gamearea.context.lineTo(535, 380);
        gamearea.context.lineTo(175, 380);
        gamearea.context.closePath();
        gamearea.context.fill();
        gamearea.context.stroke();
        gamearea.context.lineWidth = 1;
        gamearea.context.strokeStyle = "black";
        gamearea.context.fillStyle = "black";
        for (let i = 0; i < 5; i++) {
            holes[i].draw();
        }

        timer--;


    },
    clear: function () {
        gamearea.context.clearRect(0, 0, 800, 600);
    },
    stop: function (text) {
        window.removeEventListener("click", clickHandler, event);
        clearInterval(gamearea.interval);
        clearInterval(moleInterval);
        clearInterval(outInterval);
        alert(text);
    }
}

function hole(x, y) {
    this.x = x;
    this.y = y;
    this.draw = function () {
        gamearea.context.beginPath();
        gamearea.context.ellipse(x, y, 45, 22.5, 0, 0, 2 * Math.PI);
        gamearea.context.stroke();
        gamearea.context.fill();
    }
}

let mole = {
    height: 5,
    draw: function () {
        this.x = holes[index].x - 20;
        this.y = holes[index].y - this.height;
        gamearea.context.fillStyle = "brown";
        gamearea.context.fillRect(this.x, this.y, 40, this.height);
    },
    clear: function () {
        gamearea.context.globalAlpha = 0.0;
        gamearea.context.fillRect(this.x, holes[index].y - this, 40, this.height);
        gamearea.context.globalAlpha = 1.0;

    }
}