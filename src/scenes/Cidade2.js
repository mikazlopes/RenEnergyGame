import Phaser from '../lib/phaser.js'

import Jogador from '../game/Player.js'

import Enemy from '../game/Enemies.js'

import Boss from '../game/Boss.js'

import CriaBalasBoss from '../game/GrupoBalasBoss.js'

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
        
        // settings e outras opcoes
        this.speedH = 250
        this.speedV = 400
        this.balaIntervalohero = 0
        this.bossDead = false
        this.cogsCollect = false
            
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

        var cidade2 = this.make.tilemap({key: 'cidade2'})

        let cidade2Tiles = cidade2.addTilesetImage('tilesCidade2', 'tilesCidade2')


        let plataformasFixas = cidade2.createLayer('fixos', cidade2Tiles, 0, 0)
        let sinais = cidade2.createLayer('sinais', cidade2Tiles, 0, 0)
        let portaJanelas = cidade2.createLayer('porta_janelas', cidade2Tiles, 0, 0)
        let spikesLayer = cidade2.createLayer('spikes', cidade2Tiles, 0, 0)
         
        // Insere a(s) porta(s) da layer de objetos do Tiled
        let portaLayer = cidade2.getObjectLayer('porta')['objects'] 
        this.portas = this.physics.add.staticGroup()

        portaLayer.forEach(object => {

            let objPorta = this.portas.create(object.x -20, object.y - 25, 'door_open').setVisible(true)
            objPorta.refreshBody()

        })


        // Insere is os objetos da layer do Tiled 
        let picosLayer = cidade2.getObjectLayer('picos')['objects']
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

        this.plataformasMoveis = this.physics.add.sprite(4200, 550, 'movel')
        this.plataformasMoveis.body.setAllowGravity(false)
        this.plataformasMoveis.body.setImmovable(true)

      

        /** @type {Phaser.Physics.Arcade.Sprite} */
        this.player = new Jogador(this, 100, 600, this.playerSelected + '_idle')
        this.add.existing(this.player)
        this.player.play(this.playerSelected + '_idle')
        
        //cria os objetos para as balas para o heroi, inimigos e boss

        /** @type {Phaser.Physics.Arcade.Group} */
        this.balashero = new CriaBalasHero(this)
        this.balashero.playAnimation('hero_bullet_spin')

        /** @type {Phaser.Physics.Arcade.Group} */
        this.balasenemy = new CriaBalasEnemy(this)
        this.balasenemy.playAnimation('enemy_bullet_spin')

        /** @type {Phaser.Physics.Arcade.Group} */
        this.balasboss = new CriaBalasBoss(this)
        this.balasboss.playAnimation('boss_bullet')

        // Insere Inimigos mediante a dificuldade escolhida
        /** @type {Phaser.Physics.Arcade.Group} */
        
        this.osInimigos = this.physics.add.group()
        
        for (var i = 0; i < this.dificuldade; i++ ){
            var posicao = Phaser.Math.RND.between(1000, 3600)
            this.osInimigos.add(new Enemy(this, posicao, 300, 'enemy_idle'))
            
        }

        // acrescenta o boss
        this.boss = new Boss(this, 6100, 800, 'boss_idle')
        this.add.existing(this.boss)
        this.boss.play('boss_idle')

        // acrescenta a peca

        this.cog = this.physics.add.sprite(1, 200, 'cogs').setVisible(false).setActive(false).setScale(0.2)
        this.cog.setBounceY(0.4)

        // acrescenta explosao quando o bosso morre

        this.explosao = this.add.sprite(this.boss.x,this.boss.y, 'boss_explosion').setScale(0.3).setVisible(false)

        // teclas para mover o heroi
        this.cursors = this.input.keyboard.createCursorKeys()
        
        //tecla para dispaara
        this.inputKeys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.physics.world.bounds.width = cidade2.widthInPixels
        this.physics.world.bounds.height = cidade2.heightInPixels;
        this.player.setCollideWorldBounds()

        this.cameras.main.setBounds(0, 0, cidade2.widthInPixels, cidade2.heightInPixels)
        this.cameras.main.startFollow(this.player)

        
        // Adiciona colisoes com objetos do cenario
        this.physics.add.collider(this.player, plataformasFixas)
        this.physics.add.collider(this.player, this.plataformasMoveis)
        this.physics.add.collider(this.osInimigos, plataformasFixas)
        this.physics.add.collider(this.boss, plataformasFixas)
        this.physics.add.collider(this.cog, plataformasFixas)
        this.physics.add.collider(this.balasenemy, plataformasFixas, this.acertouParede, false, this)
        this.physics.add.collider(this.balashero, plataformasFixas, this.acertouParede, false, this)
        this.physics.add.collider(this.balasboss, plataformasFixas, this.acertouParede, false, this)

        // Condicoes quando comeca o combate
        this.physics.add.collider(this.osInimigos, this.balashero, this.acertouInimigo, false, this)
        this.physics.add.collider(this.balashero, this.boss, this.acertouInimigo, false, this)
        this.physics.add.collider(this.balasenemy, this.player, this.acertouHeroi, false, this)
        this.physics.add.collider(this.osInimigos, this.player, this.colidiram, false, this)
        this.physics.add.collider(this.player, this.boss, this.colidiram, false, this)
        this.physics.add.collider(this.balasboss, this.player, this.acertouHeroi, false, this)

        //overlap com os picos, porta ou a peca

        this.physics.add.overlap(this.player, this.picosObjTile, this.nosSpikes, false, this)
        this.physics.add.overlap(this.player, this.cog, this.apanhouCog, false, this)
        this.physics.add.overlap(this.player, this.portas, this.voltaMapa, false, this)

        // Comeca musica

        this.musica = this.sound.add('city_music', {loop: true, volume: 0.3})
        this.portaAudio = this.sound.add('door')
        this.cogAudio = this.sound.add('cogPickup')

        if (this.defAudio){

            this.musica.play()
        }

    }

    update(){


        // Verifica se caiu num abismo

        if (this.player.y > this.physics.world.bounds.height - 50 && !this.player.isDead){

            this.player.setCollideWorldBounds(false, 0, 0, false)
            this.player.jogadorMorreu()

         }

        // Bloco de codigo comum para controlo do herois e comportamento dos inimigos

        this.player.setVelocityX(0)

        this.osInimigos.getChildren().forEach(this.inimigoReage, this)

        this.inimigoReage(this.boss)

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


        // Plataforma que se move verticalmente

        var pSpeed = 200

        if (this.plataformasMoveis.y < 600){

            this.plataformasMoveis.body.setVelocityY(pSpeed)

        }else if (this.plataformasMoveis.y > 1100){

            this.plataformasMoveis.setVelocityY(pSpeed * -1)
        }

        
        // usado para debug quando e preciso ver coordenadas x, y
        // this.cord.x = this.player.x
        // this.cord.y = this.player.y - 300
        // this.cord.text = this.player.x + ' ' + this.player.y

    


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
            
        this.balaIntervalohero = this.time.now + 200 * this.dificuldade
            
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

    disparouBalaBoss(personagem){

        personagem.body.setVelocityX(0)

        var dist = Phaser.Math.Distance.BetweenPoints(this.player, personagem)

        if (dist < 500 && personagem.estado != 'dead'){
            
            
            if (personagem.flipX){

                this.balasboss.disparouBala(personagem.x - 78, personagem.y + 15, "esquerda")
                personagem.inimigoDispara(personagem.x - 78, personagem.y + 15, "esquerda")
                
            }else{
            
                this.balasboss.disparouBala(personagem.x + 78, personagem.y + 15, "direita")
                personagem.inimigoDispara(personagem.x + 78, personagem.y + 15, "direita")
               
            }
            
        }
    }

    destroiInimigo(personagem){

        personagem.shootTimer.reset()
        personagem.destroy()

    }

    acertouInimigo(oInimigo, aBalaHeroi){

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

        console.log(heroiColidiu)
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

    nosSpikes(){

        // envia a origem do dano de modo a permitir ao jogador conseguir saltar fora dos picos

        this.player.calculaDano(5, 'spikes')
    }

    // apanhou a peca
    apanhouCog(){

        this.cogsCollect = true
            this.portaAudio.play()
            this.cogAudio.play()
            this.portas.playAnimation('door_open')
            this.cog.destroy()
    }

    // Fim do bloco de funcoes comuns
    
    //se o Boss do nivel morreu o overlap causa o jogador voltar ao Mapa
    voltaMapa(){

        if (this.cogsCollect){
            this.musica.stop()
            this.registry.set('cidade2completa', true)
            this.scene.start('Mapa', { id: 1, positionx: this.posicaoX, positiony: this.posicaoY, heroi: this.playerSelected, cidade: 2, opcaoDificuldade: this.dificuldade, opcaoAudio: this.defAudio})

        }
        
    }

}