class Menu extends Phaser.Scene {

  constructor() {
    super("menu");

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


    this.starbutton = this.add.image(400, 500, 'start').setScale(0.7).setInteractive();

    this.starbutton.on('pointerdown', () => {
      this.scene.start('inicio');

    });


    //------------configuracion del sonido ---------------



    this.starbutton = this.add.image(50, 50, 'musicaoff').setScale(0.05).setInteractive();

    this.starbutton.on('pointerdown', () => {

      // -----------------sonido-------------
      this.add.image(50, 50, 'musicaon').setScale(0.05)




      this.sonido = this.sound.add('musicafondo');
      const soundConfig = {
        volumen: 1,              // toda esta parte es del

        loop: true               // sonidoooo
      }
      // esto no va this.sonido.play(soundConfig);
      // con esto solo carga una unica vez
      if (!this.sound.locked) {
        // already unlocked so play
        this.sonido.play(soundConfig)
      }
      else {
        //wait for 'unloched ' to free and the play 
        this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
          this.sonido.play(soundConfig)

        })
      }



    });

  }
  //update

}

export default Menu;  