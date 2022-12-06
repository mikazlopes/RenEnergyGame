import Phaser from '../lib/phaser.js'

export default class BalaEnemy extends Phaser.Physics.Arcade.Sprite
{
    /**
    * @param {Phaser.Scene} scene
    * @param {number} x
    * @param {number} y
    */

     constructor(scene, x, y) {
		super(scene, x, y, 'balaEnemy')
        scene.physics.world.enable(this)
        this.setTexture('enemy_bullet')
	}

	dispara(x, y, direcao) {
		this.body.reset(x, y)
		this.setScale(0.2)
        this.setActive(true)
		this.setVisible(true)
        this.body.setSize(this.width, this.height, true)
        this.body.setAllowGravity(false)
        
		if (direcao == 'esquerda'){
            this.setVelocityX(-500)
        }else{
            this.setVelocityX(500)
        }
	}

    acertouHeroi(){

        this.setActive(false)
        this.setVisible(false)

    }

    preUpdate(time, delta) {
		super.preUpdate(time, delta)
 
		if (this.x < 0 || this.x > 1300) {
			this.setActive(false)
			this.setVisible(false)
		}
	}
 
    
}