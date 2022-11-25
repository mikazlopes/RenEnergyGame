import Phaser from './lib/phaser.js'

//Construir Scene para Ecran de entrada

let introScene = new Phaser.Scene('Intro');

let configIntro = {
    type: Phaser.AUTO,
    width: 640, 
    height: 360, 
    scene: introScene
};

let introConf = new Phaser.Game(configIntro);



