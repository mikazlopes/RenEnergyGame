import Phaser from '../lib/phaser.js'

export default class Loading2 extends Phaser.Scene{
     
    constructor(){

    /** @type {Phaser.Physics.Arcade.StaticGroup} */

	/** @type {Phaser.Physics.Arcade.Group} */
	
	/** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
	
	/** @type {Phaser.Physics.Arcade.Group} */

    
        // configura physics para esta cena
        super({
            key: 'Loading2'
        })

    }

    init(data){

        this.playerSelected = data.heroi
        
        // verifica se ja carregou o asset
        this.repete = this.textures.exists(this.playerSelected + '_hurt')
        
    }

    preload(){

        // se o jogador apos gameover escolher a mesma personagem nao precisa de creegar tudo de novo

        if (!this.repete){

            // Preloader original de https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/

            
            var progressBar = this.add.graphics()
            var progressBox = this.add.graphics()
            progressBox.fillStyle(0x222222, 0.8)
            progressBox.fillRect(490, 280, 320, 50)
            this.carregado = false
            
            var width = this.scale.width
            var height = this.scale.height

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
            
            

            //assets para os herois

        
            this.load.atlas(this.playerSelected + '_walk', 'assets/spritesheets/' + this.playerSelected + '_walk_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_walk_spritesheet.json')
            this.load.atlas(this.playerSelected + '_idle', 'assets/spritesheets/' + this.playerSelected + '_idle_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_idle_spritesheet.json')
            this.load.atlas(this.playerSelected + '_jump', 'assets/spritesheets/' + this.playerSelected + '_jump_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_jump_spritesheet.json')
            this.load.atlas(this.playerSelected + '_dead', 'assets/spritesheets/' + this.playerSelected + '_dead_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_dead_spritesheet.json')
            this.load.atlas(this.playerSelected + '_hurt', 'assets/spritesheets/' + this.playerSelected + '_hurt_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_hurt_spritesheet.json')
            this.load.atlas(this.playerSelected + '_crouch', 'assets/spritesheets/' + this.playerSelected + '_crouch_spritesheet.png', 'assets/spritesheets/' + this.playerSelected + '_crouch_spritesheet.json')
        }
        
        
        

    }

    create(){

        // remove listeners para nao dar erro quando carrega de novo este ecran

        this.load.off('progress')
        this.load.off('fileprogress')
        this.load.off('complete')

        if (!this.repete){

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

        }

        this.scene.start('Mapa', { id: 0, positionx: 650, positiony: 160, heroi: this.playerSelected, primeira: true})
    }

}