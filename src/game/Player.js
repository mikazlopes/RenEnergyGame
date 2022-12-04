import Phaser from '../lib/phaser.js'

export default class Jogador extends Phaser.Physics.Arcade.Sprite
{
    /**
    * @param {Phaser.Scene} scene
    * @param {number} x
    * @param {number} y
    * @param {string} texture
    */

    constructor(scene, x, y, texture){

        super(scene, x, y, texture)
        scene.physics.world.enable(this)
        this.setScale(0.2)
        this.body.setSize(280, 450, true)
        this.body.setOffset(0, -2)      

    }

    vaiEsquerda(){

        this.flipX = true
        this.body.setSize(this.width - 232, this.height - 50, true)
        this.body.setOffset(200, -2)    
    }

    vaiDireita(){

        this.flipX = false
        this.setScale(0.2)
        this.body.setSize(280, 450, true)
        this.body.setOffset(0, -2)   
    }
    
    // para investigar mais tarde
    preUpdate(time, delta) {        
		super.preUpdate(time, delta)       
    }  
    
}