import Phaser from '../lib/phaser.js'

export default class Enemy extends Phaser.GameObjects.Sprite
{
    /**
    * @param {Phaser.Scene} scene
    * @param {number} x
    * @param {number} y
    * @param {string} texture
    */

    constructor(scene, x, y, texture){

        super(scene, x, y, texture)

        this.setScale(0.25)
    }

    preload(){

        this.load.atlas('enemy_run', 'assets/spritesheets/enemy_run_spritesheet.png', 'assets/spritesheets/enemy_run_spritesheet.json')
        this.load.atlas('enemy_bullet', 'assets/spritesheets/enemy_bullet_spritesheet.png', 'assets/spritesheets/enemy_bullet_spritesheet.json')
        this.load.atlas('muzzle', 'assets/spritesheets/muzzle_spritesheet.png', 'assets/spritesheets/muzzle_spritesheet.json')
    }

    create(){

        this.anims.create({
            key: 'run_shoot',
            frames: this.anims.generateFrameNames('enemy_run', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Run_Shoot__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('enemy_run', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Run__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy_bullet_size',
            frames: this.anims.generateFrameNames('enemy_bullet', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'OrangeScale__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy_bullet_spin',
            frames: this.anims.generateFrameNames('enemy_bullet', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'OrangeSpin__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy_muzzle',
            frames: this.anims.generateFrameNames('muzzle', {
                start: 0,
                end: 10,
                zeroPad: 3,
                prefix: 'OrangeMuzzle__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: 5
        });

    }
}