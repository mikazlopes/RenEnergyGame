import Phaser from '../lib/phaser.js'

import Jogador from '../game/Player.js'

import Enemy from '../game/Enemies.js'

import CriaBalasHero from '../game/GrupoBalasHero.js'

import CriaBalasEnemy from '../game/GrupoBalasEnemy.js'


export default class Cidade2 extends Phaser.Scene{
     
    constructor(){

    /** @type {Phaser.Physics.Arcade.StaticGroup} */

	/** @type {Phaser.Physics.Arcade.Group} */
	
	/** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
	
	/** @type {Phaser.Physics.Arcade.Group} */

    
        // configura physics para esta cena
        super({
            key: 'Cidade2',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    tileBias: 32,
                    fps: 30,
                    fixedStep: true,
                    gravity: { y: 500 }
                    
                }
              }
        })
    
    }

    init(){

        // Usado para importar que jogador foi escolhido e a dificuldade
        this.playerSelected = 'jack'
        this.difficulty = 2
        this.speedH = 250
        this.speedV = 400
        this.balaIntervalohero = 0
        
    
        // Guardar as dimensoes da scene numa variavel
        this.width = this.scale.width
        this.height = this.scale.height


    }

    preload(){


        this.load.image('tilesCidade2', 'assets/tileset/cidade2/Tileset.png')
        this.load.image('spike', 'assets/tileset/cidade2/spike.png')
        this.load.image('door', 'assets/tileset/cidade2/door.png')
        this.load.image('movel', 'assets/tileset/cidade2/movel.png')
        this.load.tilemapTiledJSON('cidade2', 'assets/tileset/cidade2/cidade2.json')
    }

    create(){

        //this.add.tileSprite(0, 0, 1280, 640, 'fundo_floresta').setOrigin(0.0)

        var cidade2 = this.make.tilemap({key: 'cidade2'})

        let cidade2Tiles = cidade2.addTilesetImage("tilesCidade2", 'tilesCidade2')


        let plataformasFixas = cidade2.createStaticLayer('fixos', cidade2Tiles, 0, 0)
        let sinais = cidade2.createLayer('sinais', cidade2Tiles, 0, 0)

        
        //let spikesLayer =  cidade2.getObjectLayer('spikes')['objects']

        
    //     this.spikeGroup = this.physics.add.staticGroup()

    //    spikesLayer.forEach((object) => {
            
    //         let spikeSprite = this.spikeGroup.create(object.x, object.y, 'spike')
    //         spikeSprite.setScale(object.width/64, object.height/64)
    //         spikeSprite.setOrigin(0)
    //         spikeSprite.body.width = object.width
    //         spikeSprite.body.height = object.height
    //         console.log(spikeSprite)

    //     })

    //     this.spikeGroup.refresh()

        
        


       

        // spikes.forEach(object => {let obj = this.spikeGroup.create(object.x,object.y,'spike')
        // obj.setOrigin(0,0)
        // obj.setSize(64,64)
        // })

        
        

        plataformasFixas.setCollisionByExclusion(-1)

        this.plataformasMoveis = this.physics.add.sprite(4200, 550, 'movel')
        this.plataformasMoveis.body.setAllowGravity(false)
        this.plataformasMoveis.body.setImmovable(true)
       
    

        

        console.log(this.plataformasMoveis)

      

        /** @type {Phaser.Physics.Arcade.Sprite} */
        this.player = new Jogador(this, 200, 300, this.playerSelected + '_idle')
        this.add.existing(this.player)
        this.player.play(this.playerSelected + '_idle')
        
        //cria os objetos para as balas para o heroi e inimigos

        /** @type {Phaser.Physics.Arcade.Group} */
        this.balashero = new CriaBalasHero(this)
        //this.balashero.playAnimation('hero_bullet_spin')

        // /** @type {Phaser.Physics.Arcade.Group} */
        // this.balasenemy = new CriaBalasEnemy(this)
        // this.balasenemy.playAnimation('enemy_bullet_spin')

        // teclas para mover o heroi
        this.cursors = this.input.keyboard.createCursorKeys()
        
        //tecla para dispaara
        this.inputKeys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.physics.world.bounds.width = cidade2.widthInPixels
        this.physics.world.bounds.height = cidade2.heightInPixels;
        this.player.setCollideWorldBounds(true);

        this.cameras.main.setBounds(0, 0, cidade2.widthInPixels, cidade2.heightInPixels)
        this.cameras.main.startFollow(this.player)

        this.physics.add.collider(this.player, plataformasFixas)
        this.physics.add.collider(this.player, this.plataformasMoveis)
        this.physics.add.collider(this.balashero, plataformasFixas, this.acertouParede, false, this)

        this.cord = this.add.text(this.player.x, this.plataformasMoveis.y - 200, this.game.input.mousePointer.x + ' ' + this.game.input.mousePointer.y, {align: 'center', color: '#00ff00', fontSize: 20} )


    }

    update(){

        this.player.setVelocityX(0)

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

        var pSpeed = 200

        

        if (this.plataformasMoveis.y < 600){

            this.plataformasMoveis.body.setVelocityY(pSpeed)

        }else if (this.plataformasMoveis.y > 1100){

            this.plataformasMoveis.setVelocityY(pSpeed * -1)
        }

        

        this.cord.x = this.player.x
        this.cord.y = this.player.y - 300
        this.cord.text = this.player.x + ' ' + this.player.y


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

    acertouParede(aBala, aParede){

        aBala.acertouParede()

    }


}