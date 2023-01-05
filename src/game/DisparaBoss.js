import Phaser from '../lib/phaser.js'

export default class BalaBoss extends Phaser.Physics.Arcade.Sprite
{
    /**
    * @param {Phaser.Scene} scene
    * @param {number} x
    * @param {number} y
    */

     constructor(scene, x, y) {
		super(scene, x, y, 'balaBoss')
        scene.physics.world.enable(this)
        this.setTexture('boss_bullet')

        // quanto mais dificuldade maior o dano do inimigo
        this.dano = 10 + this.scene.dificuldade
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
            this.flipX = true
            this.setVelocityX(-400 * ((this.scene.dificuldade / 5) + 1))
        }else{
            this.setVelocityX(400 * ((this.scene.dificuldade / 5) + 1))
        }
	}

    acertouHeroi(){

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
 
		if (this.x < 0 || this.x > 9000) {
			this.setActive(false)
			this.setVisible(false)
		}
	}
 
    
}