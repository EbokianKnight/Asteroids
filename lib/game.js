(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var DIMX = root.innerWidth;
  var DIMY = root.innerHeight;
  var NUM_ASTEROIDS = 10;

  var asteroids = [];

  function Game() {
    this._ship = new Asteroids.Ship({ x: DIMX / 2, y: DIMY / 2 });
  }


  Game.prototype.addAsteroids = function () {
    if (NUM_ASTEROIDS === asteroids.length) { return; }
    asteroids.push(new Asteroids.Asteroid({
      position: this.randomPosition()
    }));
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, DIMX, DIMY);
    for (var i = 0; i < asteroids.length; i++) {
      asteroids[i].draw(ctx);
    }
    this._ship.draw(ctx);
  };

  Game.prototype.moveObjects = function () {
    for (var i = 0; i < asteroids.length; i++) {
      asteroids[i].move(wrap);
    }
  };

  Game.prototype.remove = function (asteroid) {
    var index = asteroids.indexOf(asteroid);
    asteroids.splice(index, 1);
  };

  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < asteroids.length; i++) {
      var current = asteroids[i];
      if (current.isCollidedWith(this._ship)) {
        this.remove(current);
        this._ship.relocate();
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

  function wrap(position) {
    position.x = position.x < 0 ? DIMX : position.x;
    position.y = position.y < 0 ? DIMY : position.y;
    position.x = position.x > DIMX ? 0 : position.x;
    position.y = position.y > DIMY ? 0 : position.y;
  }

  Asteroids.Game = Game;
})(this);
