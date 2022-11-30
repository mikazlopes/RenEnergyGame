import Phaser from './lib/phaser.js'

import Intro from './scenes/Intro.js'

import Mapa from './scenes/Mapa.js'


export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    pixelArt: true,
    physics: {
        default : 'arcade',
        arcade : {gravity: {y : 0},
        debug : false
        }
    },
    scene: Mapa
    })




