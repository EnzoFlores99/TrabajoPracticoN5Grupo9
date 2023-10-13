class Menu extends Phaser.Scene {

  constructor() {
    super("menu");
    this.ismusic=true;
  }

  preload() {
    // en priload vamos a cargar nuestras imagenes que vamos a usar 
    // para tenerlo disponibles para que la paguna luego la pueda renderizar
    this.load.audio('musicafondo', '/public/img/musicafondo.mp3');
    this.load.image('start', '/public/img/start.png');
    this.load.image('menunave', '/public/img/fondomenunave.jpg');
    this.load.image('titulo', '/public/img/titulo.png');
    this.load.image('musicaon', '/public/img/botonsonidoactivo.png');
    this.load.image('musicaoff', '/public/img/botonsonidodesactivado.png');



  }

  create() {
    ////////////////////////////////////////////////////////
    this.add.image(400, 300, 'menunave');  // imagen del fondo 
    this.add.image(400, 200, 'titulo').setScale(0.4);
    this.musica= this.sound.add('musicafondo')


    this.starbutton1 = this.add.image(400, 500, 'start').setScale(0.7).setInteractive();

    this.starbutton1.on('pointerdown', () => {
      this.scene.start('inicio');
    });


    //------------configuracion del sonido ---------------



    this.starbuttonMusic = this.add.image(50, 50, 'musicaoff').setScale(0.05).setInteractive();
    this.starbuttonMusic.on('pointerdown',()=>{
      if (this.ismusic){
        this.starbuttonMusic.setTexture('musicaon');
        this.musica.play();
      }else{
        this.starbuttonMusic.setTexture('musicaoff');
        this.musica.stop();
      }
      this.ismusic=!this.ismusic
    });
  }
  //update

}

export default Menu;  