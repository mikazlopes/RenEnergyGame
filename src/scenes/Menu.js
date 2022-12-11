import Phaser from '../lib/phaser.js'

export default class Menu extends Phaser.Scene{
     
    constructor(){

    /** @type {Phaser.Physics.Arcade.StaticGroup} */

	/** @type {Phaser.Physics.Arcade.Group} */
	
	/** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
	
	/** @type {Phaser.Physics.Arcade.Group} */

    
        // configura physics para esta cena
        super({
            key: 'Menu'
        })

    }

    init(){

        // Guardar as dimensoes da scene numa variavel
        this.width = this.scale.width
        this.height = this.scale.height
    }

    preload(){


    }

    create(){

         //adiciona o background
         this.add.sprite(0,0,'intro_background').setOrigin(0,0)
        
         //rectangulo com alpha para efeito visual
         let r1 = this.add.rectangle( 0, 0, this.width, this.height, 0xffffff, 0.3).setOrigin(0,0)
         //Adiciona o rectangulo

         // Adiciona butao

         this.joga = this.add.sprite(this.width /2, this.height /2, 'play_btn').setScale(0.4).setInteractive({useHandCursor: true})

         this.joga.on('pointerup', (clica) => {

            this.scene.start('Seleciona')

         })


    }

}