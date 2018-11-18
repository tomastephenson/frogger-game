// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 100) + 150);


};

// A function that puts a player back to the beginning

var playerVictory = function() {

    // Set the player status to 'dead' to override the arrow key inputs
    player.status = 'victorious';

    // Change the image to display that the player successfully made it to the water
    player.sprite = 'images/char-boy-victory.png';

    // Stop the player from being able to move afterwards by overwriting player.handleInput to null whenever an enemy is within an area bigger than the game board:
    Player.update = null;

    //set a small timeout, then reset the game
    setTimeout(function() {
        playerReset();
    }, 2000);
};



var playerDeath = function() {

    // Set the player status to 'dead' to override the arrow key inputs
    player.status = 'dead';

    // Change the image to display that the player is dead!
    player.sprite = 'images/char-boy-death.png';

    // Set a small timeout, then reset the game
    setTimeout(function() {
        playerReset();
    }, 1000);
};



var playerReset = function() {

    player.x = 200;
    player.y = 400;
    player.sprite = 'images/char-boy.png';

    player.status = 'alive';

};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Speed is multiplied by dt to ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // If an enemy is off the right side of the screen:
    if (this.x >= 550) {
        // recalculate its speed:
        this.speed = Math.floor((Math.random() * 100) + 150);
        // then add back to the left side:
        this.x = -80;

    }
    //Adding collision detection with enemies:
    if (player.x >= this.x - 60 &&
        player.x <= this.x + 60 &&
        player.y >= this.y - 60 &&
        player.y <= this.y + 60) {

        // Run the playerDeath function after a collision
        playerDeath();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // The player's image
    this.sprite = 'images/char-boy.png';
    // Player's x location  
    this.x = 200;
    // Player's y location
    this.y = 400;
    this.status = 'alive';
};

// Repeating the supplied enemy rendering code for the player too 
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.update = function() {

    if (player.status === 'alive') {

        if (this.keypress === 'up' && player.y > 0) {
            player.y -= 30;
        }
        if (this.keypress === 'down' && player.y < 400) {
            player.y += 30;
        }
        if (this.keypress === 'left' && player.x > 0) {
            player.x -= 40;
        }
        if (this.keypress === 'right' && player.x < 400) {
            player.x += 40;
        }
        // Keypress is stored as a variable, so the player will keep moving
        // in the same direction if you don't change the value to null straight afterwards:
        this.keypress = null;

        // Add a victory celebration if the player reaches the water:
        if (this.y < 10) {
            playerVictory();
        }
    }
};

Player.prototype.handleInput = function(e) {
    this.keypress = e;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Place the player object in a variable called player
var player = new Player();

// A function to push new enemies:
(function pushEnemies() {
    allEnemies.push(new Enemy(-100, 50));
    allEnemies.push(new Enemy(-100, 135));
    allEnemies.push(new Enemy(-100, 220));
}());


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