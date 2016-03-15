(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var ASTEROID_SPEED = 3;

  function Asteroid(options) {
    options.color = options.color || '#888888';
    options.radius = options.radius || Math.random() * 5 + 8;
    options.velocity = options.velocity ||
      Asteroids.Util.randomVec(ASTEROID_SPEED);

    Asteroids.MovingObject.call(this, options);
  }
  Asteroids.Util.inherit(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.bounce = function(asteroid) {
    var angle = Math.atan2((this.position.y - asteroid.position.y), (this.position.x - asteroid.position.x));

    var angleXSign = Math.cos(angle) < 0;
    var angleYSign = Math.sin(angle) < 0;


    // var angle = Math.atan2((asteroid.positi    on.y - this.position.y), ( asteroid.position.x - this.position.x));
    // var angle2 = Math.PI + angle;
    this.velocity.x = this.velocity.x * Math.cos(angle);
    this.velocity.y = this.velocity.y * Math.sin(angle);

    var vXSign = this.velocity.x < 0;
    var vYSign = this.velocity.y < 0;

    if (vYSign ^ angleYSign) { this.velocity.y *= -1; }
    if (vXSign ^ angleXSign) { this.velocity.x *= -1; }
    var x = this.velocity.x;
    var y = this.velocity.y;

    var magnitude = Math.sqrt(x * x + y * y);

    var normalX = x / magnitude;
    var normalY = y / magnitude;

    angleXSign = Math.cos(angle) < 0 ? -1 : 1;
    angleYSign = Math.sin(angle) < 0 ? -1 : 1;

    this.velocity.x = normalX * ASTEROID_SPEED;
    this.velocity.y = normalY * ASTEROID_SPEED;

    // asteroid.velocity.x = asteroid.velocity.x * Math.cos(angle2);
    // asteroid.velocity.y = asteroid.velocity.y * Math.sin(angle2);
  };

  Asteroids.Asteroid = Asteroid;
})(this);
