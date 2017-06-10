class Guns extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this._initProjectiles();
        this._initExplosion();
        this._playerPositionX = 100;
        this._playerPositionY = 100;
        this.rateOfFire = 170;
        this.currentFire = 0;
        this.stagger = false;
        this._initExplosions();

    }

    _initProjectiles() {

        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(540, 'blasterRound');
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
        this.bullets.forEach(function (L) {
            L.body.allowGravity = false;
        })

    }
    _initExplosions() {
        this.explosions = this.game.add.group();
        this.explosions.enableBody = true;
        this.explosions.setAll('checkWorldBounds', true);
        this.explosions.createMultiple(540, 'plasmaExplosion');
        this.explosions.setAll('anchor.x', 0.5);
        this.explosions.setAll('anchor.y', 0.5);
    }

    _killBullet(bullet) {
        this._bulletExplosion(bullet.x, bullet.y);
        bullet.kill();

    }
    _bulletExplosion(x, y) {
    
        this.fireEmitter.x = x;
        this.fireEmitter.y = y;
        this.fireEmitter.on = true;
        this.game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {

            this.fireEmitter.on = false;
        }, this);
   
        this.explosion;
        this.explosion = this.explosions.getFirstDead();
//        this.explosion.x = 100;
//        this.explosion.y = 100;
        this.explosion.reset(x, y);
        this.explosion.scale.setTo(1.4);
        this.explosion.animations.add('ass');
        var rotation = Math.floor(Math.random() * 1) + 0  
        this.explosion.rotation = rotation;
        var anim = this.explosion.animations.play('ass');
        
        anim.onComplete.add(function(){
           this.explosion =  this.explosions.getFirstAlive();
            this.explosion.kill();
        }, this);
    }


    _initExplosion() {

      
        this.fireEmitter = this.game.add.emitter(200, 200, 100);
        this.fireEmitter.makeParticles('particles', [0, 1, 2, 3]);
        this.fireEmitter.setRotation(0, 360);
        this.fireEmitter.setAlpha(0.3, 1.0, 200);
        //        this.fireEmitter.forEach(function (particle) {
        //                    particle.body.allowGravity = false;
        //           
        //        }, this);
        this.fireEmitter.setScale(0.2, 1, 0.2, 1, 200);

        this.fireEmitter.start(false, 200, 10);
        this.fireEmitter.on = false;
    }

    _blaster() {
        this.bullet;
        this.bullet = this.bullets.getFirstDead();
        this.bullet.angle = this.angle;
        if (this.stagger) {
            this.bullet.reset(this.x - 2, this.y - 2);
            this.stagger = false;
        } else {
            this.bullet.reset(this.x + 2, this.y + 2);
            this.stagger = true;
        }

        this.bullet = this.game.physics.arcade.velocityFromAngle(this.angle, 800, this.bullet.body.velocity);
        this.currentFire = this.game.time.now + this.rateOfFire;

    }

    update() {
        this.rotation = game.physics.arcade.angleToPointer(this);
        if (game.input.mousePointer.rightButton.isDown && this.game.time.now > this.currentFire) {
            this._blaster();
        }
    }
}