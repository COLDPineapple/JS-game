//create new scene
let gameScene = new Phaser.Scene("game");

//initiate scene parameeters
gameScene.init = function () {};

//configure the game
let config = {
	tyep: Phaser.AUTO,
	width: 640,
	height: 350,
	scene: gameScene,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
			debug: false,
		},
	},
};

// creare a new game, pass the config
let game = new Phaser.Game(config);
//load assets
gameScene.preload = function () {
	// load images
	this.load.image("background", "assets/pvz.webp");
	this.load.image("player", "assets/dave.webp");
	this.load.image("enemy", "assets/conehead.webp");
	this.load.image("treasure", "assets/taco.webp");
};

gameScene.create = function () {
	// makes background
	this.background = this.physics.add.sprite(320, 175, "background");
	this.background.setScale(0.2);
	0;

	this.enemies = this.physics.add.group({
		key: "enemy",
		repeat: 3,
		setXY: {
			x: 110,
			y: 100,
			stepX: 130,
			stepY: 20,
		},
	});
	this.enemies.getChildren().forEach((enemy) => {
		enemy.setVelocityY(-360);
		enemy.setCollideWorldBounds(true);
		enemy.scale = 0.3;
		enemy.setBounce(1);
	});

	//creates ab enemy

	//creates player
	this.player = this.physics.add.sprite(50, 180, "player");
	this.player.setScale(0.2);

	//makes goal
	this.treasure = this.physics.add.sprite(550, 180, "treasure");
	this.treasure.setScale(0.05);

	this.enemyMinSpeed = 2;
	this.enemyMaxSpeed = 4.5;

	//sets world border
	this.player.setCollideWorldBounds(true);
};
//this is called up to 60 times per seconed
gameScene.update = function () {
	//make it so i can use arrow kyes
	cursors = this.input.keyboard.createCursorKeys();

	// player moves left and right
	if (cursors.left.isDown) {
		this.player.setVelocityX(-160);
		this.player.flipX = true;
	} else if (cursors.right.isDown) {
		this.player.setVelocityX(160);
		this.player.flipX = false;
	} else {
		this.player.setVelocityX(0);
	}
	// player moves up and down
	if (cursors.up.isDown) {
		this.player.setVelocityY(-160);
	} else if (cursors.down.isDown) {
		this.player.setVelocityY(160);
	} else {
		this.player.setVelocityY(0);
	}

	// if (this.enemy.y == 17.5) {
	// 	this.enemy.setVelocityY(160);
	// } else if (this.enemy.y == 342.5) {
	// 	this.enemy.setVelocityY(-160);
	// }

	// makes enimes turn tords you
	this.enemies.getChildren().forEach((enemy) => {
		if (this.player.x >= enemy.x) {
			enemy.flipX = true;
		} else {
			enemy.flipX = false;
		}
	});

	// make player face the way they move

	// when the player colides with the treasure restarts the seance
	this.physics.collide(this.player, this.treasure, () => {
		this.scene.restart();
		return;
	});
	// same thing but when it hits the enemie

	this.enemies.getChildren().forEach((enemy) => {
		this.physics.collide(this.player, enemy, () => {
			this.dead = true;
			this.cameras.main.shake(200);
			this.cameras.main.on(
				"camerashakecomplete",
				function (camera, effects) {
					this.cameras.main.fade(200);
				},
				this
			);
			this.cameras.main.on(
				"camerafadeoutcomplete",
				function (camera, effects) {
					this.scene.restart();
				},
				this
			);
		});
	});
};
function dead() {}
