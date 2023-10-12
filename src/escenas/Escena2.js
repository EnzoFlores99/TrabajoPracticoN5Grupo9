class Escena2 extends Phaser.Scene{
  constructor(){
    super('Escena1');
    this.vidasText = "";
    this.vidas = 0;
    this.bonus = false;
  }
  
  preload(){
      this.load.image('fondo', '../public/img/espacio2.jpg');    
      this.load.spritesheet('nave', '../public/img/nave.png', {frameWidth:70, frameHeight:62});
      this.load.image('enemy', '../public/img/enemy.png');
      this.load.image('shoot', '../public/img/shoot.png');
      this.load.image('meteorito', '../public/img/meteorito.png');
      this.load.image('red', '/public/img/red.png');
      this.load.image('star', '../public/img/star.png');
      this.load.image('heart', '../public/img/heart.png');
  }
  
  create(){
        this.vidas = 5;
      
        //fondo en Movimiento 
        this.fondo = this.add.tileSprite(0, 0, 800, 600, 'fondo');
        this.fondo.setOrigin(0, 0);
  
        this.add.image(60,30,'heart').setScale(0.4);
        this.vidasText = this.add.text(16, 16, '5', {fontSize: '32px', fill: '#FFFF'});
        
        //PLAYER
        this.player = this.physics.add.sprite(100, 300, 'nave');
        this.player.setCollideWorldBounds(true); //no atraviesa bordes del area del juego
  
        this.anims.create({
            key: 'up',
            frames: [{key: 'nave', frame:2}],
            frameRate: 20
        });
  
        this.anims.create({
            key: 'turn',
            frames: [{key: 'nave', frame:0}],
            frameRate: 20
        });
  
        this.anims.create({
            key: 'down',
            frames: [{key: 'nave', frame:1}],
            frameRate: 20
        });
  
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //Particulas 
        this.particles = this.add.particles(-40,0, 'red', {
          speed: 100,
          angle:{min: 150, max :210},
          scale: { start: 1.0, end: 0 },  // EL TAMAÑO DE LAS PARTICULAS
          blendMode: 'ADD' // este agregada las particulas 
        });
  
        this.particles.startFollow(this.player); 
        
        //BALAS
        this.bullets = this.physics.add.group();
        this.lastShot = 0; // Variable para controlar el tiempo desde el último disparo
        this.minTime = 200; // Tiempo mínimo entre disparos en milisegundos
        
        //ENEMY
        this.enemys = this.physics.add.group({
          key: 'enemy',
          live: 3,
          repeat: 3, //cantidad
          setXY: { x: 900, y: 50, stepY: 250 }
        });
        
        let n = -100;
  
        this.enemys.children.iterate(function(child){
          child.live = 3;
          n = n * -1;
          child.setVelocityY(n);
          child.setVelocityX(Phaser.Math.Between(-50, -100));
        });
       
        this.particlesEnemy = this.add.particles('red');
  
        //Meteroritos
        this.meteoritos = this.physics.add.group({
          key: 'meteorito',
          repeat: 3, //cantidad
          setXY: { x: 700, y: 150, stepY: Phaser.Math.FloatBetween(150, 500) } //empieza en la posicion x e y, se repite cada 70 de espacios
        });
        
        this.meteoritos.children.iterate(function(meteorito){
          meteorito.setScale(0.1);
          meteorito.setVelocityX(Phaser.Math.Between(-300, -500));
        });
  
        //Evento de actualizacion
        this.time.addEvent({
          delay: 3500,
          callback: this.crearMeteoritos,
          callbackScope: this,
          repeat: 5
        });
        
        //Se  agrega el bonus
        this.stars = this.physics.add.group({
          key: 'star',
          repeat: 0, //cantidad de estrellas
          setXY: { x: 300, y: 200, stepY: 110 } //empieza en la posicion x e y, se repite cada 70 de espacios
      });
  
      //Choque entre las balas del player y los enemys
      this.physics.add.overlap(this.bullets, this.enemys, this.playerAttack, null , this );
      //Choque entre las estrellas y el jugador
      this.physics.add.overlap(this.player, this.stars, this.collectStar, null , this );
      //Choque entre el player y los meteoritos 
      this.physics.add.overlap(this.player, this.meteoritos, this.colisionMeteoro, null , this );
      
    }
    update(){
          // Mueve el fondo en la dirección deseada
          this.fondo.tilePositionX += 1; // Ajusta la velocidad de desplazamiento horizontal
  
          //Desplazamiento de la nave
          if (this.cursors.up.isDown) {
              this.player.setVelocityX(0);
              this.player.setVelocityY(-250);
              this.player.anims.play('up', true);
              this.particles.y = 10;
  
          } else if(this.cursors.down.isDown){
              this.player.setVelocityX(0);
              this.player.setVelocityY(250);
              this.player.anims.play('down', true);
              this.particles.y = -10;
          }
           if (this.cursors.left.isDown) {
              this.player.setVelocityY(0);
              this.player.setVelocityX(-200);
              this.player.anims.play('turn', true);
              this.particles.y = 0;
          }else if (this.cursors.right.isDown ){
              this.player.setVelocityX(200);
              this.player.setVelocityY(0);
              this.player.anims.play('turn', true);
              this.particles.y = 0;
          }
  
          // Manejo del disparo
          if(this.cursors.space.isDown && this.time.now > this.lastShot + this.minTime){
            // Solo dispara si se ha pasado suficiente tiempo desde el último disparo
            
            if(this.bonus){
              let bullet = this.bullets.create(this.player.x+35 , this.player.y-15, 'shoot');
              
              bullet.setCollideWorldBounds(true);
              bullet.setVelocityX(300);
              let bullet2 = this.bullets.create(this.player.x +35, this.player.y+15, 'shoot');
              
              bullet2.setCollideWorldBounds(true);
              bullet2.setVelocityX(300);
            }else{
              let bullet3 = this.bullets.create(this.player.x+45 , this.player.y, 'shoot');
              bullet3.setCollideWorldBounds(true);
              bullet3.setVelocityX(300);
            }
            
            this.player.setVelocity(0);
            this.player.anims.play('turn', true);
            this.particles.y = 0;
            this.lastShot = this.time.now; // Actualiza el tiempo del último disparo
          }
          
          this.enemys.children.iterate(function(child){
            if(child.y < 25){
              child.setVelocityY(100);
            }else if(child.y > 560){
              child.setVelocityY(-100);
            }
          });
  
         this.bullets.children.iterate(function(bullet){
            if(bullet && bullet instanceof Phaser.GameObjects.Sprite && bullet.x > 750){
              bullet.destroy();
            }
          })
  
    }
  
    enemyExplosion(x, y) {
      // Crea un nuevo emisor de partículas
      const explosionEmitter = this.particlesEnemy.createEmitter({
        x: x,
        y: y,
        speed: 100,
        angle: { min: 0, max: 360 },
        scale: { start: 1, end: 0 },
        lifespan: 500,
        blendMode: 'ADD',
      });
    
      // Activa el emisor de partículas
      explosionEmitter.start();
    
      // Detiene el emisor después de un corto tiempo
      this.time.delayedCall(500, () => {
        explosionEmitter.stop();
        explosionEmitter.remove();
      });
    }
    
  
    playerAttack(bullet,enemy){
      bullet.destroy();
      enemy.live -= 1;
      if(enemy.live == 0 ){
          enemy.destroy();
      }
    }
    
    crearMeteoritos(){
      this.meteoritos.children.iterate(function(meteorito){
        meteorito.enableBody(true, 800, Phaser.Math.FloatBetween(50, 300) , true, true);
        meteorito.setVelocityX(Phaser.Math.Between(-300, -500));
      });
    }
  
    collectStar(player, star) {
      this.bonus = true;
      star.disableBody(true, true);
    }
  
    colisionMeteoro(player,meteorito){
      meteorito.destroy();
      this.vidas -=1;
      this.vidasText.setText(this.vidas);
      console.log(this.vidas);
      if(this.vidas == 0){
        console.log("Game Over");
      }
      
    }
  
  
  }
    export default Escena2;