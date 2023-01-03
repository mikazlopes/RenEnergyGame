import Phaser from '../lib/phaser.js'

import Jogador from '../game/Player.js'

import Enemy from '../game/Enemies.js'

import CriaBalasHero from '../game/GrupoBalasHero.js'

import CriaBalasEnemy from '../game/GrupoBalasEnemy.js'


export default class Floresta extends Phaser.Scene{
     
    constructor(){

    /** @type {Phaser.Physics.Arcade.StaticGroup} */

	/** @type {Phaser.Physics.Arcade.Group} */
	
	/** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
	
	/** @type {Phaser.Physics.Arcade.Group} */

    
        // configura physics para esta cena
        super({
            key: 'Floresta',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                    tileBias: 32,
                    fps: 30,
                    fixedStep: true,
                    gravity: { y: 500 }
                    
                }
              }
        })
    
    }

    init(data){

        // Usado para importar que jogador foi escolhido e a dificuldade
        this.playerSelected = data.heroi
        this.positionX = data.positionX
        this.positionY = data.positionY
        
        this.speedH = 250
        this.speedV = 400
        this.balaIntervalohero = 0

        this.dificuldade = data.opcaoDificuldade
        this.defAudio = data.opcaoAudio
        
        // Guardar as dimensoes da scene numa variavel
        this.width = this.scale.width
        this.height = this.scale.height
    }
    
    preload(){


    }

    create(){


        // adiciona background que se repete

        this.add.tileSprite(0, 0, 1280, 640, 'fundo_floresta').setOrigin(0.0)
        
        // adiciona os tilesets para o mapa
        var floresta = this.make.tilemap({key: 'floresta'})

        var tile1 = floresta.addTilesetImage('tiles_floresta', 'tiles_floresta');
        
        
        // cria as varias layers
        var chao = floresta.createLayer('chao', tile1, 0, 0)
        var objetos = floresta.createLayer('objetos', tile1, 0, 0)

        // define que layers contem objetos com colisoes
        chao.setCollisionByExclusion(-1)
        
        
        
        //insere o jogador 

        /** @type {Phaser.Physics.Arcade.Sprite} */
        this.player = new Jogador(this, 200, 300, this.playerSelected + '_idle')
        this.add.existing(this.player)
        this.player.play(this.playerSelected + '_idle')

       //cria os objetos para as balas para o heroi e inimigos

        /** @type {Phaser.Physics.Arcade.Group} */
        this.balashero = new CriaBalasHero(this)
        this.balashero.playAnimation('hero_bullet_spin')

        /** @type {Phaser.Physics.Arcade.Group} */
        this.balasenemy = new CriaBalasEnemy(this)
        this.balasenemy.playAnimation('enemy_bullet_spin')

        // Insere Inimigos mediante a dificuldade escolhida
        /** @type {Phaser.Physics.Arcade.Group} */
        
        this.osInimigos = this.physics.add.group()
        
        for (var i = 0; i < this.dificuldade; i++ ){
            var xOffset = 200 * i
            this.osInimigos.add(new Enemy(this, 700 + xOffset, 300, 'enemy_idle'))
        }    

        // teclas para mover o heroi
        this.cursors = this.input.keyboard.createCursorKeys()
        
        //tecla para dispaara
        this.inputKeys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.physics.add.collider(this.player, chao)
        this.physics.add.collider(this.osInimigos, chao)

        // acrescentar uma funcao para tirar as balas e calcula energia quando acertam num inimigo ou no heroi
        
        this.physics.add.collider(this.balashero, this.osInimigos, this.acertouInimigo, false, this)

        this.physics.add.collider(this.balasenemy, this.player, this.acertouHeroi, false, this)

        this.physics.add.collider(this.osInimigos, this.player, this.colidiram, false, this)


        //this.physics.moveToObject(inimigo,this.player, 100)

        this.physics.world.width = floresta.widthInPixels
        this.physics.world.height = floresta.heightInPixels
        this.player.setCollideWorldBounds(true)

        

    }

    update(){

        // Bloco de codigo comum para controlo do herois e comportamento dos inimigos

        this.player.body.setVelocityX(0)

        this.osInimigos.getChildren().forEach(this.inimigoReage, this)
        
  
        if ((this.cursors.left.isDown && this.inputKeys.isDown || this.cursors.right.isDown && this.inputKeys.isDown || this.cursors.up.isDown && this.inputKeys.isDown) && !this.player.isDead){
            
            if (this.cursors.left.isDown){
                this.player.vaiEsquerda()
            }else if (this.cursors.right.isDown){
                this.player.vaiDireita()
            }else if (this.cursors.up.isDown){
                this.player.vaiCima()
            }else if (this.cursors.down.isDown){
                this.player.vaiBaixo()
            }

            
    
            
        } else if (this.cursors.left.isDown && !this.player.isDead){
            
            this.player.vaiEsquerda()

        }else if (this.cursors.right.isDown && !this.player.isDead){
           
            this.player.vaiDireita()
        
        }else if (this.cursors.up.isDown && this.player.body.onFloor() && !this.player.isDead){
           
            this.player.vaiCima()     
        
        }
        else if (this.cursors.down.isDown && !this.player.isDead){
           
            this.player.vaiBaixo()
        
        } else if (this.inputKeys.isDown && !this.player.isDead){

            this.player.estaDisparar()

        }else{

            this.player.estaParado()

        }

        //fim do bloco para todos os updates

        /** @type {Phaser.Input.Keyboard.KeyboardPlugin.checkDown} */
       
       
        //testar delay das teclas
        let teclado = this.input.keyboard

        if (teclado.checkDown(teclado.addKey('A'), 200)){this.scene.start('Cidade2')}
       
        }



    disparouBalaHero(personagem, estado){

        if (this.time.now > this.balaIntervalohero){
            
            if (estado != 'jump'){
               
                personagem.play(this.playerSelected + '_' + estado +'_aim', true)

            }else{

                personagem.play(this.playerSelected + '_' + estado, true)
            }
           
            if (personagem.flipX){

                this.balashero.disparouBala(personagem.x - 70, personagem.y, "esquerda")
                personagem.heroiDispara(personagem.x - 70, personagem.y, "esquerda")

                
            }else{
            
                this.balashero.disparouBala(personagem.x + 70, personagem.y, "direita")
                personagem.heroiDispara(personagem.x + 70, personagem.y, "direita")
                
            }
            
        this.balaIntervalohero = this.time.now + 200
            
        }
    }

    disparouBalaEnemy(personagem, posicao){

        personagem.body.setVelocityX(0)

        var dist = Phaser.Math.Distance.BetweenPoints(this.player, personagem)

        if (dist < 700 && dist > 100 && personagem.estado != 'dead' && personagem.estado != 'hurt'){
            
            
            if (personagem.flipX){

                this.balasenemy.disparouBala(personagem.x - 50, personagem.y, "esquerda")
                personagem.inimigoDispara(personagem.x - 52, personagem.y + 3, "esquerda")
                
            }else{
            
                this.balasenemy.disparouBala(personagem.x + 60, personagem.y, "direita")
                personagem.inimigoDispara(personagem.x + 52, personagem.y + 3, "direita")
               
            }
            
        }
    }

    destroiInimigo(personagem){

        personagem.shootTimer.reset()
        personagem.destroy()

        if (this.osInimigos.getLength() == 0){

            this.scene.start('Mapa', { id: 1, positionx: this.positionX, positiony: this.positionY, heroi: this.playerSelected, opcaoDificuldade: this.dificuldade})
        }

        console.log(this.osInimigos.getLength())
    }

    acertouInimigo(aBalaHeroi, oInimigo){

        oInimigo.body.setVelocityX(0)
        aBalaHeroi.acertouInimigo()
        oInimigo.calculaDano(aBalaHeroi.dano) 

    }

    acertouHeroi(oHeroi, aBalaInimigo){
        
        this.cameras.main.shake(50)
        aBalaInimigo.acertouHeroi()
        oHeroi.calculaDano(aBalaInimigo.dano, 'inimigo')

    }

    colidiram(heroiColidiu, inimigoColidiu){

        this.cameras.main.shake(50)
        heroiColidiu.calculaDano(inimigoColidiu.meele)


    }

    inimigoReage(inimigo){

        if (inimigo.estado != 'hurt' && inimigo.estado != 'dead'){

            inimigo.inimigoAcoes(this.player)
        }

    }

}

