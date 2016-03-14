(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

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
  }
  Asteroids.Util.inherit(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.position.x = this._initialPosition.x;
    this.position.y = this._initialPosition.y;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this._angle = 0;
  };

  Ship.prototype.power = function (impulse) {
    this.velocity.x += impulse * Math.cos(this._angle);
    this.velocity.y += impulse * Math.sin(this._angle);
  };

  Ship.prototype.turn = function (dir) {
    this._angle += (Math.PI * 2 / 20) * dir;
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new Asteroids.Bullet(this.position, this._angle);
    this._addObjectCallback(bullet);
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
