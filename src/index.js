import inicio from "./escenas/inicio.js";
//import Escena1 from "./escenas/Escena1.js";
import Escena2 from "./escenas/Escena2.js";
import GameOver from "./escenas/GameOver.js";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT, // Escala para ajustar el juego a la ventana
        autoCenter: Phaser.Scale.CENTER_BOTH // Centra automáticamente el juego en la ventana
    },
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y:0},
            debug: false
        }
    },
    //scene:[inicio]
    scene:[GameOver]
};
let game = new Phaser.Game(config);