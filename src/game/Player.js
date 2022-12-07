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
        
        this.health = 100
        this.damage = 0.05
        
        this.estado = 'ok'

        this.isDead = false
        



    }

    vaiEsquerda(){

        this.flipX = true
        this.body.setSize(this.width - 232, this.height - 50, true)
        this.body.setOffset(200, -2)    
    }

    vaiDireita(){

        this.flipX = false
        this.body.setSize(280, 450, true)
        this.body.setOffset(0, -2)   
    }

    calculaDano(damage){

        console.log(this.health)

        this.health = this.health - damage
        
        if(this.health > 0){
        
        this.estado = 'hurt'
        this.play(this.scene.playerSelected + '_hurt', true)
        this.disableInteractive(this)
        this.jogadorFlasha()

        }else{

            this.jogadorMorreu()

        }
        
    }

    jogadorMorreu(){

        this.estado = 'dead'
        this.isDead = true
        console.log(this.estado)
        this.body.enable = false
        this.play(this.scene.playerSelected + '_dead', true)
        this.on('animationcomplete', () => {
            this.setActive(false)
            this.setVisible(false)
        })

        this.scene.cameras.main.fadeOut(1000, 0, 0, 0)

    }

   jogadorFlasha(cor){

        this.body.enable = false
        this.setTintFill(0xffffff)
        this.mudaCor = this.scene.time.addEvent({delay: 100, repeat: 0, callback: this.setTintFill,args: [0xFF0000], callbackScope: this})
        this.mudaCor = this.scene.time.addEvent({delay: 100, repeat: 0, callback: this.jogadorRecupera, callbackScope: this})

    }

    jogadorRecupera(){

        this.mudaCor = this.scene.time.addEvent({delay: 100, repeat: 0, callback: this.clearTint, callbackScope: this})
        this.estado = 'ok'
        this.body.enable = true

    }

    
    // corre funcoes antes to update
    preUpdate(time, delta) {        
		super.preUpdate(time, delta)  
        
        
    }  
    
}