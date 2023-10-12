class Escena2 extends Phaser.Scene{

    constructor(){
      super('Escena2');
    }
    
    preload(){
        this.load.image('fondo', '../public/img/espacio2.jpg');    
        this.load.spritesheet('nave', '../public/img/nave.png', {frameWidth:70, frameHeight:62});
        //this.load.image('enemy', '../public/img/enemy.png');
        this.load.image('shoot', '../public/img/shoot.png');
        this.load.image('meteorito', '../public/img/meteorito.png');
        this.load.image('enemy', '../public/img/boss.png');
    }
    
    create(){
          //fondo en movimiento 
          this.fondo = this.add.tileSprite(0, 0, 800, 600, 'fondo');
          this.fondo.setOrigin(0, 0);
        
          // Configura la velocidad de movimiento del fondo
          this.fondo.setScrollFactor(0.5); // Ajusta la velocidad a tu preferencia
          
          //PLAYER
          this.player = this.physics.add.sprite(100, 300, 'nave');
          //physics del player
          this.player.setCollideWorldBounds(true); //no atravesar bordes del area de juego
    
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
          
          //BALAS
          this.bullets = this.physics.add.group();
          //this.physics.add.collider(this.bullets, this.platforms);
          //this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
          this.lastShot = 0; // Variable para controlar el tiempo desde el último disparo
          this.minTime = 200; // Tiempo mínimo entre disparos en milisegundos
          //ENEMY
          this.enemys = this.physics.add.group({
            key: 'enemy',
            live: 3,
            repeat: 5, //cantidad
            setXY: { x: 900, y: 50, stepY: 250 } //empieza en la posicion x e y, se repite cada 70 de espacios
          });
          
          let n = -100;
    
          this.enemys.children.iterate(function(child){
            //child.setScale(2);
            child.live = 3;
            n = n * -1;
            child.setVelocityY(n);
            child.setVelocityX(Phaser.Math.Between(-50, -100));
            child.setCollideWorldBounds(true);
          });
          //this.enemys = this.physics.add.image(700, 300, 'enemy');
          //this.enemys.setCollideWorldBounds(true);
    
          //Choque entre las balas del player y los enemys
          this.physics.add.overlap(this.bullets, this.enemys, this.playerAttack, null , this );
    
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
          
      }
      update(){
            // Mueve el fondo en la dirección deseada
            this.fondo.tilePositionX += 1; // Ajusta la velocidad de desplazamiento horizontal
    
            //Desplazamiento de la nave
            if (this.cursors.up.isDown) {
                this.player.setVelocityX(0);
                this.player.setVelocityY(-300);
                this.player.anims.play('up', true);
    
            } else if(this.cursors.down.isDown){
                this.player.setVelocityX(0);
                this.player.setVelocityY(300);
                this.player.anims.play('down', true);
            }
             if (this.cursors.left.isDown) {
                this.player.setVelocityY(0);
                this.player.setVelocityX(-200);
                this.player.anims.play('turn', true);
            }else if (this.cursors.right.isDown ){
                this.player.setVelocityX(200);
                this.player.setVelocityY(0);
                this.player.anims.play('turn', true);
            }
    
            // Manejo del disparo
            if(this.cursors.space.isDown && this.time.now > this.lastShot + this.minTime){
              // Solo dispara si se ha pasado suficiente tiempo desde el último disparo
              let bullet = this.bullets.create(this.player.x+45 , this.player.y, 'shoot');
              bullet.setCollideWorldBounds(true);
              bullet.setVelocityX(300);
    
              this.player.setVelocity(0);
              this.player.anims.play('turn', true);
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
              if(bullet.x > 750){
                //bullet.destroy();
                bullet.setActive(false);
                bullet.setVisible(false);
              }
            })
    
      }
      playerAttack(bullet,enemy){
        //bullet.disableBody(true, true);
        bullet.destroy();
        enemy.live -= 1;
        //enemy.live = enemy.live - 1;
        console.log( enemy.live);
        if(enemy.live == 0 ){
            console.log("No le quedan vidas");
            //enemy.setTint(0xff0000);
            enemy.destroy();
            
        }
      }
      
      crearMeteoritos(){
    
        this.meteoritos.children.iterate(function(meteorito){
          meteorito.enableBody(true, 800, Phaser.Math.FloatBetween(50, 300) , true, true);
          meteorito.setVelocityX(Phaser.Math.Between(-300, -500));
        });
      }
    }
    export default Escena2;