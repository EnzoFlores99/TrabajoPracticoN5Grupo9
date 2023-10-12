class Booyah extends Phaser.Scene{

    constructor(){
        super("Booyah");
        this.scoreText = "" + this.score;
    }
    init(data){
        this.score = data.score;
    }

    preload(){

        this.load.image('fondoFinal','../public/img/fondoW.png');
        this.load.image('menu','../public/img/menu.png');
        this.load.image('YouWin','../public/img/YouWin.png');
        this.load.image('again','../public/img/again.png');

    }

    create(){
        // this.add.image(400,300,'fondoFinal').setScale(1.7).setTint(0x980B54);
        this.add.image(400,300, 'fondoFinal'); 
        //this.add.image(400, 250, 'fondoFinal').setInteractive();
        //this.scoreText = this.add.text(325, 500, 'score: '+ this.score, {fontSize: '32px', fill: '#fff'});
        this.starbutton = this.add.image(400, 100, 'YouWin').setScale(0.3);


        this.starbutton = this.add.image(150, 500, 'again').setScale(0.23).setInteractive();
        this.starbutton.on('pointerdown', () =>{
            this.scene.stop("Booyah");
            this.scene.start('Escena1');
        } );

        this.starbutton = this.add.image(700, 500, 'menu').setScale(0.31).setInteractive();
        
        this.starbutton.on('pointerdown', () =>{
            this.scene.stop("Booyah");
            this.scene.start('inicio');
        } );
    } 
}

export default Booyah;