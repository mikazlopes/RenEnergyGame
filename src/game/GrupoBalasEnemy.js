import Phaser from '../lib/phaser.js'
import BalaEnemy from './DisparaEnemy.js'


// Inspirado em https://github.com/CodeCaptainIO/Phaser3-Arcade-Groups/blob/master/static/js/main.js

export default class CriaBalasEnemy extends Phaser.Physics.Arcade.Group
{
    constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: 20,
			key: 'enemy_bullet',
			active: false,
			visible: false,
			classType: BalaEnemy
		})
	}

	disparouBala(x, y, direcao) {
		const bala = this.getFirstDead(false)
		const sentido = direcao

		if(bala) {
			bala.dispara(x, y, sentido)
		}
	}

}