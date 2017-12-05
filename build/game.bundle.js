/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Character = function (_Phaser$Sprite) {
				_inherits(Character, _Phaser$Sprite);

				function Character(game, x, y, asset, frame) {
								_classCallCheck(this, Character);

								var _this = _possibleConstructorReturn(this, (Character.__proto__ || Object.getPrototypeOf(Character)).call(this, game, x, y, asset, frame));

								_this.game = game;

								_this.anchor.setTo(0.5);

								_this.game.physics.arcade.enable(_this);
								_this.body.setSize(32, 64, 0, 0); //Trim the collision box
								//this.body.x +=;

								_this.enableBody = true;
								return _this;
				}

				return Character;
}(Phaser.Sprite);

exports.default = Character;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.getFloorButton = exports.getFloor = exports.getCloserOne = exports.isToLeftOf = exports.isInElevator = undefined;

var _character = __webpack_require__(0);

var _character2 = _interopRequireDefault(_character);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isInElevator = exports.isInElevator = function isInElevator(character) {
   return 570 < character.x && character.x < 640;
};

var isToLeftOf = exports.isToLeftOf = function isToLeftOf(sprite1, sprite2) {
   return sprite1.x < sprite2.x;
};

/**
Compare x-codrinates of comp1 and comp2
and return the one closer to the sprite
*/

var getCloserOne = exports.getCloserOne = function getCloserOne(sprite, comp1, comp2) {
   var comp1Dist = Math.abs(comp1.x - sprite.x);
   var comp2Dist = Math.abs(comp2.x - sprite.x);

   if (comp1Dist < comp2Dist) {
      return comp1;
   } else {
      return comp2;
   }
};

var getFloor = exports.getFloor = function getFloor(sprite) {
   if (191 <= sprite.y && sprite.y <= 192) {
      return 4;
   } else if (351 <= sprite.y && sprite.y <= 352) {
      return 3;
   } else if (511 <= sprite.y && sprite.y <= 512) {
      return 2;
   } else if (671 <= sprite.y && sprite.y <= 672) {
      return 1;
   }
   return 2;
};

var getFloorButton = exports.getFloorButton = function getFloorButton(group, floor, guard) {
   var button1 = null;
   var button2 = null;
   console.log(guard.y);

   group.forEach(function (button) {
      if (+button.floor === floor) {
         console.log('Found button on floor ' + floor);
         if (button1 === null) {
            button1 = button;
         } else {
            button2 = button;
         }
      }
   }, undefined);

   return getCloserOne(guard, button1, button2);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var findObjectsFromLayer = exports.findObjectsFromLayer = function findObjectsFromLayer(type, map, layer) {
    //    Debug.log("finding new stuff");
    var result = new Array();
    var layers = map.objects[layer];
    map.objects[layer].forEach(function (element) {
        if (element.type === type) {
            console.log(element.x, element.y);
            element.y += map.tileHeight;
            result.push(element);
        }
    });
    return result;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _states = __webpack_require__(4);

var states = _interopRequireWildcard(_states);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var GAME = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);

Object.keys(states).forEach(function (state) {
  return GAME.state.add(state, states[state]);
});

GAME.state.start('Preload');

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preload = __webpack_require__(5);

Object.defineProperty(exports, 'Preload', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_preload).default;
  }
});

var _play = __webpack_require__(6);

Object.defineProperty(exports, 'Play', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_play).default;
  }
});

var _title = __webpack_require__(11);

Object.defineProperty(exports, 'Title', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_title).default;
  }
});

var _gameOver = __webpack_require__(12);

