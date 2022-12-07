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
        this.movimento = 'idle'

        this.isDead = false
        



    }

    vaiEsquerda(){

        this.flipX = true
        this.body.setSize(this.width - 232, this.height - 50, true)
        this.body.setOffset(200, -2)

        if (this.body.onFloor() && this.scene.inputKeys.isUp && this.scene.cursors.up.isUp){

            this.play(this.scene.playerSelected + '_run', true)
        }
        
        this.body.setVelocityX(- this.scene.speedH)

        if (this.scene.inputKeys.isUp){

            if (this.scene.cursors.up.isDown && this.body.onFloor()){
            
                this.vaiCima()
            
                if (this.scene.heroMuzzle != null){
                    this.scene.heroMuzzle.setVisible(false)
                    
                }
            }

        }

        if (this.scene.inputKeys.isDown){

            if(this.body.onFloor()){
                
                this.movimento = 'run'

            } else if (!this.body.onFloor()){

                this.movimento = 'jump'

            }

            if (this.scene.cursors.up.isDown && this.body.onFloor()){
            
                this.vaiCima()
                
                if (this.scene.heroMuzzle != null){
                    this.scene.heroMuzzle.setX(this.x - 70)
                    this.scene.heroMuzzle.setY(this.y)
                    this.scene.heroMuzzle.setVisible(true)
                
                }       
            
            }

            this.scene.disparouBalaHero(this, this.movimento)
        }
    }

    vaiDireita(){

        this.flipX = false
        this.body.setSize(280, 450, true)
        this.body.setOffset(0, -2)   

        if (this.body.onFloor() && this.scene.inputKeys.isUp && this.scene.cursors.up.isUp){

            this.play(this.scene.playerSelected + '_run', true)
        }

        this.body.setVelocityX(this.scene.speedH)

        if (this.scene.inputKeys.isUp){

            if (this.scene.cursors.up.isDown && this.body.onFloor()){
            
                this.vaiCima()
            
                if (this.scene.heroMuzzle != null){
                    this.scene.heroMuzzle.setVisible(false)
                    
                }
            }

        }

        if (this.scene.inputKeys.isDown){

            if(this.body.onFloor()){
                
                this.movimento = 'run'

            } else if (!this.body.onFloor()){

                this.movimento = 'jump'

            }

            if (this.scene.cursors.up.isDown && this.body.onFloor()){
            
                this.vaiCima()
                
                if (this.scene.heroMuzzle != null){
                    this.scene.heroMuzzle.setX(this.x + 70)
                    this.scene.heroMuzzle.setY(this.y)
                
                }       
            
            }

            this.scene.disparouBalaHero(this, this.movimento)
        }
    }

    vaiCima(){

        if (this.body.onFloor()){
            
            this.body.velocity.y = - 250
        
        }

        this.play(this.scene.playerSelected + '_jump', true) 
            
        if (this.scene.heroMuzzle != null){
            
            this.scene.heroMuzzle.setVisible(false)
            
        }

        if (this.scene.inputKeys.isDown){

            this.movimento = 'jump'
            this.scene.heroMuzzle.setVisible(true)
            this.scene.disparouBalaHero(this, this.movimento)

        }
    }

    vaiBaixo(){

        if (!this.body.onFloor()){

            this.body.velocity.y = + 250
            this.play(this.scene.playerSelected + '_jump', true)

        }else if (this.body.onFloor()){

            this.play(this.scene.playerSelected + '_crouch_aim')

            if (this.flipX){

                
                this.body.setSize(this.width - 232, this.height, true)
                this.body.setOffset(200, 0)
                

            }else if (!this.flipX){

                this.body.setSize(280, this.height, true)
                this.body.setOffset(0, 0)   

            }

            this.refreshBody()

            if (this.scene.inputKeys.isDown){

                this.movimento = 'crouch'
                this.scene.heroMuzzle.setVisible(true)
                this.scene.disparouBalaHero(this, this.movimento)
            }

        }

    }

    vaiEsquerdaDispara(){

        this.flipX = true
        this.body.setSize(this.width - 232, this.height - 50, true)
        this.body.setOffset(200, -2)
        
        this.movimento = 'run'
        this.scene.heroMuzzle.setX(this.x - 70)
        this.scene.heroMuzzle.setY(this.y)
    
                
    }

    correSaltaDispara(){

        // if (this.body.onFloor()){
        //     this.movimento = 'run'
        // }
        
        if (this.flipX && this.body.onFloor()){
            this.movimento = 'run'
            this.scene.heroMuzzle.setX(this.x - 70)
            this.scene.heroMuzzle.setY(this.y)
            this.vaiEsquerda()

        }else if (!this.flipX && this.body.onFloor()){
            this.movimento = 'run'
            this.scene.heroMuzzle.setX(this.x + 70)
            this.scene.heroMuzzle.setY(this.y)
            this.vaiDireita()

        }

        if (this.scene.cursors.up.isDown){
            
            this.movimento = 'jump'

            if (this.body.onFloor()){

                this.vaiCima()

            }
            
            //this.play(this.scene.playerSelected + '_jump', true) 

        }  

        this.scene.disparouBalaHero(this, this.movimento)
    }

    estaDisparar(){

        this.movimento = 'idle'


        this.scene.heroMuzzle.setY(this.y)

        if (!this.flipX){
        
            this.scene.heroMuzzle.setX(this.x + 70)
        

        }else if (this.flipX){

            this.scene.heroMuzzle.setX(this.x - 70)
            
        }

        this.scene.disparouBalaHero(this, this.movimento)
    }

    estaParado(){

        if (this.body.onFloor() && this.estado == 'ok' && !this.isDead){

            this.play(this.scene.playerSelected + '_idle', true)

            if (this.flipX){

                
                this.body.setSize(this.width - 232, this.height - 50, true)
                this.body.setOffset(200, 0)
                

            }else if (!this.flipX){

                this.body.setSize(280, this.height - 50, true)
                this.body.setOffset(0, 0)   

            }

        
        }
        
        if (this.scene.heroMuzzle != null){
            this.scene.heroMuzzle.setVisible(false)
        }
        
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