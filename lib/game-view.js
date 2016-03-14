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

  };


  Asteroids.GameView = GameView;
})(this);
