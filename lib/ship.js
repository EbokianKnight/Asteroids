(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  function Ship(position) {
    Asteroids.MovingObject.call(this, {
      position: { x: position.x, y: position.y },
      velocity: { x: 0, y: 0 },
      color: '#000000',
      radius: 12
    });
    this._initialPosition = position;
    this._angle = 0;
  }
  Asteroids.Util.inherit(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.position.x = this._initialPosition.x;
    this.position.y = this._initialPosition.y;
    this.velocity.x = 0;
    this.velocity.y = 0;
  };

  Ship.prototype.power = function (impulse) {
    
  };

  Asteroids.Ship = Ship;
})(this);
