const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

var gameContainer;
document.getElementById("jouer").addEventListener('click', bouttondebut);

var vitessedujeu = 8;

var btnRestart = document.getElementById("restart");
btnRestart.addEventListener("click", function () {
    location.reload();
});

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



var snakeeats = [];
snakeeats[0] = new pomme();

var touche = [false, false, false, false];

var direction = [false, false, false, false];

var vitesse = 4;

var youlose = 0;
var score = 0;