import Phaser from '../lib/phaser.js'

import Jogador from '../game/Player.js'

import Enemy from '../game/Enemies.js'

import CriaBalasHero from '../game/GrupoBalasHero.js'

import CriaBalasEnemy from '../game/GrupoBalasEnemy.js'


export default class Cidade1 extends Phaser.Scene{
     
    constructor(){

    /** @type {Phaser.Physics.Arcade.StaticGroup} */

	/** @type {Phaser.Physics.Arcade.Group} */
	
	/** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
	
	/** @type {Phaser.Physics.Arcade.Group} */

    
        // configura physics para esta cena
        super({
            key: 'Cidade1',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    tileBias: 32,
                    fps: 30,
                    fixedStep: true,
                    gravity: { y: 300 }
                    
                }
              }
        })
    
    }

    init(){

        // Usado para importar que jogador foi escolhido e a dificuldade
        this.playerSelected = 'jack'
        this.difficulty = 2
        this.speedH = 250
        this.speedV = 400
        this.balaIntervalohero = 0
        
    
    

        // Guardar as dimensoes da scene numa variavel
        this.width = this.scale.width
        this.height = this.scale.height
    }

    create(){


    }

    
}