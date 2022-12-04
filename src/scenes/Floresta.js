import Phaser from '../lib/phaser.js'

import Jogador from '../game/Player.js'

import Enemy from '../game/Enemies.js'

import Bala from '../game/Dispara.js'

import CriaBalas from '../game/GrupoBalas.js'


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
                    debug: true,
                    gravity: { y: 300 }
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
        this.balaIntervalo = 0

        // Guardar as dimensoes da scene numa variavel
        this.width = this.scale.width
        this.height = this.scale.height
    }
    
    preload(){

        this.load.image('fundo_floresta', 'assets/backgrounds/2d_tb_forest_background.png')
        
        this.load.image('tiles_floresta', 'assets/tileset/tiles_forest.png')
        
        this.load.tilemapTiledJSON('floresta', 'assets/tileset/2d_tb_forest.json')

        this.load.atlas(this.playerSelected + '_idle', 'assets/spritesheets/' + this.playerSelected + '_idle_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_idle_spritesheet.json')
        
        this.load.atlas('enemy_idle', 'assets/spritesheets/enemy_idle_spritesheet.png', 'assets/spritesheets/enemy_idle_spritesheet.json')

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
        

        this.anims.create({
            key: this.playerSelected + '_idle_aim',
            frames: this.anims.generateFrameNames(this.playerSelected + '_idle', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Idle_Aim__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'enemy_idle',
            frames: this.anims.generateFrameNames('enemy_idle', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Idle__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'enemy_idle_aim',
            frames: this.anims.generateFrameNames('enemy_idle', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Idle_Aim__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: this.playerSelected + '_run_aim',
            frames: this.anims.generateFrameNames(this.playerSelected + '_run', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Run_Shoot__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })
        
        
        //insere o jogador 

        /** @type {Phaser.Physics.Arcade.Sprite} */
        this.player = new Jogador(this, 200, 300, this.playerSelected + '_idle')
        this.add.existing(this.player)
        this.player.play(this.playerSelected + '_idle')

       
        // Insere Inimigos mediante a dificuldade escolhida
        /** @type {Phaser.Physics.Arcade.Group} */
        
        let osInimigos = this.physics.add.group()
        
        for (var i = 0; i < this.difficulty; i++ ){
            var xOffset = 100 * i
            osInimigos.add(new Enemy(this, 800 + xOffset, 300, 'enemy_idle'))
        }

        osInimigos.playAnimation('enemy_idle')

        var inimigo = osInimigos.getFirstAlive();
        inimigo.play('enemy_idle_aim')

        this.balas = new CriaBalas(this)
        this.balas.playAnimation('enemy_bullet_spin')

        console.log(this.balas)
    

        // teclas para mover o heroi
        this.cursors = this.input.keyboard.createCursorKeys()
        
        //tecla para dispaara
        this.inputKeys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.physics.add.collider(this.player, chao)
        this.physics.add.collider(osInimigos, chao)

        // acrescentar uma funcao para tirar as balas quando acertam num inimigo
        this.physics.add.collider(this.balas, osInimigos, this.acertouInimigo)


        //this.physics.moveToObject(inimigo,this.player, 100)

        this.physics.world.width = floresta.widthInPixels
        this.physics.world.height = floresta.heightInPixels
        this.player.setCollideWorldBounds(true)


    }

    update(){

        this.player.body.setVelocityX(0)

        if (this.cursors.left.isDown){
            this.player.body.setVelocityX(- this.speedH)
            
        }else if (this.cursors.right.isDown){
            this.player.body.setVelocityX(this.speedH)
        }

        if (this.cursors.up.isDown && this.player.body.onFloor()){

            this.player.body.velocity.y = - 250
            
        }else if (this.cursors.down.isDown){
           
        
        }

        if (this.cursors.left.isDown && this.inputKeys.isDown || this.cursors.right.isDown && this.inputKeys.isDown){
            var estado = 'run'
            this.disparouBala(estado)
            
        } else if (this.cursors.left.isDown){
            this.flipaHitBox('Esquerda')
        
        }else if (this.cursors.right.isDown){
           
            this.player.play(this.playerSelected + '_run', true)
            this.flipaHitBox('Direita')
        
        } else if (this.cursors.up.isDown){
           
            this.player.play(this.playerSelected + '_run', true)
            //this.player.flipX = true
        
        }
        else if (this.cursors.down.isDown){
           
            this.player.play(this.playerSelected + '_run', true)
            this.player.flipX = false
        
        } else if (this.inputKeys.isDown){
            var estado = 'idle'
            this.disparouBala(estado)
            
        } else {this.player.play(this.playerSelected + '_idle', true)}


    }

    // chama funcao do jogador que corrige a Hitbox
    flipaHitBox(sentido){

        this.player.play(this.playerSelected + '_run',true) 
        eval('this.player.vai' + sentido + '()')

    }

    disparouBala(estado){

        if (this.time.now > this.balaIntervalo){

            
            this.player.play(this.playerSelected + '_' + estado +'_aim', true)

            console.log(this.playerSelected + '_' + estado +'_aim')
    
            
            if (this.player.flipX){

                this.balas.disparouBala(this.player.x - 60, this.player.y, 'esquerda')

            }else{
            
                this.balas.disparouBala(this.player.x + 60, this.player.y, 'direita')
        
            }
            
        this.balaIntervalo = this.time.now + 200
            
        }

        

    }

    acertouInimigo(aBala, oInimigo){

        aBala.setVisible(false)
        aBala.setActive(false)
        oInimigo.setVelocityX(0)

    }
}

