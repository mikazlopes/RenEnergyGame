import Phaser from '../lib/phaser.js'

import Enemy from '../game/Enemies.js'

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
    "Help Jack and Jill on their adventure!"
]

let index = 1

//variaveis para armazenar as dimensoes do stage
let width, height

//variaveis para controlar movimento do texto da historia e outras animacoes
let textHist
let tempViana, tempRec, tempText
let entraViana = false
let apareceRec = false
let apareceTexto = false

//variavel para objeto Inimigo nos varios estador
// let enemyRun, enemyBullet, enemyMuzzle


export default class Intro extends Phaser.Scene{
    constructor(){
    
        super('intro')
    
    }

    preload(){

        this.load.image('background', 'assets/background.png')
        this.load.image('cidade', 'assets/viana.png')
        // this.load.atlas('enemy_run', 'assets/spritesheets/enemy_run_spritesheet.png', 'assets/spritesheets/enemy_run_spritesheet.json')
        // this.load.atlas('enemy_bullet', 'assets/spritesheets/enemy_bullet_spritesheet.png', 'assets/spritesheets/enemy_bullet_spritesheet.json')
        // this.load.atlas('muzzle', 'assets/spritesheets/muzzle_spritesheet.png', 'assets/spritesheets/muzzle_spritesheet.json')
    }

    create(){

        let er = new Enemy (this, width / 2, height / 2, 'enemy_run')

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

        // this.anims.create({
        //     key: 'run_shoot',
        //     frames: this.anims.generateFrameNames('enemy_run', {
        //         start: 0,
        //         end: 9,
        //         zeroPad: 3,
        //         prefix: 'Run_Shoot__',
        //         suffix: '.png'
        //     }),
        //     frameRate: 15,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'run',
        //     frames: this.anims.generateFrameNames('enemy_run', {
        //         start: 0,
        //         end: 9,
        //         zeroPad: 3,
        //         prefix: 'Run__',
        //         suffix: '.png'
        //     }),
        //     frameRate: 15,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'enemy_bullet_size',
        //     frames: this.anims.generateFrameNames('enemy_bullet', {
        //         start: 0,
        //         end: 9,
        //         zeroPad: 3,
        //         prefix: 'OrangeScale__',
        //         suffix: '.png'
        //     }),
        //     frameRate: 15,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'enemy_bullet_spin',
        //     frames: this.anims.generateFrameNames('enemy_bullet', {
        //         start: 0,
        //         end: 9,
        //         zeroPad: 3,
        //         prefix: 'OrangeSpin__',
        //         suffix: '.png'
        //     }),
        //     frameRate: 15,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'enemy_muzzle',
        //     frames: this.anims.generateFrameNames('muzzle', {
        //         start: 0,
        //         end: 10,
        //         zeroPad: 3,
        //         prefix: 'OrangeMuzzle__',
        //         suffix: '.png'
        //     }),
        //     frameRate: 15,
        //     repeat: 5
        // });

        er = Enemy.add.sprite( width / 2, height - 100, 'enemy_run')
        enemyRun.play('run_shoot')

        enemyBullet = Enemy.add.sprite( width / 1.5, height - 100, 'enemy_bullet')
        enemyBullet.play('enemy_bullet_spin')

        enemyMuzzle = Enemy.add.sprite( enemyRun.x + 72 , height - 93, 'muzzle')
        enemyMuzzle.play('enemy_muzzle')
        
        
    }

    update(){

        //mostra a cidade
        if (entraViana){this.moveViana()}

        //manipula o alpha do rectangulo
        if (apareceRec){this.moveRec()}

        //manipula a entrada do primeiro paragrafo da historia
        if (apareceTexto){
            this.moveText()
            
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
            tempText = this.time.addEvent({ delay: 10000, callback: this.mostraTexto, callbackScope: this, loop: true});
            
        }
    }

    mostraTexto(){

        index++

        if (index < content.length){
            textHist.text = content[index]
            
        }else{

            tempText.remove()
        }

    }
}