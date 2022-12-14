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

       //parametros do Inimigo que inclui dano e energia
        super(scene, x, y, texture)
        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setScale(0.2)
        this.flipX = true

        // quanto maior a dificuldade mais fortes os inimigos
        
        this.health = 50 * ((this.scene.dificuldade / 5) + 1)
        this.meele = 10 * ((this.scene.dificuldade / 5) + 1)
        
        this.play('enemy_idle')

        this.body.setVelocityX(0)
        
        // Estados do inimigo que permitem controlar animacoes
        this.estado = 'ok'

        // objeto que cria e mostra o Muzzle da arma
        this.muzzle = new MuzzlesEnemy(this.scene, this.x, this.y)

        //define o intervalo em que o inimigo dispara influenciado pela dificuldade
        this.shootTimer = this.scene.time.addEvent({
            delay: Phaser.Math.RND.between(800,2500 / this.scene.dificuldade),
            callback: this.scene.disparouBalaEnemy,
            args: [this, 'idle'],
            callbackScope: this.scene,
            loop: true
        })

        // efeitos de som

        this.enemyDying = this.scene.sound.add('enemy_dying')
        this.enemyHit = this.scene.sound.add('enemy_hit')

        //barra de energia

        this.roundRect1 = this.scene.add.graphics({x: this.x - 50, y: this.y - 50})
        this.roundRect2 = this.scene.add.graphics({x: this.x - 50, y: this.y - 50})

        this.roundRect1.fillStyle(0xd20505)
        this.roundRect2.fillStyle(0x90ee09)

        this.originalSize = this.health

        this.roundRect1.fillRoundedRect(0, 0, this.originalSize, 20, 5)
        this.roundRect2.fillRoundedRect(0, 0, this.health, 20, 5)



    }

    calculaDano(damage){

        this.health = this.health - damage
        this.enemyHit.play()
        
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
        this.roundRect1.clear()
        this.roundRect2.clear()
        this.enemyDying.play()
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

    inimigoAcoes(jogador){

        if (jogador.x > this.x){

            this.flipX = false

        }else{

            this.flipX = true
        }

        var dist = Phaser.Math.Distance.BetweenPoints(jogador, this)
        
        var distV = jogador.y - this.y

        // accao de inimigo influenciada pela dificuldade, quanto mais dificil mais depressa o inimigo vai atras do heroi

        var distAcao = 700 * ((this.scene.dificuldade / 10) + 1)

        if (dist < distAcao && dist > 80 && this.estado != 'dead' && this.body.onFloor()){
            
            this.play('enemy_idle_aim')
            this.body.setVelocityX(0)
            this.anims.playAfterRepeat('enemy_idle', true)

            if ( distV < - 10 && this.body.onFloor()){

                this.body.velocity.y = -250
                this.play('enemy_jump_shoot', true)
            }

                
                
                if (!this.body.onFloor()){

                    this.body.setSize(this.width, this.height, true)
                    this.play('enemy_jump_shoot', true)

                }
                
                if (this.body.onFloor()){

                    this.anims.playAfterRepeat('enemy_idle', true)
                    
                }

        }else if (dist <= 80 && this.estado != 'dead'){
            
            this.play('enemy_melee', true)
            this.anims.playAfterRepeat('enemy_idle', true)

            
        }else if(dist > distAcao && dist < 1700 && this.estado != 'dead' && this.estado != 'hurt'){

            this.estado = 'run'
            this.play('enemy_run_shoot', true)
            
            if (this.flipX){

                this.body.setVelocityX(-100)

            }else{

                this.body.setVelocityX(100)
            }
        }

        if (this.flipX && !this.body.onFloor()){
                    
            this.muzzle.x = this.x - 45
            this.muzzle.y = this.y + 5


        }else if (!this.flipX && !this.body.onFloor()){
            
            this.muzzle.x = this.x + 45
            this.muzzle.y = this.y + 5
        }
         

        
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

        // move a barra de energia com o inimigo e atualiza

        this.roundRect1.setPosition(this.x - 25, this.y - 100)
        this.roundRect2.setPosition(this.x - 25,this.y - 100)
        this.roundRect2.setScale(this.health / this.originalSize, 1)


        

   
    }

}
