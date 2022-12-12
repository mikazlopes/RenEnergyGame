import Phaser from '../lib/phaser.js'

import MuzzlesHero from './MuzzlesHero.js'

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

        if (this.scene.playerSelected == 'jack'){
            
            this.body.setSize(280, 450, true)
            this.body.setOffset(0, -2)

        }else{

            this.body.setSize(this.width, this.height, true)
        }
        
        
        
        this.muzzle = new MuzzlesHero(this.scene, this.x, this.y)
        
        this.health = 100
        
        this.estado = 'ok'
        this.movimento = 'idle'

        this.isDead = false
        



    }

    vaiEsquerda(){

        this.flipX = true

       

        if (this.scene.playerSelected == 'jack'){
            
            this.body.setSize(this.width - 232, this.height - 50, true)
            this.body.setOffset(200, -2)

    
        }else{
    
                this.body.setSize(this.width, this.height, true)
        }

        if (this.body.onFloor() && this.scene.inputKeys.isUp && this.scene.cursors.up.isUp){

            this.play(this.scene.playerSelected + '_run', true)
            this.muzzle.setVisible(false)
        }
        
        this.body.setVelocityX(- this.scene.speedH)

        if (this.scene.inputKeys.isUp){

            if (this.scene.cursors.up.isDown && this.body.onFloor()){
            
                this.vaiCima()
                this.muzzle.setVisible(false)
                    
                
            }

        }

        if (this.scene.inputKeys.isDown){

            if(this.body.onFloor()){
                
                this.movimento = 'run'


                if (this.scene.playerSelected == 'jack'){
            
                    this.body.setSize(this.width - 232, this.height - 30, true)
                    this.body.setOffset(200, -2) 
        
            
                }else{
            
                        this.body.setSize(this.width, this.height, true)
                }

            } else if (!this.body.onFloor()){

                this.movimento = 'jump'

            }

            if (this.scene.cursors.up.isDown && this.body.onFloor()){
            
                this.vaiCima()
                
                this.muzzle.setVisible(true)
                
            }

            this.scene.disparouBalaHero(this, this.movimento)
        }
    }

    vaiDireita(){

        this.flipX = false
        

        if (this.scene.playerSelected == 'jack'){
            
            this.body.setSize(300, 450, true)
            this.body.setOffset(50, -2)   

    
        }else{
    
                this.body.setSize(this.width, this.height, true)
        }

        if (this.body.onFloor() && this.scene.inputKeys.isUp && this.scene.cursors.up.isUp){

            this.play(this.scene.playerSelected + '_run', true)
            this.muzzle.setVisible(false)
        }

        this.body.setVelocityX(this.scene.speedH)

        if (this.scene.inputKeys.isUp){

            if (this.scene.cursors.up.isDown && this.body.onFloor()){
            
                this.vaiCima()
            
                this.muzzle.setVisible(false)
                    
                
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
            
            }

            this.scene.disparouBalaHero(this, this.movimento)
        }
    }

    vaiCima(){

        if (this.body.onFloor()){
            
            this.body.velocity.y = - 450
        
        }

        this.play(this.scene.playerSelected + '_jump', true) 
            
        
       this.muzzle.setVisible(false)
            
        

        if (this.scene.inputKeys.isDown){

            this.movimento = 'jump'
            this.muzzle.setVisible(true)
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

                  
                if (this.scene.playerSelected == 'jack'){
            
                    this.body.setSize(this.width - 232, this.height, true)
                    this.body.setOffset(200, -5)
    
            
                }else{
            
                        this.body.setSize(this.width, this.height, true)
                }

                
  

            }else if (!this.flipX){


                if (this.scene.playerSelected == 'jack'){
            
                    this.body.setSize(280, this.height, true)
                    this.body.setOffset(0, -5)
    
            
                }else{
            
                        this.body.setSize(this.width, this.height, true)
                }
                    
            }
            
            if (this.scene.inputKeys.isDown){

                this.movimento = 'crouch'
                this.muzzle.setVisible(true)
                this.scene.disparouBalaHero(this, this.movimento)  
            
            }


        }

    }

    estaDisparar(){

        if (this.body.onFloor()){

            this.movimento = 'idle'
        
        }else if(!this.body.onFloor()){

            this.movimento = 'jump'

        }


       this.muzzle.setY(this.y)

        if (!this.flipX){
        
            
            if (this.scene.playerSelected == 'jack'){
            
                this.body.setSize(280, 450, true)
                this.body.setOffset(0, 0)

        
            }else{
        
                    this.body.setSize(this.width, this.height, true)
            }
            
        

        }else if (this.flipX){

            

            if (this.scene.playerSelected == 'jack'){
            
                this.body.setSize(this.width - 232, this.height - 35, true)
                this.body.setOffset(200, 20)

        
            }else{
        
                    this.body.setSize(this.width, this.height, true)
            }
            
        }

        this.scene.disparouBalaHero(this, this.movimento)
    }

    estaParado(){

        if (this.body.onFloor() && this.estado == 'ok' && !this.isDead){

            this.play(this.scene.playerSelected + '_idle', true)

            if (this.flipX){

                
                if (this.scene.playerSelected == 'jack'){
            
                this.body.setSize(this.width - 232, this.height - 50, true)
                this.body.setOffset(200, 0)
        
                }else{
        
                    this.body.setSize(this.width, this.height, true)
                }
                

            }else if (!this.flipX){
  

                if (this.scene.playerSelected == 'jack'){
            
                    this.body.setSize(280, this.height - 50, true)
                    this.body.setOffset(0, 0)   
    
            
                }else{
            
                        this.body.setSize(this.width, this.height, true)
                }


            }

        
        }
        
       this.muzzle.setVisible(false)
          
    }

    calculaDano(damage, origem){


        this.health = this.health - damage
        
        if(this.health > 0){
            this.estado = 'hurt'
            this.play(this.scene.playerSelected + '_hurt', true)  
            this.disableInteractive(this)
            this.jogadorFlasha(origem)

        }else{

            this.jogadorMorreu()

        }
        
    }

    jogadorMorreu(){

        if (!this.isDead){

            this.body.enable = false
        console.log('executou')
        this.estado = 'dead'
        this.isDead = true
        this.play(this.scene.playerSelected + '_dead', true)
        this.on('animationcomplete', () => {
            this.setActive(false)
            this.setVisible(false)
        })

        // Inicia a funcao que chama a scene para Game over

        this.scene.cameras.main.fadeOut(1000, 0, 0, 0)
        this.scene.time.addEvent({delay: 1500, repeat: 0, callback: this.gameOver, callbackScope: this.scene})

        }
        

    }

    gameOver(){

        this.scene.start('GameOver')
    }

   jogadorFlasha(origin){

        if (origin == 'inimigo'){
            
            this.body.enable = false
            console.log('executou')
        }
        
        this.setTintFill(0xffffff)
        this.mudaCor = this.scene.time.addEvent({delay: 100, repeat: 0, callback: this.setTintFill,args: [0xFF0000], callbackScope: this})
        this.mudaCor = this.scene.time.addEvent({delay: 100, repeat: 0, callback: this.jogadorRecupera, callbackScope: this})

    }

    jogadorRecupera(){

        this.mudaCor = this.scene.time.addEvent({delay: 100, repeat: 0, callback: this.clearTint, callbackScope: this})
        this.estado = 'ok'
        this.body.enable = true

    }

    heroiDispara(x, y, direcao){

        const sentido = direcao

        this.muzzle.dispara(x, y, sentido, this)
        
    }

    
    // corre funcoes antes to update
    preUpdate(time, delta) {        
		super.preUpdate(time, delta)  
        
        
    }  
    
}