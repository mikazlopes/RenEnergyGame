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
                    debug: true,
                    tileBias: 32,
                    fps: 30,
                    fixedStep: true,
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
        this.balaIntervalohero = 0
        
    
    

        // Guardar as dimensoes da scene numa variavel
        this.width = this.scale.width
        this.height = this.scale.height
    }
    
    preload(){

        this.load.image('fundo_floresta', 'assets/backgrounds/2d_tb_forest_background.png')
        
        this.load.image('tiles_floresta', 'assets/tileset/tiles_forest.png')
        
        this.load.tilemapTiledJSON('floresta', 'assets/tileset/2d_tb_forest.json')

        this.load.atlas(this.playerSelected + '_idle', 'assets/spritesheets/' + this.playerSelected + '_idle_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_idle_spritesheet.json')
        this.load.atlas(this.playerSelected + '_jump', 'assets/spritesheets/' + this.playerSelected + '_jump_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_jump_spritesheet.json')
        this.load.atlas(this.playerSelected + '_dead', 'assets/spritesheets/' + this.playerSelected + '_dead_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_dead_spritesheet.json')
        this.load.atlas(this.playerSelected + '_hurt', 'assets/spritesheets/' + this.playerSelected + '_hurt_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_hurt_spritesheet.json')
        this.load.atlas(this.playerSelected + '_crouch', 'assets/spritesheets/' + this.playerSelected + '_crouch_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_crouch_spritesheet.json')
        this.load.atlas('enemy_idle', 'assets/spritesheets/enemy_idle_spritesheet.png', 'assets/spritesheets/enemy_idle_spritesheet.json')
        this.load.atlas('enemy_hurt', 'assets/spritesheets/enemy_hurt_spritesheet.png', 'assets/spritesheets/enemy_hurt_spritesheet.json')
        this.load.atlas('enemy_dead', 'assets/spritesheets/enemy_dead_spritesheet.png', 'assets/spritesheets/enemy_dead_spritesheet.json')
        this.load.atlas('enemy_jump', 'assets/spritesheets/enemy_jump_spritesheet.png', 'assets/spritesheets/enemy_jump_spritesheet.json')
        this.load.atlas('enemy_melee', 'assets/spritesheets/enemy_melee_spritesheet.png', 'assets/spritesheets/enemy_melee_spritesheet.json')
        this.load.atlas('hero_bullet', 'assets/spritesheets/hero_bullet_spritesheet.png', 'assets/spritesheets/hero_bullet_spritesheet.json')

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
        
        // cria animacoes necessarias para esta cena
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
            key: this.playerSelected + '_jump',
            frames: this.anims.generateFrameNames(this.playerSelected + '_jump', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Jump_Shoot__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: this.playerSelected + '_crouch_aim',
            frames: this.anims.generateFrameNames(this.playerSelected + '_crouch', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Crouch_Aim__',
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
            key: 'enemy_jump_shoot',
            frames: this.anims.generateFrameNames('enemy_jump', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Jump_Shoot__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'enemy_melee',
            frames: this.anims.generateFrameNames('enemy_melee', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Melee__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'enemy_hurt',
            frames: this.anims.generateFrameNames('enemy_hurt', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Hurt__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: 0
        })

        this.anims.create({
            key: 'enemy_dead',
            frames: this.anims.generateFrameNames('enemy_dead', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Dead__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: 0
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

        this.anims.create({
            key: 'hero_muzzle',
            frames: this.anims.generateFrameNames('muzzle', {
                start: 0,
                end: 10,
                zeroPad: 3,
                prefix: 'YellowMuzzle__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: 0
        })

        this.anims.create({
            key: 'hero_bullet_spin',
            frames: this.anims.generateFrameNames('hero_bullet', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'YellowSpin__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: this.playerSelected + '_hurt',
            frames: this.anims.generateFrameNames(this.playerSelected + '_hurt', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Hurt__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: this.playerSelected + '_dead',
            frames: this.anims.generateFrameNames(this.playerSelected + '_dead', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Dead__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: 0
        })

        
        
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
        
        for (var i = 0; i < this.difficulty; i++ ){
            var xOffset = 400 * i
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

        /** @type {Phaser.Input.Keyboard.KeyboardPlugin.checkDown} */
       
       
        //testar delay das teclas
        let teclado = this.input.keyboard

        if (teclado.checkDown(teclado.addKey('A'), 200)){console.log('Carregou')}
       
    }


    // Funcao do jogador que corrige a Hitbox
    flipaHitBox(sentido){

        if (this.player.body.onFloor()){

            this.player.play(this.playerSelected + '_run', true)
        }

        eval('this.player.vai' + sentido + '()')

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

    }

    acertouInimigo(aBalaHeroi, oInimigo){

        oInimigo.body.setVelocityX(0)
        aBalaHeroi.acertouInimigo()
        oInimigo.calculaDano(aBalaHeroi.dano) 

    }

    acertouHeroi(oHeroi, aBalaInimigo){
        
        this.cameras.main.shake(50)
        aBalaInimigo.acertouHeroi()
        oHeroi.calculaDano(aBalaInimigo.dano)

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

    inimigoAcao(){


    }

}

