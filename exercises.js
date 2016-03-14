//////////////////////////////////////////////////
// Sum with any number of args

function sum() {
  var args = Array.prototype.slice.call(arguments);
  return args.reduce(function (acc, value) {
    return acc + value;
  }, 0);
}

//////////////////////////////////////////////////
// Bind with args

Function.prototype.myBind = function () {
  var args = Array.prototype.slice.call(arguments);
  var obj = args.shift();
  var fn = this;
  return function () {
    var innerArgs = Array.prototype.slice.call(arguments);
    fn.apply(obj, args.concat(innerArgs));
  };
};


//////////////////////////////////////////////////
// function Curry and CurriedSum

Function.prototype.curry = function (numArgs) {
  var banked = [];
  var fn = this;
  var innerCurry = function (el) {
    banked.push(el);
    if (numArgs === banked.length) {
      return fn.apply(fn, banked);
    } else {
      return innerCurry;
    }
  };
  return innerCurry;
};


//////////////////////////////////////////////////
// Surrogate Inheritance
Function.prototype.inherit = function (klass) {
  function Surrogate() {}
  Surrogate.prototype = klass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

function MovingObject() {}
MovingObject.prototype.moves = true;

function Asteroid() {}
Asteroid.inherit(MovingObject);
var asteroid = new Asteroid();
console.log(asteroid.moves);

function Ship() {}
Ship.inherit(MovingObject);
Ship.prototype.moves = false;
var ship = new Ship();
console.log(ship.moves);

console.log(asteroid.moves);
