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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/character.js":
/*!**************************!*\
  !*** ./src/character.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Character; });\n// alien image from https://opengameart.org/content/jumping-galaxy-asset-cc-by-30\nclass Character {\n  constructor(game) {\n    this.c = game.c;\n    this.x = game.gameWidth / 2;\n    this.vel = 0;\n    this.maxVel = 15;\n    this.height = 60;\n    this.width = 80;\n    this.lives = 3;\n    this.y = game.gameWidth - game.groundHeight - this.height;\n    this.color = \"blue\";\n    this.img = new Image();\n    this.game = game;\n  }\n\n  moveLeft() {\n    this.vel = -this.maxVel;\n  }\n\n  moveRight() {\n    this.vel = this.maxVel\n  }\n\n  stop() {\n    this.vel = 0;\n  }\n\n  draw() {\n    // this.c.fillStyle = this.color;\n    // this.c.fillRect(this.x,this.y,this.width,this.height);\n    this.img.src = \"alien.png\";\n    this.c.beginPath();\n    this.c.fillStyle = \"rgba(0,0,0,0)\";\n    this.c.rect(this.x,this.y,this.width,this.height);\n    this.c.closePath();\n    this.c.fillStyle = this.color;\n    this.c.drawImage(this.img, this.x, this.y, this.width, this.height);\n  }\n\n  update() {\n    this.x += this.vel;\n    if (this.x < 0) this.x = 0;\n    if (this.x + this.width > this.game.gameWidth) {\n      this.x = this.game.gameWidth - this.width\n    }\n    this.draw();\n  }\n\n}\n\n//# sourceURL=webpack:///./src/character.js?");

/***/ }),

/***/ "./src/collision.js":
/*!**************************!*\
  !*** ./src/collision.js ***!
  \**************************/
