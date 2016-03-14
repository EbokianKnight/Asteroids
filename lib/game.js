(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var DIMX = root.innerWidth;
  var DIMY = root.innerHeight;
  var NUM_ASTEROIDS = 10;

  var asteroids = [];
  var bullets = [];

  function Game() {
    this.ship = new Asteroids.Ship({ x: DIMX / 2, y: DIMY / 2 },
      this.addObject.bind(this));
  }

  Game.prototype.addObject = function(obj) {
    if (obj instanceof Asteroids.Asteroid) { asteroids.push(obj); }
    if (obj instanceof Asteroids.Bullet) { bullets.push(obj); }
  };


  Game.prototype.addAsteroids = function () {
    if (NUM_ASTEROIDS === asteroids.length) { return; }
    this.addObject(new Asteroids.Asteroid({
      position: this.randomPosition()
    }));
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, DIMX, DIMY);
    var allObjects = this.allObjects();

    for (var i = 0; i < allObjects.length; i++) {
      allObjects[i].draw(ctx);
    }

  };

  Game.prototype.allObjects = function () {
    return [this.ship].concat(asteroids, bullets);
  };

  Game.prototype.moveObjects = function () {
    var i;
    for (i = 0; i < asteroids.length; i++) {
      asteroids[i].move(wrap);
    }
    this.ship.move(wrap);
    for (i = 0; i < bullets.length; i++) {
      bullets[i].move(removeIfWrapping(bullets[i]).bind(this));
    }
  };

  Game.prototype.remove = function (asteroid) {
    var index = asteroids.indexOf(asteroid);
    asteroids.splice(index, 1);
  };

  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < asteroids.length; i++) {
      var current = asteroids[i];
      if (current.isCollidedWith(this.ship)) {
        this.remove(current);
        this.ship.relocate();
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.randomPosition = function () {
    return { x: Math.random() * DIMX, y: Math.random() * DIMY };
  };

  function isWrapping(position) {
    return position.x < 0 || position.y < 0 ||
      position.x > DIMX || position.y > DIMY;
  }

  function removeIfWrapping(bullet) {
    return function() {
      if (isWrapping(bullet.position)) {
        var index = bullets.indexOf(bullet);
        bullets.splice(index, 1);
      }
    };
  }

  function wrap(position) {
    position.x = position.x < 0 ? DIMX : position.x;
    position.y = position.y < 0 ? DIMY : position.y;
    position.x = position.x > DIMX ? 0 : position.x;
    position.y = position.y > DIMY ? 0 : position.y;
  }

  Asteroids.Game = Game;
})(this);
