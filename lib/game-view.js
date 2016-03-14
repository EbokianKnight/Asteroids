(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  function GameView(game, ctx) {
    this._game = game;
    this._ctx = ctx;
    this._keysDown = {};
  }

  var KEYCODES = {
    w: 87,
    up: 38,
    a: 65,
    left: 37,
    d: 68,
    right: 39,
    space: 32,
    tab: 9
  };

  // 87 / 38 UP
  // 65 / 37 left
  // 68 / 39 right

  GameView.prototype.start = function () {
    var that = this;

    var animation = function () {
      that._game.addAsteroids();
      that._game.step();
      that._game.draw(that._ctx);

      var ship = that._game.ship;
      if (that._keysDown.up) {
        ship.power.call(ship, 0.1);
      }
      if (that._keysDown.left) {
        ship.turn.call(ship, -1);
      }
      if (that._keysDown.right) {
        ship.turn.call(ship, 1);
      }
      if (that._keysDown.fire) {
        ship.fireBullet.call(ship);
      }

      root.requestAnimationFrame(animation);
    };

    animation();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var that = this;
    root.addEventListener("keydown", function(event) {
      var keyCode = event.keyCode;
      if (keyCode === KEYCODES.w || keyCode === KEYCODES.up) {
        that._keysDown.up = true;
        event.preventDefault();
      }
      if (keyCode === KEYCODES.a || keyCode === KEYCODES.left) {
        that._keysDown.left = true;
        event.preventDefault();
      }
      if (keyCode === KEYCODES.d || keyCode === KEYCODES.right) {
        that._keysDown.right = true;
        event.preventDefault();
      }
      if (keyCode === KEYCODES.space || keyCode === KEYCODES.tab) {
        that._keysDown.fire = true;
        event.preventDefault();
      }
    });

    root.addEventListener("keyup", function(event) {
      var keyCode = event.keyCode;
      if (keyCode === KEYCODES.w || keyCode === KEYCODES.up) {
        that._keysDown.up = false;
        event.preventDefault();
      }
      if (keyCode === KEYCODES.a || keyCode === KEYCODES.left) {
        that._keysDown.left = false;
        event.preventDefault();
      }
      if (keyCode === KEYCODES.d || keyCode === KEYCODES.right) {
        that._keysDown.right = false;
        event.preventDefault();
      }
      if (keyCode === KEYCODES.space || keyCode === KEYCODES.tab) {
        that._keysDown.fire = false
        event.preventDefault();
      }
    });


  };


  Asteroids.GameView = GameView;
})(this);