/*! exports provided: detectCollision */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"detectCollision\", function() { return detectCollision; });\nfunction detectCollision(star, character) {\n  let bottomStar = star.y + star.radius;\n  let characterTop = character.y;\n  let characterLeft = character.x;\n  let characterRight = character.x + character.width;\n\n  if (\n      bottomStar >= characterTop &&\n      star.x >= characterLeft &&\n      star.x + star.radius <= characterRight\n    ) {\n      character.lives -= 1\n      // console.log(character.lives)\n      return true\n    }\n};\n\n\n//# sourceURL=webpack:///./src/collision.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _star__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./star */ \"./src/star.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_util__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _character__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./character */ \"./src/character.js\");\n/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./input */ \"./src/input.js\");\n/* harmony import */ var _collision__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./collision */ \"./src/collision.js\");\n\n\n\n\n\n\nconst GAMESTATE = {\n  PAUSED: 0,\n  RUNNING: 1,\n  MENU: 2,\n  OVER: 3\n};\n\nclass Game {\n  constructor(gameWidth, gameHeight, c) {\n    this.gameWidth = gameWidth;\n    this.gameHeight = gameHeight;\n    this.groundHeight = 45;\n    this.stars = [];\n    this.miniStars = [];\n    this.backgroundStars = [];\n    this.c = c;\n    this.character = new _character__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this);\n    this.ticker = 0;\n    this.spawn = 100;\n    this.gameState = 2;\n  }\n\n  init() {\n    // create the background fixed stars\n    for (let i = 0; i < 150; i++) {\n      const x = Math.random() * this.gameWidth;\n      const y = Math.random() * this.gameHeight;\n      const radius = Math.random() * 3;\n      this.backgroundStars.push(new _star__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this, x, y, radius, \"white\"))\n    }\n    // draw the background of the game\n    const backgroundGradient = this.c.createLinearGradient(0, 0, 0, this.gameHeight);\n    backgroundGradient.addColorStop(0, '#171e26');\n    backgroundGradient.addColorStop(1, '#3f586b');\n    this.c.fillStyle = backgroundGradient;\n    this.c.fillRect(0, 0, this.gameWidth, this.gameHeight) \n\n    this.backgroundStars.forEach(star => {\n      star.draw();\n    });\n\n    this.createMountainRange(1, this.gameHeight - 350, '#384551')\n    this.createMountainRange(2, this.gameHeight - 500, '#2B3843')\n    this.createMountainRange(3, this.gameHeight - 550, '#26333E')\n\n    // create a ground floor for character\n    this.c.fillStyle = \"#182028\";\n    this.c.fillRect(0, this.gameHeight - this.groundHeight, this.gameWidth, this.groundHeight);\n\n\n    // create the character\n    this.character.draw();\n  };\n\n  createMountainRange(mtnAmount, height, color) {\n    for (let i = 0; i < mtnAmount; i++) {\n      const mountainWidth = this.gameWidth / mtnAmount;\n      this.c.beginPath();\n      this.c.moveTo(i* mountainWidth, this.gameHeight);\n      this.c.lineTo(i * mountainWidth + mountainWidth + 475, this.gameHeight);\n      this.c.lineTo(i * mountainWidth + mountainWidth / 2, this.gameHeight - height);\n      this.c.lineTo(i * mountainWidth - 575, this.gameHeight);\n      this.c.fillStyle = color;\n      this.c.fill();\n      this.c.closePath();\n    }\n  }\n\n  animate() {\n    if (this.gameState === GAMESTATE.PAUSED) {return};\n    this.gameState = GAMESTATE.RUNNING;\n    const backgroundGradient = this.c.createLinearGradient(0, 0, 0, this.gameHeight);\n    backgroundGradient.addColorStop(0, '#171e26');\n    backgroundGradient.addColorStop(1, '#3f586b');\n    this.c.fillStyle = backgroundGradient;\n    this.c.fillRect(0,0, this.gameWidth, this.gameHeight) \n\n    // initially draw the background stars \n    this.backgroundStars.forEach(star => {\n      star.draw();\n    });\n    \n\n    // create 3 mountain ranges \n    this.createMountainRange(1, this.gameHeight - 350, '#384551')\n    this.createMountainRange(2, this.gameHeight - 500, '#2B3843')\n    this.createMountainRange(3, this.gameHeight - 550, '#26333E')\n    // create a ground floor \n    this.c.fillStyle = \"#182028\";\n    this.c.fillRect(0, this.gameHeight - this.groundHeight, this.gameWidth, this.groundHeight);\n\n    // continue to update the stars that will fall\n    this.stars.forEach((star, index) => {\n      star.update();\n      if (Object(_collision__WEBPACK_IMPORTED_MODULE_4__[\"detectCollision\"])(star, this.character)) {\n        this.stars.splice(index,1);\n      };\n      if (star.radius <= 0) {\n        star.shatter();\n        this.stars.splice(index, 1);\n      };\n      // destroy stars that go off screen\n      if (star.x <= 0 || star.x + star.radius >= this.gameWidth) {\n        star.shatter();\n        this.stars.splice(index,1);\n      };\n    });\n\n    // update the mini stars that appear on star shattering\n    this.miniStars.forEach((mini, index) => {\n      mini.update();\n      if (mini.ttl === 0) {\n        this.miniStars.splice(index, 1);\n      }\n    });\n\n    this.ticker ++\n    // randomize when a new star is spawned and falls from the sky\n    if (this.ticker % this.spawn == 0) {\n      const radius = 20;\n      // make sure always generating star in range of canvas width\n      const x = Math.max(radius, Math.random() * this.gameWidth - radius);\n      this.stars.push(new _star__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this, x, -100, 20, '#E3EAEF'))\n      this.spawn = _util__WEBPACK_IMPORTED_MODULE_1___default.a.randomIntFromRange(50,300);\n    }\n\n    // place a display of lives remaining\n    this.c.textAlign = \"end\";\n    // this.c.font = \"18px Bangers\";\n    this.c.textAlign = \"end\";\n    this.c.fillStyle = \"#cccccc\";\n    this.c.fillText(`Lives Remaining:  ${this.character.lives}`, 685, 25);\n\n    this.character.update();\n    this.gameOver();\n    new _input__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this);\n  };\n\n  togglePause() {\n    let pauseWindow = document.getElementById(\"paused\");\n    if (this.gameState === GAMESTATE.PAUSED) {\n      this.gameState = GAMESTATE.RUNNING;\n      pauseWindow.style.display = \"none\";\n    } else {\n      this.gameState = GAMESTATE.PAUSED;\n      pauseWindow.style.display = \"flex\";\n    }\n  }\n\n  gameOver() {\n    let startText = document.getElementById(\"start\");\n    let gameOver = document.getElementById(\"over\");\n    if (this.character.lives === 0) {\n      this.gameState = GAMESTATE.PAUSED;\n      gameOver.style.display = \"flex\";\n      startText.style.display = \"none\";\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function() {\n  const canvas = document.getElementById(\"game-canvas\");\n  const c = canvas.getContext(\"2d\");\n  const GAME_WIDTH = 700;\n  const GAME_HEIGHT = 700;\n  const GAMESTATE = {\n    PAUSED: 0,\n    RUNNING: 1,\n    MENU: 2,\n    OVER: 3\n  };\n  let game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](GAME_WIDTH, GAME_HEIGHT, c);\n  game.init();\n  let lastTime = 0;\n  \n\n  document.addEventListener(\"keydown\", event => {\n    switch(event.keyCode) {\n      case 13:\n        if (game.gameState === GAMESTATE.RUNNING) break;\n        start();\n        break;\n    }\n  })\n\n  function gameLoop(timeStamp) {\n    let deltaTime = timeStamp - lastTime;\n    lastTime = timeStamp;\n    c.clearRect(0,0,GAME_WIDTH, GAME_HEIGHT);\n    game.animate();\n    requestAnimationFrame(gameLoop);\n  } \n\n  function start() {\n    requestAnimationFrame(gameLoop);\n  }\n})\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/input.js":
/*!**********************!*\
  !*** ./src/input.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return InputHandler; });\nclass InputHandler {\n  constructor(game) {\n    document.addEventListener(\"keydown\", event => {\n      switch(event.keyCode) {\n        case 37:\n          game.character.moveLeft();\n          break;\n        case 39:\n          game.character.moveRight();\n          break;\n        case 16:\n          game.togglePause();\n          break;\n      }\n    });\n\n    document.addEventListener(\"keyup\", event => {\n      switch(event.keyCode) {\n        case 37:\n          game.character.stop();\n          break;\n        case 39:\n          game.character.stop()\n          break;\n      }\n    });\n  }\n}\n\n//# sourceURL=webpack:///./src/input.js?");

/***/ }),

