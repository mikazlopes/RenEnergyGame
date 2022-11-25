import Phaser from '../lib/phaser.js'

export default class Intro extends Phaser.Scene{
    constructor(){
    
        super('intro')
    
    }

    preload(){

        this.load.image('background', 'assets/background.png')
    }

    create(){

        this.add.sprite(0,0,'background').setOrigin(0,0)
       
        let width = this.scale.width
        let height = this.scale.height

        let r1 = this.add.rectangle(width / 6, height / 4, width / 1.5, height / 2, 0xffffff, 90).setOrigin(0,0)

        this.add.text(width / 2, height / 2, 'Hello World', {fontSize: 48, color: 0x2127F1}).setOrigin(0.5)
        
    }
}