(function (root) {
  var Asteroids = root.Asteroids = root.Asteroids || {};

  function GameView(game, ctx) {
    this._game = game;
    this._ctx = ctx;
  }

  GameView.prototype.start = function () {
    var that = this;

    var animation = function () {
      that._game.addAsteroids();
      that._game.step();
      that._game.draw(that._ctx);

      root.requestAnimationFrame(animation);
    };

    animation();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this._game.ship;
    key('w, up', function() {
      ship.power.call(ship, 0.2);
    });
    key('a, left', function() {
      ship.turn.call(ship, -1);
    });
    key('d, right', function() {
      ship.turn.call(ship, 1);
    });
    key('space, tab', ship.fireBullet.bind(ship));
  };


  Asteroids.GameView = GameView;
})(this);
