class inicio extends Phaser.Scene{
    constructor(){
        super("inicio");
        // aqui tambien se puede agregar variables

        
      }
 
      preload (){

        // es un metodo
        //this.load.setBaseURL('https://labs.phaser.io');
       
        this.load.image('fondo', '/public/img/fondo.png'); // esta es la imagen de fondo
        this.load.spritesheet('portal','/public/img/portalDefinido.png',{frameWidth:162.25,frameHeight:384});
        this.load.spritesheet('bala','/public/img/bala.png',{frameWidth:72,frameHeight:72});
        this.load.spritesheet('nave','/public/img/nave.png', {frameWidth:70, frameHeight:62}); // la nave principal
        this.load.image('red', '/public/img/red.png');

      }
      create (){
        this.balas = this.physics.add.group(); // Crea un grupo para las balas
        this.barraespacio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K); // Configura la tecla espaciadoraaa


        this.add.image(400,400, 'fondo'); 
        this.portal = this.physics.add.sprite(700,300, 'portal');
      



        this.player = this.physics.add.sprite(400,400, 'nave');
        this.player.setCollideWorldBounds(true); //no atravesar bordes del area de juego
        
          // son las particulas 
          const particles = this.add.particles(-40,0, 'red', {
            speed: 100,
            angle:{min: 150, max :210},
            scale: { start: 1.0, end: 0 },  // EL TAMAÑO DE LAS PARTICULAS """"""""""""""""""""""""""""""""""""
            blendMode: 'ADD' // este agraga las particulas 
  
        });
  
        particles.startFollow(this.player); 
        
      
        this.cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
          //key: 'right',
          frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1
      });


        this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
          //[{key: 'avion', frame:2  }],//('avion',/*{start:0 , end:0 }*/)
          //frameRate: 30
          //repeat: -1 // valor negativo para repeticion infinita, 0 para una sola
                      //reproduccion, 1 para dos repeticiones, y asi sucesivamente
      });

      this.anims.create({
          key: 'up',
          frames: this.anims.generateFrameNumbers('nave', { start: 2, end: 2 }),
          //frameRate: 20
      });

      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
          //frameRate: 10
          ///repeat: -1
      });

      this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('nave', { start: 1, end: 1 }),
        //frameRate: 10
        //repeat: -1
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////





      }
      



      update(){   

        if (this.cursors.left.isDown) {
          this.player.setVelocityX(-160);
          this.player.anims.play('left', true);
      }else if(this.cursors.right.isDown){
          this.player.setVelocityX(160); 
          this.player.anims.play('right', true);
      }


      else if(this.cursors.up.isDown){
        this.player.setVelocityY(-160);
        this.player.setVelocityX(0);

        
        this.player.anims.play('up', true);
       }

    else if(this.cursors.down.isDown){
      this.player.setVelocityY(160);
      this.player.setVelocityX(0);
      
      this.player.anims.play('down', true);
  }
      else{
          this.player.setVelocityX(0);
          this.player.setVelocityY(0);
          
          this.player.anims.play('left', true);
      }


      if (Phaser.Input.Keyboard.JustDown(this.barraespacio)) { // Verifica si la tecla espaciadora se presionó en este fotograma
        const bullet = this.balas.create(this.player.x,this.player.y, 'bala'); // Crea una bala en la posición del jugador
        bullet.setVelocity(300, 0); // Establece la velocidad de la bala (en este caso, hacia arriba)
    }
      }

}

export  default inicio;