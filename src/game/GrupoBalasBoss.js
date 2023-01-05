import Phaser from '../lib/phaser.js'
import BalaBoss from './DisparaBoss.js';


// Inspirado em https://github.com/CodeCaptainIO/Phaser3-Arcade-Groups/blob/master/static/js/main.js

export default class CriaBalasBoss extends Phaser.Physics.Arcade.Group
{
    constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: 100,
			key: 'boss_bullet',
			active: false,
			visible: false,
			classType: BalaBoss
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