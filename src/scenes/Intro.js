import Phaser from '../lib/phaser.js'


//variavel onde fica a sprite da cidade e rectangulo
let viana, r1

//variavel com a historia e o index para o array
let content = [
    "",
    "Welcome to Viana, a beautiful city entirely powered by clean, renewable energy.", 
    "All the building's lights and devices run on wind, solar, hydraulic, or geothermal energy.", 
    "These fuels are renewable (never end) and clean; they do not generate any pollution.", 
    "The people of Viana are happy because of this.",
    "Close to Viana are other cities that do not run on clean, renewable energy. ", 
    "They run on fossil power sources such as oil and coal, these energies are not clean and not renewable, meaning one day they will end.",
    "They also generate lots of pollution which makes everyone unhappy. ",
    "These cities are inhabited by people that are jealous of Viana’s power sources and unhappy because their cities are filled with polluted air.",
    "Their energy sources, aside from not clean will end someday, leaving them in the dark.",
    "Instead of asking the Vianenses to teach them how to use clean, renewable energy, they decided to attack Viana.", 
    "They stole parts of the machines that provided different types of renewable energy.",
    "Viana’s Mayor asked them to return the parts, but they refused.", 
    "The Mayor decided to send Jack and Jill to get the machine parts back to reactivate their solar, wind, geothermal, and hydraulic power sources and bring energy back to Viana.",
    "Help Jack and Jill on their adventure!. Click anywhere to continue"
    
]
 //index para o array com o conteudo
let index = 1

//variaveis para armazenar as dimensoes do stage
let width, height

//variaveis para controlar movimento do texto da historia e outras animacoes
let textHist
let tempViana, tempRec, tempText, tempInimigos, tempHerois
let entraViana = false
let apareceRec = false
let apareceTexto = false
let comecaInimigos = false
let comecaHerois = false

//variaveis para os herois em varios estados
let jack, jill

//variavel para objeto Inimigo nos varios estados
let enemyRun, enemyBullet, enemyMuzzle, enemies, muzzles, bullets


export default class Intro extends Phaser.Scene{
    constructor(){
    
        super('intro')
    
    }

    preload(){

        this.load.image('background', 'assets/intro_background.png')
        this.load.image('cidade', 'assets/viana.png')
        this.load.atlas('enemy_run', 'assets/spritesheets/enemy_run_spritesheet.png', 'assets/spritesheets/enemy_run_spritesheet.json')
        this.load.atlas('enemy_bullet', 'assets/spritesheets/enemy_bullet_spritesheet.png', 'assets/spritesheets/enemy_bullet_spritesheet.json')
        this.load.atlas('muzzle', 'assets/spritesheets/muzzle_spritesheet.png', 'assets/spritesheets/muzzle_spritesheet.json')
        this.load.atlas('jack_run', 'assets/spritesheets/jack_run_spritesheet.png', 'assets/spritesheets/jack_run_spritesheet.json')
        this.load.atlas('jill_run', 'assets/spritesheets/jill_run_spritesheet.png', 'assets/spritesheets/jill_run_spritesheet.json')
        this.load.atlas('jack_idle', 'assets/spritesheets/jack_idle_spritesheet.png', 'assets/spritesheets/jack_idle_spritesheet.json')
        this.load.atlas('jill_idle', 'assets/spritesheets/jill_idle_spritesheet.png', 'assets/spritesheets/jill_idle_spritesheet.json')
    }

