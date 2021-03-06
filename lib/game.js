(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var DIMX = root.innerWidth * 0.95;
  var DIMY = root.innerHeight * 0.95;
  var NUM_ASTEROIDS = 15;

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

  function drawGrid(ctx) {
    var spacing = 25;
    var i;
    for (i = 0; i < Math.ceil(DIMX / spacing); i++) {
      var x = spacing * i;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, DIMY);
      ctx.strokeStyle = '#EEEEEE';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    for (i = 0; i < Math.ceil(DIMY / spacing); i++) {
      var y = spacing * i;
      ctx.moveTo(0, y);
      ctx.lineTo(DIMX, y);
      ctx.strokeStyle = '#EEEEEE';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, DIMX, DIMY);
    drawGrid(ctx);

    var allObjects = this.allObjects();

    for (var i = 0; i < allObjects.length; i++) {
      allObjects[i].draw(ctx);
    }
  };

  Game.prototype.allObjects = function () {
    return [this.ship].concat(asteroids, bullets);
  };

  Game.prototype.moveObjects = function () {
    var objects = this.allObjects();
    for (var i = 0; i < objects.length; i++) {
      var obj = objects[i];
      if (obj.isWrappable) {
        obj.move(wrap);
      } else {
        obj.move(removeIfWrapping(obj).bind(this));
      }
    }
  };

  Game.prototype.remove = function (obj) {
    var index;
    if (obj instanceof Asteroids.Asteroid) {
      index = asteroids.indexOf(obj);
      asteroids.splice(index, 1);
    }
    if (obj instanceof Asteroids.Bullet) {
      index = bullets.indexOf(obj);
      bullets.splice(index, 1);
    }
  };

  Game.prototype.checkCollisions = function() {
    var i, j;
    for (i = 0; i < asteroids.length; i++) {
      var current = asteroids[i];
      if (current.isCollidedWith(this.ship)) {
        this.remove(current);
        this.ship.relocate();
      }
    }
    for (i = 0; i < bullets.length; i++) {
      var bullet = bullets[i];
      for (j = 0; j < asteroids.length; j++){
        if (bullet.isCollidedWith(asteroids[j])) {
          this.remove(bullet);
          this.remove(asteroids[j]);
        }
      }
    }
    // for (i = 0; i < asteroids.length; i++) {
    //   var astero1 = asteroids[i];
    //   for (j = i+1; j < asteroids.length; j++){
    //     var astero2 = asteroids[j];
    //     if (i === j) continue;
    //
    //     if (astero1.isCollidedWith(astero2)) {
    //       astero1.bounce(astero2);
    //     }
    //   }
    // }

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
        this.remove(bullet);
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
