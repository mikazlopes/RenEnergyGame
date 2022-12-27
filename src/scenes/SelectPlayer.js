import Phaser from '../lib/phaser.js'

export default class Seleciona extends Phaser.Scene{
     
    constructor(){
  
    
        // configura physics para esta cena
        super({
            key: 'Seleciona'
        })

    }

    init(data){

        // Guardar as dimensoes da scene numa variavel
        this.width = this.scale.width
        this.height = this.scale.height

        // Transporta os valores para Dificuldade e Audio
        this.dificuldade = data.opcaoDificuldade
        this.defAudio = data.opcaoAudio

        console.log(this.dificuldade)

    }

    preload(){


    }

    create(){

        this.anims.create({
            key: 'jack_happy',
            frames: this.anims.generateFrameNames('jack_happy', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Happy__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'jill_happy',
            frames: this.anims.generateFrameNames('jill_happy', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Happy__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        //adiciona o background
        this.add.sprite(0,0,'intro_background').setOrigin(0,0)
        
        //rectangulo com alpha para efeito visual
        let r1 = this.add.rectangle( 0, 0, this.width, this.height, 0xffffff, 0.5).setOrigin(0,0)
        //Adiciona o rectangulo

        let titulo = this.add.text(this.width / 2, this.height / 4, 'Click on your character to choose your hero', {fontSize: 48, color: 0x2127F1}).setOrigin(0.5)

        let instrucoes = this.add.text(this.width / 2, this.height - 100, 'Use the cursor keys to control your hero and SPACE to shoot', {fontSize: 23, color: 0x2127F1}).setOrigin(0.5)

        
        // torna os herois clickaveis
        let jack = this.add.sprite( this.width /2 - 200, this.height / 1.5, 'jack_idle').setScale(0.25).setInteractive({useHandCursor: true})
        let jill = this.add.sprite( this.width / 2 + 200, this.height / 1.5, 'jill_idle').setScale(0.25).setInteractive({useHandCursor: true})
        jill.flipX = true

        jack.play('jack_idle')
        jill.play('jill_idle')

        jack.on('pointerover', (clica) => {

            jack.play('jack_happy')

         })

        jack.on('pointerout', (clica) => {

            jack.play('jack_idle')

         })

         jill.on('pointerover', (clica) => {

            jill.play('jill_happy')

         })

        jill.on('pointerout', (clica) => {

            jill.play('jill_idle')

         })

        jack.on('pointerup', (clica) => {
                   
            this.scene.start('Loading2', {heroi: 'jack', opcaoDificuldade: this.dificuldade, opcaoAudio: this.defAudio})
     
         })

         jill.on('pointerup', (clica) => {

               
                this.scene.start('Loading2', {heroi: 'jill', opcaoDificuldade: this.dificuldade, opcaoAudio: this.defAudio})

         })

    }
}