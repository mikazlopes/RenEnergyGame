// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function(){
  this.playerSpeed = 1.5;
  this.enemySpeed = 2;
  this.enemyMaxY = 280;
  this.enemyMinY = 80;
}

//load asset files for the game
gameScene.preload = function(){
  //load images
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('dragon', 'assets/dragon.png');
  this.load.image('treasure', 'assets/treasure.png');
};

//executed once, after assests were loaded
gameScene.create = function(){
  //background
  let bg = this.add.sprite(0, 0, 'background');
  //change origin to the top-left of the sprite
  bg.setOrigin(0,0);

  //player
  this.player = this.add.sprite(40, this.sys.game.config.height /2, 'player');
  //scale down
  this.player.setScale(0.5);

  //goal
  this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
  this.treasure.setScale(0.6);


  // group of enemies
  this.enemies = this.add.group({
    key: 'dragon',
    repeat: 3,
    setXY: {
      x: 110,
      y: 100,
      stepX: 130,
      stepY: 20
    }
  });
  // scale enemies
  Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

  // set speeds
  Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
    enemy.speed = Math.random() * 2 + 1;
  }, this);

  // player is alive
  this.isPlayerAlive = true;

  // reset camera effects
  this.cameras.main.resetFX();

};

// game confirguraion
let config = {
  type: Phaser.AUTO,  //Phase to decide how to render the game (WebGL or Canvas)
  width: 640, // Game width
  height: 360, //game height
  scene: gameScene // Newly created scene
};

// Create the game and pass it to confirguraion
let game = new Phaser.Game(config);

//executed on every frame 60 times per second
gameScene.update = function(){

  // only if the player is alive
  if (!this.isPlayerAlive) {
    return;
  }

  //check for active input
  if (this.input.activePointer.isDown){
    //player walks
    this.player.x += this.playerSpeed;
  }

  // enemy movement
  let enemies = this.enemies.getChildren();
  let numEnemies = enemies.length;

  for (let i = 0; i < numEnemies; i++) {
    // move enemies
    enemies[i].y += enemies[i].speed;
    // reverse movement if reached the edges
    if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
      enemies[i].speed *= -1;
    } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
      enemies[i].speed *= -1;
    }
    // enemy collision
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
      this.gameOver();
      break;
  }

  //treasure cpllision
  if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())){
    this.gameOver();
    }
  }
};

//end the game
gameScene.gameOver = function() {

  //flag to set player is dead
  this.isPlayerAlive = false;

  //shake the camera
  this.cameras.main.shake(500);

  // fade camera
  this.time.delayedCall(250, function() {
    this.cameras.main.fade(250);
  }, [], this);

  // restart game
  this.time.delayedCall(500, function() {
    this.scene.restart();
  }, [], this);
};
