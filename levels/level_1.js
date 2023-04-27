let level_1;


function initLevel1() {
    
    level_1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss()
        ],

        [
            new Cloud('img/5_background/layers/4_clouds/1.png', 300),
            new Cloud('img/5_background/layers/4_clouds/2.png', 900),
            new Cloud('img/5_background/layers/4_clouds/1.png', 1500)
        ],

        [
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 799),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 799),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 799),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 799),
            new BackgroundObject('img/5_background/layers/air.png', 1598),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1598),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1598),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1598),
            new BackgroundObject('img/5_background/layers/air.png', 2397),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2397),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2397),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2397),
            new BackgroundObject('img/5_background/layers/air.png', 3196),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 3196),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 3196),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 3196)
        ],

        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ],

        [
            new Bottle('level_1'),
            new Bottle('level_1'),
            new Bottle('level_1'),
            new Bottle('level_1'),
            new Bottle('level_1'),
            new Bottle('level_1'),
            new Bottle('level_1'),
            new Bottle('level_1'),
            new Bottle('level_1'),
            new Bottle('level_1')
        ]
    );
}