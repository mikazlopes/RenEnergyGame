import Phaser from '../lib/phaser.js'
import BalaHero from './DisparaHero.js'


// Inspirado em https://github.com/CodeCaptainIO/Phaser3-Arcade-Groups/blob/master/static/js/main.js

export default class CriaBalasHero extends Phaser.Physics.Arcade.Group
{
    constructor(scene) {
		super(scene.physics.world, scene);

		// dificuldade influencia o numero de balas disponiveis

		this.createMultiple({
			frameQuantity: Phaser.Math.RoundTo(20 / this.scene.dificuldade, 0),
			key: 'hero_bullet',
			active: false,
			visible: false,
			classType: BalaHero
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