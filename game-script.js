var myGamePiece;
var myObstacles = [];
var myScore;
var gravity = 0.05; // Гравітація
var jumpPower = -2; // Сила стрибка
var maxJumps = 20000; // Максимальна кількість стрибків
var jumpsRemaining = maxJumps; // Кількість залишихся стрибків
var scores = [];

function startGame() {
    myGamePiece = new component(20, 20, "yellow", 80, 120);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            if (e.key == ' ' && jumpsRemaining > 0) jump();
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.score = 0; // Додана властивість для рахунку
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            // Голова пташки
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            // Тіло пташки
            ctx.fillRect(this.x - this.width, this.y, this.width * 2, this.height);
            // Дзьоб пташки
            ctx.fillRect(this.x + this.width, this.y, this.width / 2, this.height / 2);
            // Око пташки
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(this.x - this.width / 2, this.y - this.height / 2, this.width / 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;    
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}


function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            updateScoreboard(myGameArea.frameNo);
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    applyGravity();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function jump() {
    myGamePiece.speedY = jumpPower;
    jumpsRemaining -= 1;
}

function applyGravity() {
    if (myGamePiece.y < myGameArea.canvas.height - myGamePiece.height) {
        myGamePiece.speedY += gravity;
    } else {
        myGamePiece.speedY = 0;
        myGamePiece.y = myGameArea.canvas.height - myGamePiece.height;
        jumpsRemaining = maxJumps;
    }
}

function restartGame() {
    scores.push(myGameArea.frameNo);
    scores.sort(function(a, b) { return b - a; });
    if (scores.length > 6) scores.pop();
    myGameArea.frameNo = 0;
    jumpsRemaining = maxJumps;
    myObstacles = [];
    myGameArea.start();
}

function updateScoreboard(score) {
    var topScoresList = document.getElementById("top-scores");
    var worstScoresList = document.getElementById("worst-scores");
    topScoresList.innerHTML = "";
    worstScoresList.innerHTML = "";
    scores.slice(0, 3).forEach(function(score, index) {
        var li = document.createElement("li");
        li.textContent = score;
        topScoresList.appendChild(li);
    });
    scores.slice(-3).forEach(function(score, index) {
        var li = document.createElement("li");
        li.textContent = score;
        worstScoresList.appendChild(li);
    });
}

startGame();