import Phaser from './lib/phaser.js'

import Intro from './scenes/Intro.js'

import Mapa from './scenes/Mapa.js'

import Floresta from './scenes/Floresta.js'

import Cidade1 from './scenes/Cidade1.js'

import Cidade2 from './scenes/Cidade2.js'

import Cidade3 from './scenes/Cidade3.js'

import Loading from './scenes/Loading.js'

import Loading2 from './scenes/Loading2.js'

import Menu from './scenes/Menu.js'

import Seleciona from './scenes/SelectPlayer.js'

import GameOver from './scenes/GameOver.js'

import TheEnd from './scenes/theEnd.js'



let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    pixelArt: true,
    scene: [Loading, Intro , Menu,  Seleciona, Loading2, Mapa, Floresta, Cidade1, Cidade2, Cidade3, GameOver, TheEnd]
    }

export default new Phaser.Game(config)




