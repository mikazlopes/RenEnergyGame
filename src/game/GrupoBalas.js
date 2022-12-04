import Phaser from '../lib/phaser.js'

import Bala from './Dispara.js'

// Inspirado em https://github.com/CodeCaptainIO/Phaser3-Arcade-Groups/blob/master/static/js/main.js

export default class CriaBalas extends Phaser.Physics.Arcade.Group
{
    constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: 5,
			key: 'enemy_bullet',
			active: false,
			visible: false,
			classType: Bala
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