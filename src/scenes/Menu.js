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

    init(data){

        this.defAudio = data.opcaoAudio
        this.grauDificuldade = data.opcaoDificuldade
        
        // Guardar as dimensoes da scene numa variavel
        this.width = this.scale.width
        this.height = this.scale.height

        // reinicia as variaveis no registro que indica se as cidades foram completadas

        this.registry.set('cidade1completa', false)
        this.registry.set('cidade2completa', false)
        this.registry.set('cidade3completa', false)

        
    }

    preload(){


    }

    create(){

        //adiciona o background
        this.add.sprite(0,0,'intro_background').setOrigin(0,0)
        
        //rectangulo com alpha para efeito visual
        let r1 = this.add.rectangle( 0, 0, this.width, this.height, 0xffffff, 0.3).setOrigin(0,0)


        // verifica se ja existiam opcoes selecionadas previamente para dificuldade e audio. Se nao entao define uma por defeito
        if (this.grauDificuldade == null){
            this.grauDificuldade = 2
        }
        
        if (this.defAudio == null) {
            this.defAudio = true
        }

        // Adiciona butoes e labels para o menu e subopcoes

        this.joga = this.add.sprite(this.width /2 - 50, this.height /2 - 50, 'play_btn').setScale(0.4).setInteractive({useHandCursor: true})

        this.textoJogar = this.add.text(this.width / 2, this.height / 2 - 50, 'Play', {fontSize: 30, color: 0x2127F1, align: 'left'}).setOrigin(0,0.5)

        this.opcoes = this.add.sprite(this.width /2 - 50, this.height /2 + 50, 'music_btn').setScale(0.4).setInteractive({useHandCursor: true})

        this.textoOpcoes = this.add.text(this.width / 2, this.height / 2 + 50, 'Audio', {fontSize: 30, color: 0x2127F1, align: 'left'}).setOrigin(0, 0.5)

        this.difBotao = this.add.sprite(this.width /2 - 50, this.height /2 + 150, 'diff_btn').setScale(0.4).setInteractive({useHandCursor: true})

        this.textoDif = this.add.text(this.width / 2, this.height / 2 + 150, 'Difficulty', {fontSize: 30, color: 0x2127F1, align: 'left'}).setOrigin(0, 0.5)

        this.next = this.add.sprite(this.width /2 + 150, this.height /2, 'next_btn').setScale(0.4).setVisible(false)

        this.prev = this.add.sprite(this.width /2 - 150, this.height /2, 'prev_btn').setScale(0.4).setVisible(false)

        this.fecha = this.add.sprite(this.width - 100, 100, 'close_btn').setScale(0.4).setVisible(false)

        this.subOpcaoTitulo = this.add.text(this.width / 2, this.height / 2 - 100, '', {fontSize: 30, color: 0x2127F1}).setOrigin(0.5).setVisible(false)

        this.dificuldade = ['Easy', 'Normal', 'Hard']

        this.dificuldadeTexto = this.add.text(this.width / 2, this.height / 2, this.dificuldade[this.grauDificuldade], {fontSize: 30, color: 0x2127F1}).setOrigin(0.5).setVisible(false)

        this.sons = this.add.sprite(this.width /2 - 50, this.height /2, 'sound_btn').setScale(0.4).setVisible(false)

        this.sonsOff = this.add.sprite(this.width /2 + 50, this.height /2, 'sound_off_btn').setScale(0.4).setVisible(false)

         // Se clicar nas opcoes chama a funcao
        
         this.difBotao.on('pointerup', (clica) => {

            this.menuDificuldade()

        })


        this.opcoes.on('pointerup', (clica) => {

            this.menuAudio()

        })

        this.fecha.on('pointerup', (clica) => {

            this.menuPrincipal()

        })

        this.joga.on('pointerup', (clica) => {

            this.scene.start('Seleciona',{opcaoDificuldade: this.grauDificuldade, opcaoAudio: this.defAudio})

        })

        


    }

    menuAudio(){

        //Inicia os items para o menu do som

        this.joga.disableInteractive().setVisible(false)
        this.opcoes.disableInteractive().setVisible(false)
        this.difBotao.disableInteractive().setVisible(false)
        this.subOpcaoTitulo.setVisible(true).setText('Audio On')
        this.textoJogar.setVisible(false)
        this.textoOpcoes.setVisible(false)
        this.textoDif.setVisible(false)
        this.sons.setVisible(true).setInteractive({useHandCursor: true})
        this.sonsOff.setVisible(true).setInteractive({useHandCursor: true})
        this.fecha.setVisible(true).setInteractive({useHandCursor: true})

        //retangulo que faz o highlight da opcao selecionada
        this.roundRect = this.add.graphics()

        this.roundRect.fillStyle(0xffffff, 0.5)

        this.roundRect.fillRoundedRect(this.sons.x - this.sons.displayWidth / 2, this.sons.y - this.sons.displayHeight / 2, this.sons.displayWidth, this.sons.displayHeight)

        // verifica a ultima opcao selecionada
        if (!this.defAudio){

            this.roundRect.setPosition(100,0)
            this.subOpcaoTitulo.setVisible(true).setText('Audio Off')
        }else{

            this.roundRect.setPosition(0,0)
            this.subOpcaoTitulo.setVisible(true).setText('Audio On')

        }

        // ativa e desativa os sons
        this.sons.on('pointerup', (clica) => {

            this.roundRect.setPosition(0,0)
            this.subOpcaoTitulo.setVisible(true).setText('Audio On')
            this.defAudio = true

        })

        this.sonsOff.on('pointerup', (clica) => {

            this.roundRect.setPosition(100,0)
            this.subOpcaoTitulo.setVisible(true).setText('Audio Off')
            this.defAudio = false

        })
        

    }

    menuPrincipal(){


        // limpa os outros objetos e mostra so o menu principal
        this.joga.setInteractive().setVisible(true)
        this.opcoes.setInteractive().setVisible(true)
        this.difBotao.setInteractive().setVisible(true)
        this.subOpcaoTitulo.setVisible(false)
        this.textoJogar.setVisible(true)
        this.textoOpcoes.setVisible(true)
        this.textoDif.setVisible(true)
        this.fecha.setVisible(false).disableInteractive()
        this.next.setVisible(false).disableInteractive()
        this.prev.setVisible(false).disableInteractive()
        this.dificuldadeTexto.setVisible(false)
        this.sons.setVisible(false).disableInteractive()
        this.sonsOff.setVisible(false).disableInteractive()
        this.fecha.setVisible(false).disableInteractive()
        
        // se ja teve no menu audio, destroy o objeto retangulo
        if (this.roundRect != null){
            this.roundRect.destroy()
        }


    }

    menuDificuldade(){

        //remove listeners

        this.next.off('pointerup')
        this.prev.off('pointerup')

        //mudar dificuldade
        this.joga.disableInteractive().setVisible(false)
        this.opcoes.disableInteractive().setVisible(false)
        this.difBotao.disableInteractive().setVisible(false)
        this.subOpcaoTitulo.setVisible(true).setText('Difficulty')
        this.textoJogar.setVisible(false)
        this.textoOpcoes.setVisible(false)
        this.textoDif.setVisible(false)
        this.fecha.setVisible(true).setInteractive({useHandCursor: true})
        this.next.setVisible(true).setInteractive({useHandCursor: true})
        this.prev.setVisible(true).setInteractive({useHandCursor: true})
        this.dificuldadeTexto.setVisible(true).setText(this.dificuldade[this.grauDificuldade - 1])

        //fazer desaparecer os botoes caso a dificuldade ja esteja no minimo ou maximo
        if (this.grauDificuldade == 3){

            this.next.setVisible(false).disableInteractive()

        }

        if (this.grauDificuldade == 1){

            this.prev.setVisible(false).disableInteractive()

        }

        // aumenta dificuldade

        this.next.on('pointerup', (clica) => {

            this.grauDificuldade ++
            this.dificuldadeTexto.setText(this.dificuldade[this.grauDificuldade - 1])
            
            if (this.grauDificuldade == 3){

                this.next.setVisible(false).disableInteractive()

            }

            if (this.grauDificuldade == 2){

                this.next.setVisible(true).setInteractive()
                this.prev.setVisible(true).setInteractive()

            }
        })

        //reduz dificuldade

        this.prev.on('pointerup', (clica) => {

            this.grauDificuldade --
            this.dificuldadeTexto.setText(this.dificuldade[this.grauDificuldade - 1])
            
            if (this.grauDificuldade == 1){

                this.prev.setVisible(false).disableInteractive()

            }

            if (this.grauDificuldade == 2){

                this.prev.setVisible(true).setInteractive()
                this.next.setVisible(true).setInteractive()

            }
        })
    }


}