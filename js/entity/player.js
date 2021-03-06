class Player extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        //        this.body.bounce.set(0.5);
        this.anchor.setTo(0.5);
        //this.verticalFix = 115;
        this.roll = 800;
        this._loadWheel();
        this.bringToTop();
        this.body.drag.set(6);
        this._initThruster();
        this.body.setSize(56, 56, -7, -7);
        this.speed = 130;
        this.body.maxVelocity.y = 120;
        this.body.maxVelocity.x = 120;
        this.body.gravity.y = 40;
    }

    _initThruster() {
        this.arrow = this.game.add.sprite(90, 0, 'thruster');
        this.arrow.anchor.setTo(1.5, 0.5);
        this.burn = this.game.add.sprite(-53, -5, 'thrusterBurn');
        this.burn.animations.add('flame', [3, 2, 1, 0]);
        this.arrow.addChild(this.burn);
        this.burn.animations.play('flame', 10, true);
    }
    _loadWheel() {
        this.wheel = this.game.add.sprite(0, 0, 'wheel');
        this.wheel.anchor.setTo(0.5);
        this.wheel.sendToBack();
    }



    update() {
        this.arrow.x = this.x;
        this.arrow.y = this.y;
  
        var range = this.body.velocity.x / 110;
        if (range > 0) {
            range *= -1;
        }
        range += 1;
        var verticalRange = range;
        range = (0 + 1) - range;
        if (game.input.mousePointer.leftButton.isDown) {
            this.burn.visible = true;
            this.arrow.rotation = game.physics.arcade.angleToPointer(this.arrow);
            this.game.physics.arcade.accelerationFromRotation(this.arrow.rotation, this.speed, this.body.acceleration);
            this.verticalFix = this.y;
        } else {
            this.burn.visible = false;
            this.body.angularVelocity = 0;
            this.body.acceleration.set(0);
        }
        if (this.body.blocked.down) {
            this.body.maxVelocity.x = 80;
        } else {
            this.body.maxVelocity.x = 130;
        }
        if (this.body.blocked.down) {
            if (this.body.velocity.x < 0) {
                this.wheel.rotation += range;
            } else {
                this.wheel.rotation -= range;
            }
        }
        if (this.body.blocked.up) {
            if (this.body.velocity.x > 0) {
                this.wheel.rotation += range;
            } else {
                this.wheel.rotation += range;
            }
        }
        if (this.body.blocked.left) {
            if (this.body.velocity.y < 0) {
                this.wheel.rotation += verticalRange;
            } else {
                this.wheel.rotation -= verticalRange;
            }
        }
        if (this.body.blocked.right) {
            if (this.body.velocity.y > 0) {
                this.wheel.rotation += verticalRange;
            } else {
                this.wheel.rotation -= verticalRange;
            }
        }
        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            this.wheel.rotation = 0;
        }
              this.wheel.x = this.x;
        this.wheel.y = this.y;
    }

}