/***/ "./src/ministar.js":
/*!*************************!*\
  !*** ./src/ministar.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Ministar; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_util__WEBPACK_IMPORTED_MODULE_0__);\n\nclass Ministar {\n  constructor(c, x, y, radius, game) {\n    // Star.call(this, x,y,radius)\n    this.vel = {\n      x: _util__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(-5,5),\n      y: _util__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(-12,12)\n    };\n    this.x = x;\n    this.y = y;\n    this.radius = radius;\n    this.friction = 0.8;\n    this.gravity = 0.2;\n    this.ttl = 100;\n    this.opacity = 1;\n    this.c = c;\n    this.game = game;\n  }\n\n  draw() {\n    this.c.save();\n    this.c.beginPath();\n    this.c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);\n    this.c.fillStyle = `rgba(227, 234, 239, ${this.opacity})`\n    this.c.shadowColor = '#E3EAEF';\n    this.c.shadowBlur = 20;\n    this.c.fill();\n    this.c.closePath();\n    this.c.restore();\n  }\n\n  update() {\n    this.draw();\n    if (this.y + this.radius + this.vel.y > this.game.gameHeight) {\n      this.vel.y = -this.vel.y * this.friction;\n    } else {\n      this.vel.y += this.gravity;\n    }\n    this.y += this.vel.y;\n    this.x += this.vel.x;\n    this.ttl -= 1;\n    this.opacity -= 1 / this.ttl;\n  }\n}\n\n//# sourceURL=webpack:///./src/ministar.js?");

/***/ }),

/***/ "./src/star.js":
/*!*********************!*\
  !*** ./src/star.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Star; });\n/* harmony import */ var _ministar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ministar */ \"./src/ministar.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_util__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _collision__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collision */ \"./src/collision.js\");\n\n\n\nclass Star {\n  constructor(game, x, y, radius, color){\n    this.game = game;\n    this.x = x;\n    this.y = y;\n    this.radius = radius;\n    this.color = color;\n    this.c = game.c;\n    this.vel = {\n      x: _util__WEBPACK_IMPORTED_MODULE_1___default.a.randomIntFromRange(-6,6),\n      y: 5\n    }\n    this.friction = 0.7;\n    this.shadowBlur = 30;\n    this.gravity = 1;\n    this.gameWidth = game.gameWidth;\n    this.gameHeight = game.gameHeight;\n  }\n\n  draw() {\n    this.c.save();\n    this.c.beginPath();\n    this.c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);\n    this.c.fillStyle = this.color;\n    this.c.shadowColor = '#E3EAEF';\n    this.c.shadowBlur = this.shadowBlur;\n    this.c.fill();\n    this.c.closePath;\n    this.c.restore();\n  }\n\n  update() {\n    this.draw();\n    // hit bottom of screen flip velocity\n    if (this.y + this.radius + this.vel.y >= this.gameHeight - this.game.groundHeight) {\n      this.vel.y = - this.vel.y  * this.friction;\n      this.shatter();\n    } else { \n      this.vel.y += this.gravity;\n    }\n    this.x += this.vel.x;\n    this.y += this.vel.y;\n  }\n\n  shatter() {\n    this.radius -= 3;\n    this.shadowBlur = this.shadowBlur / 2;\n    for (let i = 0; i < 8; i++) {\n      this.game.miniStars.push(new _ministar__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.c, this.x, this.y, 2, this.game))\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/star.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function randomIntFromRange(min, max) {\n  return Math.floor(Math.random() * (max - min + 1) + min)\n}\n\nfunction randomColor(colors) {\n  return colors[Math.floor(Math.random() * colors.length)]\n}\n\nfunction distance(x1, y1, x2, y2) {\n  const xDist = x2 - x1\n  const yDist = y2 - y1\n\n  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))\n}\n\nmodule.exports = { randomIntFromRange, randomColor, distance }\n\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });