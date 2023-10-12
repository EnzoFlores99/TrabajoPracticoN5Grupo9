class GameOver extends Phaser.Scene{

    constructor(){
        super("GameOver");
        //this.scoreText = "" + this.score;
    }
    /*init(data){
        this.score = data.score;
    }*/

    preload(){
        this.load.image('fondo','../public/img/fondoGO.png');
        this.load.image('cartel','../public/img/GameO.png');
        this.load.image('again','../public/img/again.png');
        this.load.image('menu','../public/img/menu.png');
    }

    create(){
        this.add.image(400,300,'fondo')//.setTint(0x980B54);

        this.add.image(400, 100, 'cartel').setScale(0.3);//.setInteractive();
       // this.scoreText = this.add.text(325, 500, 'score: '+ this.score, {fontSize: '32px', fill: '#fff'});

        this.starbutton   = this.add.image(150, 500, 'again').setScale(0.23).setInteractive();
        this.starbutton.on('pointerdown', () =>{
            this.scene.stop("GameOver");
            this.scene.start('Escena1');
        } );

        this.starbutton   = this.add.image(700, 500, 'menu').setScale(0.31).setInteractive();
        this.starbutton.on('pointerdown', () =>{
            this.scene.stop("GameOver");
            this.scene.start('inicio');
        } );
    } 
}

export default GameOver;