import Phaser from '../lib/phaser.js'

//variavel onde fica a sprite da cidade e rectangulo
let viana, r1

//variavel com a historia
let content = [
    "",
    "Welcome to Viana, a beautiful city entirely powered by clean, renewable energy. All the building's lights and devices run on wind, solar, hydraulic, or geothermal energy. These fuels are renewable (never end) and clean; they do not generate any pollution. The people of Viana are happy because of this.",
    "Close to Viana are other cities that do not run on clean, renewable energy. They run on fossil power sources such as oil and coal, these energies are not clean and not renewable, meaning one day they will end, and they also generate lots of pollution. These cities are inhabited by polluting Trolls. The trolls are jealous of Viana’s power sources and are unhappy because their cities are filled with polluted air from their energy sources, which will end someday, leaving them in the dark.",
    "Instead of asking the Vianenses to teach them how to use clean, renewable energy, the Trolls decided to attack Viana. They stole parts of the machines that provided different types of renewable energy.",
    "Viana’s Mayor asked the Trolls to return the parts, but they refused. They decided to send Jack and Jill to get the machine parts back. Help them retrieve the four machine parts to reactivate their solar, wind, geothermal, and hydraulic power sources and bring energy back to Viana.",
    "Help them on their adventure!"
]

let width, height

//variavel para controlar movimento do texto da historia
let textHist

let tempViana, tempRec, tempText
let entraViana = false
let apareceRec = false
let apareceTexto = false


export default class Intro extends Phaser.Scene{
    constructor(){
    
        super('intro')
    
    }

    preload(){

        this.load.image('background', 'assets/background.png')
        this.load.image('cidade', 'assets/viana.png')
    }

    create(){

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

        //atrasa mostrar a primeira parte da historia
        tempText = this.time.delayedCall(7000, this.moveText, [], this)
        //timedEvent = this.time.addEvent({ delay: 6000, callback: this.moveText, callbackScope: this, loop: true });

        
    }

    update(){

        //mostra a cidade
        if (entraViana){this.moveViana()}

        //manipula o alpha do rectangulo
        if (apareceRec){this.moveRec()}

        //manipula a entrada do primeiro paragrafo da historia
        if (apareceTexto){this.moveText()}
        
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

        let alphaText = textHist.alpha

        if (alphaText <= 1){
            apareceTexto = true
            alphaText = alphaText + 0.002
            textHist.setAlpha(alphaText)
            console.log(textHist.alpha)
        }else{
            apareceTexto = false
        }
    }

    mostraTexto(){

    }
}