class Player extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.anchor.setTo(0.5);
        this.verticalFix = 115;
        this.roll = 115;
        //this.game.physics.arcade.enableBody(this);
        this._initThruster();
        this._loadGuns();
        this.body.velocity.y = 30;
    }

    _initThruster() {
        this.arrow = this.game.add.sprite(0, 0, 'thruster');
        this.arrow.anchor.setTo(1.5, 0.5);
       // this.arrow.sendToBack();
        //this.addChild(this.arrow);
    }
    _initTargetingLaser() {
        this._laser_pointer = this.game.add.tileSprite(0, -4, 800, 0.5, 'pointer');
    }

    _loadGuns() {
        this.gun = this.game.add.sprite(0, 0, 'smallBlaster');
         this.gun.anchor.setTo(0.2, 0.5);
    }
    update() {
        this.gun.x = this.x;
        this.gun.y = this.y;
         this.gun.rotation = game.physics.arcade.angleToPointer(this.gun);
        this.arrow.x = this.x;
        this.arrow.y = this.y;
        
        if (game.input.mousePointer.leftButton.isDown) {
            //            this.arrow.visible = true;

            this.arrow.rotation = game.physics.arcade.angleToPointer(this.arrow);
        
            
            this.verticalFix = this.y;
        } else {
            //            this.arrow.visible = false;
            this.roll += 0.3;
            this.y = /* 3 * */ Math.sin(this.roll / 4) + this.verticalFix;
            this.body.velocity.x = 0;
        }
    }
}









//
//    _detectionUpdate(){
//        this.detectionSphere.scale.setTo(0.1);
//       this.ulcerate = this.game.add.tween(this.detectionSphere.scale).to({ x: this.detectionRating, y: this.detectionRating}, 3000, Phaser.Easing.linear, true);
//        this.ulcerate.onComplete.add(function(){
//            this.detectionSphere.scale.setTo(0.0, 0.0);
//            this._detectionUpdate();
//        },this);
//    }
//    
//    _loadDetectionSphere(){
//        this.detectionSphere = this.game.add.sprite(0 , 0 , 'detectionSphere');
//        this.detectionSphere.anchor.setTo(0.5);
//        this.addChild(this.detectionSphere);
//        this._detectionUpdate();
//    }