Object.defineProperty(exports, 'GameOver', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_gameOver).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
			value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preload = function (_Phaser$State) {
			_inherits(Preload, _Phaser$State);

			function Preload() {
						_classCallCheck(this, Preload);

						return _possibleConstructorReturn(this, (Preload.__proto__ || Object.getPrototypeOf(Preload)).apply(this, arguments));
			}

			_createClass(Preload, [{
						key: 'preload',
						value: function preload() {

									this.load.image('elevatorButton', 'img/elevatorButton.png');
									this.load.image('elevatorCeiling', 'img/elevatorCeiling.png');
									this.load.image('elevatorFloor', 'img/elevatorFloor.png');

									this.load.tilemap('house', 'tilemaps/house.json', null, Phaser.Tilemap.TILED_JSON);
									this.load.image('houseTiles', 'img/tiles/houseTiles.png');

									this.load.image('table', 'img/table.png');
									this.load.image('tableStolen', 'img/tableStolen.png');

									this.load.image('title', 'img/title.png');
									this.load.image('gameOver', 'img/gameOver.png');

									this.load.image('painting', 'img/painting.png');
									this.load.image('paintingStolen', 'img/paintingStolen.png');
									this.load.image('door', 'img/door.png');

									this.load.atlasJSONArray('player', 'img/playerSprites.png', 'img/playerSprites.json');
									this.load.atlasJSONArray('guard', 'img/guardSprites.png', 'img/guardSprites.json');

									this.load.audio('bgMusic', 'audio/bgMusic.wav');
						}
			}, {
						key: 'create',
						value: function create() {
									this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

									this.state.start('Title');
						}
			}]);

			return Preload;
}(Phaser.State);

exports.default = Preload;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(7);

var _player2 = _interopRequireDefault(_player);

var _guard = __webpack_require__(8);

var _guard2 = _interopRequireDefault(_guard);

var _elevatorButton = __webpack_require__(9);

var _elevatorButton2 = _interopRequireDefault(_elevatorButton);

var _elevator = __webpack_require__(10);

var _elevator2 = _interopRequireDefault(_elevator);

var _tilemap = __webpack_require__(2);

var tilemap = _interopRequireWildcard(_tilemap);

var _gameManager = __webpack_require__(1);

var gameManager = _interopRequireWildcard(_gameManager);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bgMusic = void 0;

var wallLayer = void 0;
var elevatorPitFloorLayer = void 0;
var scoreText = void 0;
var moveSpeed = 250;

