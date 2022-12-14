import Phaser from '../lib/phaser.js'
import MuzzlesBoss from './MuzzleBoss.js'



export default class Boss extends Phaser.Physics.Arcade.Sprite
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
        this.setScale(0.4)
        this.body.setSize(300, 400, true)
        this.body.setOffset(150, 38)
        this.flipX = true

        // quanto maior a dificuldade mais fortes os inimigos
        
        this.health = 100 * ((this.scene.dificuldade / 5) + 1)
        this.meele = 15 * ((this.scene.dificuldade / 5) + 1)
        
        this.play('boss_idle')

        this.body.setVelocityX(0)
        
        // Estados do inimigo que permitem controlar animacoes
        this.estado = 'ok'

        // objeto que cria e mostra o Muzzle da arma
        this.muzzle = new MuzzlesBoss(this.scene, this.x, this.y)

        //define o intervalo em que o inimigo dispara influenciado pela dificuldade
        this.shootTimer = this.scene.time.addEvent({
            delay: Phaser.Math.RND.between(600, 2000 / this.scene.dificuldade),
            callback: this.scene.disparouBalaBoss,
            args: [this, 'idle'],
            callbackScope: this.scene,
            loop: true
        })

        // efeitos de som

        this.enemyDying = this.scene.sound.add('explosion')
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

            // this.body.enable = false
            this.anims.playAfterRepeat('boss_shoot', true)
            this.inimigoFlasha()

        }else{

            this.inimigoMorreu()
        }

    }

    inimigoMorreu(){

        this.estado = 'dead'
        this.body.enable = false
        this.roundRect1.clear()
        this.roundRect2.clear()
        this.play('boss_dead', true)
        this.scene.explosao.x = this.x
        this.scene.explosao.y = this.y
        this.enemyDying.play()
        this.scene.explosao.setVisible(true)
        this.scene.explosao.play('boss_explosion')
        this.on('animationcomplete', () => {
            this.scene.bossDead = true
            this.scene.cog.setActive(true)
            this.scene.cog.setVisible(true)
            this.scene.cog.x = this.x
            this.scene.cog.y = 500
            this.scene.explosao.setVisible(false)
            this.scene.destroiInimigo(this)
        })
    }

    inimigoFlasha(){

        this.setTintFill(0xffffff)
        this.scene.time.addEvent({delay: 100, repeat: 0, callback: this.setTintFill,args: [0xFF0000], callbackScope: this})
        this.scene.time.addEvent({delay: 100, repeat: 0, callback: this.inimigoRecupera, callbackScope: this})
    }

    inimigoRecupera(){

        this.mudaCor = this.scene.time.addEvent({delay: 100, repeat: 0, callback: this.clearTint, callbackScope: this})

    }

    // funcao que controla as accoes do boss incluindo ir atras do jogador

    inimigoAcoes(jogador){

        if (jogador.x > this.x){

            this.flipX = false

        }else{

            this.flipX = true
        }

        var dist = Phaser.Math.Distance.BetweenPoints(this, jogador)

        

        if (dist < 500 && this.estado != 'dead'){
            
            this.play('boss_shoot', true)
            this.body.setVelocityX(0)


        }else if (dist > 501 && dist < 1200 && this.estado != 'dead'){

            this.play('boss_walk',true)
            
            if (this.flipX){

                this.body.setVelocityX(-80)

            }else{

                this.body.setVelocityX(80)
            }
            
        }

        if (this.flipX){
                    
            this.muzzle.x = this.x - 75
            this.muzzle.y = this.y + 15


        }else if (!this.flipX ){
            
            this.muzzle.x = this.x + 75
            this.muzzle.y = this.y + 15
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

        this.roundRect1.setPosition(this.x - 35, this.y - 100)
        this.roundRect2.setPosition(this.x - 35,this.y - 100)
        this.roundRect2.setScale(this.health / this.originalSize, 1)

   
    }

}
