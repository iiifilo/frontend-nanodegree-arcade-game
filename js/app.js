//Declare variables
var enemyCount = 6;
var positionx = 10;
var enemypositions = [60, 145, 230];
var playerpositionx = 200;
var playerpositiony = 400;
var canvaswidth = 500;
var enemyspeeds = [100, 110, 120, 130, 140, 150];
var colwidth = 101;
var colheight = 83;

//This function will return a random integer 
// Used for enemies uneven distribution
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started   
    this.x = positionx;
    this.y = enemypositions[getRandomInt(enemypositions.length)];
    this.speed = enemyspeeds[Math.floor(Math.random() * enemyspeeds.length)];
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

//Enemy reset
Enemy.prototype.reset = function() {
    this.x = positionx;
    this.y = enemypositions[getRandomInt(enemypositions.length)];
    this.speed = Math.random() * 100 + 10;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > canvaswidth) {
        this.reset();
    }
    if ((Math.abs(this.x - Player.x) < 80) && (Math.abs(this.y - Player.y) < 60)) {
        Player.reset();
        //score.addDefeat();
    }
    //Enemy  perimeter  collision detection
    this.left = this.x;
    this.top = this.y;
    this.right = this.x + 75;
    this.bottom = this.y + 75;

    this.collisionsCheck(this, player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Collision check
Enemy.prototype.collision = function(enemy, player) {
    return !(player.left > enemy.right ||
        player.right < enemy.left ||
        player.top > enemy.bottom ||
        player.bottom < enemy.top);
}
Enemy.prototype.collisionsCheck = function(enemy, player) {
    if (this.collision(enemy, player)) {
        player.reset();
    }
}

//Player Class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.reset();
};

Player.prototype.reset = function() {
    this.x = playerpositionx;
    this.y = playerpositiony;
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//Player Update
Player.prototype.update = function(dt) {

    if (this.x >= canvaswidth) {
        this.x = (this.x - colwidth);
    }
    if (this.x <= 0) {
        this.x = 0;
    }
    if (this.y >= playerpositiony) {
        this.y = playerpositiony;
    }
    if (this.y <= 0) {
        this.reset();
    }
    //Player perimeter for collision detection
    this.left = this.x;
    this.top = this.y;
    this.right = this.x + 75;
    this.bottom = this.y + 75;
};


//Player Render
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player handleInput
Player.prototype.handleInput = function(keyCode) {
    switch (keyCode) {
        case 'left':
            this.x -= colwidth;
            break;
        case 'right':
            this.x += colwidth;
            break;
        case 'up':
            this.y -= colheight;
            break;
        case 'down':
            this.y += colheight;
            break;
        default:
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
var i = 0;
for (var i = 0; i < enemyCount; i++) {
    allEnemies.push(new Enemy());
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});