var Play = function (_Phaser$State) {
	_inherits(Play, _Phaser$State);

	function Play() {
		_classCallCheck(this, Play);

		return _possibleConstructorReturn(this, (Play.__proto__ || Object.getPrototypeOf(Play)).apply(this, arguments));
	}

	_createClass(Play, [{
		key: 'create',
		value: function create() {

			scoreText = this.game.add.text(10, 10);

			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			this.game.sound.stopAll();

			this.game.stage.backgroundColor = '#787878';

			this.game.physics.arcade.gravity.y = 550;

			var map = this.add.tilemap('house');
			map.addTilesetImage('houseTiles');

			wallLayer = map.createLayer('floorAndWalls');
			wallLayer.resizeWorld();

			elevatorPitFloorLayer = map.createLayer('elevatorPitFloor');

			bgMusic = this.game.add.audio('bgMusic');
			bgMusic.loopFull();

			map.setCollision([68, 128, 188, 248], true, wallLayer);
			map.setCollisionBetween(181, 185, true, wallLayer);

			map.setCollision([68, 128, 188, 248], true, elevatorPitFloorLayer);
			map.setCollisionBetween(181, 185, true, elevatorPitFloorLayer);

			this.characters = this.game.add.group();

			this.lootables = this.game.add.group();

			this.guards = this.game.add.group();
			this.createLootables(map, this.lootables);

			var playerSpawn = tilemap.findObjectsFromLayer('Player', map, 'Player');

			this.player = new _player2.default({
				game: this.game,
				x: playerSpawn[0].x,
				y: playerSpawn[0].y,
				asset: 'player',
				frame: 1 });

			this.characters.add(this.player);

			var elevatorButtons = tilemap.findObjectsFromLayer('elevatorButton', map, 'elevatorButtons');
			this.buttons = this.game.add.group();
			this.buttons.enableBody = true;
			for (var i = 0; i < elevatorButtons.length; i++) {
				var button = elevatorButtons[i];
				var newButton = new _elevatorButton2.default({
					game: this.game,
					x: button.x,
					y: button.y,
					asset: 'elevatorButton',
					floor: button.properties['floor'] });
				this.buttons.add(newButton);
				newButton.body.allowGravity = false;
			}

			var doorSpawns = tilemap.findObjectsFromLayer('door', map, 'doors');
			this.doors = this.game.add.group();
			this.doors.enableBody = true;

			for (var _i = 0; _i < doorSpawns.length; _i++) {
				var door = doorSpawns[_i];
				var newDoor = new Phaser.Sprite(this.game, door.x, door.y, 'door');
				this.doors.add(newDoor);
				newDoor.body.allowGravity = false;
			}

			this.elevator = new _elevator2.default({
				game: this.game,
				floor: 1,
				map: map });

			var guardSpawn = tilemap.findObjectsFromLayer('guard', map, 'guard');

			this.guards.add(new _guard2.default({
				game: this.game,
				x: guardSpawn[0].x,
				y: guardSpawn[0].y,
				asset: 'guard',
				frame: 1,
				elevator: this.elevator,
				elevatorButtons: this.buttons }));

			this.game.world.bringToTop(this.characters);
			this.game.world.bringToTop(this.guards);
			this.facingLeft = false;

			this.cursors = this.game.input.keyboard.createCursorKeys();
			this.interactKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			this.spacebardown = false;
		}
	}, {
		key: 'update',
		value: function update() {
			var _this2 = this;

			scoreText.text = "Score: " + this.player.lootAmount;

			//this.game.debug.body(this.guards.hash[0]);
			this.game.debug.body(this.player);

			this.game.physics.arcade.collide(this.player, wallLayer);
			this.game.physics.arcade.collide(this.player, this.elevator);

			if (this.game.physics.arcade.overlap(this.guards, this.player) && this.player.visible) {
				this.state.start('GameOver');
			}

			if (this.elevator.currentFloor !== 1) {
				this.game.physics.arcade.collide(this.player, elevatorPitFloorLayer);
			}

			this.game.physics.arcade.collide(this.guards, this.elevator);

			this.game.physics.arcade.overlap(this.player, this.lootables, this.loot, null, this);

			this.guards.forEach(function (guard) {
				if (guard.task == guard.patrolFloorRight) {
					_this2.game.physics.arcade.collide(guard, elevatorPitFloorLayer);
				}
				if (guard.task != guard.waitInElevator) {
					_this2.game.physics.arcade.collide(_this2.guards, wallLayer);
				}
				guard.body.velocity.x = 0;
				guard.update();
			}, this);

			if (this.interactKey.isDown && !this.spacebardown) {
				this.spacebardown = true;
				this.game.physics.arcade.overlap(this.buttons, this.player, this.callElevator, null, this);

				if (!this.player.visible) {
					this.player.visible = true;

					this.characters.add(this.player);
				} else {
					this.game.physics.arcade.overlap(this.doors, this.player, this.hideInCloset, null, this);
				}
			} else if (!this.interactKey.isDown) {
				this.spacebardown = false;
			}

			if (this.elevatorUp) {

				this.elevator.y -= 0.1;
			}

			this.player.body.velocity.x = 0;

			var elevatorFloor = this.elevator.currentFloor();
			if (gameManager.isInElevator(this.player) && elevatorFloor > 0) {
				if (this.cursors.down.isDown && this.elevator.floor > 1) {
					this.elevator.call(this.elevator.floor - 1);
				}

				if (this.cursors.up.isDown && this.elevator.floor < 4) {
					this.elevator.call(this.elevator.floor + 1);
				}
			}

			if (this.cursors.left.isDown && this.player.visible) {
				this.player.body.velocity.x = (moveSpeed - this.player.lootAmount / 2) * -1;
				if (!this.facingLeft) {
					this.player.scale.x *= -1;
					this.facingLeft = true;
				}
			}

			if (this.cursors.right.isDown && this.player.visible) {
				this.player.body.velocity.x = moveSpeed - this.player.lootAmount;
				if (this.facingLeft) {
					this.player.scale.x *= -1;
					this.facingLeft = false;
				}
			}

			if (this.player.body.velocity.x != 0) {
				this.player.animations.play('walk');
			} else {
				this.player.animations.play('idle');
			};
		}
	}, {
		key: 'render',
		value: function render() {
			//this.game.debug.bodyInfo(this.guards.hash[0], 16, 24);
		}
	}, {
		key: 'createLootables',
		value: function createLootables(map, group) {
			var lootables = tilemap.findObjectsFromLayer('lootable', map, 'loot');
			group.enableBody = true;

			for (var i = 0; i < lootables.length; i++) {
				var lootable = lootables[i];
				var newLootable = new Phaser.Sprite(this.game, lootable.x, lootable.y, lootable.name);
				newLootable.name = lootable.name;
				newLootable.enableBody = true;
				newLootable.stolen = false;
				group.add(newLootable);
				newLootable.body.allowGravity = false;
			}
		}
	}, {
		key: 'callElevator',
		value: function callElevator(player, button) {
			this.elevator.call(button.floor);
		}
	}, {
		key: 'hideInCloset',
		value: function hideInCloset(player, door) {
			this.characters.remove(this.player);
			this.player.visible = false;
		}
	}, {
		key: 'loot',
		value: function loot(player, lootable) {
			if (!lootable.stolen) {
				lootable.loadTexture(lootable.name + 'Stolen');
				lootable.stolen = true;
				this.player.lootAmount += 30;
			}
		}
	}]);

	return Play;
}(Phaser.State);

