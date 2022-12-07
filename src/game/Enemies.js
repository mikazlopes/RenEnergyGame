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
        this.meele = 30
        this.play('enemy_idle')

        this.body.setVelocityX(0)
        

        this.estado = 'ok'

        this.muzzle = new MuzzlesEnemy(scene, this.x, this.y)

        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.scene.disparouBalaEnemy,
            args: [this, 'idle'],
            callbackScope: this.scene,
            loop: true
        })



    }

    calculaDano(damage){

        console.log(this.health)
        this.health = this.health - damage
        
        if(this.health > 0){

            this.body.enable = false
            this.estado = 'hurt'
            this.play('enemy_hurt', true)
            this.anims.playAfterRepeat('enemy_idle', true)
            this.inimigoFlasha()

        }else{

            this.inimigoMorreu()
        }

    }

    inimigoMorreu(){

        this.estado = 'dead'
        this.body.enable = false
        this.play('enemy_dead', true)
        this.on('animationcomplete', () => {
            this.scene.destroiInimigo(this)
        })
        
        


    }

    inimigoFlasha(){

        this.shootTimer.reset()
        this.body.enable = false
        this.setTintFill(0xffffff)
        this.scene.time.addEvent({delay: 100, repeat: 0, callback: this.setTintFill,args: [0xFF0000], callbackScope: this})
        this.scene.time.addEvent({delay: 100, repeat: 0, callback: this.inimigoRecupera, callbackScope: this})
    }

    inimigoRecupera(){

        this.mudaCor = this.scene.time.addEvent({delay: 100, repeat: 0, callback: this.clearTint, callbackScope: this})
        this.estado = 'ok'
        this.body.enable = true
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

    // corre funcoes antes to update
    preUpdate(time, delta) {        
		super.preUpdate(time, delta)  
        
        
    }  

   
}
