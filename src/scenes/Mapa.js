import Phaser from '../lib/phaser.js'


export default class Mapa extends Phaser.Scene{
    constructor(){
    
        super('mapa')
    
    }

    preload(){

        this.load.image('tiles_mapa1', 'assets/tilese/tiles_mapa1.png')
        this.load.image('tiles_mapa2', 'assets/tilese/tiles_mapa2.png')
        this.load.image('tiles_mapa3', 'assets/tilese/tiles_mapa3.png')
        this.load.image('tiles_mapa4', 'assets/tilese/tiles_mapa4.png')
        this.load.image('tiles_mapa5', 'assets/tilese/tiles_mapa5.png')
        this.load.image('tiles_mapa6', 'assets/tilese/tiles_mapa6.png')
        this.load.image('tiles_mapa7', 'assets/tilese/tiles_mapa7.png')
        
        this.load.tilemapTiledJSON('mapa', 'assets/tileset/renEnergy_mapa.json')

        this.load.atlas('jack_walk', 'assets/spritesheets/jack_walk_spritesheet.png', 'assets/spritesheets/jack_walk_spritesheet.json')

    }

    create(){

        

        
    }
}