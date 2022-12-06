import Phaser from '../lib/phaser.js'

import MuzzlesEnemy from './MuzzlesEnemy.js'


export default class Enemy extends Phaser.Physics.Arcade.Sprite
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
        scene.add.existing(this)
        this.setScale(0.2)
        this.flipX = true
        this.health = 100
        this.damage = 0.05
        this.play('enemy_idle')

        this.muzzle = new MuzzlesEnemy(scene, this.x, this.y)

        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.scene.disparouBalaEnemy,
            args: [this, 'idle'],
            callbackScope: this.scene,
            loop: true
        })



    }

    inimigoAcoes(player){

        
    }


   

    inimigoEnergia(){


    }

    inimigoDispara(x, y, direcao){

        const sentido = direcao

        this.muzzle.dispara(x, y, sentido, this)
        
        

    }



   
}
