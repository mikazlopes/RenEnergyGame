import Phaser from '../lib/phaser.js'

export default class Enemy extends Phaser.Physics.Arcade.Sprite
{
    /**
    * @param {Phaser.Scene} scene
    * @param {number} x
    * @param {number} y
    * @param {string} texture
    */

    constructor(scene, x, y, texture){

        super(scene, x, y, texture)
        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setScale(0.2)
        this.flipX = true
        //this.body.setSize(280, 450, true)
        //this.body.setOffset(0, -8)      
 
        
    }
    
    // recomendado 
    // preUpdate(time, delta) {        
	// 	super.preUpdate(time, delta)       
    // }  
}
