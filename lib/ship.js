(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  var COOLDOWN = 100;
  var MAX_VELOCITY = 7;

  function Ship(position, addObjectCallback) {
    Asteroids.MovingObject.call(this, {
      position: { x: position.x, y: position.y },
      velocity: { x: 0, y: 0 },
      color: '#cccccc',
      radius: 12
    });
    this._addObjectCallback = addObjectCallback;
    this._initialPosition = position;
    this._angle = 0;
    this._lastFireTime = Date.now();
  }
  Asteroids.Util.inherit(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.position.x = this._initialPosition.x;
    this.position.y = this._initialPosition.y;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this._angle = 0;
  };

  // Ship.prototype.power = function (impulse) {
  //   this.velocity.x += impulse * Math.cos(this._angle);
  //   this.velocity.y += impulse * Math.sin(this._angle);
  // };

  Ship.prototype.power = function (impulse) {
    var impulseX = impulse * Math.cos(this._angle);
    var impulseY = impulse * Math.sin(this._angle);
    var length = (this.velocity.x * this.velocity.x) +
      (this.velocity.y * this.velocity.y);
    if (length > MAX_VELOCITY * MAX_VELOCITY) {
      var signVX = this.velocity.x < 0;
      var signVY = this.velocity.y < 0;
      var signIX = impulseX < 0;
      var signIY = impulseY < 0;
      if (signVX ^ signIX) {
        this.velocity.x += impulseX;
      }
      if (signVY ^ signIY) {
        this.velocity.y += impulseY;
      }
    } else {
      this.velocity.x += impulseX;
      this.velocity.y += impulseY;
    }
  };

  Ship.prototype.turn = function (dir) {
    this._angle += (Math.PI * 2 / 60) * dir;
  };

  Ship.prototype.fireBullet = function () {
    var delta = Date.now() - this._lastFireTime;
    if (delta >= COOLDOWN) {
      var bullet = new Asteroids.Bullet(this.position, this._angle);
      this._addObjectCallback(bullet);
      this._lastFireTime = Date.now();
    }
  };

  Ship.prototype.draw = function (ctx) {
    Asteroids.MovingObject.prototype.draw.call(this, ctx);
    ctx.fillStyle = '#000000';
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(
      this.position.x + Math.cos(this._angle) * this.radius,
      this.position.y + Math.sin(this._angle) * this.radius
    );
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();

  };

  Asteroids.Ship = Ship;
})(this);
