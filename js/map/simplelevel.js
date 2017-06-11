class SimpleLevel extends Phaser.State {
    constructor() {
        super();
    }

    _loadLevel() {
        console.log('Level Loaded!');
        this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        }
        this.game.stage.backgroundColor = "#1b2823";
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

    }

    _loadDrone() {
        this.player = new Player(this.game, 100, 100, 'drone');
        this.game.camera.follow(this.player);
    }
    _loadGuns() {
        this.weapons = new Guns(this.game, 0, 0, 'smallBlaster');
        this.weapons.anchor.setTo(0.2, 0.5);
    }

    _initTestMap() {
        this._map = this.add.tilemap('level-1');
        this._map.addTilesetImage('worldSprite', 'worldSprite');
        this._collision_layer = this._map.createLayer('Tile Layer 1');
        this._collision_layer.resizeWorld();
        this._map.setCollisionBetween(0, 160, true, this._collision_layer);
    }
    _enemySpawner() {
        this.enemies = this.game.add.group();
        var floaterArray = this._findObjectsByType('floaterSpawn', this._map, 'Object Layer 1');
        for (var i = 0; i < floaterArray.length; i++) {
            this.enemy = new floatingEnemy(this, floaterArray[i].x, floaterArray[i].y, 'enemy', 100, this._map);
            this.enemies.add(this.enemy);
        }
    }

    _findObjectsByType(targetType, tilemap, layer) {
        var result = [];
        tilemap.objects[layer].forEach(function (element) {
            if (element.type == targetType) {
                result.push(element);
            }
        }, this);
        return result;
    }



    _collisionHandler() {
        this.game.physics.arcade.collide(this._collision_layer, this.player);
        this.game.physics.arcade.collide(this._collision_layer, this.enemies);
        this.physics.arcade.overlap(this.weapons.bullets, this._collision_layer, this.weapons._killBullet, function (bullet, _collision_layer) {
            return _collision_layer.collides;
        }, this.weapons);
    }
    preload() {}

    create() {
        this.game.stage.smoothed = false;
        this._loadLevel();
        this._initTestMap();
        this._loadDrone();
        this._loadGuns();
        this._enemySpawner();

    }

    update() {
        this.weapons.x = this.player.x;
        this.weapons.y = this.player.y;
        this.enemies.forEach(function (enemy) {
            enemy._playerPositionX = this.player.x;
            enemy._playerPositionY = this.player.y;
        }, this);
        this._collisionHandler();

    }

}