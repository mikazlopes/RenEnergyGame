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
         this.playerSelected = data.heroi
         
    }

    create(){

        // inicia Musica

        this.musica = this.sound.add('victory_music', {volume: 0.5})
        
       
        this.musica.play()


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

        // mostra texto

        let titulo = this.add.text(this.width / 2, this.height / 6, "Thanks to our Heroes Viana's power is back!", {fontSize: 48, color: 0x2127F1}).setOrigin(0.5).setAlpha(0)
        let subtitulo = this.add.text(this.width / 2, this.height / 4, 'The other cities learned their lesson and with the help of Viana are switching to Renewable Energies', {fontSize: 22,align: 'center', color: 0x2127F1, wordWrap: {width: 1200}}).setOrigin(0.5).setAlpha(0)

        this.tweens.add({
            targets:  titulo,
            ease: 'Cubic.easeOut',
            alpha: 1,
            duration: 2000,
            repeat: 0,
            yoyo: false
        })

        this.tweens.add({
            targets:  subtitulo,
            delay: 1000,
            ease: 'Cubic.easeOut',
            alpha: 1,
            duration: 2000,
            repeat: 0,
            yoyo: false
        })

        // Cria as pecas

        this.cogs = this.add.group({
            key: 'cogs',
            repeat: 2,
            setScale: {x: 0.5, y: 0.5},
            setXY:{
                x: 200,
                y: this.height / 2,
                stepX:  400,
                stepY: 0
            }
        }).setAlpha(0)


        // adiciona e anima a entrada dos Herois

        this.jack = this.add.sprite( -50, this.height - 100, 'jack_run').setScale(0.2)
        this.jill = this.add.sprite( this.width + 50, this.height - 100, 'jill_run').setScale(0.2)
        this.jill.flipX = true

        this.jack.play('jack_run')
        this.jill.play('jill_run')

        this.tweens.add({
            targets:  this.jack,
            x:  this.width /2 - 100,
            delay: 4000,
            duration: 6000,
            onComplete: this.jackIsHappy,
            onCompleteScope: this
        })

        this.tweens.add({
            targets:  this.jill,
            x:  this.width /2 + 100,
            delay: 4000,
            duration: 6000,
            onComplete: this.jillIsHappy, 
            onCompleteScope: this
        })
    }

    jackIsHappy(){

        this.jack.play('jack_happy')
        this.pecasAparecem()
    }

    jillIsHappy(){

        this.jill.play('jill_happy')
    }

    pecasAparecem(){

        this.tweens.add({
            targets:  this.cogs.getChildren(),
            ease: 'Cubic.easeOut',
            alpha: 1,
            duration: 2000,
            repeat: 0,
            yoyo: false,
            onComplete: this.textoFinal, 
            onCompleteScope: this
        })
       
    }

    textoFinal(){

        let subtitulo2 = this.add.text(this.width / 2, this.height / 4 + 50, 'Click anywhere to go back to the Menu', {fontSize: 22,align: 'center', color: 0x2127F1, wordWrap: {width: 1200}}).setOrigin(0.5).setAlpha(0)

        this.tweens.add({
            targets:  subtitulo2,
            delay: 1000,
            ease: 'Cubic.easeOut',
            alpha: 1,
            duration: 2000,
            repeat: 0,
            yoyo: false
        })

        // Inicia o jogo de novo

        this.input.on('pointerup', (clica) => {

            this.musica.stop()

            this.scene.start('Menu', {opcaoDificuldade: this.dificuldade})

        })
    }

}