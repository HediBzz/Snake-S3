const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

var gameContainer;
document.getElementById("jouer").addEventListener('click', bouttondebut);

var vitessedujeu = 8;

var btnRestart = document.getElementById("restart");
btnRestart.addEventListener("click", function () {
    location.reload();
});

var snakeeats = [];
snakeeats[0] = new pomme();

var touche = [false, false, false, false];

var direction = [false, false, false, false];

var vitesse = 4;

var youlose = 0;
var score = 0;

var canvasss = document.createElement("canvas");
canvasss.width = 640;
canvasss.height = 640;


var graphicserpent = [];

graphicserpent[0] = new Image();
graphicserpent[0].src = "images/snake.png";
graphicserpent[2] = new Image();
graphicserpent[2].src = "images/snakecorp.png";
graphicserpent[3] = new Image();
graphicserpent[3].src = "images/snakecorp.png";
graphicserpent[4] = new Image();
graphicserpent[4].src = "images/snakecorp.png";

var snakeeatgraphics = [];
snakeeatgraphics[0] = new Image();
snakeeatgraphics[0].src = "images/eats1.png";
snakeeatgraphics[1] = new Image();
snakeeatgraphics[1].src = "images/eats1.png";
snakeeatgraphics[2] = new Image();
snakeeatgraphics[2].src = "images/eats1.png";


var snakebody = [];
snakebody[0] = new partieserpent(320, 320);
snakebody[0].color = 0;



function bouttondebut() {
    let ecran_debut = document.getElementById('ecran_debut');
    ecran_debut.parentNode.removeChild(ecran_debut);
    canvas.style.display = "block";
}
function bouttonfin() {
    canvas.style.display = "none";

    // crée un element html qui propose de rejouer   create an html element a game over screen
    const ecran_fin = document.createElement('div');
    ecran_fin.id = 'ecran_fin';
    ecran_fin.innerHTML = '<h1>Game Over</h1><p>Score: ' + score + '</p><button id="restart">Restart</button>';
    btnRestart.style.display = "block";
}
let xpos;
let ypos;
let zpos;
class partieserpent {
    //classe qui defini chaque bout du corps du serpent a une position
    constructor(xpos, ypos) {

        this.xpos = xpos;
        this.ypos = ypos;
        this.color = Math.floor(Math.random() * 3 + 2);
        this.width = 64;
        this.height = 64;
        this.keyhistory = [];
        this.movetimer = -1;

    }

}

class pomme {
    //classe qui definie l'objet pomme mit au hasard dans le canva
    constructor() {
        this.xpos = Math.floor(Math.random() * 10) * 64;
        this.ypos = Math.floor(Math.random() * 10) * 64;
        this.piece = Math.floor(Math.random() * 3);
        this.width = 64;
        this.height = 64;
    }
}


function game() {
    //le jeu


    if (youlose == 1) {

        return bouttonfin();
    }

    ctx.beginPath();
    ctx.rect(0, 0, 768, 768);
    ctx.fillStyle = '#63E75D';
    ctx.fill();

    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, 768, 768);


    checkkeypress();
    movesnake();


    for (xpos = snakebody.length - 1; xpos > 0; xpos--) {
        movepieces.call(snakebody[xpos]);
    }

    for (xpos = 0; xpos < snakeeats.length; xpos++) {
        fruit.call(snakeeats[xpos], xpos);
        vitessedujeu = vitessedujeu - 4;
    }


    for (xpos = snakebody.length - 1; xpos > -1; xpos--) {
        drawsnake.call(snakebody[xpos]);
    }

}



