class Preload extends Phaser.State {
    preload() {
        //this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        this.load.script('simpleLevel', 'js/map/simplelevel.js');
        this.load.image('drone', 'img/drones/constructionDroneDisc.png');
        this.load.image('enemy', 'img/enemy.png');
        this.load.image('wheel', 'img/drones/constructionDroneWheel.png');
        this.load.image('thruster', 'img/drones/thruster.png');
        this.load.spritesheet('plasmaExplosion', 'img/plasmaExplosion.png', 32, 32, 4);
        //this.load.image('thrusterBurn', 'img/drones/thrusterBurn.png');
        this.load.image('smallBlaster', 'img/guns/smallBlaster.png');
        this.load.image('blasterRound', 'img/guns/blasterRound.png');
        this.load.spritesheet('thrusterBurn', 'img/drones/droneThrusterSheet.png', 26, 10, 4);
        this.load.spritesheet('particles', 'img/particles.png', 8, 8, 3);
        this.load.script('player', 'js/entity/player.js');
        this.load.script('enemy', 'js/entity/floatingEnemy.js');
        this.load.script('guns', 'js/entity/guns.js');
        this.load.tilemap('level-1', 'js/tilemap/tileMap.json', null, Phaser.Tilemap.TILED_JSON); //
        this.load.image('worldSprite', 'img/worldSprite.png');

    }
    create() {
        console.log("Preload.js:  Preload.create-> load_Level");
        this.game.state.add('SimpleLevel', SimpleLevel);
        this.game.state.start('SimpleLevel');
    }

}