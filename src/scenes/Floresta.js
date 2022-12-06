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
        this.load.atlas('enemy_idle', 'assets/spritesheets/enemy_idle_spritesheet.png', 'assets/spritesheets/enemy_idle_spritesheet.json')
        this.load.atlas(this.playerSelected + '_hurt', 'assets/spritesheets/' + this.playerSelected + '_hurt_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_hurt_spritesheet.json')
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
            repeat: 0
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

        //cria muzzle para a arma do heroi
        this.heroMuzzle = this.add.sprite(-100, -100, 'hero_muzzle').setVisible(false).setScale(0.2)


        // Insere Inimigos mediante a dificuldade escolhida
        /** @type {Phaser.Physics.Arcade.Group} */
        
        this.osInimigos = this.physics.add.group()
        
        for (var i = 0; i < this.difficulty; i++ ){
            var xOffset = 400 * i
            this.osInimigos.add(new Enemy(this, 300 + xOffset, 300, 'enemy_idle'))
        }    

        // teclas para mover o heroi
        this.cursors = this.input.keyboard.createCursorKeys()
        
        //tecla para dispaara
        this.inputKeys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.physics.add.collider(this.player, chao)
        this.physics.add.collider(this.osInimigos, chao)

        // acrescentar uma funcao para tirar as balas e calcula energia quando acertam num inimigo ou no heroi
        
        this.physics.add.collider(this.balashero, this.osInimigos, this.acertouInimigo)

        this.physics.add.collider(this.balasenemy, this.player, this.acertouHeroi)


        //this.physics.moveToObject(inimigo,this.player, 100)

        this.physics.world.width = floresta.widthInPixels
        this.physics.world.height = floresta.heightInPixels
        this.player.setCollideWorldBounds(true)

        

    }

    update(){

        var estado

        this.player.body.setVelocityX(0)
        

        
        if (this.cursors.left.isDown){
            
            this.player.body.setVelocityX(- this.speedH)

            if (this.inputKeys.isUp){

                

                if (this.heroMuzzle != null){
                    this.heroMuzzle.setVisible(false)
                    
                }

            }
            
        }else if (this.cursors.right.isDown){
            
            this.player.body.setVelocityX(this.speedH)

            if (this.inputKeys.isUp){

                

                if (this.heroMuzzle != null){
                    this.heroMuzzle.setVisible(false)
                    
                }
            }
        }

        if (this.cursors.up.isDown && this.player.body.onFloor()){

            this.player.body.velocity.y = - 250
            
            if (this.heroMuzzle != null){
                
                this.heroMuzzle.setVisible(false)
                
            }
            
        }else if (this.cursors.down.isDown){
            
            // adicionar animacao para agachar
        
        }

        if (this.cursors.left.isDown && this.inputKeys.isDown || this.cursors.right.isDown && this.inputKeys.isDown || this.cursors.up.isDown && this.inputKeys.isDown){
            
            if (this.player.body.onFloor){
                estado = 'run'
            }
            
            if (this.player.flipX){
                
                this.heroMuzzle.setX(this.player.x - 70)
                this.heroMuzzle.setY(this.player.y)

            }else{

                this.heroMuzzle.setX(this.player.x + 70)
                this.heroMuzzle.setY(this.player.y)
            } 
            
            if (this.cursors.up.isDown){
                
                estado = 'jump'

                this.player.play(this.playerSelected + '_jump', true) 

            }  

            this.disparouBalaHero(this.player, estado)
            
        } else if (this.cursors.left.isDown){
            this.flipaHitBox('Esquerda')

            if (this.cursors.up.isDown){
           
                this.player.play(this.playerSelected + '_jump', true)
                
                if (this.heroMuzzle != null){
                    this.heroMuzzle.setX(this.player.x + 70)
                    this.heroMuzzle.setY(this.player.y)
                
                }       
            
            }

        }else if (this.cursors.right.isDown){
           
                
            this.flipaHitBox('Direita')

            if (this.cursors.up.isDown){
           
                this.player.play(this.playerSelected + '_jump', true) 
                
                if (this.heroMuzzle != null){
                    this.heroMuzzle.setX(this.player.x + 70)
                    this.heroMuzzle.setY(this.player.y)
                
                }   
            }
        
        }else if (this.cursors.up.isDown){
           
            this.player.play(this.playerSelected + '_jump', true)       
        
        }
        else if (this.cursors.down.isDown){
           
            this.player.play(this.playerSelected + '_run', true)
            this.player.flipX = false
        
        } else if (this.inputKeys.isDown){
            
            var estado = 'idle'

            this.disparouBalaHero(this.player, estado)

            this.heroMuzzle.setY(this.player.y)

            if (!this.player.flipX){
            
                this.heroMuzzle.setX(this.player.x + 70)
            

            }else if (this.player.flipX){

                this.heroMuzzle.setX(this.player.x - 70)
                

            }

        }else{

            if (this.player.body.onFloor()){

                this.player.play(this.playerSelected + '_idle', true)
            
            }
            
            if (this.heroMuzzle != null){
                this.heroMuzzle.setVisible(false)
            }
            
        }

        /** @type {Phaser.Input.Keyboard.KeyboardPlugin.checkDown} */
       
       
        //testar delay das teclas
        let teclado = this.input.keyboard

        if (teclado.checkDown(teclado.addKey('A'), 200)){console.log('Carregou')}
       
    }


    // chama funcao do jogador que corrige a Hitbox
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

                this.balashero.disparouBala(personagem.x - 60, personagem.y, "esquerda")

                this.heroMuzzle.setActive(true)
                this.heroMuzzle.setVisible(true)
                this.heroMuzzle.setX(personagem.x - 70)
                this.heroMuzzle.setY(personagem.y)
                this.heroMuzzle.flipX = true
                this.heroMuzzle.play("hero_muzzle", true)
                
            }else{
            
                this.balashero.disparouBala(personagem.x + 60, personagem.y, "direita")
                this.heroMuzzle.setActive(true)
                this.heroMuzzle.setVisible(true)
                this.heroMuzzle.setX(personagem.x + 70)
                this.heroMuzzle.setY(personagem.y)
                this.heroMuzzle.flipX = false
                this.heroMuzzle.play("hero_muzzle", true)
                
                
            }
            
        this.balaIntervalohero = this.time.now + 200
            
        }
    }

    disparouBalaEnemy(personagem, estado){

       
        var dist = Phaser.Math.Distance.BetweenPoints(this.player, personagem)
        
        var distV = this.player.y - personagem.y

        if (dist < 700){
            
            personagem.play('enemy_idle_aim')
            
            
            if (personagem.flipX){

                this.balasenemy.disparouBala(personagem.x - 50, personagem.y, "esquerda")
                personagem.inimigoDispara(personagem.x - 52, personagem.y + 3, "esquerda")
                
            }else{
            
                this.balasenemy.disparouBala(personagem.x + 60, personagem.y, "direita")
                personagem.inimigoDispara(personagem.x + 52, personagem.y + 3, "direita")

               
            }

            if ( distV < - 10 && personagem.body.onFloor()){

                personagem.body.velocity.y = -250
            }
            
        } 
    }

    acertouInimigo(aBalaHeroi, oInimigo){

        console.log(aBalaHeroi)
        aBalaHeroi.setVisible(false)
        aBalaHeroi.setActive(false)
        oInimigo.setVelocityX(0)

        

    }

    acertouHeroi(oHeroi, aBalaInimigo){
        
        
        aBalaInimigo.acertouHeroi()
        oHeroi.calculaDano()

    }

    inimigoReage(individuo){


        var dist = Phaser.Math.Distance.BetweenPoints(this.player, individuo)

        var distV = this.player.y - individuo.y


        if (dist < 500){


            individuo.inimigoDispara('idle', this.balaIntervalohero)

            //this.time.addEvent({ delay: 1000, callback: this.disparouBalaEnemy(individuo, 'idle'), callbackScope: this, loop: false})

            if ( distV < - 10 && individuo.body.onFloor()){

                individuo.body.velocity.y = -250
            }

        }

        this.balaIntervaloenemy = this.time.now + 500
    }

    inimigoAcao(){


    }

}

