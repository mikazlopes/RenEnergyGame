import Phaser from '../lib/phaser.js'


export default class Mapa extends Phaser.Scene{
    constructor(){
    
        super('mapa')
    
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

        this.load.atlas('jack_walk', 'assets/spritesheets/jack_walk_spritesheet.png', 'assets/spritesheets/jack_walk_spritesheet.json')

    }

    create(){

        var mundo = this.make.tilemap({key: 'mapa'})

        var tile1 = mundo.addTilesetImage('tiles_mapa1', 'tiles_mapa1');
        var tile2 = mundo.addTilesetImage('tiles_mapa2', 'tiles_mapa2');
        var tile3 = mundo.addTilesetImage('tiles_mapa3', 'tiles_mapa3');
        var tile4 = mundo.addTilesetImage('tiles_mapa4', 'tiles_mapa4');
        var tile5 = mundo.addTilesetImage('tiles_mapa5', 'tiles_mapa5');
        var tile6 = mundo.addTilesetImage('tiles_mapa6', 'tiles_mapa6');
        var tile7 = mundo.addTilesetImage('tiles_mapa7', 'tiles_mapa7');
    

        var tiles = [tile1, tile2, tile3, tile4, tile5, tile6, tile7]
        

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

        this.anims.create({
            key: 'jack_walk',
            frames: this.anims.generateFrameNames('jack_walk', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Walk__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        });

        this.jack = this.physics.add.sprite( 700, 200, 'jack_walk').setScale(0.07)
        this.jack.play('jack_walk')

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.jack, obstaculos)
        
    }

    update(){

        this.jack.body.setVelocity(0)

        if (this.cursors.left.isDown){
            this.jack.body.setVelocityX(-50)
            this.jack.flipX = true
        }else if (this.cursors.right.isDown){
            this.jack.body.setVelocityX(50)
            this.jack.flipX = false
        }

        if (this.cursors.up.isDown){
            this.jack.body.setVelocityY(-50)
        }else if (this.cursors.down.isDown){
            this.jack.body.setVelocityY(50)
        }

    }
}