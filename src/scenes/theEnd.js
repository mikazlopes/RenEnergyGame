import Phaser from '../lib/phaser.js'

export default class TheEnd extends Phaser.Scene{
     
    constructor(){
  
    
    
        super({
            key: 'TheEnd'
        })

    }

    init(data){

         // Guardar as dimensoes da scene numa variavel
         this.width = this.scale.width
         this.height = this.scale.height

         this.dificuldade = data.opcaoDificuldade
         this.defAudio = data.opcaoAudio
         this.playerSelected = data.heroi
         
    }

    create(){

        //adiciona o background
        this.add.sprite(0 , 0,'intro_background').setOrigin(0,0)

        //rectangulo com alpha para efeito visual
        let r1 = this.add.rectangle( 0, 0, this.width, this.height, 0xffffff, 0.4).setOrigin(0,0)

        

        // Mostra Viana

        let viana = this.add.sprite(0, this.height, 'cidade').setOrigin(0,0)

        this.tweens.add({
            targets:  viana,
            y:  this.height - 530,
            duration: 3000
        })

        
        let titulo = this.add.text(this.width / 2, this.height / 6, "Thanks to our Heroes Viana's power is back!", {fontSize: 48, color: 0x2127F1}).setOrigin(0.5)
        let subtitulo = this.add.text(this.width / 2, this.height / 4, 'The other cities learned their lesson and with the help of Viana are switching to Renewable Energies', {fontSize: 22,align: 'center', color: 0x2127F1, wordWrap: {width: 1200}}).setOrigin(0.5)

        let cogs = this.add.group({
            key: 'cogs',
            repeat: 2,
            setScale: {x: 0.5, y: 0.5},
            setAlpha: 0,
            setXY:{
                x: 200,
                y: this.height / 2,
                stepX:  400,
                stepY: 0
            }
        })

        this.jack = this.add.sprite( -50, this.height - 100, 'jack_run').setScale(0.2)
        this.jill = this.add.sprite( this.width + 50, this.height - 100, 'jill_run').setScale(0.2)
        this.jill.flipX = true

        this.jack.play('jack_run')
        this.jill.play('jill_run')

        this.tweens.add({
            targets:  this.jack,
            x:  this.width /2 - 100,
            delay: 2000,
            duration: 6000,
            onComplete: this.jackIsHappy,
            onCompleteScope: this
        })

        this.tweens.add({
            targets:  this.jill,
            x:  this.width /2 + 100,
            delay: 2000,
            duration: 6000,
            onComplete: this.jillIsHappy, 
            onCompleteScope: this
        })

        
        // Inicia o jogo de novo

        this.input.on('pointerup', (clica) => {

            this.scene.start('Menu', {opcaoDificuldade: this.dificuldade, opcaoAudio: this.defAudio})

        })
    }

    jackIsHappy(){

        this.jack.play('jack_happy')
    }

    jillIsHappy(){

        this.jill.play('jill_happy')
    }

}