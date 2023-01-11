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

    // Preloader para os assets da Intro , cria listeners que mostram o progresso do Loading

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
            percentText.setText(parseInt(value * 100) + '%')
            progressBar.clear()
            progressBar.fillStyle(0xffffff, 1)
            progressBar.fillRect(500 , 290, 300 * value, 30)
        })
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.src)
        })
        this.load.on('complete', function () {
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
        this.load.image('settings_btn', 'assets/menu/settings.png')
        this.load.image('next_btn', 'assets/menu/next.png')
        this.load.image('prev_btn', 'assets/menu/prev.png')
        this.load.image('diff_btn', 'assets/menu/difficulty.png')
        this.load.image('close_btn', 'assets/menu/close.png')
        this.load.image('sound_btn', 'assets/menu/sound.png')
        this.load.image('sound_off_btn', 'assets/menu/sound_off.png')
        this.load.image('music_btn', 'assets/menu/music.png')



        //aassets para o Mapa

        this.load.image('tiles_mapa1', 'assets/tileset/tiles_mapa1.png')
        this.load.image('tiles_mapa2', 'assets/tileset/tiles_mapa2.png')
        this.load.image('tiles_mapa3', 'assets/tileset/tiles_mapa3.png')
        this.load.image('tiles_mapa4', 'assets/tileset/tiles_mapa4.png')
        this.load.image('tiles_mapa5', 'assets/tileset/tiles_mapa5.png')
        this.load.image('tiles_mapa6', 'assets/tileset/tiles_mapa6.png')
        this.load.image('tiles_mapa7', 'assets/tileset/tiles_mapa7.png')
        this.load.image('greenCheck', 'assets/icons/greenCheck.png')
        this.load.image('greenArrow', 'assets/icons/greenArrow.png')
        this.load.tilemapTiledJSON('mapa', 'assets/tileset/renEnergy_mapa.json')
        this.load.image('fundo_floresta', 'assets/backgrounds/2d_tb_forest_background.png')
        this.load.image('tiles_floresta', 'assets/tileset/tiles_forest.png')   
        this.load.tilemapTiledJSON('floresta', 'assets/tileset/2d_tb_forest.json')

        //assets dos inimigos
        this.load.atlas('enemy_idle', 'assets/spritesheets/enemy_idle_spritesheet.png', 'assets/spritesheets/enemy_idle_spritesheet.json')
        this.load.atlas('enemy_hurt', 'assets/spritesheets/enemy_hurt_spritesheet.png', 'assets/spritesheets/enemy_hurt_spritesheet.json')
        this.load.atlas('enemy_dead', 'assets/spritesheets/enemy_dead_spritesheet.png', 'assets/spritesheets/enemy_dead_spritesheet.json')
        this.load.atlas('enemy_jump', 'assets/spritesheets/enemy_jump_spritesheet.png', 'assets/spritesheets/enemy_jump_spritesheet.json')
        this.load.atlas('enemy_melee', 'assets/spritesheets/enemy_melee_spritesheet.png', 'assets/spritesheets/enemy_melee_spritesheet.json')
        this.load.atlas('hero_bullet', 'assets/spritesheets/hero_bullet_spritesheet.png', 'assets/spritesheets/hero_bullet_spritesheet.json')

        //assets do Boss
        this.load.atlas('boss_bullet', 'assets/spritesheets/boss_bullet_spritesheet.png', 'assets/spritesheets/boss_bullet_spritesheet.json')
        this.load.atlas('boss_idle', 'assets/spritesheets/boss_idle_spritesheet.png', 'assets/spritesheets/boss_idle_spritesheet.json')
        this.load.atlas('boss_dead', 'assets/spritesheets/boss_dead_spritesheet.png', 'assets/spritesheets/boss_dead_spritesheet.json')
        this.load.atlas('boss_explosion', 'assets/spritesheets/boss_explosion_spritesheet.png', 'assets/spritesheets/boss_explosion_spritesheet.json')
        this.load.atlas('boss_muzzle', 'assets/spritesheets/boss_muzzle_spritesheet.png', 'assets/spritesheets/boss_muzzle_spritesheet.json')
        this.load.atlas('boss_shoot', 'assets/spritesheets/boss_shoot_spritesheet.png', 'assets/spritesheets/boss_shoot_spritesheet.json')
        this.load.atlas('boss_walk', 'assets/spritesheets/boss_walk_spritesheet.png', 'assets/spritesheets/boss_walk_spritesheet.json')

        // Assets Cidades
        this.load.image('tilesCidade3', 'assets/tileset/cidade3/Tileset.png')
        this.load.image('tilesCidade2', 'assets/tileset/cidade2/Tileset.png')
        this.load.image('tilesCidade1', 'assets/tileset/cidade1/Tileset.png')
        this.load.image('spike', 'assets/icons/spike.png')
        this.load.image('door', 'assets/icons/door.png')
        this.load.image('movel', 'assets/icons/movel.png')
        this.load.image('cogs', 'assets/icons/cogs.png')
        this.load.image('fundoCidade', 'assets/backgrounds/cidade.jpg')
        this.load.tilemapTiledJSON('cidade2', 'assets/tileset/cidade2/cidade2.json')
        this.load.tilemapTiledJSON('cidade1', 'assets/tileset/cidade1/cidade1.json')
        this.load.tilemapTiledJSON('cidade3', 'assets/tileset/cidade3/cidade3.json')
        this.load.atlas('door_open', 'assets/spritesheets/door_open_spritesheet.png', 'assets/spritesheets/door_open_spritesheet.json')

        //Assets Audio

        this.load.audio('city_music', 'assets/audio/city_music.mp3')
        this.load.audio('mapa_music', 'assets/audio/mapa_music.mp3')
        this.load.audio('forest_music', 'assets/audio/forest_music.mp3')
        this.load.audio('boss_shoot', 'assets/audio/boss_shoot.mp3')
        this.load.audio('door', 'assets/audio/door.mp3')
        this.load.audio('enemy_shoot', 'assets/audio/enemy_shoot.mp3')
        this.load.audio('enemy_dying', 'assets/audio/enemy_dying.mp3')
        this.load.audio('explosion', 'assets/audio/explosion.mp3')
        this.load.audio('hero_shoot', 'assets/audio/hero_shoot.mp3')
        this.load.audio('enemy_hit', 'assets/audio/enemy_hit.mp3')
        this.load.audio('hero_hit', 'assets/audio/hero_hit.mp3')
        this.load.audio('jack_dying', 'assets/audio/jack_dying.mp3')
        this.load.audio('jill_dying', 'assets/audio/jill_dying.mp3')
        this.load.audio('cogPickup', 'assets/audio/cog.mp3')
        this.load.audio('victory_music', 'assets/audio/victory_music.mp3')
        this.load.audio('gameover', 'assets/audio/gameover.mp3')



        
    }

    create(){

        //prepara as animacoes para os inimigos
        this.anims.create({
            key: 'enemy_run_shoot',
            frames: this.anims.generateFrameNames('enemy_run', {
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
            key: 'enemy_run',
            frames: this.anims.generateFrameNames('enemy_run', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Run__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'jack_run',
            frames: this.anims.generateFrameNames('jack_run', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Run__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'jack_idle',
            frames: this.anims.generateFrameNames('jack_idle', {
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
            key: 'jill_run',
            frames: this.anims.generateFrameNames('jill_run', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'Run__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'jill_idle',
            frames: this.anims.generateFrameNames('jill_idle', {
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
            key: 'enemy_bullet_size',
            frames: this.anims.generateFrameNames('enemy_bullet', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'OrangeScale__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'enemy_bullet_spin',
            frames: this.anims.generateFrameNames('enemy_bullet', {
                start: 0,
                end: 9,
                zeroPad: 3,
                prefix: 'OrangeSpin__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'enemy_muzzle',
            frames: this.anims.generateFrameNames('muzzle', {
                start: 0,
                end: 10,
                zeroPad: 3,
                prefix: 'OrangeMuzzle__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: 0
        })

        this.anims.create({
            key: 'boss_bullet',
            frames: this.anims.generateFrameNames('boss_bullet', {
                start: 1,
                end: 4,
                zeroPad: 3,
                prefix: 'blue_bullet__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'boss_idle',
            frames: this.anims.generateFrameNames('boss_idle', {
                start: 1,
                end: 6,
                zeroPad: 3,
                prefix: 'idle__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'boss_dead',
            frames: this.anims.generateFrameNames('boss_dead', {
                start: 1,
                end: 5,
                zeroPad: 3,
                prefix: 'dead__',
                suffix: '.png'
            }),
            frameRate: 8,
            repeat: 0
        })

        this.anims.create({
            key: 'boss_explosion',
            frames: this.anims.generateFrameNames('boss_explosion', {
                start: 1,
                end: 11,
                zeroPad: 3,
                prefix: 'explo__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: 0
        })

        this.anims.create({
            key: 'boss_muzzle',
            frames: this.anims.generateFrameNames('boss_muzzle', {
                start: 0,
                end: 6,
                zeroPad: 3,
                prefix: 'blue_muzzle__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: 0
        })

        this.anims.create({
            key: 'boss_shoot',
            frames: this.anims.generateFrameNames('boss_shoot', {
                start: 1,
                end: 4,
                zeroPad: 3,
                prefix: 'shoot__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'boss_walk',
            frames: this.anims.generateFrameNames('boss_walk', {
                start: 1,
                end: 9,
                zeroPad: 3,
                prefix: 'walk__',
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'door_open',
            frames: this.anims.generateFrameNames('door_open', {
                start: 1,
                end: 5,
                zeroPad: 3,
                prefix: 'door__',
                suffix: '.png'
            }),
            frameRate: 7,
            repeat: 0
        })

        this.scene.start('Intro')

    }

}