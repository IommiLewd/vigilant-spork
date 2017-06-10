//create constructor input, monsterType 1-3. If undefined create random number from 1-3. This number will decide the monsters sprite and behaviour.

class floatingEnemy extends Phaser.Sprite {
    constructor(game, x, y, key, velocity, tilemap, health) {
        super(game, x, y, key, velocity, tilemap);
        if (velocity === undefined) {
            velocity = (Math.random() * 120 + 80) * (Math.random() < 0.5 ? 1 : -1);
        }
        console.log(velocity);
        game.add.existing(this);
        game.physics.arcade.enable(this);

        this.anchor.setTo(0.5);
        this.game.physics.arcade.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.bounce.set(1, 0);
        this._health = health;
        this._map = game.add.tilemap('level-1');
        this.randomVelocity = velocity;
        this._player_Spotted = true;
        var seededTimer = Math.random() * (2 - 1) + 1;
        this.variableTimer = 1;
        this.body.allowGravity = false;
        this.game.time.events.add(Phaser.Timer.SECOND * 1, this._movementUpdate, this);

        this.body.velocity.y = -90;
        this._playerPositionX = 100;
        this._playerPositionY = 100;
        this.initialX = this.x;
        this.initialY = this.y;
        this.heightCheck;
        this.horizontalCheck;
    }


    _movementUpdate() {
        if (this._playerPositionX - this.initialX > -150 && this._playerPositionX - this.initialX < 150 && this._playerPositionY - this.initialY > -150 && this._playerPositionY - this.initialY < 150) {
            console.log('Hostile Spotted!');
            if (this.body.x < this.horizontalCheck) {
                this.body.velocity.x = +80;
            } else {
                this.body.velocity.x = -80;
            }
            this.body.velocity.y = 0;

            this.variableMovement = Math.random() * (150 - 20) + 20;
            if (this.body.y > this.heightCheck - 2) {
                this.body.velocity.y = this.variableMovement * -1 - 20;
            } else {
                this.body.velocity.y = this.variableMovement;
            }


            this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this._movementUpdate, this);
        } else {
            console.log('No enemies!');
            if (this.body.x < this.initialX) {
                this.body.velocity.x += 30;
            } else {
                this.body.velocity.x -= 30;
            }
            this.body.velocity.y = 0;

            this.variableMovement = Math.random() * (150 - 20) + 20;
            if (this.body.y > this.initialY) {
                this.body.velocity.y = -30;
            } else {
                this.body.velocity.y = 30;
            }



            this.game.time.events.add(Phaser.Timer.SECOND * 2, this._movementUpdate, this);
        }

    }




    update() {

        if (this._playerPositionY === undefined && this._playerPositionX === undefined) {} else {
            this.heightCheck = this._playerPositionY;
            this.horizontalCheck = this._playerPositionX;
        }

    }
}