exports.default = Play;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _character = __webpack_require__(0);

var _character2 = _interopRequireDefault(_character);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_Character) {
				_inherits(Player, _Character);

				function Player(_ref) {
								var game = _ref.game,
								    x = _ref.x,
								    y = _ref.y,
								    asset = _ref.asset,
								    frame = _ref.frame;

								_classCallCheck(this, Player);

								var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, x, y, asset, frame));

								_this.lootAmount = 0;
								_this.visible = true;
								_this.animations.add('walk', ['walk001.png', 'walk002.png', 'walk003.png', 'walk004.png', 'walk005.png'], 15);
								_this.animations.add('idle', ['idle001.png', 'idle002.png', 'idle003.png', 'idle004.png', 'idle005.png', 'idle006.png'], 10);

								return _this;
				}

				return Player;
}(_character2.default);

exports.default = Player;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
			value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _character = __webpack_require__(0);

var _character2 = _interopRequireDefault(_character);

var _gameManager = __webpack_require__(1);

var gameManager = _interopRequireWildcard(_gameManager);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var patrolTargetLeft = 170;
var patrolTargetRight = 1088;

var Guard = function (_Character) {
			_inherits(Guard, _Character);

			function Guard(_ref) {
						var game = _ref.game,
						    x = _ref.x,
						    y = _ref.y,
						    asset = _ref.asset,
						    frame = _ref.frame,
						    elevator = _ref.elevator,
						    elevatorButtons = _ref.elevatorButtons;

						_classCallCheck(this, Guard);

						var _this = _possibleConstructorReturn(this, (Guard.__proto__ || Object.getPrototypeOf(Guard)).call(this, game, x, y, asset, frame));

						_this.animations.add('walk', ['guardW001.png', 'guardW002.png', 'guardW003.png', 'guardW004.png', 'guardW005.png'], 15);
						_this.animations.add('idle', ['guardI001.png', 'guardI002.png', 'guardI003.png', 'guardI004.png', 'guardI005.png', 'guardI006.png'], 10);
						_this.facingLeft;

						_this.elevator = elevator;
						_this.elevatorButtons = elevatorButtons;

						_this.targetFloor = 2;
						_this.patrolUp = false;

						_this.task = _this.goAndPressButton;

						_this.enableBody = true;
						return _this;
			}

			_createClass(Guard, [{
						key: 'update',
						value: function update() {
									this.task();

									if (this.body.velocity.x != 0) {
												this.animations.play('walk');
									} else {
												this.animations.play('idle');
									};
						}
			}, {
						key: 'moveLeft',
						value: function moveLeft() {
									this.body.velocity.x = -150;
									if (this.alarmed) {
												this.body.velocity.x -= 100;
									}

									if (!this.facingLeft) {
												this.scale.x *= -1;
												this.facingLeft = true;
									}
						}
			}, {
						key: 'moveRight',
						value: function moveRight() {
									this.body.velocity.x = 150;
									if (this.alarmed) {
												this.body.velocity.x += 100;
									}

									if (this.facingLeft) {
												this.scale.x *= -1;
												this.facingLeft = false;
									}
						}
			}, {
						key: 'goAndPressButton',
						value: function goAndPressButton() {
									var floor = gameManager.getFloor(this);
									console.log(floor);
									var floorButton = gameManager.getFloorButton(this.elevatorButtons, floor, this);
									if (this.x > floorButton.x + 5) {
												this.moveLeft();
									} else if (this.x < floorButton.x - 5) {
												this.moveRight();
									} else {
												if (this.elevator.currentFloor != floor) {
															this.elevator.call(floor);
												}

												this.task = this.waitForElevator;
									}
						}
			}, {
						key: 'waitForElevator',
						value: function waitForElevator() {
									if (gameManager.getFloor(this) == this.elevator.currentFloor()) {
												this.task = this.getToElevator;
									}
						}
			}, {
						key: 'getToElevator',
						value: function getToElevator() {
									if (this.x < 600) {
												this.moveRight();
									} else if (this.x > 605) {
												this.moveLeft();
									} else {
												console.log('in elevator');
												this.elevator.call(this.targetFloor);
												this.task = this.waitInElevator;
									}
						}
			}, {
						key: 'waitInElevator',
						value: function waitInElevator() {
									console.log('waiting in elevator');
									if (this.elevator.currentFloor() == this.targetFloor) {
												this.task = this.patrolFloorLeft;
									}
						}
			}, {
						key: 'patrolFloorLeft',
						value: function patrolFloorLeft() {
									console.log('patrol to the left');
									if (this.x > patrolTargetLeft) {
												this.moveLeft();
									} else {
												this.task = this.patrolFloorRight;
									}
						}
			}, {
						key: 'patrolFloorRight',
						value: function patrolFloorRight() {
									if (this.x < patrolTargetRight) {
												this.moveRight();
									} else {
												var floor = gameManager.getFloor(this);
												if (this.moveUp) {
															if (floor === 4) {
																		this.moveUp = false;
																		this.targetFloor = 3;
															} else {
																		this.targetFloor++;
															}
												} else {
															if (floor === 1) {
																		this.moveUp = true;
																		this.targetFloor = 2;
															} else {
																		this.targetFloor--;
															}
												}
												this.task = this.goAndPressButton;
									}
						}
			}]);

			return Guard;
}(_character2.default);

