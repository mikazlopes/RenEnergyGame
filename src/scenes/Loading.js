import Phaser from '../lib/phaser.js'

export default class Loading extends Phaser.Scene{
     
    constructor(){

    /** @type {Phaser.Physics.Arcade.StaticGroup} */

	/** @type {Phaser.Physics.Arcade.Group} */
	
	/** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
	
	/** @type {Phaser.Physics.Arcade.Group} */

    
        // configura physics para esta cena
        super({
            key: 'Loading'
        })

    }

    preload(){

        // Preloader original de https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/

        
        var progressBar = this.add.graphics()
        var progressBox = this.add.graphics()
        progressBox.fillStyle(0x222222, 0.8)
        progressBox.fillRect(490, 280, 320, 50)
        this.carregado = false
        
        var width = this.cameras.main.width
        var height = this.cameras.main.height

        var loadingText = this.make.text({
            x: width / 2 + 10,
            y: height / 2 - 55,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        })
        loadingText.setOrigin(0.5, 0.5)
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        })
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        })
        assetText.setOrigin(0.5, 0.5)
        
        this.load.on('progress', function (value) {
            console.log(value)
            percentText.setText(parseInt(value * 100) + '%')
            progressBar.clear()
            progressBar.fillStyle(0xffffff, 1)
            progressBar.fillRect(500 , 290, 300 * value, 30)
        })
        
        this.load.on('fileprogress', function (file) {
            console.log(file)
            assetText.setText('Loading asset: ' + file.src)
        })
        this.load.on('complete', function () {
            console.log('executou')
            progressBar.destroy()
            progressBox.destroy()
            loadingText.destroy()
            percentText.destroy()
            assetText.destroy()

        })
        
        // Assets para o Intro
        this.load.image('intro_background', 'assets/backgrounds/intro_background.png')
        this.load.image('cidade', 'assets/backgrounds/viana.png')
        this.load.atlas('enemy_run', 'assets/spritesheets/enemy_run_spritesheet.png', 'assets/spritesheets/enemy_run_spritesheet.json')
        this.load.atlas('enemy_bullet', 'assets/spritesheets/enemy_bullet_spritesheet.png', 'assets/spritesheets/enemy_bullet_spritesheet.json')
        this.load.atlas('muzzle', 'assets/spritesheets/muzzle_spritesheet.png', 'assets/spritesheets/muzzle_spritesheet.json')
        this.load.atlas('jack_run', 'assets/spritesheets/jack_run_spritesheet.png', 'assets/spritesheets/jack_run_spritesheet.json')
        this.load.atlas('jill_run', 'assets/spritesheets/jill_run_spritesheet.png', 'assets/spritesheets/jill_run_spritesheet.json')
        this.load.atlas('jack_idle', 'assets/spritesheets/jack_idle_spritesheet.png', 'assets/spritesheets/jack_idle_spritesheet.json')
        this.load.atlas('jill_idle', 'assets/spritesheets/jill_idle_spritesheet.png', 'assets/spritesheets/jill_idle_spritesheet.json')
        this.load.atlas('jack_happy', 'assets/spritesheets/jack_happy_spritesheet.png', 'assets/spritesheets/jack_happy_spritesheet.json')
        this.load.atlas('jill_happy', 'assets/spritesheets/jill_happy_spritesheet.png', 'assets/spritesheets/jill_happy_spritesheet.json')

        // Assets para o menu

        this.load.image('play_btn', 'assets/menu/play.png')


        //aassets para o Mapa

        this.load.image('tiles_mapa1', 'assets/tileset/tiles_mapa1.png')
        this.load.image('tiles_mapa2', 'assets/tileset/tiles_mapa2.png')
        this.load.image('tiles_mapa3', 'assets/tileset/tiles_mapa3.png')
        this.load.image('tiles_mapa4', 'assets/tileset/tiles_mapa4.png')
        this.load.image('tiles_mapa5', 'assets/tileset/tiles_mapa5.png')
        this.load.image('tiles_mapa6', 'assets/tileset/tiles_mapa6.png')
        this.load.image('tiles_mapa7', 'assets/tileset/tiles_mapa7.png')
        
        this.load.tilemapTiledJSON('mapa', 'assets/tileset/renEnergy_mapa.json')
        // this.load.atlas(this.playerSelected + '_walk', 'assets/spritesheets/' + this.playerSelected + '_walk_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_walk_spritesheet.json')
        // this.load.atlas(this.playerSelected + '_idle', 'assets/spritesheets/' + this.playerSelected + '_idle_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_idle_spritesheet.json')


        this.load.image('fundo_floresta', 'assets/backgrounds/2d_tb_forest_background.png')
        this.load.image('tiles_floresta', 'assets/tileset/tiles_forest.png')   
        this.load.tilemapTiledJSON('floresta', 'assets/tileset/2d_tb_forest.json')
        // this.load.atlas(this.playerSelected + '_idle', 'assets/spritesheets/' + this.playerSelected + '_idle_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_idle_spritesheet.json')
        // this.load.atlas(this.playerSelected + '_jump', 'assets/spritesheets/' + this.playerSelected + '_jump_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_jump_spritesheet.json')
        // this.load.atlas(this.playerSelected + '_dead', 'assets/spritesheets/' + this.playerSelected + '_dead_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_dead_spritesheet.json')
        // this.load.atlas(this.playerSelected + '_hurt', 'assets/spritesheets/' + this.playerSelected + '_hurt_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_hurt_spritesheet.json')
        // this.load.atlas(this.playerSelected + '_crouch', 'assets/spritesheets/' + this.playerSelected + '_crouch_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_crouch_spritesheet.json')
        this.load.atlas('enemy_idle', 'assets/spritesheets/enemy_idle_spritesheet.png', 'assets/spritesheets/enemy_idle_spritesheet.json')
        this.load.atlas('enemy_hurt', 'assets/spritesheets/enemy_hurt_spritesheet.png', 'assets/spritesheets/enemy_hurt_spritesheet.json')
        this.load.atlas('enemy_dead', 'assets/spritesheets/enemy_dead_spritesheet.png', 'assets/spritesheets/enemy_dead_spritesheet.json')
        this.load.atlas('enemy_jump', 'assets/spritesheets/enemy_jump_spritesheet.png', 'assets/spritesheets/enemy_jump_spritesheet.json')
        this.load.atlas('enemy_melee', 'assets/spritesheets/enemy_melee_spritesheet.png', 'assets/spritesheets/enemy_melee_spritesheet.json')
        this.load.atlas('hero_bullet', 'assets/spritesheets/hero_bullet_spritesheet.png', 'assets/spritesheets/hero_bullet_spritesheet.json')


        this.load.image('tilesCidade2', 'assets/tileset/cidade2/Tileset.png')
        this.load.image('spike', 'assets/tileset/cidade2/spike.png')
        this.load.image('door', 'assets/tileset/cidade2/door.png')
        this.load.image('movel', 'assets/tileset/cidade2/movel.png')
        this.load.image('fundoCidade2', 'assets/backgrounds/cidade2.jpg')
        this.load.tilemapTiledJSON('cidade2', 'assets/tileset/cidade2/cidade2.json')
        

    }

    create(){

        this.scene.start('Intro')

    }

}