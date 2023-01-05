import Phaser from '../lib/phaser.js'

import Jogador from '../game/Player.js'

import Enemy from '../game/Enemies.js'

import CriaBalasHero from '../game/GrupoBalasHero.js'

import CriaBalasEnemy from '../game/GrupoBalasEnemy.js'


export default class Cidade3 extends Phaser.Scene{
     
    constructor(){

    /** @type {Phaser.Physics.Arcade.StaticGroup} */

	/** @type {Phaser.Physics.Arcade.Group} */
	
	/** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
	
	/** @type {Phaser.Physics.Arcade.Group} */

    
        // configura physics para esta cena
        super({
            key: 'Cidade3',
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
        this.dificuldade = data.opcaoDificuldade
        this.defAudio = data.opcaoAudio
        this.posicaoX = data.posicaoX
        this.posicaoY = data.posicaoY
        this.speedH = 250
        this.speedV = 400
        this.balaIntervalohero = 0
        this.bossDead = true
        
    
        // Guardar as dimensoes da scene numa variavel
        this.width = this.scale.width
        this.height = this.scale.height

    }

    preload(){


    }

    create(){

         
        // adiciona a imagem de fundo e efeito Paralax
        this.add.tileSprite(0, 0, 3291, 1280, 'fundoCidade').setOrigin(0.0).setScrollFactor(0.2)

        /** @type {Phaser.Tilemaps.Parsers.Tiled} */

        var cidade3 = this.make.tilemap({key: 'cidade3'})

        let cidade3Tiles = cidade3.addTilesetImage("tilesCidade3", 'tilesCidade3')


        let plataformasFixas = cidade3.createLayer('fixos', cidade3Tiles, 0, 0)
        let sinais = cidade3.createLayer('sinais', cidade3Tiles, 0, 0)
        let portaJanelas = cidade3.createLayer('porta_janelas', cidade3Tiles, 0, 0)
        let spikesLayer = cidade3.createLayer('spikes', cidade3Tiles, 0, 0)
         
        // Insere a(s) porta(s) da layer de objetos do Tiled
        let portaLayer = cidade3.getObjectLayer('porta')['objects'] 
        this.portas = this.physics.add.staticGroup()

        portaLayer.forEach(object => {

            let objPorta = this.portas.create(object.x, object.y, 'door').setVisible(false).setOrigin(0,0).setScale(0.5)
            objPorta.refreshBody()

        })


        // Insere is os objetos da layer do Tiled 
        let picosLayer = cidade3.getObjectLayer('picos')['objects']
        this.picosObjTile = this.physics.add.staticGroup()

        picosLayer.forEach(object => {

            let objSpike = this.picosObjTile.create(object.x, object.y, 'spike')

        })

        this.picosObjTile.children.iterate(function(child){

            child.setVisible(false)
            child.setOrigin(0,0)
            child.setScale(1, 0.5)
            child.refreshBody()
            
        })
        

        plataformasFixas.setCollisionByExclusion(-1)

        // insere as plataformas moveis

        this.plataformasMoveis1 = this.physics.add.sprite(3300, 350, 'movel')
        this.plataformasMoveis1.body.setAllowGravity(false)
        this.plataformasMoveis1.body.setImmovable(true)
        
        this.plataformasMoveis2 = this.physics.add.sprite(3750, 550, 'movel')
        this.plataformasMoveis2.body.setAllowGravity(false)
        this.plataformasMoveis2.body.setImmovable(true)

        this.plataformasMoveis3 = this.physics.add.sprite(3750 + 450, 350, 'movel')
        this.plataformasMoveis3.body.setAllowGravity(false)
        this.plataformasMoveis3.body.setImmovable(true)
      

        /** @type {Phaser.Physics.Arcade.Sprite} */
        this.player = new Jogador(this, 200, 1045, this.playerSelected + '_idle')
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
            var posicao = Phaser.Math.RND.between(1000, 3600)
            this.osInimigos.add(new Enemy(this, posicao, 100, 'enemy_idle'))
            
        }

        //reposiciona o inimigo se estiverem muito juntos ou se algum caiu (a acrescentar)

        // teclas para mover o heroi
        this.cursors = this.input.keyboard.createCursorKeys()
        
        //tecla para dispaara
        this.inputKeys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.physics.world.bounds.width = cidade3.widthInPixels
        this.physics.world.bounds.height = cidade3.heightInPixels;
        this.player.setCollideWorldBounds()

        this.cameras.main.setBounds(0, 0, cidade3.widthInPixels, cidade3.heightInPixels)
        this.cameras.main.startFollow(this.player)

        
        // Adiciona colisoes com objetos do cenario
        this.physics.add.collider(this.player, plataformasFixas)
        this.physics.add.collider(this.player, this.plataformasMoveis1)
        this.physics.add.collider(this.player, this.plataformasMoveis2)
        this.physics.add.collider(this.player, this.plataformasMoveis3)
        this.physics.add.collider(this.osInimigos, plataformasFixas)
        this.physics.add.collider(this.balasenemy, plataformasFixas, this.acertouParede, false, this)
        this.physics.add.collider(this.balashero, plataformasFixas, this.acertouParede, false, this)

        // Condicoes quando comeca o combate
        this.physics.add.collider(this.balashero, this.osInimigos, this.acertouInimigo, false, this)
        this.physics.add.collider(this.balasenemy, this.player, this.acertouHeroi, false, this)
        this.physics.add.collider(this.osInimigos, this.player, this.colidiram, false, this)

        //overlap com os picos ou a porta

        this.physics.add.overlap(this.player, this.picosObjTile, this.nosSpikes, false, this)

        this.physics.add.overlap(this.player, this.portas, this.voltaMapa, false, this)

        //verificar posicao do heroi
        // usado para debug quando e preciso ver coordenadas x, y
        this.cord = this.add.text(this.player.x, this.player.y - 200, this.game.input.mousePointer.x + ' ' + this.game.input.mousePointer.y, {align: 'center', color: '#00ff00', fontSize: 20} )

    }

    update(){

        // Verifica se caiu num abismo

        if (this.player.y > this.physics.world.bounds.height - 75 && !this.player.isDead){

            this.player.setCollideWorldBounds(false, 0, 0, false)
            this.player.jogadorMorreu()

         }

        // Bloco de codigo comum para controlo do herois e comportamento dos inimigos

        this.player.setVelocityX(0)

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


        // move as plataformas moveis
        var pSpeed = 200

        if (this.plataformasMoveis1.y < 600){

            this.plataformasMoveis1.body.setVelocityY(pSpeed)

        }else if (this.plataformasMoveis1.y > 1100){

            this.plataformasMoveis1.setVelocityY(pSpeed * -1)
        }


        if (this.plataformasMoveis2.y < 600){

            this.plataformasMoveis2.body.setVelocityY(pSpeed)

        }else if (this.plataformasMoveis2.y > 1100){

            this.plataformasMoveis2.setVelocityY(pSpeed * -1)
        }


        if (this.plataformasMoveis3.y < 600){

            this.plataformasMoveis3.body.setVelocityY(pSpeed)

        }else if (this.plataformasMoveis3.y > 1100){

            this.plataformasMoveis3.setVelocityY(pSpeed * -1)
        }
            
        // usado para debug quando e preciso ver coordenadas x, y
        this.cord.x = this.player.x
        this.cord.y = this.player.y - 300
        this.cord.text = this.player.x + ' ' + this.player.y

    


    }

    //funcoes comumns que controlam o comportamentos dos inimigos e heroi

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
    
    // Bala acertou na parede
    acertouParede(aBala, aParede){

        aBala.acertouParede()

    }

    // Fim do bloco de funcoes comuns

    nosSpikes(){

        // envia a origem do dano de modo a permitir ao jogador conseguir saltar fora dos picos

        this.player.calculaDano(5, 'spikes')
    }
    
    //se o Boss do nivel morreu o overlap causa o jogador voltar ao Mapa
    voltaMapa(){

        if (this.bossDead){

            this.scene.start('Mapa', { id: 1, positionx: this.posicaoX, positiony: this.posicaoY, heroi: this.playerSelected, cidade: 3, opcaoDificuldade: this.dificuldade})

        }
        
    }

}