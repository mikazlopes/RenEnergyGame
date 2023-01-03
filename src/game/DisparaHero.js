import Phaser from '../lib/phaser.js'

export default class BalaHero extends Phaser.Physics.Arcade.Sprite
{
    /**
    * @param {Phaser.Scene} scene
    * @param {number} x
    * @param {number} y
    */

     constructor(scene, x, y) {
		super(scene, x, y, 'balaHero')
        scene.physics.world.enable(this)
        this.setTexture('hero_bullet')

        // Dificuldade influencia dano feito pelas balas do heroi

        this.dano = 11 - this.scene.dificuldade
    
	}

	dispara(x, y, direcao) {
		this.body.reset(x, y)
		this.setScale(0.2)
        this.setActive(true)
		this.setVisible(true)
        this.body.enable = true
        this.body.setSize(this.width, this.height, true)
        this.body.setAllowGravity(false)
        
		if (direcao == 'esquerda'){
            this.setVelocityX(-500)
        }else{
            this.setVelocityX(500)
        }
	}

    acertouInimigo(){

        this.body.enable = false
        this.setVisible(false)
        this.setActive(false)

    }

    acertouParede(){

        this.body.enable = false
        this.setVisible(false)
        this.setActive(false)

    }

    preUpdate(time, delta) {
		super.preUpdate(time, delta)
 
		if (this.x < 0 || this.x > 6350) {
			this.setActive(false)
			this.setVisible(false)
		}
	}
 
    
}