const fruit = function (m) {
    ctx.drawImage(snakeeatgraphics[this.piece], this.xpos, this.ypos, this.width, this.height);

    zpos = snakebody[0].xpos - this.xpos;
    ypos = snakebody[0].ypos - this.ypos;

    if (zpos < 64 && zpos > -1 &&
        ypos < 64 && ypos > -1) {
        score++;
        snakeeats.splice(m, 1);
        snakeeats.push(new pomme());
        var son = new Audio("Eating sound effect LUCAS ARPON TV (mp3cut.net).mp3");
        son.play();
        snakebody.push(new partieserpent(snakebody[0].xpos, snakebody[0].ypos));

        snakebody[snakebody.length - 1].keyhistory[0] = snakebody[0].keyhistory[0];
        snakebody[snakebody.length - 1].movetimer = (snakebody.length - 1) * 16;

        console.log(score);
        document.querySelector('#score').textContent = score;
    }
};


function drawsnake() {
    ctx.drawImage(graphicserpent[2], this.xpos, this.ypos, this.width, this.height);
}


function movepieces() {
    this.movetimer--;
    if (this.movetimer > -1) {
        return;
    }

    zpos = snakebody[0].xpos - this.xpos;
    ypos = snakebody[0].ypos - this.ypos;

    if (zpos < 0) {
        zpos = zpos * -1;
    }
    if (ypos < 0) {
        zpos = zpos * -1;
    }
    if (zpos < 32 && zpos > -1 &&
        ypos < 32 && ypos > -1) {
        youlose = 1;
    }
    if (Number.isInteger(this.xpos / 64) && Number.isInteger(this.ypos / 64)) {
        this.keyhistory.shift();
    }
    if (this.keyhistory[0] == 0) {
        this.xpos += vitesse;
    }
    if (this.keyhistory[0] == 1) {
        this.xpos -= vitesse;
    }
    if (this.keyhistory[0] == 2) {
        this.ypos -= vitesse;
    }
    if (this.keyhistory[0] == 3) {
        this.ypos += vitesse;
    }
}
function movesnake() {
    //fonction qui permet de tourner

    //tourne a droite
    if (direction[0] == true) {

        if (Number.isInteger(snakebody[0].xpos / 64) && Number.isInteger(snakebody[0].ypos / 64)) {
            snakebody[0].keyhistory.push(0);
            for (xpos = snakebody.length - 1; xpos > 0; xpos--) {
                snakebody[xpos].keyhistory.push(0);
            }
        }
        snakebody[0].xpos += vitesse;
    }

    //tourne a gauche
    if (direction[1] == true) {
        if (Number.isInteger(snakebody[0].xpos / 64) && Number.isInteger(snakebody[0].ypos / 64)) {
            snakebody[0].keyhistory.push(1);
            for (xpos = snakebody.length - 1; xpos > 0; xpos--) {
                snakebody[xpos].keyhistory.push(1);
            }
        }
        snakebody[0].xpos -= vitesse;
    }

    //tourne vers le haut
    if (direction[2] == true) {
        if (Number.isInteger(snakebody[0].xpos / 64) && Number.isInteger(snakebody[0].ypos / 64)) {
            snakebody[0].keyhistory.push(2);
            for (xpos = snakebody.length - 1; xpos > 0; xpos--) {
                snakebody[xpos].keyhistory.push(2);
            }
        }
        snakebody[0].ypos -= vitesse;
    }

    //tourne vers le bas
    if (direction[3] == true) {
        if (Number.isInteger(snakebody[0].xpos / 64) && Number.isInteger(snakebody[0].ypos / 64)) {
            snakebody[0].keyhistory.push(3);
            for (xpos = snakebody.length - 1; xpos > 0; xpos--) {
                snakebody[xpos].keyhistory.push(3);
            }
        }
        snakebody[0].ypos += vitesse;
    }
    //lorsque le snake est de taille 1 il peut bouger dans les 4 directions
    if (snakebody[0].keyhistory.length > 1) {
        snakebody[0].keyhistory.shift();
    }
    //test qui nous fait perdre quand on se mord la queue
    if (snakebody[0].xpos < 0 || snakebody[0].xpos > 768 - 64 || snakebody[0].ypos < 0 || snakebody[0].ypos > 768 - 64) {
        youlose = 1;
    }
}