    create(){

        var i
        var numInimigos = 2

        this.input.once('pointerdown', () => {this.scene.start('mapa')})

        //arquivar tamanho da cena para usar no posicionamento dos objetos
        width = this.scale.width;
        height = this.scale.height;

        //adiciona o background
        this.add.sprite(0,0,'background').setOrigin(0,0)
        
        //rectangulo com alpha para efeito visual
        r1 = this.add.rectangle( 0, 0, width, height, 0xffffff, 0).setOrigin(0,0)
        //Adiciona o rectangulo
        //tempRec = this.time.delayedCall(3000, this.moveRec, [], this)
        tempRec = this.time.delayedCall(3000, this.moveRec, [], this)

        //titulo e texto com a historia
        let titulo = this.add.text(width / 2, height / 10, 'Power the City', {fontSize: 48, color: 0x2127F1}).setOrigin(0.5)

       //adiciona a cidade
        viana = this.add.sprite(0, height, 'cidade').setOrigin(0,0)
        //espera varios segundos ate mostrar a cidade
        tempViana = this.time.delayedCall(7000, this.moveViana, [], this)

        //adiciona a primeira parte da historia
        textHist = this.add.text(width / 2, height / 4, content[1], {fontSize: 20, color: 0x2127F1, wordWrap: {width: 1200}, align: 'center'}).setOrigin(0.5, 0.5).setAlpha(0)
        textHist.setLineSpacing(20)

        //atrasa mostrar a primeira parte da historia
        tempText = this.time.delayedCall(7000, this.moveText, [], this)

       
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
        });

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
        });

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
        });

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
        });

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
        });

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
        });

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
        });

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
        });

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
        });

        //bloco em que cria os objetos dos inimigos e executa as animacoes 

        jack = this.add.sprite( -300, height - 150, 'jack_run').setScale(0.25)
        jill = this.add.sprite( width + 300, height - 150, 'jill_run').setScale(0.25)
        jill.flipX = true
        jack.play('jack_run')
        jill.play('jill_run')

        enemyRun = this.add.group({
            key: 'enemy_run',
            repeat: numInimigos,
            setXY:{
                x: - 400,
                y: height - 190,
                stepX: 120,
                stepY: 60
            }
        })
        
        Phaser.Actions.ScaleXY(enemyRun.getChildren(), -0.75, -0.75)
        enemies = enemyRun.getChildren()

        enemyMuzzle = this.add.group({
            key: 'muzzle',
            repeat: numInimigos,
            setXY:{
                x: enemies[0].x + 72,
                y: enemies[0].y + 7,
                stepX:  120,
                stepY: 60
            }
        })

        Phaser.Actions.ScaleXY(enemyMuzzle.getChildren(), -0.75, -0.75)
        muzzles = enemyMuzzle.getChildren()

        enemyBullet= this.add.group({
            key: 'enemy_bullet',
            repeat: numInimigos,
            setXY:{
                x: muzzles[0].x + 12,
                y: muzzles[0].y,
                stepX:  120,
                stepY: 60
            }
        })

        Phaser.Actions.ScaleXY(enemyBullet.getChildren(), -0.75, -0.75)
        bullets = enemyBullet.getChildren()

        for (i = 0; i < enemies.length; i++){
            enemies[i].play('enemy_run')
        }

    }

    update(){

        //mostra a cidade
        if (entraViana){this.moveViana()}

        //manipula o alpha do rectangulo
        if (apareceRec){this.moveRec()}

        //manipula a entrada do primeiro paragrafo da historia
        if (apareceTexto){this.moveText()}

        if (comecaInimigos){this.moveInimigos()}

        if (enemies[0].x == width / 4){
            
            this.inimigoDispara()
        }

        if (enemies[0].x > width / 4 ){
            
            var speed = 1
            var bulletSpeed = 4
            var i

            for (i = 0; i < enemies.length; i++){

                muzzles[i].x += speed
                bullets[i].x += bulletSpeed
            }
            
        }

        // if (index == 3){

        //     this.moveInimigos()
        // }
        
        if (comecaHerois){

            this.moveHerois()

        }
        
    }

    //cria animacao em que a cidade aparece
    moveViana(){

        if (viana.y > height - 530){
          
            entraViana = true
            let speed = 1 
            viana.y -= speed
        
        }else{
            
            entraViana = false
            tempViana.remove()
        }

    }

    moveRec(){
        //muda o alpha do rectangulo fazendo-o mais opcaco para ser mais facil ler o texto
        if (r1.fillAlpha <= 0.8){
            apareceRec = true
            r1.fillAlpha = r1.fillAlpha + 0.001
        }else{
            apareceRec = false
        }
        
    }

    moveText(){
        //faz aparecer o primeiro paragrafo da historia
        let alphaText = textHist.alpha

        if (alphaText < 1){
            apareceTexto = true
            alphaText = alphaText + 0.002
            textHist.setAlpha(alphaText)

        }else{
            apareceTexto = false
            tempText = this.time.addEvent({ delay: 7000, callback: this.mostraTexto, callbackScope: this, loop: true})
            
        }
    }

    mostraTexto(){

        index++

        if (index < content.length){
            textHist.text = content[index]
            
        }else{

            tempText.remove()
        }

        if (index == 10){

            this.moveInimigos()
        }

        if (index == 13){

            this.moveHerois()
        }

    }

    moveInimigos(){

        var speed = 1
        var i

        if (enemies[0].x < width + 400){

            comecaInimigos = true
            for (i = 0; i < enemies.length; i++){
                enemies[i].x += speed
            }

        }else{
            
            comecaInimigos = false
        }
    }

    inimigoDispara(){

        var i
        console.log('executou')
        for (i = 0; i < enemies.length; i++){
            
            enemies[i].play('enemy_run_shoot')
            muzzles[i].setPosition(enemies[i].x + 72, enemies[i].y +7)
            muzzles[i].play('enemy_muzzle')
            bullets[i].setPosition(muzzles[i].x +12, muzzles[i].y)
            bullets[i].play('enemy_bullet_spin')

        }
    }

    moveHerois(){

        var speed = 1
        var i

        if (jack.x < (width /2) - 100 || jill.x > (width / 2) + 100){

            comecaHerois = true
            
            jack.x += speed
            jill.x -= speed
    

        }else{
            
            comecaHerois = false
            jack.play('jack_idle')
            jill.play('jill_idle')
        }

    }
}