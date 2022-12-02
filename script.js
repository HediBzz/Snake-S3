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