exports.default = Guard;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElevatorButton = function (_Phaser$Sprite) {
				_inherits(ElevatorButton, _Phaser$Sprite);

				function ElevatorButton(_ref) {
								var game = _ref.game,
								    x = _ref.x,
								    y = _ref.y,
								    asset = _ref.asset,
								    floor = _ref.floor;

								_classCallCheck(this, ElevatorButton);

								var _this = _possibleConstructorReturn(this, (ElevatorButton.__proto__ || Object.getPrototypeOf(ElevatorButton)).call(this, game, x, y, asset));

								_this.anchor.setTo(0.5);
								_this.floor = floor;
								_this.enableBody = true;

								return _this;
				}

				return ElevatorButton;
}(Phaser.Sprite);

exports.default = ElevatorButton;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
			value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tilemap = __webpack_require__(2);

var tilemap = _interopRequireWildcard(_tilemap);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var floor1 = 173;
var floor2 = 333;
var floor3 = 493;
var floor4 = 653;

var Elevator = function (_Phaser$Group) {
			_inherits(Elevator, _Phaser$Group);

			function Elevator(_ref) {
						var game = _ref.game,
						    floor = _ref.floor,
						    map = _ref.map;

						_classCallCheck(this, Elevator);

						var _this = _possibleConstructorReturn(this, (Elevator.__proto__ || Object.getPrototypeOf(Elevator)).call(this, game));

						_this.game = game;

						_this.worldY = floor1; //This is super dirty, find out a better way!
						var elevatorCeiling = tilemap.findObjectsFromLayer('ceiling', map, 'Elevator')[0];
						var elevatorFloor = tilemap.findObjectsFromLayer('floor', map, 'Elevator')[0];

						var ecSprite = new Phaser.Sprite(_this.game, elevatorCeiling.x, elevatorCeiling.y, 'elevatorCeiling');
						var efSprite = new Phaser.Sprite(_this.game, elevatorFloor.x, elevatorFloor.y, 'elevatorFloor');

						//ecSprite.anchor.setTo(0, 0.5);
						//efSprite.anchor.setTo(0, 0.5);

						_this.game.physics.arcade.enable(ecSprite);
						_this.game.physics.arcade.enable(efSprite);
						ecSprite.enableBody = true;
						efSprite.enableBody = true;
						_this.enableBody = true;

						_this.add(ecSprite);
						_this.add(efSprite);

						ecSprite.body.allowGravity = false;
						efSprite.body.allowGravity = false;
						ecSprite.body.immovable = true;
						efSprite.body.immovable = true;

						_this.moving = false;

						_this.targetY = floor1;
						_this.floor = 1;
						return _this;
			}

			_createClass(Elevator, [{
						key: 'update',
						value: function update() {
									if (this.targetY < this.worldY) {
												this.y += 1.0;
												this.worldY -= 1.0;
									}

									if (this.targetY > this.worldY) {
												this.y -= 1.0;
												this.worldY += 1.0;
									}
						}
			}, {
						key: 'currentFloor',
						value: function currentFloor() {
									switch (this.worldY) {
												case floor1:
															return 1;
												case floor2:
															return 2;
												case floor3:
															return 3;
												case floor4:
															return 4;
												default:
															return -1;
									}
						}
			}, {
						key: 'call',
						value: function call(floor) {
									console.log(floor);
									switch (+floor) {
												case 1:
															console.log(floor);
															this.targetY = floor1;
															this.floor = +floor;
															break;
												case 2:
															console.log(floor);
															this.targetY = floor2;
															this.floor = +floor;
															break;
												case 3:
															console.log(floor);
															this.targetY = floor3;
															this.floor = +floor;
															break;
												case 4:
															console.log(floor);
															this.targetY = floor4;
															this.floor = +floor;
															break;
									}
						}
			}]);

			return Elevator;
}(Phaser.Group);

exports.default = Elevator;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
			value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Title = function (_Phaser$State) {
			_inherits(Title, _Phaser$State);

			function Title() {
						_classCallCheck(this, Title);

						return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).apply(this, arguments));
			}

			_createClass(Title, [{
						key: 'create',
						value: function create() {
									this.game.add.image(0, 0, 'title');

									this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
						}
			}, {
						key: 'update',
						value: function update() {
									if (this.spacebar.isDown) {
												this.state.start('Play');
									}
						}
			}]);

			return Title;
}(Phaser.State);

exports.default = Title;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameOver = function (_Phaser$State) {
    _inherits(GameOver, _Phaser$State);

    function GameOver() {
        _classCallCheck(this, GameOver);

        return _possibleConstructorReturn(this, (GameOver.__proto__ || Object.getPrototypeOf(GameOver)).apply(this, arguments));
    }

    _createClass(GameOver, [{
        key: 'create',
        value: function create() {
            this.game.add.image(0, 0, 'gameOver');

            this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.spacebar.isDown) {
                this.state.start('Play');
            }
        }
    }]);

    return GameOver;
}(Phaser.State);

exports.default = GameOver;

/***/ })
/******/ ]);
//# sourceMappingURL=game.bundle.js.map