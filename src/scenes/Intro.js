import Phaser from '../lib/phaser.js'

export default class Intro extends Phaser.Scene{
    constructor(){
    
        super('intro')
    
    }

    preload(){

        this.load.image('background', 'assets/background.png')
    }

    create(){

        let bg = this.add.sprite(0,0,'background')
        bg.setOrigin(0,0)

        let width = this.scale.width
        let height = this.scale.height

        console.log(width)

        this.add.text(width / 2, height / 2, 'Hello World', {fontSize: 48})
        
    }
}