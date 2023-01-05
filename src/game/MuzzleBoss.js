import Phaser from '../lib/phaser.js'

export default class MuzzlesBoss extends Phaser.GameObjects.Sprite
{
    /**
    * @param {Phaser.Scene} scene
    * @param {number} x
    * @param {number} y
    */

     constructor(scene, x, y) {
		super(scene, x, y, 'muzzleBoss')

        this.setActive(false)
        this.setVisible(false)
        this.scene.add.existing(this)

	}

	dispara(x, y, direcao, quem) {
		
        this.inimigo = quem
        this.sentido = direcao
        this.setScale(0.2)
        this.setActive(true)
		this.setVisible(true)
        this.play('boss_muzzle')
        this.on('animationcomplete', () => {
            this.setActive(false)
        })
       
        
		if (direcao == 'esquerda'){

            this.flipX = true

        }else{
            
            this.flipX = false

        }
	}

    preUpdate(time, delta) {
		super.preUpdate(time, delta)
        
        if (this.sentido == 'esquerda'){

            this.setX(this.inimigo.x - 78)
            this.setY(this.inimigo.y + 15)

        }else{
            
            this.setX(this.inimigo.x + 78)
            this.setY(this.inimigo.y + 15)

        }
		
	}
 
    
}