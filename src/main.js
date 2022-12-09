import Phaser from './lib/phaser.js'

import Intro from './scenes/Intro.js'

import Mapa from './scenes/Mapa.js'

import Floresta from './scenes/Floresta.js'

import Cidade2 from './scenes/Cidade1.js'


export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [Intro , Mapa, Floresta, Cidade2]
    })




