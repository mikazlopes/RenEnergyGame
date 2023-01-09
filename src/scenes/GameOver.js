import Phaser from '../lib/phaser.js'

export default class GameOver extends Phaser.Scene{
     
    constructor(){
  
    
    
        super({
            key: 'GameOver'
        })

    }

    init(data){

         // Guardar as dimensoes da scene numa variavel
         this.width = this.scale.width
         this.height = this.scale.height

         this.dificuldade = data.opcaoDificuldade
    }

    create(){

        
        let titulo = this.add.text(this.width / 2, this.height / 2, 'Game Over', {fontSize: 48, fontColor: 0xFFFFFF}).setOrigin(0.5)
        let subtitulo = this.add.text(this.width / 2, this.height / 1.5, 'Click to try again', {fontSize: 30, fontColor: 0xFFFFFF}).setOrigin(0.5)
        
        // audio que diz game over
        this.voice = this.sound.add('gameover')
        this.voice.play()

        
        // Inicia o jogo de novo

        this.input.on('pointerup', (clica) => {

            this.scene.start('Menu', {opcaoDificuldade: this.dificuldade})

        })
    }

}