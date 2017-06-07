class Player extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
//        this.body.bounce.set(0.5);
        this.anchor.setTo(0.5);
        this.verticalFix = 115;
        this.roll = 800;
        this._loadWheel();
        this.bringToTop();
        this.body.drag.set(6);
        this._initThruster();
        this.body.setSize(58, 58, -9, -9);
        this.speed = 90;
        this.body.maxVelocity.y = 110;
        this.body.maxVelocity.x = 110;
              this.body.gravity.y = 20;
        
    }

    _initThruster() {
        this.arrow = this.game.add.sprite(90, 0, 'thruster');
        this.arrow.anchor.setTo(1.5, 0.5);
        this.burn = this.game.add.sprite(-53, -5, 'thrusterBurn');
        this.burn.animations.add('flame', [3, 2, 1, 0]);

        this.arrow.addChild(this.burn);
        this.burn.animations.play('flame', 10, true);
    }
    _initTargetingLaser() {
        this._laser_pointer = this.game.add.tileSprite(0, -4, 800, 0.5, 'pointer');
    }

    _loadWheel(){
        this.wheel = this.game.add.sprite(0, 0, 'wheel');
        this.wheel.anchor.setTo(0.5);
        //this.addChild(this.wheel);
        this.wheel.sendToBack();
        //
    }



    update() {
        this.arrow.x = this.x;
        this.arrow.y = this.y;
        this.wheel.x = this.x;
        this.wheel.y = this.y;
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
        if(this.body.blocked.down){
           this.body.maxVelocity.x = 60;
        } else {
            this.body.maxVelocity.x = 110;
        }
        
        if(this.body.blocked.down && this.body.velocity.x < 0){
            this.wheel.rotation += 1; 
            
        } else if(this.body.blocked.down && this.body.velocity.x > 0){
            this.wheel.rotation -= 1;
        }

        
        
        
        
        
        
        
    }

}