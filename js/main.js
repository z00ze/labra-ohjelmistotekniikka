
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('bg1', 'assets/images/backgrounds/1.png');
    game.load.image('bg2', 'assets/images/backgrounds/2.png');
    game.load.image('bg3', 'assets/images/backgrounds/3.png');
    game.load.image('bg4', 'assets/images/backgrounds/4.png');
    game.load.image('bg5', 'assets/images/backgrounds/5.png');
    game.load.image('bg6', 'assets/images/backgrounds/6.png');
    game.load.image('bg7', 'assets/images/backgrounds/7.png');
    game.load.image('bg8', 'assets/images/backgrounds/8.png');
    game.load.audio('rocco', 'assets/audio/RoccoW__xyce_-_RoccoW_en_De_Jongens_Met_de_Zwarte_Schoenenxm1.mp3');
    game.load.spritesheet('rain', 'assets/sprites/rain.png', 17, 17);
}
var bg;
var bgnro = 2;
var staticbg;
function create() {
    staticbg = game.add.sprite(0,0, 'bg1');
    staticbg.width = window.innerWidth;
    staticbg.height = window.innerHeight;
    bg = game.add.sprite(0, 0, 'bg'+bgnro);
    bg.width = window.innerWidth;
    bg.height = window.innerHeight;
    bg.alpha = 0;
    game.add.tween(bg).to( { alpha: 1 }, 5000, Phaser.Easing.Linear.None, true, 0, 5000, false);
    game.time.events.repeat(Phaser.Timer.SECOND * 5, 99, changeDay, this);
    // background music
    music = game.add.audio('rocco');
    music.play();

    // text
    game.physics.startSystem(Phaser.Physics.ARCADE);

    text1 = game.add.text(20, 50, "Terveisiä kurssilaisille!", { font: "62px Arial Black", fill: "#FFF" });
    text1.stroke = "#de77ae";
    text1.strokeThickness = 16;
    text1.setShadow(2, 2, "#333333", 2, true, false);

    text2 = game.add.text(200, 300, "Terveisin, Marko!", { font: "62px Arial Black", fill: "#FFF" });
    text2.stroke = "#de77ae";
    text2.strokeThickness = 16;
    text2.setShadow(2, 2, "#333333", 2, false, true);

    game.physics.arcade.enable([ text1, text2 ]);

    text1.body.velocity.setTo(200, 200);
    text1.body.collideWorldBounds = true;
    text1.body.bounce.set(1);

    text2.body.velocity.setTo(-100, -100);
    text2.body.collideWorldBounds = true;
    text2.body.bounce.set(1);

    // rain

    var emitter = game.add.emitter(game.world.centerX, 0, 400);

    emitter.width = game.world.width;

    emitter.makeParticles('rain');

    emitter.minParticleScale = 1;
    emitter.maxParticleScale = 2;

    emitter.setYSpeed(300, 500);
    emitter.setXSpeed(-5, 5);

    emitter.minRotation = 0;
    emitter.maxRotation = 0;

    emitter.start(false, 1600, 5, 0);
}
function update() {

    game.physics.arcade.collide(text1, text2);

}
function changeDay(){
    console.log('setting staticbg : ' + bgnro)
    staticbg.loadTexture('bg'+bgnro,0);
    bgnro++;
    if(bgnro>8){
        bgnro = 2;
    }
    console.log('loading bg : ' + bgnro);
    bg.loadTexture('bg'+bgnro,0);
}