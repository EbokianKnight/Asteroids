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
      event.preventDefault();
      var keyCode = event.keyCode;
      if (keyCode === KEYCODES.w || keyCode === KEYCODES.up) {
        that._keysDown.up = true;
      }
      if (keyCode === KEYCODES.a || keyCode === KEYCODES.left) {
        that._keysDown.left = true;
      }
      if (keyCode === KEYCODES.d || keyCode === KEYCODES.right) {
        that._keysDown.right = true;
      }
      if (keyCode === KEYCODES.space || keyCode === KEYCODES.tab) {
        that._keysDown.fire = true;
      }
    });

    root.addEventListener("keyup", function(event) {
      event.preventDefault();
      var keyCode = event.keyCode;
      if (keyCode === KEYCODES.w || keyCode === KEYCODES.up) {
        that._keysDown.up = false;
      }
      if (keyCode === KEYCODES.a || keyCode === KEYCODES.left) {
        that._keysDown.left = false;
      }
      if (keyCode === KEYCODES.d || keyCode === KEYCODES.right) {
        that._keysDown.right = false;
      }
      if (keyCode === KEYCODES.space || keyCode === KEYCODES.tab) {
        that._keysDown.fire = false;
      }
    });


  };


  Asteroids.GameView = GameView;
})(this);
