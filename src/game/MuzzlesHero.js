import Phaser from '../lib/phaser.js'

export default class MuzzlesHero extends Phaser.GameObjects.Sprite
{
    /**
    * @param {Phaser.Scene} scene
    * @param {number} x
    * @param {number} y
    */

     constructor(scene, x, y) {
		super(scene, x, y, 'muzzleHero')

        this.setActive(false)
        this.setVisible(false)
        this.scene.add.existing(this)

	}

	dispara(x, y, direcao, quem) {
		
        this.heroi = quem
        this.sentido = direcao
        this.setScale(0.2)
        this.setActive(true)
		this.setVisible(true)
        this.play('hero_muzzle')
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

            if (this.scene.playerSelected == 'jack'){
                this.setX(this.heroi.x - 70)
                this.setY(this.heroi.y + 3)
            }else{

                this.setX(this.heroi.x - 65)
                this.setY(this.heroi.y)
            }

        }else{
            
            if (this.scene.playerSelected == 'jack'){
                this.setX(this.heroi.x + 70)
                this.setY(this.heroi.y + 3)
            }else{

                this.setX(this.heroi.x + 65)
                this.setY(this.heroi.y)
            }

        }

        if (this.scene.cursors.left.isDown && this.scene.cursors.up.isUp && this.heroi.body.onFloor()){

            if (this.scene.playerSelected == 'jack'){
                this.setX(this.heroi.x - 80)
                this.setY(this.heroi.y)
            }else{

                this.setX(this.heroi.x - 75)
                this.setY(this.heroi.y)
            }
            
        } else if (this.scene.cursors.right.isDown && this.scene.cursors.up.isUp && this.heroi.body.onFloor()){

            if (this.scene.playerSelected == 'jack'){
                this.setX(this.heroi.x + 80)
                this.setY(this.heroi.y)
            }else{

                this.setX(this.heroi.x + 75)
                this.setY(this.heroi.y)
            }
        }else if (this.scene.cursors.down.isDown && this.scene.playerSelected == 'jill'){

            this.setY(this.heroi.y + 5)
        }
		
	}
 
    
}