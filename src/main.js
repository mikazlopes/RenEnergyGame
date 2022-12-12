import Phaser from './lib/phaser.js'

import Intro from './scenes/Intro.js'

import Mapa from './scenes/Mapa.js'

import Floresta from './scenes/Floresta.js'

import Cidade1 from './scenes/Cidade1.js'

import Cidade2 from './scenes/Cidade2.js'

import Loading from './scenes/Loading.js'

import Loading2 from './scenes/Loading2.js'

import Menu from './scenes/Menu.js'

import Seleciona from './scenes/SelectPlayer.js'

import GameOver from './scenes/GameOver.js'





export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [Loading, Intro , Menu,  Seleciona, Loading2, Mapa, GameOver, Floresta, Cidade2],
    jackEverUsed: false,
    jillEverUsed: false
    })


    // Propriedades personalizadas do jogo para saber que animacoes carregar





