(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var BULLET_VELOCITY = 8;

  function Bullet(position, angle) {
    Asteroids.MovingObject.call(this, {
      color: '#FFFF00',
      radius: 3,
      position: { x: position.x, y: position.y },
      velocity: {
        x: Math.cos(angle) * BULLET_VELOCITY,
        y: Math.sin(angle) * BULLET_VELOCITY
      }
    });
  }
  Asteroids.Util.inherit(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isCollidedWith = function (otherObj) {
    if (!(otherObj instanceof Asteroids.Asteroid)) return false;
    return Asteroids.MovingObject.prototype.isCollidedWith.call(this, otherObj);
  };


  Asteroids.Bullet = Bullet;
})(this);
