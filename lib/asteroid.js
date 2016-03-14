(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  function Asteroid(options) {
    options.color = options.color || '#888888';
    options.radius = options.radius || Math.random() * 5 + 8;
    options.velocity = options.velocity || Asteroids.Util.randomVec(3);

    Asteroids.MovingObject.call(this, options);
  }
  Asteroids.Util.inherit(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.isCollidedWith = function (otherObj) {
    if (!(otherObj instanceof Asteroids.Ship)) return false;
    return Asteroids.MovingObject.prototype.isCollidedWith.call(this, otherObj);
  };



  Asteroids.Asteroid = Asteroid;
})(this);
