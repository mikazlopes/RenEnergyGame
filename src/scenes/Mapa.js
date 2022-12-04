import Phaser from '../lib/phaser.js'


export default class Mapa extends Phaser.Scene{
    
    
    
    constructor(){

    /** @type {Phaser.Physics.Arcade.StaticGroup} */

	/** @type {Phaser.Physics.Arcade.Sprite} */
	
	/** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
	
	/** @type {Phaser.Physics.Arcade.Group} */
    
        // configura physics para esta cena
        super({
            key: 'Mapa',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: { y: 0 }
                }
              }
        })
    
    }

    init(){

        // Usado para importar que jogador foi escolhido e a dificuldade
        this.playerSelected = 'jack'
        this.difficulty = 'easy'
        this.speed = 70

        // Guardar as dimensoes da scene numa variavel
        this.width = this.scale.width
        this.height = this.scale.height
    }

    preload(){

        

        this.load.image('tiles_mapa1', 'assets/tileset/tiles_mapa1.png')
        this.load.image('tiles_mapa2', 'assets/tileset/tiles_mapa2.png')
        this.load.image('tiles_mapa3', 'assets/tileset/tiles_mapa3.png')
        this.load.image('tiles_mapa4', 'assets/tileset/tiles_mapa4.png')
        this.load.image('tiles_mapa5', 'assets/tileset/tiles_mapa5.png')
        this.load.image('tiles_mapa6', 'assets/tileset/tiles_mapa6.png')
        this.load.image('tiles_mapa7', 'assets/tileset/tiles_mapa7.png')
        
        this.load.tilemapTiledJSON('mapa', 'assets/tileset/renEnergy_mapa.json')

        this.load.atlas(this.playerSelected + '_walk', 'assets/spritesheets/' + this.playerSelected + '_walk_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_walk_spritesheet.json')
        this.load.atlas(this.playerSelected + '_idle', 'assets/spritesheets/' + this.playerSelected + '_idle_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_idle_spritesheet.json')

    }

    create(){


       // adiciona os tilesets para o mapa
        var mundo = this.make.tilemap({key: 'mapa'})

        var tile1 = mundo.addTilesetImage('tiles_mapa1', 'tiles_mapa1');
        var tile2 = mundo.addTilesetImage('tiles_mapa2', 'tiles_mapa2');
        var tile3 = mundo.addTilesetImage('tiles_mapa3', 'tiles_mapa3');
        var tile4 = mundo.addTilesetImage('tiles_mapa4', 'tiles_mapa4');
        var tile5 = mundo.addTilesetImage('tiles_mapa5', 'tiles_mapa5');
        var tile6 = mundo.addTilesetImage('tiles_mapa6', 'tiles_mapa6');
        var tile7 = mundo.addTilesetImage('tiles_mapa7', 'tiles_mapa7');
    
        // adiciona os tilesets a um array para poderem ser carregados nas layers, uma layer pode conter elementos de varios tilesets
        var tiles = [tile1, tile2, tile3, tile4, tile5, tile6, tile7]
        
        // cria as varias layers
        var baseRelva = mundo.createLayer('base_relva', tiles, 0, 0)
        var baseAgua = mundo.createLayer('base_agua', tiles, 0, 0)
        var baseAguaPonte = mundo.createLayer('base_agua_ponte', tiles, 0, 0)
        var baseAutumn = mundo.createLayer('base_autumn', tiles, 0, 0)
        var baseDeserto = mundo.createLayer('base_deserto', tiles, 0, 0)
        var baseNeve = mundo.createLayer('base_neve', tiles, 0, 0)
        var baseArido = mundo.createLayer('base_arido', tiles, 0, 0)
        var baseEstrada = mundo.createLayer('base_estrada', tiles, 0, 0)
        var basePontes = mundo.createLayer('base_pontes', tiles, 0, 0)
        var objBuraco = mundo.createLayer('obj_buraco', tiles, 0, 0)
        var objNeve = mundo.createLayer('obj_neve', tiles, 0, 0)
        var objDeserto = mundo.createLayer('obj_deserto', tiles, 0, 0)
        var objMontanhas = mundo.createLayer('obj_montanhas', tiles, 0, 0)
        var objLago = mundo.createLayer('obj_lago', tiles, 0, 0)
        var objSantaLuzia = mundo.createLayer('obj_santaLuzia', tiles, 0, 0)
        var objCidades = mundo.createLayer('obj_cidades', tiles, 0, 0)
        var objArvores = mundo.createLayer('obj_arvores', tiles, 0, 0)
        var objAutumn = mundo.createLayer('obj_autum', tiles, 0, 0)
        var objSinais = mundo.createLayer('obj_sinais', tiles, 0, 0)
        var objCliffs = mundo.createLayer('obj_cliffs', tiles, 0, 0)

        // define que layers contem objetos com colisoes
        objArvores.setCollisionByExclusion(-1)
        objBuraco.setCollisionByExclusion(-1)
        objNeve.setCollisionByExclusion(-1)
        objDeserto.setCollisionByExclusion(-1)
        objMontanhas.setCollisionByExclusion(-1)
        objLago.setCollisionByExclusion(-1)
        objSantaLuzia.setCollisionByExclusion(-1)
        objCidades.setCollisionByExclusion(-1)
        objAutumn.setCollisionByExclusion(-1)
        objSinais.setCollisionByExclusion(-1)
        objCliffs.setCollisionByExclusion(-1)
        baseAgua.setCollisionByExclusion(-1)

        // carrega essas layers numa array para ser facil invocar no Physics
        var obstaculos = [  objArvores, 
                        objAutumn, 
                        objBuraco, 
                        objCidades, 
                        objCliffs, 
                        objDeserto, 
                        objLago, 
                        objMontanhas, 
                        objMontanhas, 
                        objNeve, 
                        objSantaLuzia,
                        objSinais,
                        baseAgua]

        // cria as animacoes
        this.anims.create({
            key: this.playerSelected + '_walk',
            frames: this.anims.generateFrameNames(this.playerSelected + '_walk', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Walk__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: this.playerSelected + '_idle',
            frames: this.anims.generateFrameNames(this.playerSelected + '_idle', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Idle__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        //insere o jogador 

        /** @type {Phaser.Physics.Arcade.Sprite} */
        this.player = this.physics.add.sprite( 700, 200, this.playerSelected + '_idle').setScale(0.07)
        this.player.play(this.playerSelected + '_idle')

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, obstaculos)

        // Criacao de areas com inimigos que despoleta um turn based combat

        this.zonas = this.physics.add.group({classType: Phaser.GameObjects.Zone})

        this.physics.world.bounds.width = mundo.widthInPixels;
        this.physics.world.bounds.height = mundo.heightInPixels;
        this.player.setCollideWorldBounds(true);

        this.zonas = this.physics.add.group({classType: Phaser.GameObjects.Zone})

        for ( var i = 0; i < 30; i++ ) {
            var x = Phaser.Math.RND.between( 500, this.physics.world.bounds.width );
            var y = Phaser.Math.RND.between( 100, this.physics.world.bounds.height );
            
            // -- parâmetros (x, y, width, height)
            this.zonas.create(x, y, 20, 20);
        }


        this.physics.add.overlap(this.player, this.zonas, this.colisaoInimigo, false, this)

        
        
    }

    colisaoInimigo(player, zona){


        // zona.x = Phaser.Math.RND.between(500 , this.physics.world.bounds.width)
        // zona.y = Phaser.Math.RND.between(100, this.physics.world.bounds.height)

        this.scene.start('Floresta')

        


    }

    update(){

        //evitar que as areas dos inimigos estejam muito juntas
        var areas = this.zonas.getChildren()

        for (var i = 0; i < areas.length; i++){
            for (var j = 0; j < areas.length; j++){
              
                if (i != j){

                    if (Phaser.Math.Distance.Between(areas[i].x,areas[i].y, areas[j].x, areas[j].y) < 50){

                        areas[i].x = Phaser.Math.RND.between( 500, this.physics.world.bounds.width );
                        areas[i].y = Phaser.Math.RND.between( 100, this.physics.world.bounds.height );
                        console.log('executou')

                    }
                }
            }
        }
        
        this.player.body.setVelocity(0)


        if (this.cursors.left.isDown){
            this.player.body.setVelocityX(- this.speed)
            
        }else if (this.cursors.right.isDown){
            this.player.body.setVelocityX(this.speed)
        }

        if (this.cursors.up.isDown){
            this.player.body.setVelocityY(- this.speed)
           
        }else if (this.cursors.down.isDown){
            this.player.body.setVelocityY(this.speed)
           
        }

        if (this.cursors.left.isDown){
            this.player.play(this.playerSelected + '_walk',true)
            this.player.flipX = true
        
        }else if (this.cursors.right.isDown){
           
            this.player.play(this.playerSelected + '_walk', true)
            this.player.flipX = false
        
        } else if (this.cursors.up.isDown){
           
            this.player.play(this.playerSelected + '_walk', true)
            this.player.flipX = true
        
        }
        else if (this.cursors.down.isDown){
           
            this.player.play(this.playerSelected + '_walk', true)
            this.player.flipX = false
        
        } else {this.player.play(this.playerSelected + '_idle', true)}

    }
}