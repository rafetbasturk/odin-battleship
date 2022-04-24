/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/dom.js":
/*!*******************************!*\
  !*** ./src/components/dom.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domElements": () => (/* binding */ domElements)
/* harmony export */ });
var domElements = function () {
  //header
  var header = document.createElement("header");
  header.classList.add("header");
  var h1 = document.createElement("h1");
  h1.classList.add("logo");
  h1.textContent = "Battleship";
  header.appendChild(h1);
  var notifications = document.createElement("div");
  notifications.classList.add("notifications");
  header.appendChild(notifications);
  var message = document.createElement("p");
  message.classList.add("message");
  message.textContent = "Place the ships by dragging, change alignment by clicking";
  notifications.appendChild(message); //main

  var main = document.createElement("main");
  main.classList.add("main");

  var playerBoard = function playerBoard(name) {
    var board = document.createElement("section");
    board.classList.add("".concat(name, "-area"));
    var heading = document.createElement("h2");
    heading.textContent = "".concat(name === "computer" ? "Computer Board" : "Player Board");
    var xCoords = document.createElement("div");
    xCoords.classList.add("x-coords");
    var xCoordLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    xCoordLabels.forEach(function (item) {
      var xName = document.createElement("span");
      xName.textContent = item;
      xCoords.appendChild(xName);
    });
    var yCoords = document.createElement("div");
    yCoords.classList.add("y-coords");
    var yCoordLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    yCoordLabels.forEach(function (item) {
      var yName = document.createElement("span");
      yName.textContent = item;
      yCoords.appendChild(yName);
    });
    board.appendChild(xCoords);
    board.appendChild(yCoords);
    board.appendChild(heading);
    return board;
  };

  main.appendChild(playerBoard("player"));
  main.appendChild(playerBoard("computer")); // form

  var form = document.createElement("form");
  form.classList.add("form");
  var btnStart = document.createElement("button");
  btnStart.classList.add("btn");
  btnStart.classList.add("start");
  btnStart.setAttribute("type", "submit");
  btnStart.textContent = "Start Game";
  form.append(btnStart);
  var btnReset = document.createElement("button");
  btnReset.classList.add("btn");
  btnReset.classList.add("reset");
  btnReset.classList.add("hidden");
  btnReset.setAttribute("type", "submit");
  btnReset.textContent = "Reset Game";
  form.append(btnReset); // footer

  var footer = document.createElement("footer");
  footer.classList.add("footer");
  footer.innerHTML = "\n    <p>Coded by\n      <a href=\"https://github.com/rafetbasturk\" rel=\"noreferrer noopener\" target=\"_blank\">Rafet</a>\n      -\n      <a href=\"https://www.theodinproject.com/\" rel=\"noreferrer noopener\" target=\"_blank\">The Odin Project</a>\n    </p>\n  ";

  var grid = function grid(name) {
    var grid = document.createElement("div");
    grid.classList.add(name);
    grid.classList.add("grid");

    for (var i = 0; i < 100; i++) {
      var cell = document.createElement("div");
      cell.classList.add("cells");
      grid.style.gridTemplateColumns = "repeat(10, 3.2rem)";
      grid.style.gridTemplateRows = "repeat(10, 3.2rem)";
      grid.appendChild(cell);
    }

    grid.childNodes.forEach(function (cell, i) {
      cell.setAttribute("data-x", i % 10);

      for (var y = 0; y < 10; y++) {
        if (i >= y * 10 && i < (y + 1) * 10) cell.setAttribute("data-y", y);
      }
    });
    return grid;
  };

  var getShipsDOM = function getShipsDOM(length, startCoord, alignment, id) {
    var shipDOM = document.createElement("div");
    shipDOM.classList.add("ship");
    shipDOM.setAttribute("draggable", "true");
    shipDOM.setAttribute("data-id", id);

    if (alignment === "horizontal") {
      shipDOM.style.width = "".concat(length * 3.2 - 0.1, "rem");
      shipDOM.style.height = "3.1rem";
    } else {
      shipDOM.style.height = "".concat(length * 3.2 - 0.1, "rem");
      shipDOM.style.width = "3.1rem";
    }

    return {
      startCoord: startCoord,
      shipDOM: shipDOM
    };
  };

  var missedAttackDOM = function missedAttackDOM() {
    var missedAttack = document.createElement("div");
    missedAttack.classList.add("miss");
    var dot = document.createElement("span");
    dot.classList.add("dot");
    missedAttack.appendChild(dot);
    return missedAttack;
  };

  var hitDOM = function hitDOM() {
    var hit = document.createElement("div");
    hit.classList.add("hit");
    hit.innerHTML = "<span class='material-icons-outlined'>clear</span>";
    return hit;
  };

  var disableBoard = function disableBoard(name) {
    var disable = document.createElement("div");
    disable.classList.add("".concat(name));
    disable.classList.add("disable");
    return disable;
  };

  return {
    header: header,
    main: main,
    form: form,
    footer: footer,
    grid: grid,
    getShipsDOM: getShipsDOM,
    missedAttackDOM: missedAttackDOM,
    hitDOM: hitDOM,
    disableBoard: disableBoard
  };
}();



/***/ }),

/***/ "./src/components/factories/Gameboard.js":
/*!***********************************************!*\
  !*** ./src/components/factories/Gameboard.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/components/factories/Ship.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Gameboard = function Gameboard() {
  var board = Array(10).fill().map(function () {
    return Array(10).fill({
      hasShip: false
    });
  });
  return {
    getBoard: function getBoard() {
      return board;
    },
    removeBoard: function removeBoard() {
      board = Array(10).fill().map(function () {
        return Array(10).fill({
          hasShip: false
        });
      });
    },
    placeShip: function placeShip(id, length, coordinates) {
      var ship = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(id, length, coordinates);
      coordinates.forEach(function (el) {
        board[el[0]][el[1]] = {
          hasShip: true,
          ship: ship
        };
      });
    },
    receiveAttack: function receiveAttack(fire) {
      var x = fire[0];
      var y = fire[1];

      if (board[x][y].hasShip) {
        board[x][y].ship.isHit(fire);
      } else {
        board[x][y] = _objectSpread(_objectSpread({}, board[x][y]), {}, {
          missedShot: true
        });
      }
    },
    checkResult: function checkResult() {
      return board.flat().filter(function (el) {
        return el.hasShip;
      }).map(function (el) {
        return el.ship;
      }).every(function (el) {
        return el.isSunk();
      });
    }
  };
};



/***/ }),

/***/ "./src/components/factories/Player.js":
/*!********************************************!*\
  !*** ./src/components/factories/Player.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _helperFuncs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helperFuncs */ "./src/components/helperFuncs.js");
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard */ "./src/components/factories/Gameboard.js");



var Player = function Player(name) {
  var board = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
  var fleet = (0,_helperFuncs__WEBPACK_IMPORTED_MODULE_0__.createFleet)();
  return {
    name: name,
    board: board,
    fleet: fleet,
    attack: function attack(board, fire) {
      board.receiveAttack(fire);
    },
    placeFleet: function placeFleet(fleetArray) {
      fleetArray.forEach(function (ship) {
        var id = ship.id,
            length = ship.length,
            coordinates = ship.coordinates;
        board.placeShip(id, length, coordinates);
      });
    }
  };
};



/***/ }),

/***/ "./src/components/factories/Ship.js":
/*!******************************************!*\
  !*** ./src/components/factories/Ship.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
var Ship = function Ship(id, length, coordinates) {
  coordinates = coordinates.map(function (coordinate) {
    return {
      x: coordinate[0],
      y: coordinate[1],
      hit: false
    };
  });

  var isHit = function isHit(fire) {
    coordinates.map(function (coord) {
      coord.x === fire[0] && coord.y === fire[1] ? coord.hit = true : null;
    });
  };

  var isSunk = function isSunk() {
    return coordinates.every(function (coord) {
      return coord.hit;
    });
  };

  return {
    id: id,
    length: length,
    coordinates: coordinates,
    isHit: isHit,
    isSunk: isSunk
  };
};



/***/ }),

/***/ "./src/components/game.js":
/*!********************************!*\
  !*** ./src/components/game.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "game": () => (/* binding */ game)
/* harmony export */ });
/* harmony import */ var _uiController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uiController */ "./src/components/uiController.js");
/* harmony import */ var _factories_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/Player */ "./src/components/factories/Player.js");
/* harmony import */ var _helperFuncs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helperFuncs */ "./src/components/helperFuncs.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





var game = function () {
  var p1 = (0,_factories_Player__WEBPACK_IMPORTED_MODULE_1__.Player)("player");
  var p2 = (0,_factories_Player__WEBPACK_IMPORTED_MODULE_1__.Player)("computer");
  _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.createGrid(p1.name);
  _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.createGrid(p2.name);

  var setGame = function setGame(fleet1, fleet2) {
    p1.placeFleet(fleet1);
    p2.placeFleet(fleet2);
    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.showShips(fleet1, p1.name);
  };

  var playerMove = function playerMove(e) {
    e.currentTarget.classList.add("fired");
    var x = Number(e.currentTarget.dataset.x);
    var y = Number(e.currentTarget.dataset.y);
    var fire = [x, y];
    p1.attack(p2.board, fire);
    var boardArray = p2.board.getBoard();
    var sunkShipIds = boardArray.flat().filter(function (el) {
      return el.hasShip;
    }).map(function (el) {
      return el.ship;
    }).filter(function (ship) {
      if (ship.isSunk()) {
        return ship;
      }
    }).map(function (ship) {
      return ship.id;
    });
    sunkShipIds = _toConsumableArray(new Set(sunkShipIds));
    var sunkShips = p2.fleet.filter(function (ship) {
      for (var i = 0; i < sunkShipIds.length; i++) {
        if (sunkShipIds[i] === ship.id) {
          return ship;
        }
      }
    });
    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.removeShips(p2.name);
    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.showShips(sunkShips, p2.name);

    if (boardArray[x][y].hasShip) {
      var ship = boardArray[x][y].ship;

      var cells = _toConsumableArray(document.querySelectorAll(".".concat(p2.name, " .cells")));

      var targets = (0,_helperFuncs__WEBPACK_IMPORTED_MODULE_2__.targetCoords)(ship, fire);
      targets.forEach(function (target) {
        cells.forEach(function (cell) {
          if (cell.dataset.x == target[0] && cell.dataset.y == target[1]) {
            cell.removeEventListener("click", playerMove);
            cell.classList.add("fired");
            _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.markAttack(boardArray, target, cell);
          }
        });
      });
    } else {
      _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.markAttack(boardArray, fire, e.currentTarget);
    }

    if (p2.board.checkResult()) {
      _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.showMessage("Game over! You win.");
      document.querySelectorAll(".".concat(p2.name, " .cells")).forEach(function (cell) {
        cell.removeEventListener("click", playerMove);
      });
      _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.enableBoard(p1.name);
      return;
    }

    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.disableBoard(p2.name);
    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.enableBoard(p1.name);
    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.showMessage("Computer's turn");
    setTimeout(function () {
      aiMove();
    }, 300);
  };

  var allCoords = (0,_helperFuncs__WEBPACK_IMPORTED_MODULE_2__.boardCoords)();

  var aiMove = function aiMove() {
    var random = (0,_helperFuncs__WEBPACK_IMPORTED_MODULE_2__.randomize)(0, allCoords.length - 1);
    var fire = allCoords[random];
    p2.attack(p1.board, fire);
    var boardArray = p1.board.getBoard();

    if (boardArray[fire[0]][fire[1]].hasShip) {
      var ship = boardArray[fire[0]][fire[1]].ship;

      var cells = _toConsumableArray(document.querySelectorAll(".".concat(p1.name, " .cells")));

      var targets = (0,_helperFuncs__WEBPACK_IMPORTED_MODULE_2__.targetCoords)(ship, fire);
      targets.forEach(function (target) {
        var index = allCoords.findIndex(function (coord) {
          return coord[0] === target[0] && coord[1] === target[1];
        });
        index >= 0 ? allCoords.splice(index, 1) : null;
        cells.forEach(function (cell) {
          if (cell.dataset.x == target[0] && cell.dataset.y == target[1]) {
            _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.markAttack(boardArray, target, cell);
          }
        });
      });
    } else {
      allCoords.splice(random, 1);
      document.querySelectorAll(".".concat(p1.name, " .cells")).forEach(function (cell) {
        Number(cell.dataset.x) === fire[0] && Number(cell.dataset.y) === fire[1] ? _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.markAttack(boardArray, fire, cell) : null;
      });
    }

    if (p1.board.checkResult()) {
      _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.showMessage("Game over! Computer wins.");
      _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.enableBoard(p2.name);
      document.querySelectorAll(".".concat(p2.name, " .cells")).forEach(function (cell) {
        cell.removeEventListener("click", playerMove);
      });
      return;
    }

    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.disableBoard(p1.name);
    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.enableBoard(p2.name);
    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.showMessage("Your turn");
  };

  var startGame = function startGame(e) {
    e.preventDefault();
    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.disableBoard(p1.name);
    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.disableBoard(p2.name);
    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.toggleBtns();
    document.querySelectorAll(".".concat(p2.name, " > .cells")).forEach(function (cell) {
      cell.addEventListener("click", playerMove, {
        once: true
      });
    });
    var player = (0,_helperFuncs__WEBPACK_IMPORTED_MODULE_2__.randomize)(0, 1) === 0 ? p1 : p2;

    if (player === p2) {
      _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.showMessage("Computer's turn");
      _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.enableBoard(p1.name);
      setTimeout(function () {
        aiMove();
      }, 500);
    } else {
      _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.showMessage("Your turn");
      _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.enableBoard(p2.name);
    }
  };

  var resetGame = function resetGame(e) {
    e.preventDefault;
    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.enableBoard(p1.name);
    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.enableBoard(p2.name);
    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.removeShips(p1.name);
    setGame(p1.fleet, p2.fleet);
  };

  var loadEventListeners = function loadEventListeners() {
    document.querySelectorAll(".".concat(p1.name, " .ship")).forEach(function (ship) {
      ship.addEventListener("dragstart", dragStart);
      ship.addEventListener("dragend", dragEnd);
      ship.addEventListener("click", alignShip);
    });
    document.querySelectorAll(".".concat(p1.name, " > .cells")).forEach(function (cell) {
      cell.addEventListener("dragover", dragOver);
      cell.addEventListener("drop", dragDrop);
    });
    document.querySelector(".start").addEventListener("click", startGame);
    document.querySelector(".reset").addEventListener("click", resetGame);
  };

  var dragStart = function dragStart(e) {
    e.target.classList.add("hold");
  };

  var dragEnd = function dragEnd(e) {
    e.target.classList.remove("hold");
  };

  var dragOver = function dragOver(e) {
    e.preventDefault();
    var hold = document.querySelector(".hold");
    e.currentTarget.append(hold);
  };

  var dragDrop = function dragDrop() {
    var cell = document.querySelector(".hold");
    var id = Number(cell.dataset.id);
    var x = Number(cell.parentElement.dataset.x);
    var y = Number(cell.parentElement.dataset.y);
    var coord = [x, y];
    var newShip;
    p1.fleet = p1.fleet.map(function (ship) {
      if (id === ship.id) {
        var name = ship.name;
        newShip = _objectSpread({
          id: id,
          name: name
        }, (0,_helperFuncs__WEBPACK_IMPORTED_MODULE_2__.droppedShip)(ship.length, coord, ship.alignment));
        var isValid = (0,_helperFuncs__WEBPACK_IMPORTED_MODULE_2__.checkAvailability)(p1.fleet, newShip);

        if (isValid) {
          return newShip;
        } else {
          _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.showMessage("Not available!", "alarm");
          setTimeout(function () {
            _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.showMessage("Place the ships by dragging, change alignment by clicking");
          }, 1000);
          return ship;
        }
      } else {
        return ship;
      }
    });
    p1.board.removeBoard();
    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.removeShips(p1.name);
    p1.placeFleet(p1.fleet);
    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.showShips(p1.fleet, p1.name);
    loadEventListeners();
  };

  var alignShip = function alignShip(e) {
    var id = Number(e.target.dataset.id);
    var x = Number(e.target.parentElement.dataset.x);
    var y = Number(e.target.parentElement.dataset.y);
    var coord = [x, y];
    var newShip;
    p1.fleet = p1.fleet.map(function (ship) {
      if (id === ship.id) {
        var alignment = ship.alignment === "vertical" ? "horizontal" : "vertical";
        var name = ship.name;
        newShip = _objectSpread({
          id: id,
          name: name
        }, (0,_helperFuncs__WEBPACK_IMPORTED_MODULE_2__.droppedShip)(ship.length, coord, alignment));
        var isValid = (0,_helperFuncs__WEBPACK_IMPORTED_MODULE_2__.checkAvailability)(p1.fleet, newShip);

        if (isValid) {
          return newShip;
        } else {
          _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.showMessage("Not available!");
          setTimeout(function () {
            _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.showMessage("Place the ships by dragging, change alignment by clicking");
          }, 1000);
          return ship;
        }
      } else {
        return ship;
      }
    });
    p1.board.removeBoard();
    _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.removeShips(p1.name);
    setGame(p1.fleet, p2.fleet);
    loadEventListeners();
  };

  return {
    init: function init() {
      _uiController__WEBPACK_IMPORTED_MODULE_0__.uiController.loadDOM();
      setGame(p1.fleet, p2.fleet);
      loadEventListeners();
    }
  };
}();



/***/ }),

/***/ "./src/components/helperFuncs.js":
/*!***************************************!*\
  !*** ./src/components/helperFuncs.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomize": () => (/* binding */ randomize),
/* harmony export */   "boardCoords": () => (/* binding */ boardCoords),
/* harmony export */   "targetCoords": () => (/* binding */ targetCoords),
/* harmony export */   "createShipCoords": () => (/* binding */ createShipCoords),
/* harmony export */   "createFleet": () => (/* binding */ createFleet),
/* harmony export */   "droppedShip": () => (/* binding */ droppedShip),
/* harmony export */   "checkAvailability": () => (/* binding */ checkAvailability)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var randomize = function randomize(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // Min & Max are inclusive
};

var boardCoords = function boardCoords() {
  return Array.from({
    length: 10
  }, function (v, i) {
    return Array.from({
      length: 10
    }, function (a, j) {
      return [i, j];
    });
  }).flat();
};

var occupiedCoords = function occupiedCoords(arr) {
  var coords = [];

  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      // if (i === 0 && j === 0) {
      //   null
      // }
      if (arr[0] + i < 0 || arr[0] + i > 9) {
        null;
      } else if (arr[1] + j < 0 || arr[1] + j > 9) {
        null;
      } else {
        coords = [].concat(_toConsumableArray(coords), [[arr[0] + i, arr[1] + j]]);
      }
    }
  }

  return _toConsumableArray(coords);
};

var hitsBeforeSunk = function hitsBeforeSunk(arr) {
  var cells = [[arr[0] - 1, arr[1] - 1], [arr[0], arr[1]], [arr[0] - 1, arr[1] + 1], [arr[0] + 1, arr[1] - 1], [arr[0] + 1, arr[1] + 1]].filter(function (item) {
    return item[0] >= 0 && item[1] >= 0;
  }).filter(function (item) {
    return item[0] < 10 && item[1] < 10;
  });
  return cells;
};

var targetCoords = function targetCoords(ship, fire) {
  var targets;

  if (ship.length === 1 && ship.isSunk()) {
    targets = ship.coordinates.map(function (item) {
      return occupiedCoords([item.x, item.y]);
    })[0];
  } else if (ship.length > 1 && !ship.isSunk()) {
    targets = hitsBeforeSunk(fire);
  } else if (ship.length > 1 && ship.isSunk()) {
    targets = Array.from(new Set(ship.coordinates.map(function (item) {
      return occupiedCoords([item.x, item.y]);
    }).flat().map(JSON.stringify)), JSON.parse).sort();
  }

  return targets;
};

var allCells = function allCells(coordinates) {
  return Array.from(new Set(coordinates.map(function (el) {
    return occupiedCoords(el);
  }).flat().map(JSON.stringify)), JSON.parse).sort();
};

var startInfo = [{
  id: 0,
  name: "Carrier",
  length: 4
}, {
  id: 1,
  name: "Battleship",
  length: 3
}, {
  id: 2,
  name: "Cruiser",
  length: 3
}, {
  id: 3,
  name: "Submarine",
  length: 2
}, {
  id: 4,
  name: "Submarine",
  length: 2
}, {
  id: 5,
  name: "Destroyer",
  length: 1
}, {
  id: 6,
  name: "Destroyer",
  length: 1
}, {
  id: 7,
  name: "Destroyer",
  length: 1
}, {
  id: 8,
  name: "Destroyer",
  length: 1
}];

var createShipCoords = function createShipCoords(array, length) {
  var alignment;
  var startCoord;
  var coordinates = [];
  var valid = false;

  while (!valid) {
    valid = true;
    alignment = randomize(0, 1) === 0 ? "vertical" : "horizontal";
    var random = randomize(0, array.length - 1);
    startCoord = array[random];

    if (alignment === "horizontal" && startCoord[0] + length > 9) {
      valid = false;
    } else if (alignment === "vertical" && startCoord[1] + length > 9) {
      valid = false;
    } else {
      var nextCoord = void 0;

      for (var i = 0; i < length; i++) {
        if (alignment === "horizontal") {
          nextCoord = [startCoord[0] + i, startCoord[1]];
          coordinates = [].concat(_toConsumableArray(coordinates), [nextCoord]);
        } else {
          nextCoord = [startCoord[0], startCoord[1] + i];
          coordinates = [].concat(_toConsumableArray(coordinates), [nextCoord]);
        }
      }
    }
  }

  return {
    length: length,
    alignment: alignment,
    startCoord: startCoord,
    coordinates: coordinates
  };
};

var createFleet = function createFleet() {
  var availableCoords = boardCoords();
  var usedCoords = [];
  var fleet = startInfo.map(function (info) {
    var id = info.id;
    var name = info.name;
    var ship;
    var shipCoords;
    var valid = false;

    while (!valid) {
      valid = true;
      ship = createShipCoords(availableCoords, info.length);
      var _ship = ship,
          coordinates = _ship.coordinates;
      shipCoords = allCells(coordinates);
      var overlap = ship.coordinates.some(function (el) {
        return usedCoords.some(function (coord) {
          return coord[0] === el[0] && coord[1] === el[1];
        });
      });

      if (overlap) {
        valid = false;
      } else {
        usedCoords = [].concat(_toConsumableArray(usedCoords), _toConsumableArray(shipCoords));
        usedCoords.forEach(function (el) {
          var index = availableCoords.findIndex(function (coord) {
            return coord[0] === el[0] && coord[1] === el[1];
          });
          index > -1 ? availableCoords.splice(index, 1) : null;
        });
        return _objectSpread({
          id: id,
          name: name
        }, ship);
      }
    }
  });
  return fleet;
};

var droppedShip = function droppedShip(length, startCoord, alignment) {
  var coordinates = [];
  var nextCoord;

  for (var i = 0; i < length; i++) {
    if (alignment === "horizontal") {
      nextCoord = [startCoord[0] + i, startCoord[1]];
      coordinates = [].concat(_toConsumableArray(coordinates), [nextCoord]);
    } else {
      nextCoord = [startCoord[0], startCoord[1] + i];
      coordinates = [].concat(_toConsumableArray(coordinates), [nextCoord]);
    }
  }

  return {
    length: length,
    startCoord: startCoord,
    alignment: alignment,
    coordinates: coordinates
  };
};

var checkAvailability = function checkAvailability(fleet, newShip) {
  var unavailableCoords = [];
  var otherShips = fleet.filter(function (ship) {
    return newShip.id !== ship.id;
  });
  otherShips.forEach(function (ship) {
    var shipCoords = allCells(ship.coordinates);
    unavailableCoords = [].concat(_toConsumableArray(unavailableCoords), _toConsumableArray(shipCoords));
    unavailableCoords = Array.from(new Set(unavailableCoords.map(JSON.stringify)), JSON.parse).sort();
  });
  var overlap = newShip.coordinates.some(function (el) {
    return unavailableCoords.some(function (coord) {
      return coord[0] === el[0] && coord[1] === el[1];
    });
  });
  var outOfGrid = newShip.coordinates.some(function (el) {
    return el[0] > 9 || el[1] > 9;
  });
  var isValid = !(overlap || outOfGrid);
  return isValid;
};



/***/ }),

/***/ "./src/components/uiController.js":
/*!****************************************!*\
  !*** ./src/components/uiController.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uiController": () => (/* binding */ uiController)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/components/dom.js");


var uiController = function () {
  return {
    disableBoard: function disableBoard(name) {
      var disable = _dom__WEBPACK_IMPORTED_MODULE_0__.domElements.disableBoard(name);
      document.querySelector(".".concat(name, "-area")).appendChild(disable);
    },
    enableBoard: function enableBoard(name) {
      var disable = document.getElementsByClassName("".concat(name, " disable"))[0];
      document.querySelector(".".concat(name, "-area")).removeChild(disable);
    },
    showMessage: function showMessage(message) {
      document.querySelector(".message").textContent = message;
    },
    markAttack: function markAttack(board, fire, cell) {
      var target = board[fire[0]][fire[1]];

      if (!target.hasShip) {
        cell.innerHTML = "";
        cell.appendChild(_dom__WEBPACK_IMPORTED_MODULE_0__.domElements.missedAttackDOM());
      } else {
        if (cell.childElementCount) {
          if (cell.firstChild.classList.contains("ship") && cell.childElementCount === 1) {
            cell.insertAdjacentElement("beforeend", _dom__WEBPACK_IMPORTED_MODULE_0__.domElements.hitDOM());
          }
        } else {
          cell.appendChild(_dom__WEBPACK_IMPORTED_MODULE_0__.domElements.hitDOM());
        }
      }
    },
    showShips: function showShips(array, name) {
      var shipsDOM = array.map(function (el) {
        var length = el.length,
            startCoord = el.startCoord,
            alignment = el.alignment,
            id = el.id;
        return _dom__WEBPACK_IMPORTED_MODULE_0__.domElements.getShipsDOM(length, startCoord, alignment, id);
      });
      document.querySelectorAll(".".concat(name, " .cells")).forEach(function (cell) {
        shipsDOM.forEach(function (ship) {
          var startCoord = ship.startCoord,
              shipDOM = ship.shipDOM;

          if (cell.dataset.x == startCoord[0] && cell.dataset.y == startCoord[1]) {
            cell.appendChild(shipDOM);
          }
        });
      });
    },
    removeShips: function removeShips(name) {
      document.querySelectorAll(".".concat(name, " .ship")).forEach(function (ship) {
        return ship.remove();
      });
    },
    loadDOM: function loadDOM() {
      document.body.appendChild(_dom__WEBPACK_IMPORTED_MODULE_0__.domElements.header);
      document.body.appendChild(_dom__WEBPACK_IMPORTED_MODULE_0__.domElements.main);
      document.body.appendChild(_dom__WEBPACK_IMPORTED_MODULE_0__.domElements.form);
      document.body.appendChild(_dom__WEBPACK_IMPORTED_MODULE_0__.domElements.footer);
    },
    toggleBtns: function toggleBtns() {
      document.querySelector(".start").classList.toggle("hidden");
      document.querySelector(".reset").classList.toggle("hidden");
    },
    createGrid: function createGrid(name) {
      var grid = _dom__WEBPACK_IMPORTED_MODULE_0__.domElements.grid(name);

      if (name !== "computer") {
        _dom__WEBPACK_IMPORTED_MODULE_0__.domElements.main.firstChild.appendChild(grid);
      } else {
        _dom__WEBPACK_IMPORTED_MODULE_0__.domElements.main.lastChild.appendChild(grid);
      }
    }
  };
}();



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/material-icons/iconfont/material-icons.css":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/material-icons/iconfont/material-icons.css ***!
  \*******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./material-icons.woff2 */ "./node_modules/material-icons/iconfont/material-icons.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./material-icons.woff */ "./node_modules/material-icons/iconfont/material-icons.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./material-icons-outlined.woff2 */ "./node_modules/material-icons/iconfont/material-icons-outlined.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./material-icons-outlined.woff */ "./node_modules/material-icons/iconfont/material-icons-outlined.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./material-icons-round.woff2 */ "./node_modules/material-icons/iconfont/material-icons-round.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./material-icons-round.woff */ "./node_modules/material-icons/iconfont/material-icons-round.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(/*! ./material-icons-sharp.woff2 */ "./node_modules/material-icons/iconfont/material-icons-sharp.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ./material-icons-sharp.woff */ "./node_modules/material-icons/iconfont/material-icons-sharp.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(/*! ./material-icons-two-tone.woff2 */ "./node_modules/material-icons/iconfont/material-icons-two-tone.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(/*! ./material-icons-two-tone.woff */ "./node_modules/material-icons/iconfont/material-icons-two-tone.woff"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_9___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"Material Icons\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"woff\");\n}\n.material-icons {\n  font-family: \"Material Icons\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n\n@font-face {\n  font-family: \"Material Icons Outlined\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format(\"woff\");\n}\n.material-icons-outlined {\n  font-family: \"Material Icons Outlined\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n\n@font-face {\n  font-family: \"Material Icons Round\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ") format(\"woff\");\n}\n.material-icons-round {\n  font-family: \"Material Icons Round\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n\n@font-face {\n  font-family: \"Material Icons Sharp\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ") format(\"woff\");\n}\n.material-icons-sharp {\n  font-family: \"Material Icons Sharp\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n\n@font-face {\n  font-family: \"Material Icons Two Tone\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ") format(\"woff\");\n}\n.material-icons-two-tone {\n  font-family: \"Material Icons Two Tone\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n", "",{"version":3,"sources":["webpack://./node_modules/material-icons/iconfont/material-icons.css"],"names":[],"mappings":"AAAA;EACE,6BAA6B;EAC7B,kBAAkB;EAClB,gBAAgB;EAChB,mBAAmB;EACnB,oHAA+F;AACjG;AACA;EACE,6BAA6B;EAC7B,mBAAmB;EACnB,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,oBAAoB;EACpB,qBAAqB;EACrB,mBAAmB;EACnB,iBAAiB;EACjB,cAAc;EACd,mCAAmC;EACnC,kCAAkC;EAClC,kCAAkC;EAClC,6BAA6B;AAC/B;;AAEA;EACE,sCAAsC;EACtC,kBAAkB;EAClB,gBAAgB;EAChB,mBAAmB;EACnB,oHAAiH;AACnH;AACA;EACE,sCAAsC;EACtC,mBAAmB;EACnB,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,oBAAoB;EACpB,qBAAqB;EACrB,mBAAmB;EACnB,iBAAiB;EACjB,cAAc;EACd,mCAAmC;EACnC,kCAAkC;EAClC,kCAAkC;EAClC,6BAA6B;AAC/B;;AAEA;EACE,mCAAmC;EACnC,kBAAkB;EAClB,gBAAgB;EAChB,mBAAmB;EACnB,oHAA2G;AAC7G;AACA;EACE,mCAAmC;EACnC,mBAAmB;EACnB,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,oBAAoB;EACpB,qBAAqB;EACrB,mBAAmB;EACnB,iBAAiB;EACjB,cAAc;EACd,mCAAmC;EACnC,kCAAkC;EAClC,kCAAkC;EAClC,6BAA6B;AAC/B;;AAEA;EACE,mCAAmC;EACnC,kBAAkB;EAClB,gBAAgB;EAChB,mBAAmB;EACnB,oHAA2G;AAC7G;AACA;EACE,mCAAmC;EACnC,mBAAmB;EACnB,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,oBAAoB;EACpB,qBAAqB;EACrB,mBAAmB;EACnB,iBAAiB;EACjB,cAAc;EACd,mCAAmC;EACnC,kCAAkC;EAClC,kCAAkC;EAClC,6BAA6B;AAC/B;;AAEA;EACE,sCAAsC;EACtC,kBAAkB;EAClB,gBAAgB;EAChB,mBAAmB;EACnB,oHAAiH;AACnH;AACA;EACE,sCAAsC;EACtC,mBAAmB;EACnB,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,oBAAoB;EACpB,qBAAqB;EACrB,mBAAmB;EACnB,iBAAiB;EACjB,cAAc;EACd,mCAAmC;EACnC,kCAAkC;EAClC,kCAAkC;EAClC,6BAA6B;AAC/B","sourcesContent":["@font-face {\n  font-family: \"Material Icons\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url(\"./material-icons.woff2\") format(\"woff2\"), url(\"./material-icons.woff\") format(\"woff\");\n}\n.material-icons {\n  font-family: \"Material Icons\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n\n@font-face {\n  font-family: \"Material Icons Outlined\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url(\"./material-icons-outlined.woff2\") format(\"woff2\"), url(\"./material-icons-outlined.woff\") format(\"woff\");\n}\n.material-icons-outlined {\n  font-family: \"Material Icons Outlined\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n\n@font-face {\n  font-family: \"Material Icons Round\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url(\"./material-icons-round.woff2\") format(\"woff2\"), url(\"./material-icons-round.woff\") format(\"woff\");\n}\n.material-icons-round {\n  font-family: \"Material Icons Round\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n\n@font-face {\n  font-family: \"Material Icons Sharp\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url(\"./material-icons-sharp.woff2\") format(\"woff2\"), url(\"./material-icons-sharp.woff\") format(\"woff\");\n}\n.material-icons-sharp {\n  font-family: \"Material Icons Sharp\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n\n@font-face {\n  font-family: \"Material Icons Two Tone\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url(\"./material-icons-two-tone.woff2\") format(\"woff2\"), url(\"./material-icons-two-tone.woff\") format(\"woff\");\n}\n.material-icons-two-tone {\n  font-family: \"Material Icons Two Tone\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_material_icons_iconfont_material_icons_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js!../node_modules/material-icons/iconfont/material-icons.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/material-icons/iconfont/material-icons.css");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap);"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_node_modules_material_icons_iconfont_material_icons_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*,\n*::after,\n*::before {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\n.material-icons-outlined {\n  font-size: 3.2rem;\n}\n\n:root {\n  font-size: 10px;\n}\n\nbody {\n  background: #eee;\n  font-family: 'Roboto', sans-serif;\n}\n\n.header {\n  background: #aa9900;\n  width: 100%;\n  height: 6rem;\n  display: flex;\n  align-items: center;\n  padding: 0 1.6rem;\n}\n\n.logo {\n  color: #e5e7eb;\n  font-size: 2.4rem;\n  flex: 1 0 40%;\n}\n\n.notifications {\n  font-size: 1.3rem;\n  padding: .8rem 1.2rem;\n  height: calc(100% - 1.6rem);\n  flex: 1 0 60%;\n  background: #ccc;\n  display: flex;\n  align-items: center;\n}\n\n.message {\n  color: #111;\n  font-weight: 300;\n}\n\n.main {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  padding: 1.2rem 0;\n}\n\n.disable {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background: #aa99002c;\n  z-index: 5;\n}\n\n.player-area,\n.computer-area {\n  display: grid;\n  grid-template-columns: 1fr 10fr;\n  grid-template-rows: 1fr 10fr 1fr;\n  grid-template-areas:\n    \"b b\"\n    \"a c\"\n    \"d d\";\n  position: relative;\n  padding: 1.2rem 1.6rem;\n}\n\nh2 {\n  font-size: 1.6rem;\n  font-weight: 400;\n  grid-area: d;\n  align-self: center;\n  justify-self: center;\n}\n\n.x-coords,\n.y-coords {\n  display: grid;\n  align-items: center;\n  justify-items: center;\n  font-size: 1.2rem;\n}\n\n.x-coords {\n  grid-template-columns: repeat(10, 3.2rem);\n  justify-self: end;\n  grid-area: b;\n}\n\n.y-coords {\n  grid-template-rows: repeat(10, 3.2rem);\n  grid-area: a;\n}\n\n.grid {\n  display: grid;\n  width: fit-content;\n  margin: auto;\n  border-left: 1px solid #aa9900a1;\n  border-top: 1px solid #aa9900a1;\n  background: transparent;\n  grid-area: c;\n}\n\n.cells {\n  background: transparent;\n  border-right: .1rem solid #aa9900a1;\n  border-bottom: .1rem solid #aa9900a1;\n  cursor: crosshair;\n  position: relative;\n  display: flex;\n}\n\n.ship {\n  position: absolute;\n  border: .2rem solid #aa9900;\n  background-color: #aa990049;\n  cursor: grab;\n}\n\n.ship:active {\n  cursor: grabbing;\n  border: 2px solid red;\n}\n\n.computer .cells {\n  position: relative;\n}\n\n.computer .cells:hover::before,\n.computer .cells:hover::after {\n  position: absolute;\n  font-size: .85rem;\n  top: 0;\n  padding: .1rem .25rem;\n}\n\n.computer .cells:hover::before {\n  content: \"x:\" attr(data-x);\n  left: 0;\n}\n\n.computer .cells:hover::after {\n  content: \"y:\" attr(data-y);\n  right: 0;\n}\n\n.fired {\n  cursor: not-allowed;\n}\n\n.miss {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.dot {\n  background: rgb(124, 50, 50);\n  width: .5rem;\n  height: .5rem;\n  border-radius: 50%;\n}\n\n.hold {\n  border: 2px solid red;\n}\n\n.form {\n  width: 300px;\n  margin: 0 auto 6rem;\n  padding: 1.6rem 3.2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.btn {\n  padding: .8rem 1.6rem;\n  border-radius: .8rem;\n  border: 1px solid #aa9900;\n}\n\n.hidden {\n  display: none;\n}\n\n.footer {\n  width: 100%;\n  height: 6rem;\n  position: fixed;\n  bottom: 0;\n  background: #aa9900;\n  font-size: 1.5rem;\n  text-align: center;\n  padding: 2rem 0;\n  color: #e5e7eb;\n}\n\n.footer a {\n  font-size: 1.5rem;\n  text-decoration: overline underline;\n  color: #111;\n}\n\n@media screen and (min-width: 1024px) {\n  .header {\n    padding: 0 4.8rem;\n  }\n\n  .main {\n    padding: 2.4rem 4.8rem;\n    justify-content: space-around;\n  }\n\n  .notifications {\n    font-size: 1.6rem;\n  }\n}", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAGA;;;EAGE,SAAS;EACT,UAAU;EACV,sBAAsB;AACxB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,gBAAgB;EAChB,iCAAiC;AACnC;;AAEA;EACE,mBAAmB;EACnB,WAAW;EACX,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,cAAc;EACd,iBAAiB;EACjB,aAAa;AACf;;AAEA;EACE,iBAAiB;EACjB,qBAAqB;EACrB,2BAA2B;EAC3B,aAAa;EACb,gBAAgB;EAChB,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,mBAAmB;EACnB,uBAAuB;EACvB,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,QAAQ;EACR,SAAS;EACT,OAAO;EACP,qBAAqB;EACrB,UAAU;AACZ;;AAEA;;EAEE,aAAa;EACb,+BAA+B;EAC/B,gCAAgC;EAChC;;;SAGO;EACP,kBAAkB;EAClB,sBAAsB;AACxB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,YAAY;EACZ,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;;EAEE,aAAa;EACb,mBAAmB;EACnB,qBAAqB;EACrB,iBAAiB;AACnB;;AAEA;EACE,yCAAyC;EACzC,iBAAiB;EACjB,YAAY;AACd;;AAEA;EACE,sCAAsC;EACtC,YAAY;AACd;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,YAAY;EACZ,gCAAgC;EAChC,+BAA+B;EAC/B,uBAAuB;EACvB,YAAY;AACd;;AAEA;EACE,uBAAuB;EACvB,mCAAmC;EACnC,oCAAoC;EACpC,iBAAiB;EACjB,kBAAkB;EAClB,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,2BAA2B;EAC3B,2BAA2B;EAC3B,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;;EAEE,kBAAkB;EAClB,iBAAiB;EACjB,MAAM;EACN,qBAAqB;AACvB;;AAEA;EACE,0BAA0B;EAC1B,OAAO;AACT;;AAEA;EACE,0BAA0B;EAC1B,QAAQ;AACV;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,4BAA4B;EAC5B,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,qBAAqB;EACrB,oBAAoB;EACpB,yBAAyB;AAC3B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,eAAe;EACf,SAAS;EACT,mBAAmB;EACnB,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,iBAAiB;EACjB,mCAAmC;EACnC,WAAW;AACb;;AAEA;EACE;IACE,iBAAiB;EACnB;;EAEA;IACE,sBAAsB;IACtB,6BAA6B;EAC/B;;EAEA;IACE,iBAAiB;EACnB;AACF","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');\n@import 'material-icons/iconfont/material-icons.css';\n\n*,\n*::after,\n*::before {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\n.material-icons-outlined {\n  font-size: 3.2rem;\n}\n\n:root {\n  font-size: 10px;\n}\n\nbody {\n  background: #eee;\n  font-family: 'Roboto', sans-serif;\n}\n\n.header {\n  background: #aa9900;\n  width: 100%;\n  height: 6rem;\n  display: flex;\n  align-items: center;\n  padding: 0 1.6rem;\n}\n\n.logo {\n  color: #e5e7eb;\n  font-size: 2.4rem;\n  flex: 1 0 40%;\n}\n\n.notifications {\n  font-size: 1.3rem;\n  padding: .8rem 1.2rem;\n  height: calc(100% - 1.6rem);\n  flex: 1 0 60%;\n  background: #ccc;\n  display: flex;\n  align-items: center;\n}\n\n.message {\n  color: #111;\n  font-weight: 300;\n}\n\n.main {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  padding: 1.2rem 0;\n}\n\n.disable {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background: #aa99002c;\n  z-index: 5;\n}\n\n.player-area,\n.computer-area {\n  display: grid;\n  grid-template-columns: 1fr 10fr;\n  grid-template-rows: 1fr 10fr 1fr;\n  grid-template-areas:\n    \"b b\"\n    \"a c\"\n    \"d d\";\n  position: relative;\n  padding: 1.2rem 1.6rem;\n}\n\nh2 {\n  font-size: 1.6rem;\n  font-weight: 400;\n  grid-area: d;\n  align-self: center;\n  justify-self: center;\n}\n\n.x-coords,\n.y-coords {\n  display: grid;\n  align-items: center;\n  justify-items: center;\n  font-size: 1.2rem;\n}\n\n.x-coords {\n  grid-template-columns: repeat(10, 3.2rem);\n  justify-self: end;\n  grid-area: b;\n}\n\n.y-coords {\n  grid-template-rows: repeat(10, 3.2rem);\n  grid-area: a;\n}\n\n.grid {\n  display: grid;\n  width: fit-content;\n  margin: auto;\n  border-left: 1px solid #aa9900a1;\n  border-top: 1px solid #aa9900a1;\n  background: transparent;\n  grid-area: c;\n}\n\n.cells {\n  background: transparent;\n  border-right: .1rem solid #aa9900a1;\n  border-bottom: .1rem solid #aa9900a1;\n  cursor: crosshair;\n  position: relative;\n  display: flex;\n}\n\n.ship {\n  position: absolute;\n  border: .2rem solid #aa9900;\n  background-color: #aa990049;\n  cursor: grab;\n}\n\n.ship:active {\n  cursor: grabbing;\n  border: 2px solid red;\n}\n\n.computer .cells {\n  position: relative;\n}\n\n.computer .cells:hover::before,\n.computer .cells:hover::after {\n  position: absolute;\n  font-size: .85rem;\n  top: 0;\n  padding: .1rem .25rem;\n}\n\n.computer .cells:hover::before {\n  content: \"x:\" attr(data-x);\n  left: 0;\n}\n\n.computer .cells:hover::after {\n  content: \"y:\" attr(data-y);\n  right: 0;\n}\n\n.fired {\n  cursor: not-allowed;\n}\n\n.miss {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.dot {\n  background: rgb(124, 50, 50);\n  width: .5rem;\n  height: .5rem;\n  border-radius: 50%;\n}\n\n.hold {\n  border: 2px solid red;\n}\n\n.form {\n  width: 300px;\n  margin: 0 auto 6rem;\n  padding: 1.6rem 3.2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.btn {\n  padding: .8rem 1.6rem;\n  border-radius: .8rem;\n  border: 1px solid #aa9900;\n}\n\n.hidden {\n  display: none;\n}\n\n.footer {\n  width: 100%;\n  height: 6rem;\n  position: fixed;\n  bottom: 0;\n  background: #aa9900;\n  font-size: 1.5rem;\n  text-align: center;\n  padding: 2rem 0;\n  color: #e5e7eb;\n}\n\n.footer a {\n  font-size: 1.5rem;\n  text-decoration: overline underline;\n  color: #111;\n}\n\n@media screen and (min-width: 1024px) {\n  .header {\n    padding: 0 4.8rem;\n  }\n\n  .main {\n    padding: 2.4rem 4.8rem;\n    justify-content: space-around;\n  }\n\n  .notifications {\n    font-size: 1.6rem;\n  }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/material-icons/iconfont/material-icons-outlined.woff":
/*!***************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/material-icons-outlined.woff ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "123a7ad6784163c39aaa.woff";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/material-icons-outlined.woff2":
/*!****************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/material-icons-outlined.woff2 ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "5d7deb03b9cecba7d247.woff2";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/material-icons-round.woff":
/*!************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/material-icons-round.woff ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "159dc8004e17a33f287f.woff";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/material-icons-round.woff2":
/*!*************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/material-icons-round.woff2 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7c985a8aea387341edf9.woff2";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/material-icons-sharp.woff":
/*!************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/material-icons-sharp.woff ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "77bc1b022b575be35fa7.woff";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/material-icons-sharp.woff2":
/*!*************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/material-icons-sharp.woff2 ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "25f4d306806e85bc60f6.woff2";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/material-icons-two-tone.woff":
/*!***************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/material-icons-two-tone.woff ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ee71463e28071436d096.woff";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/material-icons-two-tone.woff2":
/*!****************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/material-icons-two-tone.woff2 ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7e94e72135150c6b387c.woff2";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/material-icons.woff":
/*!******************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/material-icons.woff ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "824b570fb059ee0a44a9.woff";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/material-icons.woff2":
/*!*******************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/material-icons.woff2 ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "aba5a2a316a1d312db26.woff2";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _components_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/game */ "./src/components/game.js");


_components_game__WEBPACK_IMPORTED_MODULE_1__.game.init();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7Ozs7Ozs7OztBQ3JCQTtBQUNBO0FBRUE0RCx1REFBQSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvZG9tLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL2ZhY3Rvcmllcy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvZmFjdG9yaWVzL1BsYXllci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9mYWN0b3JpZXMvU2hpcC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9nYW1lLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL2hlbHBlckZ1bmNzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3VpQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvbWF0ZXJpYWwtaWNvbnMvaWNvbmZvbnQvbWF0ZXJpYWwtaWNvbnMuY3NzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMuY3NzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvc3R5bGVzLmNzcz80NGIyIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRvbUVsZW1lbnRzID0gKCgpID0+IHtcblxuICAvL2hlYWRlclxuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpXG4gIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyXCIpXG4gIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpXG4gIGgxLmNsYXNzTGlzdC5hZGQoXCJsb2dvXCIpXG4gIGgxLnRleHRDb250ZW50ID0gXCJCYXR0bGVzaGlwXCJcbiAgaGVhZGVyLmFwcGVuZENoaWxkKGgxKVxuICBjb25zdCBub3RpZmljYXRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICBub3RpZmljYXRpb25zLmNsYXNzTGlzdC5hZGQoXCJub3RpZmljYXRpb25zXCIpXG4gIGhlYWRlci5hcHBlbmRDaGlsZChub3RpZmljYXRpb25zKVxuICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcbiAgbWVzc2FnZS5jbGFzc0xpc3QuYWRkKFwibWVzc2FnZVwiKVxuICBtZXNzYWdlLnRleHRDb250ZW50ID0gXCJQbGFjZSB0aGUgc2hpcHMgYnkgZHJhZ2dpbmcsIGNoYW5nZSBhbGlnbm1lbnQgYnkgY2xpY2tpbmdcIlxuICBub3RpZmljYXRpb25zLmFwcGVuZENoaWxkKG1lc3NhZ2UpXG5cbiAgLy9tYWluXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWFpblwiKVxuICBtYWluLmNsYXNzTGlzdC5hZGQoXCJtYWluXCIpXG5cbiAgY29uc3QgcGxheWVyQm9hcmQgPSAobmFtZSkgPT4ge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIilcbiAgICBib2FyZC5jbGFzc0xpc3QuYWRkKGAke25hbWV9LWFyZWFgKVxuICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIilcbiAgICBoZWFkaW5nLnRleHRDb250ZW50ID0gYCR7bmFtZSA9PT0gXCJjb21wdXRlclwiID8gXCJDb21wdXRlciBCb2FyZFwiIDogXCJQbGF5ZXIgQm9hcmRcIn1gXG4gICAgY29uc3QgeENvb3JkcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICB4Q29vcmRzLmNsYXNzTGlzdC5hZGQoXCJ4LWNvb3Jkc1wiKVxuICAgIGNvbnN0IHhDb29yZExhYmVscyA9IFtcIkFcIiwgXCJCXCIsIFwiQ1wiLCBcIkRcIiwgXCJFXCIsIFwiRlwiLCBcIkdcIiwgXCJIXCIsIFwiSVwiLCBcIkpcIl1cbiAgICB4Q29vcmRMYWJlbHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IHhOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICAgIHhOYW1lLnRleHRDb250ZW50ID0gaXRlbVxuICAgICAgeENvb3Jkcy5hcHBlbmRDaGlsZCh4TmFtZSlcbiAgICB9KVxuICAgIGNvbnN0IHlDb29yZHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgeUNvb3Jkcy5jbGFzc0xpc3QuYWRkKFwieS1jb29yZHNcIilcbiAgICBjb25zdCB5Q29vcmRMYWJlbHMgPSBbXCIxXCIsIFwiMlwiLCBcIjNcIiwgXCI0XCIsIFwiNVwiLCBcIjZcIiwgXCI3XCIsIFwiOFwiLCBcIjlcIiwgXCIxMFwiXVxuICAgIHlDb29yZExhYmVscy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgeU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICAgICAgeU5hbWUudGV4dENvbnRlbnQgPSBpdGVtXG4gICAgICB5Q29vcmRzLmFwcGVuZENoaWxkKHlOYW1lKVxuICAgIH0pXG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQoeENvb3JkcylcbiAgICBib2FyZC5hcHBlbmRDaGlsZCh5Q29vcmRzKVxuICAgIGJvYXJkLmFwcGVuZENoaWxkKGhlYWRpbmcpXG4gICAgcmV0dXJuIGJvYXJkXG4gIH1cblxuICBtYWluLmFwcGVuZENoaWxkKHBsYXllckJvYXJkKFwicGxheWVyXCIpKVxuICBtYWluLmFwcGVuZENoaWxkKHBsYXllckJvYXJkKFwiY29tcHV0ZXJcIikpXG5cbiAgLy8gZm9ybVxuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIilcbiAgZm9ybS5jbGFzc0xpc3QuYWRkKFwiZm9ybVwiKVxuICBjb25zdCBidG5TdGFydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbiAgYnRuU3RhcnQuY2xhc3NMaXN0LmFkZChcImJ0blwiKVxuICBidG5TdGFydC5jbGFzc0xpc3QuYWRkKFwic3RhcnRcIilcbiAgYnRuU3RhcnQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInN1Ym1pdFwiKVxuICBidG5TdGFydC50ZXh0Q29udGVudCA9IFwiU3RhcnQgR2FtZVwiXG4gIGZvcm0uYXBwZW5kKGJ0blN0YXJ0KVxuICBjb25zdCBidG5SZXNldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbiAgYnRuUmVzZXQuY2xhc3NMaXN0LmFkZChcImJ0blwiKVxuICBidG5SZXNldC5jbGFzc0xpc3QuYWRkKFwicmVzZXRcIilcbiAgYnRuUmVzZXQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKVxuICBidG5SZXNldC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwic3VibWl0XCIpXG4gIGJ0blJlc2V0LnRleHRDb250ZW50ID0gXCJSZXNldCBHYW1lXCJcbiAgZm9ybS5hcHBlbmQoYnRuUmVzZXQpXG5cbiAgLy8gZm9vdGVyXG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIilcbiAgZm9vdGVyLmNsYXNzTGlzdC5hZGQoXCJmb290ZXJcIilcblxuICBmb290ZXIuaW5uZXJIVE1MID0gYFxuICAgIDxwPkNvZGVkIGJ5XG4gICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3JhZmV0YmFzdHVya1wiIHJlbD1cIm5vcmVmZXJyZXIgbm9vcGVuZXJcIiB0YXJnZXQ9XCJfYmxhbmtcIj5SYWZldDwvYT5cbiAgICAgIC1cbiAgICAgIDxhIGhyZWY9XCJodHRwczovL3d3dy50aGVvZGlucHJvamVjdC5jb20vXCIgcmVsPVwibm9yZWZlcnJlciBub29wZW5lclwiIHRhcmdldD1cIl9ibGFua1wiPlRoZSBPZGluIFByb2plY3Q8L2E+XG4gICAgPC9wPlxuICBgXG5cbiAgY29uc3QgZ3JpZCA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBncmlkLmNsYXNzTGlzdC5hZGQobmFtZSlcbiAgICBncmlkLmNsYXNzTGlzdC5hZGQoXCJncmlkXCIpXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbHNcIilcbiAgICAgIGdyaWQuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoMTAsIDMuMnJlbSlgO1xuICAgICAgZ3JpZC5zdHlsZS5ncmlkVGVtcGxhdGVSb3dzID0gYHJlcGVhdCgxMCwgMy4ycmVtKWA7XG4gICAgICBncmlkLmFwcGVuZENoaWxkKGNlbGwpXG4gICAgfVxuXG4gICAgZ3JpZC5jaGlsZE5vZGVzLmZvckVhY2goKGNlbGwsIGkpID0+IHtcbiAgICAgIGNlbGwuc2V0QXR0cmlidXRlKFwiZGF0YS14XCIsIGkgJSAxMCk7XG5cbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMTA7IHkrKykge1xuICAgICAgICBpZiAoaSA+PSB5ICogMTAgJiYgaSA8ICh5ICsgMSkgKiAxMCkgY2VsbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXlcIiwgeSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBncmlkXG4gIH1cblxuICBjb25zdCBnZXRTaGlwc0RPTSA9IChsZW5ndGgsIHN0YXJ0Q29vcmQsIGFsaWdubWVudCwgaWQpID0+IHtcbiAgICBjb25zdCBzaGlwRE9NID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgIHNoaXBET00uY2xhc3NMaXN0LmFkZChcInNoaXBcIilcbiAgICBzaGlwRE9NLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIilcbiAgICBzaGlwRE9NLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgaWQpXG5cbiAgICBpZiAoYWxpZ25tZW50ID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgc2hpcERPTS5zdHlsZS53aWR0aCA9IGAkeyhsZW5ndGggKiAzLjIpIC0gMC4xfXJlbWBcbiAgICAgIHNoaXBET00uc3R5bGUuaGVpZ2h0ID0gYDMuMXJlbWBcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzaGlwRE9NLnN0eWxlLmhlaWdodCA9IGAkeyhsZW5ndGggKiAzLjIpIC0gMC4xfXJlbWBcbiAgICAgIHNoaXBET00uc3R5bGUud2lkdGggPSBgMy4xcmVtYFxuICAgIH1cbiAgICByZXR1cm4geyBzdGFydENvb3JkLCBzaGlwRE9NIH1cbiAgfVxuXG4gIGNvbnN0IG1pc3NlZEF0dGFja0RPTSA9ICgpID0+IHtcbiAgICBjb25zdCBtaXNzZWRBdHRhY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgbWlzc2VkQXR0YWNrLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpXG4gICAgY29uc3QgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICBkb3QuY2xhc3NMaXN0LmFkZChcImRvdFwiKVxuICAgIG1pc3NlZEF0dGFjay5hcHBlbmRDaGlsZChkb3QpXG4gICAgcmV0dXJuIG1pc3NlZEF0dGFja1xuICB9XG5cbiAgY29uc3QgaGl0RE9NID0gKCkgPT4ge1xuICAgIGNvbnN0IGhpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBoaXQuY2xhc3NMaXN0LmFkZChcImhpdFwiKVxuICAgIGhpdC5pbm5lckhUTUwgPSBcIjxzcGFuIGNsYXNzPSdtYXRlcmlhbC1pY29ucy1vdXRsaW5lZCc+Y2xlYXI8L3NwYW4+XCJcbiAgICByZXR1cm4gaGl0XG4gIH1cblxuICBjb25zdCBkaXNhYmxlQm9hcmQgPSAobmFtZSkgPT4ge1xuICAgIGNvbnN0IGRpc2FibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgZGlzYWJsZS5jbGFzc0xpc3QuYWRkKGAke25hbWV9YClcbiAgICBkaXNhYmxlLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlXCIpXG4gICAgcmV0dXJuIGRpc2FibGVcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaGVhZGVyLFxuICAgIG1haW4sXG4gICAgZm9ybSxcbiAgICBmb290ZXIsXG4gICAgZ3JpZCxcbiAgICBnZXRTaGlwc0RPTSxcbiAgICBtaXNzZWRBdHRhY2tET00sXG4gICAgaGl0RE9NLFxuICAgIGRpc2FibGVCb2FyZFxuICB9XG59KSgpXG5cblxuZXhwb3J0IHsgZG9tRWxlbWVudHMgfSIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9TaGlwXCJcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBsZXQgYm9hcmQgPSBBcnJheSgxMCkuZmlsbCgpLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbCh7IGhhc1NoaXA6IGZhbHNlIH0pKVxuXG4gIHJldHVybiB7XG4gICAgZ2V0Qm9hcmQ6ICgpID0+IGJvYXJkLFxuICAgIHJlbW92ZUJvYXJkOiAoKSA9PiB7XG4gICAgICBib2FyZCA9IEFycmF5KDEwKS5maWxsKCkubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKHsgaGFzU2hpcDogZmFsc2UgfSkpXG4gICAgfSxcbiAgICBwbGFjZVNoaXA6IChpZCwgbGVuZ3RoLCBjb29yZGluYXRlcykgPT4ge1xuICAgICAgY29uc3Qgc2hpcCA9IFNoaXAoaWQsIGxlbmd0aCwgY29vcmRpbmF0ZXMpXG5cbiAgICAgIGNvb3JkaW5hdGVzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBib2FyZFtlbFswXV1bZWxbMV1dID0ge1xuICAgICAgICAgIGhhc1NoaXA6IHRydWUsXG4gICAgICAgICAgc2hpcFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHJlY2VpdmVBdHRhY2s6IChmaXJlKSA9PiB7XG4gICAgICBjb25zdCB4ID0gZmlyZVswXVxuICAgICAgY29uc3QgeSA9IGZpcmVbMV1cblxuICAgICAgaWYgKGJvYXJkW3hdW3ldLmhhc1NoaXApIHtcbiAgICAgICAgYm9hcmRbeF1beV0uc2hpcC5pc0hpdChmaXJlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGJvYXJkW3hdW3ldID0geyBcbiAgICAgICAgICAuLi5ib2FyZFt4XVt5XSxcbiAgICAgICAgICBtaXNzZWRTaG90OiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH0sXG4gICAgY2hlY2tSZXN1bHQ6ICgpID0+IHtcbiAgICAgIHJldHVybiBib2FyZFxuICAgICAgICAuZmxhdCgpXG4gICAgICAgIC5maWx0ZXIoZWwgPT4gZWwuaGFzU2hpcClcbiAgICAgICAgLm1hcChlbCA9PiBlbC5zaGlwKVxuICAgICAgICAuZXZlcnkoZWwgPT4gZWwuaXNTdW5rKCkpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9IiwiaW1wb3J0IHsgY3JlYXRlRmxlZXQgfSBmcm9tIFwiLi4vaGVscGVyRnVuY3NcIlxuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vR2FtZWJvYXJkXCJcblxuY29uc3QgUGxheWVyID0gKG5hbWUpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBHYW1lYm9hcmQoKVxuICBjb25zdCBmbGVldCA9IGNyZWF0ZUZsZWV0KClcblxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgYm9hcmQsXG4gICAgZmxlZXQsXG4gICAgYXR0YWNrOiAoYm9hcmQsIGZpcmUpID0+IHtcbiAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soZmlyZSlcbiAgICB9LFxuICAgIHBsYWNlRmxlZXQ6IChmbGVldEFycmF5KSA9PiB7XG4gICAgICBmbGVldEFycmF5LmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgIGNvbnN0IHsgaWQsIGxlbmd0aCwgY29vcmRpbmF0ZXMgfSA9IHNoaXBcbiAgICAgICAgYm9hcmQucGxhY2VTaGlwKGlkLCBsZW5ndGgsIGNvb3JkaW5hdGVzKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgUGxheWVyIH0iLCJjb25zdCBTaGlwID0gKGlkLCBsZW5ndGgsIGNvb3JkaW5hdGVzKSA9PiB7XG4gIGNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXMubWFwKGNvb3JkaW5hdGUgPT4ge1xuICAgIHJldHVybiB7IHg6IGNvb3JkaW5hdGVbMF0sIHk6IGNvb3JkaW5hdGVbMV0sIGhpdDogZmFsc2UgfVxuICB9KVxuXG4gIGNvbnN0IGlzSGl0ID0gZmlyZSA9PiB7XG4gICAgY29vcmRpbmF0ZXMubWFwKGNvb3JkID0+IHtcbiAgICAgIGNvb3JkLnggPT09IGZpcmVbMF0gJiYgY29vcmQueSA9PT0gZmlyZVsxXVxuICAgICAgICA/IGNvb3JkLmhpdCA9IHRydWVcbiAgICAgICAgOiBudWxsXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IGNvb3JkaW5hdGVzLmV2ZXJ5KGNvb3JkID0+IGNvb3JkLmhpdClcblxuICByZXR1cm4ge1xuICAgIGlkLFxuICAgIGxlbmd0aCxcbiAgICBjb29yZGluYXRlcyxcbiAgICBpc0hpdCxcbiAgICBpc1N1bmtcbiAgfVxufVxuXG5leHBvcnQgeyBTaGlwIH1cbiIsImltcG9ydCB7IHVpQ29udHJvbGxlciBhcyB1aSB9IGZyb20gXCIuL3VpQ29udHJvbGxlclwiXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9mYWN0b3JpZXMvUGxheWVyXCJcbmltcG9ydCB7IHJhbmRvbWl6ZSwgYm9hcmRDb29yZHMsIHRhcmdldENvb3JkcywgZHJvcHBlZFNoaXAsIGNoZWNrQXZhaWxhYmlsaXR5IH0gZnJvbSBcIi4vaGVscGVyRnVuY3NcIlxuXG5jb25zdCBnYW1lID0gKCgpID0+IHtcbiAgY29uc3QgcDEgPSBQbGF5ZXIoXCJwbGF5ZXJcIilcbiAgY29uc3QgcDIgPSBQbGF5ZXIoXCJjb21wdXRlclwiKVxuICB1aS5jcmVhdGVHcmlkKHAxLm5hbWUpXG4gIHVpLmNyZWF0ZUdyaWQocDIubmFtZSlcblxuICBjb25zdCBzZXRHYW1lID0gKGZsZWV0MSwgZmxlZXQyKSA9PiB7XG4gICAgcDEucGxhY2VGbGVldChmbGVldDEpXG4gICAgcDIucGxhY2VGbGVldChmbGVldDIpXG4gICAgdWkuc2hvd1NoaXBzKGZsZWV0MSwgcDEubmFtZSlcbiAgfVxuXG4gIGNvbnN0IHBsYXllck1vdmUgPSBlID0+IHtcbiAgICBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZChcImZpcmVkXCIpXG4gICAgY29uc3QgeCA9IE51bWJlcihlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC54KVxuICAgIGNvbnN0IHkgPSBOdW1iZXIoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQueSlcbiAgICBjb25zdCBmaXJlID0gW3gsIHldXG4gICAgcDEuYXR0YWNrKHAyLmJvYXJkLCBmaXJlKVxuXG4gICAgY29uc3QgYm9hcmRBcnJheSA9IHAyLmJvYXJkLmdldEJvYXJkKClcblxuICAgIGxldCBzdW5rU2hpcElkcyA9IGJvYXJkQXJyYXlcbiAgICAgIC5mbGF0KClcbiAgICAgIC5maWx0ZXIoZWwgPT4gZWwuaGFzU2hpcClcbiAgICAgIC5tYXAoZWwgPT4gZWwuc2hpcClcbiAgICAgIC5maWx0ZXIoc2hpcCA9PiB7XG4gICAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgcmV0dXJuIHNoaXBcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5tYXAoc2hpcCA9PiBzaGlwLmlkKTtcblxuICAgIHN1bmtTaGlwSWRzID0gWy4uLm5ldyBTZXQoc3Vua1NoaXBJZHMpXVxuXG4gICAgY29uc3Qgc3Vua1NoaXBzID0gcDIuZmxlZXQuZmlsdGVyKHNoaXAgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdW5rU2hpcElkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc3Vua1NoaXBJZHNbaV0gPT09IHNoaXAuaWQpIHtcbiAgICAgICAgICByZXR1cm4gc2hpcFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICB1aS5yZW1vdmVTaGlwcyhwMi5uYW1lKVxuICAgIHVpLnNob3dTaGlwcyhzdW5rU2hpcHMsIHAyLm5hbWUpXG5cblxuICAgIGlmIChib2FyZEFycmF5W3hdW3ldLmhhc1NoaXApIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZEFycmF5W3hdW3ldLnNoaXBcbiAgICAgIGNvbnN0IGNlbGxzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3AyLm5hbWV9IC5jZWxsc2ApXVxuICAgICAgY29uc3QgdGFyZ2V0cyA9IHRhcmdldENvb3JkcyhzaGlwLCBmaXJlKVxuXG4gICAgICB0YXJnZXRzLmZvckVhY2godGFyZ2V0ID0+IHtcbiAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICBpZiAoY2VsbC5kYXRhc2V0LnggPT0gdGFyZ2V0WzBdICYmIGNlbGwuZGF0YXNldC55ID09IHRhcmdldFsxXSkge1xuICAgICAgICAgICAgY2VsbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheWVyTW92ZSlcbiAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImZpcmVkXCIpXG4gICAgICAgICAgICB1aS5tYXJrQXR0YWNrKGJvYXJkQXJyYXksIHRhcmdldCwgY2VsbClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHVpLm1hcmtBdHRhY2soYm9hcmRBcnJheSwgZmlyZSwgZS5jdXJyZW50VGFyZ2V0KVxuICAgIH1cblxuICAgIGlmIChwMi5ib2FyZC5jaGVja1Jlc3VsdCgpKSB7XG4gICAgICB1aS5zaG93TWVzc2FnZShcIkdhbWUgb3ZlciEgWW91IHdpbi5cIilcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3AyLm5hbWV9IC5jZWxsc2ApLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgIGNlbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBsYXllck1vdmUpXG4gICAgICB9KVxuICAgICAgdWkuZW5hYmxlQm9hcmQocDEubmFtZSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHVpLmRpc2FibGVCb2FyZChwMi5uYW1lKVxuICAgIHVpLmVuYWJsZUJvYXJkKHAxLm5hbWUpXG4gICAgdWkuc2hvd01lc3NhZ2UoXCJDb21wdXRlcidzIHR1cm5cIilcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGFpTW92ZSgpXG4gICAgfSwgMzAwKTtcbiAgfVxuXG4gIGNvbnN0IGFsbENvb3JkcyA9IGJvYXJkQ29vcmRzKClcbiAgY29uc3QgYWlNb3ZlID0gKCkgPT4ge1xuICAgIGNvbnN0IHJhbmRvbSA9IHJhbmRvbWl6ZSgwLCBhbGxDb29yZHMubGVuZ3RoIC0gMSlcbiAgICBjb25zdCBmaXJlID0gYWxsQ29vcmRzW3JhbmRvbV1cbiAgICBwMi5hdHRhY2socDEuYm9hcmQsIGZpcmUpXG5cbiAgICBjb25zdCBib2FyZEFycmF5ID0gcDEuYm9hcmQuZ2V0Qm9hcmQoKVxuXG4gICAgaWYgKGJvYXJkQXJyYXlbZmlyZVswXV1bZmlyZVsxXV0uaGFzU2hpcCkge1xuICAgICAgY29uc3Qgc2hpcCA9IGJvYXJkQXJyYXlbZmlyZVswXV1bZmlyZVsxXV0uc2hpcFxuICAgICAgY29uc3QgY2VsbHMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7cDEubmFtZX0gLmNlbGxzYCldXG5cbiAgICAgIGNvbnN0IHRhcmdldHMgPSB0YXJnZXRDb29yZHMoc2hpcCwgZmlyZSlcblxuICAgICAgdGFyZ2V0cy5mb3JFYWNoKHRhcmdldCA9PiB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gYWxsQ29vcmRzLmZpbmRJbmRleChjb29yZCA9PiBjb29yZFswXSA9PT0gdGFyZ2V0WzBdICYmIGNvb3JkWzFdID09PSB0YXJnZXRbMV0pXG4gICAgICAgIGluZGV4ID49IDAgPyBhbGxDb29yZHMuc3BsaWNlKGluZGV4LCAxKSA6IG51bGxcblxuICAgICAgICBjZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgIGlmIChjZWxsLmRhdGFzZXQueCA9PSB0YXJnZXRbMF0gJiYgY2VsbC5kYXRhc2V0LnkgPT0gdGFyZ2V0WzFdKSB7XG4gICAgICAgICAgICB1aS5tYXJrQXR0YWNrKGJvYXJkQXJyYXksIHRhcmdldCwgY2VsbClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGFsbENvb3Jkcy5zcGxpY2UocmFuZG9tLCAxKVxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7cDEubmFtZX0gLmNlbGxzYCkuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgTnVtYmVyKGNlbGwuZGF0YXNldC54KSA9PT0gZmlyZVswXSAmJiBOdW1iZXIoY2VsbC5kYXRhc2V0LnkpID09PSBmaXJlWzFdXG4gICAgICAgICAgPyB1aS5tYXJrQXR0YWNrKGJvYXJkQXJyYXksIGZpcmUsIGNlbGwpXG4gICAgICAgICAgOiBudWxsXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChwMS5ib2FyZC5jaGVja1Jlc3VsdCgpKSB7XG4gICAgICB1aS5zaG93TWVzc2FnZShcIkdhbWUgb3ZlciEgQ29tcHV0ZXIgd2lucy5cIilcbiAgICAgIHVpLmVuYWJsZUJvYXJkKHAyLm5hbWUpXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtwMi5uYW1lfSAuY2VsbHNgKS5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICBjZWxsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5ZXJNb3ZlKVxuICAgICAgfSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHVpLmRpc2FibGVCb2FyZChwMS5uYW1lKVxuICAgIHVpLmVuYWJsZUJvYXJkKHAyLm5hbWUpXG4gICAgdWkuc2hvd01lc3NhZ2UoXCJZb3VyIHR1cm5cIilcbiAgfVxuXG4gIGNvbnN0IHN0YXJ0R2FtZSA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgdWkuZGlzYWJsZUJvYXJkKHAxLm5hbWUpXG4gICAgdWkuZGlzYWJsZUJvYXJkKHAyLm5hbWUpXG4gICAgdWkudG9nZ2xlQnRucygpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7cDIubmFtZX0gPiAuY2VsbHNgKS5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheWVyTW92ZSwgeyBvbmNlOiB0cnVlIH0pXG4gICAgfSlcbiAgICBjb25zdCBwbGF5ZXIgPSByYW5kb21pemUoMCwgMSkgPT09IDAgPyBwMSA6IHAyXG4gICAgaWYgKHBsYXllciA9PT0gcDIpIHtcbiAgICAgIHVpLnNob3dNZXNzYWdlKFwiQ29tcHV0ZXIncyB0dXJuXCIpXG4gICAgICB1aS5lbmFibGVCb2FyZChwMS5uYW1lKVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGFpTW92ZSgpXG4gICAgICB9LCA1MDApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHVpLnNob3dNZXNzYWdlKFwiWW91ciB0dXJuXCIpXG4gICAgICB1aS5lbmFibGVCb2FyZChwMi5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlc2V0R2FtZSA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdFxuICAgIHVpLmVuYWJsZUJvYXJkKHAxLm5hbWUpXG4gICAgdWkuZW5hYmxlQm9hcmQocDIubmFtZSlcbiAgICB1aS5yZW1vdmVTaGlwcyhwMS5uYW1lKVxuICAgIHNldEdhbWUocDEuZmxlZXQsIHAyLmZsZWV0KVxuICB9XG5cbiAgY29uc3QgbG9hZEV2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3AxLm5hbWV9IC5zaGlwYCkuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnU3RhcnQpXG4gICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIGRyYWdFbmQpXG4gICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhbGlnblNoaXApXG4gICAgfSlcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3AxLm5hbWV9ID4gLmNlbGxzYCkuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGRyYWdPdmVyKVxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBkcmFnRHJvcClcbiAgICB9KVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhcnRHYW1lKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlc2V0R2FtZSlcbiAgfVxuXG4gIGNvbnN0IGRyYWdTdGFydCA9IChlKSA9PiB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhvbGRcIilcbiAgfVxuICBjb25zdCBkcmFnRW5kID0gKGUpID0+IHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiaG9sZFwiKVxuICB9XG4gIGNvbnN0IGRyYWdPdmVyID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBjb25zdCBob2xkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob2xkXCIpXG4gICAgZS5jdXJyZW50VGFyZ2V0LmFwcGVuZChob2xkKVxuICB9XG4gIGNvbnN0IGRyYWdEcm9wID0gKCkgPT4ge1xuICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbGRcIilcbiAgICBjb25zdCBpZCA9IE51bWJlcihjZWxsLmRhdGFzZXQuaWQpXG4gICAgY29uc3QgeCA9IE51bWJlcihjZWxsLnBhcmVudEVsZW1lbnQuZGF0YXNldC54KVxuICAgIGNvbnN0IHkgPSBOdW1iZXIoY2VsbC5wYXJlbnRFbGVtZW50LmRhdGFzZXQueSlcbiAgICBjb25zdCBjb29yZCA9IFt4LCB5XVxuXG4gICAgbGV0IG5ld1NoaXBcbiAgICBwMS5mbGVldCA9IHAxLmZsZWV0Lm1hcChzaGlwID0+IHtcbiAgICAgIGlmIChpZCA9PT0gc2hpcC5pZCkge1xuICAgICAgICBjb25zdCBuYW1lID0gc2hpcC5uYW1lXG4gICAgICAgIG5ld1NoaXAgPSB7IGlkLCBuYW1lLCAuLi5kcm9wcGVkU2hpcChzaGlwLmxlbmd0aCwgY29vcmQsIHNoaXAuYWxpZ25tZW50KSB9XG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBjaGVja0F2YWlsYWJpbGl0eShwMS5mbGVldCwgbmV3U2hpcClcbiAgICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgICByZXR1cm4gbmV3U2hpcFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHVpLnNob3dNZXNzYWdlKFwiTm90IGF2YWlsYWJsZSFcIiwgXCJhbGFybVwiKVxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdWkuc2hvd01lc3NhZ2UoXCJQbGFjZSB0aGUgc2hpcHMgYnkgZHJhZ2dpbmcsIGNoYW5nZSBhbGlnbm1lbnQgYnkgY2xpY2tpbmdcIilcbiAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICByZXR1cm4gc2hpcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgICB9XG4gICAgfSlcblxuICAgIHAxLmJvYXJkLnJlbW92ZUJvYXJkKClcbiAgICB1aS5yZW1vdmVTaGlwcyhwMS5uYW1lKVxuICAgIHAxLnBsYWNlRmxlZXQocDEuZmxlZXQpXG4gICAgdWkuc2hvd1NoaXBzKHAxLmZsZWV0LCBwMS5uYW1lKVxuICAgIGxvYWRFdmVudExpc3RlbmVycygpXG4gIH1cblxuICBjb25zdCBhbGlnblNoaXAgPSAoZSkgPT4ge1xuICAgIGNvbnN0IGlkID0gTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuaWQpXG4gICAgY29uc3QgeCA9IE51bWJlcihlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQueClcbiAgICBjb25zdCB5ID0gTnVtYmVyKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC55KVxuICAgIGNvbnN0IGNvb3JkID0gW3gsIHldXG5cbiAgICBsZXQgbmV3U2hpcFxuICAgIHAxLmZsZWV0ID0gcDEuZmxlZXQubWFwKHNoaXAgPT4ge1xuICAgICAgaWYgKGlkID09PSBzaGlwLmlkKSB7XG4gICAgICAgIGNvbnN0IGFsaWdubWVudCA9IHNoaXAuYWxpZ25tZW50ID09PSBcInZlcnRpY2FsXCIgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIlxuICAgICAgICBjb25zdCBuYW1lID0gc2hpcC5uYW1lXG4gICAgICAgIG5ld1NoaXAgPSB7IGlkLCBuYW1lLCAuLi5kcm9wcGVkU2hpcChzaGlwLmxlbmd0aCwgY29vcmQsIGFsaWdubWVudCkgfVxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gY2hlY2tBdmFpbGFiaWxpdHkocDEuZmxlZXQsIG5ld1NoaXApXG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgcmV0dXJuIG5ld1NoaXBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB1aS5zaG93TWVzc2FnZShcIk5vdCBhdmFpbGFibGUhXCIpXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB1aS5zaG93TWVzc2FnZShcIlBsYWNlIHRoZSBzaGlwcyBieSBkcmFnZ2luZywgY2hhbmdlIGFsaWdubWVudCBieSBjbGlja2luZ1wiKVxuICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgIHJldHVybiBzaGlwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gc2hpcFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBwMS5ib2FyZC5yZW1vdmVCb2FyZCgpXG4gICAgdWkucmVtb3ZlU2hpcHMocDEubmFtZSlcbiAgICBzZXRHYW1lKHAxLmZsZWV0LCBwMi5mbGVldClcbiAgICBsb2FkRXZlbnRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiAoKSA9PiB7XG4gICAgICB1aS5sb2FkRE9NKClcbiAgICAgIHNldEdhbWUocDEuZmxlZXQsIHAyLmZsZWV0KVxuICAgICAgbG9hZEV2ZW50TGlzdGVuZXJzKClcbiAgICB9XG4gIH1cbn0pKClcblxuZXhwb3J0IHsgZ2FtZSB9IiwiY29uc3QgcmFuZG9taXplID0gKG1pbiwgbWF4KSA9PiB7XG4gIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xuICAvLyBNaW4gJiBNYXggYXJlIGluY2x1c2l2ZVxufVxuXG5jb25zdCBib2FyZENvb3JkcyA9ICgpID0+IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sICh2LCBpKSA9PiB7XG4gIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCB9LCAoYSwgaikgPT4gW2ksIGpdKVxufSkuZmxhdCgpO1xuXG5jb25zdCBvY2N1cGllZENvb3JkcyA9IChhcnIpID0+IHtcbiAgbGV0IGNvb3JkcyA9IFtdXG4gIGZvciAobGV0IGkgPSAtMTsgaSA8IDI7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAtMTsgaiA8IDI7IGorKykge1xuICAgICAgLy8gaWYgKGkgPT09IDAgJiYgaiA9PT0gMCkge1xuICAgICAgLy8gICBudWxsXG4gICAgICAvLyB9XG4gICAgICBpZiAoYXJyWzBdICsgaSA8IDAgfHwgKGFyclswXSArIGkpID4gOSkge1xuICAgICAgICBudWxsXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChhcnJbMV0gKyBqIDwgMCB8fCAoYXJyWzFdICsgaikgPiA5KSB7XG4gICAgICAgIG51bGxcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb29yZHMgPSBbLi4uY29vcmRzLCBbYXJyWzBdICsgaSwgYXJyWzFdICsgal1dXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBbLi4uY29vcmRzXVxufVxuXG5jb25zdCBoaXRzQmVmb3JlU3VuayA9IChhcnIpID0+IHtcbiAgY29uc3QgY2VsbHMgPSBbXG4gICAgW2FyclswXSAtIDEsIGFyclsxXSAtIDFdLFxuICAgIFthcnJbMF0sIGFyclsxXV0sXG4gICAgW2FyclswXSAtIDEsIGFyclsxXSArIDFdLFxuICAgIFthcnJbMF0gKyAxLCBhcnJbMV0gLSAxXSxcbiAgICBbYXJyWzBdICsgMSwgYXJyWzFdICsgMV0sXG4gIF0uZmlsdGVyKGl0ZW0gPT4gaXRlbVswXSA+PSAwICYmIGl0ZW1bMV0gPj0gMClcbiAgICAuZmlsdGVyKGl0ZW0gPT4gaXRlbVswXSA8IDEwICYmIGl0ZW1bMV0gPCAxMClcbiAgcmV0dXJuIGNlbGxzXG59XG5cbmNvbnN0IHRhcmdldENvb3JkcyA9IChzaGlwLCBmaXJlKSA9PiB7XG4gIGxldCB0YXJnZXRzXG4gIGlmIChzaGlwLmxlbmd0aCA9PT0gMSAmJiBzaGlwLmlzU3VuaygpKSB7XG4gICAgdGFyZ2V0cyA9IHNoaXAuY29vcmRpbmF0ZXMubWFwKGl0ZW0gPT4ge1xuICAgICAgcmV0dXJuIG9jY3VwaWVkQ29vcmRzKFtpdGVtLngsIGl0ZW0ueV0pO1xuICAgIH0pWzBdXG4gIH1cbiAgZWxzZSBpZiAoc2hpcC5sZW5ndGggPiAxICYmICFzaGlwLmlzU3VuaygpKSB7XG4gICAgdGFyZ2V0cyA9IGhpdHNCZWZvcmVTdW5rKGZpcmUpXG4gIH1cbiAgZWxzZSBpZiAoc2hpcC5sZW5ndGggPiAxICYmIHNoaXAuaXNTdW5rKCkpIHtcbiAgICB0YXJnZXRzID0gQXJyYXkuZnJvbShuZXcgU2V0KHNoaXAuY29vcmRpbmF0ZXNcbiAgICAgIC5tYXAoaXRlbSA9PiBvY2N1cGllZENvb3JkcyhbaXRlbS54LCBpdGVtLnldKSlcbiAgICAgIC5mbGF0KClcbiAgICAgIC5tYXAoSlNPTi5zdHJpbmdpZnkpKSwgSlNPTi5wYXJzZSlcbiAgICAgIC5zb3J0KClcbiAgfVxuICByZXR1cm4gdGFyZ2V0c1xufVxuXG5jb25zdCBhbGxDZWxscyA9IChjb29yZGluYXRlcykgPT4ge1xuICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGNvb3JkaW5hdGVzXG4gICAgLm1hcChlbCA9PiBvY2N1cGllZENvb3JkcyhlbCkpXG4gICAgLmZsYXQoKVxuICAgIC5tYXAoSlNPTi5zdHJpbmdpZnkpKSwgSlNPTi5wYXJzZSlcbiAgICAuc29ydCgpXG59XG5cblxuY29uc3Qgc3RhcnRJbmZvID0gW1xuICB7XG4gICAgaWQ6IDAsXG4gICAgbmFtZTogXCJDYXJyaWVyXCIsXG4gICAgbGVuZ3RoOiA0XG4gIH0sXG4gIHtcbiAgICBpZDogMSxcbiAgICBuYW1lOiBcIkJhdHRsZXNoaXBcIixcbiAgICBsZW5ndGg6IDNcbiAgfSxcbiAge1xuICAgIGlkOiAyLFxuICAgIG5hbWU6IFwiQ3J1aXNlclwiLFxuICAgIGxlbmd0aDogM1xuICB9LFxuICB7XG4gICAgaWQ6IDMsXG4gICAgbmFtZTogXCJTdWJtYXJpbmVcIixcbiAgICBsZW5ndGg6IDJcbiAgfSxcbiAge1xuICAgIGlkOiA0LFxuICAgIG5hbWU6IFwiU3VibWFyaW5lXCIsXG4gICAgbGVuZ3RoOiAyXG4gIH0sXG4gIHtcbiAgICBpZDogNSxcbiAgICBuYW1lOiBcIkRlc3Ryb3llclwiLFxuICAgIGxlbmd0aDogMVxuICB9LFxuICB7XG4gICAgaWQ6IDYsXG4gICAgbmFtZTogXCJEZXN0cm95ZXJcIixcbiAgICBsZW5ndGg6IDFcbiAgfSxcbiAge1xuICAgIGlkOiA3LFxuICAgIG5hbWU6IFwiRGVzdHJveWVyXCIsXG4gICAgbGVuZ3RoOiAxXG4gIH0sXG4gIHtcbiAgICBpZDogOCxcbiAgICBuYW1lOiBcIkRlc3Ryb3llclwiLFxuICAgIGxlbmd0aDogMVxuICB9LFxuXVxuXG5jb25zdCBjcmVhdGVTaGlwQ29vcmRzID0gKGFycmF5LCBsZW5ndGgpID0+IHtcbiAgbGV0IGFsaWdubWVudFxuICBsZXQgc3RhcnRDb29yZFxuICBsZXQgY29vcmRpbmF0ZXMgPSBbXVxuICBsZXQgdmFsaWQgPSBmYWxzZVxuXG4gIHdoaWxlICghdmFsaWQpIHtcbiAgICB2YWxpZCA9IHRydWVcbiAgICBhbGlnbm1lbnQgPSByYW5kb21pemUoMCwgMSkgPT09IDAgPyBcInZlcnRpY2FsXCIgOiBcImhvcml6b250YWxcIlxuICAgIGNvbnN0IHJhbmRvbSA9IHJhbmRvbWl6ZSgwLCBhcnJheS5sZW5ndGggLSAxKVxuICAgIHN0YXJ0Q29vcmQgPSBhcnJheVtyYW5kb21dXG4gICAgaWYgKGFsaWdubWVudCA9PT0gXCJob3Jpem9udGFsXCIgJiYgc3RhcnRDb29yZFswXSArIGxlbmd0aCA+IDkpIHtcbiAgICAgIHZhbGlkID0gZmFsc2VcbiAgICB9XG4gICAgZWxzZSBpZiAoYWxpZ25tZW50ID09PSBcInZlcnRpY2FsXCIgJiYgc3RhcnRDb29yZFsxXSArIGxlbmd0aCA+IDkpIHtcbiAgICAgIHZhbGlkID0gZmFsc2VcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsZXQgbmV4dENvb3JkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhbGlnbm1lbnQgPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgbmV4dENvb3JkID0gW3N0YXJ0Q29vcmRbMF0gKyBpLCBzdGFydENvb3JkWzFdXVxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gWy4uLmNvb3JkaW5hdGVzLCBuZXh0Q29vcmRdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbmV4dENvb3JkID0gW3N0YXJ0Q29vcmRbMF0sIHN0YXJ0Q29vcmRbMV0gKyBpXVxuICAgICAgICAgIGNvb3JkaW5hdGVzID0gWy4uLmNvb3JkaW5hdGVzLCBuZXh0Q29vcmRdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxlbmd0aCxcbiAgICBhbGlnbm1lbnQsXG4gICAgc3RhcnRDb29yZCxcbiAgICBjb29yZGluYXRlc1xuICB9XG59XG5cbmNvbnN0IGNyZWF0ZUZsZWV0ID0gKCkgPT4ge1xuICBsZXQgYXZhaWxhYmxlQ29vcmRzID0gYm9hcmRDb29yZHMoKVxuICBsZXQgdXNlZENvb3JkcyA9IFtdXG4gIGNvbnN0IGZsZWV0ID0gc3RhcnRJbmZvLm1hcChpbmZvID0+IHtcbiAgICBjb25zdCBpZCA9IGluZm8uaWRcbiAgICBjb25zdCBuYW1lID0gaW5mby5uYW1lXG4gICAgbGV0IHNoaXBcbiAgICBsZXQgc2hpcENvb3Jkc1xuICAgIGxldCB2YWxpZCA9IGZhbHNlXG5cbiAgICB3aGlsZSAoIXZhbGlkKSB7XG4gICAgICB2YWxpZCA9IHRydWVcbiAgICAgIHNoaXAgPSBjcmVhdGVTaGlwQ29vcmRzKGF2YWlsYWJsZUNvb3JkcywgaW5mby5sZW5ndGgpXG4gICAgICBjb25zdCB7IGNvb3JkaW5hdGVzIH0gPSBzaGlwXG4gICAgICBzaGlwQ29vcmRzID0gYWxsQ2VsbHMoY29vcmRpbmF0ZXMpXG5cbiAgICAgIGNvbnN0IG92ZXJsYXAgPSBzaGlwLmNvb3JkaW5hdGVzLnNvbWUoZWwgPT4ge1xuICAgICAgICByZXR1cm4gdXNlZENvb3Jkcy5zb21lKGNvb3JkID0+IGNvb3JkWzBdID09PSBlbFswXSAmJiBjb29yZFsxXSA9PT0gZWxbMV0pXG4gICAgICB9KVxuXG4gICAgICBpZiAob3ZlcmxhcCkge1xuICAgICAgICB2YWxpZCA9IGZhbHNlXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdXNlZENvb3JkcyA9IFsuLi51c2VkQ29vcmRzLCAuLi5zaGlwQ29vcmRzXVxuXG4gICAgICAgIHVzZWRDb29yZHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBhdmFpbGFibGVDb29yZHMuZmluZEluZGV4KGNvb3JkID0+IGNvb3JkWzBdID09PSBlbFswXSAmJiBjb29yZFsxXSA9PT0gZWxbMV0pXG4gICAgICAgICAgaW5kZXggPiAtMVxuICAgICAgICAgICAgPyBhdmFpbGFibGVDb29yZHMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiB7IGlkLCBuYW1lLCAuLi5zaGlwIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfSlcbiAgcmV0dXJuIGZsZWV0XG59XG5cbmNvbnN0IGRyb3BwZWRTaGlwID0gKGxlbmd0aCwgc3RhcnRDb29yZCwgYWxpZ25tZW50KSA9PiB7XG4gIGxldCBjb29yZGluYXRlcyA9IFtdXG4gIGxldCBuZXh0Q29vcmRcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChhbGlnbm1lbnQgPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICBuZXh0Q29vcmQgPSBbc3RhcnRDb29yZFswXSArIGksIHN0YXJ0Q29vcmRbMV1dXG4gICAgICBjb29yZGluYXRlcyA9IFsuLi5jb29yZGluYXRlcywgbmV4dENvb3JkXVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG5leHRDb29yZCA9IFtzdGFydENvb3JkWzBdLCBzdGFydENvb3JkWzFdICsgaV1cbiAgICAgIGNvb3JkaW5hdGVzID0gWy4uLmNvb3JkaW5hdGVzLCBuZXh0Q29vcmRdXG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgbGVuZ3RoLFxuICAgIHN0YXJ0Q29vcmQsXG4gICAgYWxpZ25tZW50LFxuICAgIGNvb3JkaW5hdGVzXG4gIH1cbn1cblxuY29uc3QgY2hlY2tBdmFpbGFiaWxpdHkgPSAoZmxlZXQsIG5ld1NoaXApID0+IHtcbiAgbGV0IHVuYXZhaWxhYmxlQ29vcmRzID0gW11cbiAgY29uc3Qgb3RoZXJTaGlwcyA9IGZsZWV0LmZpbHRlcihzaGlwID0+IG5ld1NoaXAuaWQgIT09IHNoaXAuaWQpXG4gIG90aGVyU2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICBjb25zdCBzaGlwQ29vcmRzID0gYWxsQ2VsbHMoc2hpcC5jb29yZGluYXRlcylcbiAgICB1bmF2YWlsYWJsZUNvb3JkcyA9IFsuLi51bmF2YWlsYWJsZUNvb3JkcywgLi4uc2hpcENvb3Jkc11cblxuICAgIHVuYXZhaWxhYmxlQ29vcmRzID0gQXJyYXkuZnJvbShuZXcgU2V0KHVuYXZhaWxhYmxlQ29vcmRzLm1hcChKU09OLnN0cmluZ2lmeSkpLCBKU09OLnBhcnNlKS5zb3J0KClcbiAgfSlcblxuICBjb25zdCBvdmVybGFwID0gbmV3U2hpcC5jb29yZGluYXRlcy5zb21lKGVsID0+IHtcbiAgICByZXR1cm4gdW5hdmFpbGFibGVDb29yZHMuc29tZShjb29yZCA9PiBjb29yZFswXSA9PT0gZWxbMF0gJiYgY29vcmRbMV0gPT09IGVsWzFdKVxuICB9KVxuXG4gIGNvbnN0IG91dE9mR3JpZCA9IG5ld1NoaXAuY29vcmRpbmF0ZXMuc29tZShlbCA9PiBlbFswXSA+IDkgfHwgZWwgWzFdID4gOSlcblxuICBjb25zdCBpc1ZhbGlkID0gIShvdmVybGFwIHx8IG91dE9mR3JpZClcblxuICByZXR1cm4gaXNWYWxpZFxufVxuXG5leHBvcnQge1xuICByYW5kb21pemUsXG4gIGJvYXJkQ29vcmRzLFxuICB0YXJnZXRDb29yZHMsXG4gIGNyZWF0ZVNoaXBDb29yZHMsXG4gIGNyZWF0ZUZsZWV0LFxuICBkcm9wcGVkU2hpcCxcbiAgY2hlY2tBdmFpbGFiaWxpdHlcbn0iLCJpbXBvcnQgeyBkb21FbGVtZW50cyB9IGZyb20gXCIuL2RvbVwiXG5cbmNvbnN0IHVpQ29udHJvbGxlciA9ICgoKSA9PiB7XG5cbiAgcmV0dXJuIHtcbiAgICBkaXNhYmxlQm9hcmQ6IChuYW1lKSA9PiB7XG4gICAgICBjb25zdCBkaXNhYmxlID0gZG9tRWxlbWVudHMuZGlzYWJsZUJvYXJkKG5hbWUpXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtuYW1lfS1hcmVhYCkuYXBwZW5kQ2hpbGQoZGlzYWJsZSlcbiAgICB9LFxuICAgIGVuYWJsZUJvYXJkOiAobmFtZSkgPT4ge1xuICAgICAgY29uc3QgZGlzYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7bmFtZX0gZGlzYWJsZWApWzBdXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtuYW1lfS1hcmVhYCkucmVtb3ZlQ2hpbGQoZGlzYWJsZSlcbiAgICB9LFxuICAgIHNob3dNZXNzYWdlOiAobWVzc2FnZSkgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlXCIpLnRleHRDb250ZW50ID0gbWVzc2FnZVxuICAgIH0sXG4gICAgbWFya0F0dGFjazogKGJvYXJkLCBmaXJlLCBjZWxsKSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBib2FyZFtmaXJlWzBdXVtmaXJlWzFdXVxuICAgICAgaWYgKCF0YXJnZXQuaGFzU2hpcCkge1xuICAgICAgICBjZWxsLmlubmVySFRNTCA9IFwiXCJcbiAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChkb21FbGVtZW50cy5taXNzZWRBdHRhY2tET00oKSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoY2VsbC5jaGlsZEVsZW1lbnRDb3VudCkge1xuICAgICAgICAgIGlmIChjZWxsLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSAmJiBjZWxsLmNoaWxkRWxlbWVudENvdW50ID09PSAxKSB7XG4gICAgICAgICAgICBjZWxsLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBkb21FbGVtZW50cy5oaXRET00oKSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChkb21FbGVtZW50cy5oaXRET00oKSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc2hvd1NoaXBzOiAoYXJyYXksIG5hbWUpID0+IHtcbiAgICAgIGNvbnN0IHNoaXBzRE9NID0gYXJyYXkubWFwKGVsID0+IHtcbiAgICAgICAgY29uc3QgeyBsZW5ndGgsIHN0YXJ0Q29vcmQsIGFsaWdubWVudCwgaWQgfSA9IGVsXG4gICAgICAgIHJldHVybiBkb21FbGVtZW50cy5nZXRTaGlwc0RPTShsZW5ndGgsIHN0YXJ0Q29vcmQsIGFsaWdubWVudCwgaWQpXG4gICAgICB9KVxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7bmFtZX0gLmNlbGxzYCkuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgc2hpcHNET00uZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICBjb25zdCB7IHN0YXJ0Q29vcmQsIHNoaXBET00gfSA9IHNoaXBcbiAgICAgICAgICBpZiAoKGNlbGwuZGF0YXNldC54ID09IHN0YXJ0Q29vcmRbMF0pICYmIChjZWxsLmRhdGFzZXQueSA9PSBzdGFydENvb3JkWzFdKSkge1xuICAgICAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChzaGlwRE9NKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVtb3ZlU2hpcHM6IChuYW1lKSA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtuYW1lfSAuc2hpcGApLmZvckVhY2goc2hpcCA9PiBzaGlwLnJlbW92ZSgpKVxuICAgIH0sXG4gICAgbG9hZERPTTogKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb21FbGVtZW50cy5oZWFkZXIpXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvbUVsZW1lbnRzLm1haW4pXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvbUVsZW1lbnRzLmZvcm0pXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvbUVsZW1lbnRzLmZvb3RlcilcbiAgICB9LFxuICAgIHRvZ2dsZUJ0bnM6ICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnRcIikuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKVxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpXG4gICAgfSxcbiAgICBjcmVhdGVHcmlkOiAobmFtZSkgPT4ge1xuICAgICAgY29uc3QgZ3JpZCA9IGRvbUVsZW1lbnRzLmdyaWQobmFtZSlcbiAgICAgIGlmIChuYW1lICE9PSBcImNvbXB1dGVyXCIpIHtcbiAgICAgICAgZG9tRWxlbWVudHMubWFpbi5maXJzdENoaWxkLmFwcGVuZENoaWxkKGdyaWQpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZG9tRWxlbWVudHMubWFpbi5sYXN0Q2hpbGQuYXBwZW5kQ2hpbGQoZ3JpZClcbiAgICAgIH1cbiAgICB9LFxuICB9XG59KSgpXG5cbmV4cG9ydCB7IHVpQ29udHJvbGxlciB9IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vbWF0ZXJpYWwtaWNvbnMud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL21hdGVyaWFsLWljb25zLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuL21hdGVyaWFsLWljb25zLW91dGxpbmVkLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi9tYXRlcmlhbC1pY29ucy1vdXRsaW5lZC53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18gPSBuZXcgVVJMKFwiLi9tYXRlcmlhbC1pY29ucy1yb3VuZC53b2ZmMlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fID0gbmV3IFVSTChcIi4vbWF0ZXJpYWwtaWNvbnMtcm91bmQud29mZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fID0gbmV3IFVSTChcIi4vbWF0ZXJpYWwtaWNvbnMtc2hhcnAud29mZjJcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfN19fXyA9IG5ldyBVUkwoXCIuL21hdGVyaWFsLWljb25zLXNoYXJwLndvZmZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOF9fXyA9IG5ldyBVUkwoXCIuL21hdGVyaWFsLWljb25zLXR3by10b25lLndvZmYyXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzlfX18gPSBuZXcgVVJMKFwiLi9tYXRlcmlhbC1pY29ucy10d28tdG9uZS53b2ZmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzdfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF83X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF84X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzlfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIk1hdGVyaWFsIEljb25zXFxcIjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LWRpc3BsYXk6IGJsb2NrO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG59XFxuLm1hdGVyaWFsLWljb25zIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTWF0ZXJpYWwgSWNvbnNcXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHdvcmQtd3JhcDogbm9ybWFsO1xcbiAgZGlyZWN0aW9uOiBsdHI7XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xcbiAgZm9udC1mZWF0dXJlLXNldHRpbmdzOiBcXFwibGlnYVxcXCI7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNYXRlcmlhbCBJY29ucyBPdXRsaW5lZFxcXCI7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1kaXNwbGF5OiBibG9jaztcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxufVxcbi5tYXRlcmlhbC1pY29ucy1vdXRsaW5lZCB7XFxuICBmb250LWZhbWlseTogXFxcIk1hdGVyaWFsIEljb25zIE91dGxpbmVkXFxcIjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICB3b3JkLXdyYXA6IG5vcm1hbDtcXG4gIGRpcmVjdGlvbjogbHRyO1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG4gIGZvbnQtZmVhdHVyZS1zZXR0aW5nczogXFxcImxpZ2FcXFwiO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTWF0ZXJpYWwgSWNvbnMgUm91bmRcXFwiO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtZGlzcGxheTogYmxvY2s7XFxuICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbn1cXG4ubWF0ZXJpYWwtaWNvbnMtcm91bmQge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNYXRlcmlhbCBJY29ucyBSb3VuZFxcXCI7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgd29yZC13cmFwOiBub3JtYWw7XFxuICBkaXJlY3Rpb246IGx0cjtcXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxuICBmb250LWZlYXR1cmUtc2V0dGluZ3M6IFxcXCJsaWdhXFxcIjtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIk1hdGVyaWFsIEljb25zIFNoYXJwXFxcIjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LWRpc3BsYXk6IGJsb2NrO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF82X19fICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfN19fXyArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG59XFxuLm1hdGVyaWFsLWljb25zLXNoYXJwIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTWF0ZXJpYWwgSWNvbnMgU2hhcnBcXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHdvcmQtd3JhcDogbm9ybWFsO1xcbiAgZGlyZWN0aW9uOiBsdHI7XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xcbiAgZm9udC1mZWF0dXJlLXNldHRpbmdzOiBcXFwibGlnYVxcXCI7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNYXRlcmlhbCBJY29ucyBUd28gVG9uZVxcXCI7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1kaXNwbGF5OiBibG9jaztcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOF9fXyArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzlfX18gKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxufVxcbi5tYXRlcmlhbC1pY29ucy10d28tdG9uZSB7XFxuICBmb250LWZhbWlseTogXFxcIk1hdGVyaWFsIEljb25zIFR3byBUb25lXFxcIjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICB3b3JkLXdyYXA6IG5vcm1hbDtcXG4gIGRpcmVjdGlvbjogbHRyO1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG4gIGZvbnQtZmVhdHVyZS1zZXR0aW5nczogXFxcImxpZ2FcXFwiO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9ub2RlX21vZHVsZXMvbWF0ZXJpYWwtaWNvbnMvaWNvbmZvbnQvbWF0ZXJpYWwtaWNvbnMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsNkJBQTZCO0VBQzdCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLG9IQUErRjtBQUNqRztBQUNBO0VBQ0UsNkJBQTZCO0VBQzdCLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIsb0JBQW9CO0VBQ3BCLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxtQ0FBbUM7RUFDbkMsa0NBQWtDO0VBQ2xDLGtDQUFrQztFQUNsQyw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxzQ0FBc0M7RUFDdEMsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsb0hBQWlIO0FBQ25IO0FBQ0E7RUFDRSxzQ0FBc0M7RUFDdEMsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsY0FBYztFQUNkLHNCQUFzQjtFQUN0QixvQkFBb0I7RUFDcEIscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsY0FBYztFQUNkLG1DQUFtQztFQUNuQyxrQ0FBa0M7RUFDbEMsa0NBQWtDO0VBQ2xDLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLG1DQUFtQztFQUNuQyxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixvSEFBMkc7QUFDN0c7QUFDQTtFQUNFLG1DQUFtQztFQUNuQyxtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixjQUFjO0VBQ2Qsc0JBQXNCO0VBQ3RCLG9CQUFvQjtFQUNwQixxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixjQUFjO0VBQ2QsbUNBQW1DO0VBQ25DLGtDQUFrQztFQUNsQyxrQ0FBa0M7RUFDbEMsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0UsbUNBQW1DO0VBQ25DLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLG9IQUEyRztBQUM3RztBQUNBO0VBQ0UsbUNBQW1DO0VBQ25DLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIsb0JBQW9CO0VBQ3BCLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxtQ0FBbUM7RUFDbkMsa0NBQWtDO0VBQ2xDLGtDQUFrQztFQUNsQyw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxzQ0FBc0M7RUFDdEMsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsb0hBQWlIO0FBQ25IO0FBQ0E7RUFDRSxzQ0FBc0M7RUFDdEMsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsY0FBYztFQUNkLHNCQUFzQjtFQUN0QixvQkFBb0I7RUFDcEIscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsY0FBYztFQUNkLG1DQUFtQztFQUNuQyxrQ0FBa0M7RUFDbEMsa0NBQWtDO0VBQ2xDLDZCQUE2QjtBQUMvQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTWF0ZXJpYWwgSWNvbnNcXFwiO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtZGlzcGxheTogYmxvY2s7XFxuICBzcmM6IHVybChcXFwiLi9tYXRlcmlhbC1pY29ucy53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFxcXCIuL21hdGVyaWFsLWljb25zLndvZmZcXFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG59XFxuLm1hdGVyaWFsLWljb25zIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTWF0ZXJpYWwgSWNvbnNcXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHdvcmQtd3JhcDogbm9ybWFsO1xcbiAgZGlyZWN0aW9uOiBsdHI7XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xcbiAgZm9udC1mZWF0dXJlLXNldHRpbmdzOiBcXFwibGlnYVxcXCI7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNYXRlcmlhbCBJY29ucyBPdXRsaW5lZFxcXCI7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1kaXNwbGF5OiBibG9jaztcXG4gIHNyYzogdXJsKFxcXCIuL21hdGVyaWFsLWljb25zLW91dGxpbmVkLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXFxcIi4vbWF0ZXJpYWwtaWNvbnMtb3V0bGluZWQud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbn1cXG4ubWF0ZXJpYWwtaWNvbnMtb3V0bGluZWQge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNYXRlcmlhbCBJY29ucyBPdXRsaW5lZFxcXCI7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgd29yZC13cmFwOiBub3JtYWw7XFxuICBkaXJlY3Rpb246IGx0cjtcXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxuICBmb250LWZlYXR1cmUtc2V0dGluZ3M6IFxcXCJsaWdhXFxcIjtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIk1hdGVyaWFsIEljb25zIFJvdW5kXFxcIjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LWRpc3BsYXk6IGJsb2NrO1xcbiAgc3JjOiB1cmwoXFxcIi4vbWF0ZXJpYWwtaWNvbnMtcm91bmQud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcXFwiLi9tYXRlcmlhbC1pY29ucy1yb3VuZC53b2ZmXFxcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIik7XFxufVxcbi5tYXRlcmlhbC1pY29ucy1yb3VuZCB7XFxuICBmb250LWZhbWlseTogXFxcIk1hdGVyaWFsIEljb25zIFJvdW5kXFxcIjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICB3b3JkLXdyYXA6IG5vcm1hbDtcXG4gIGRpcmVjdGlvbjogbHRyO1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG4gIGZvbnQtZmVhdHVyZS1zZXR0aW5nczogXFxcImxpZ2FcXFwiO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTWF0ZXJpYWwgSWNvbnMgU2hhcnBcXFwiO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtZGlzcGxheTogYmxvY2s7XFxuICBzcmM6IHVybChcXFwiLi9tYXRlcmlhbC1pY29ucy1zaGFycC53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFxcXCIuL21hdGVyaWFsLWljb25zLXNoYXJwLndvZmZcXFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKTtcXG59XFxuLm1hdGVyaWFsLWljb25zLXNoYXJwIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTWF0ZXJpYWwgSWNvbnMgU2hhcnBcXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHdvcmQtd3JhcDogbm9ybWFsO1xcbiAgZGlyZWN0aW9uOiBsdHI7XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xcbiAgZm9udC1mZWF0dXJlLXNldHRpbmdzOiBcXFwibGlnYVxcXCI7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNYXRlcmlhbCBJY29ucyBUd28gVG9uZVxcXCI7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1kaXNwbGF5OiBibG9jaztcXG4gIHNyYzogdXJsKFxcXCIuL21hdGVyaWFsLWljb25zLXR3by10b25lLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXFxcIi4vbWF0ZXJpYWwtaWNvbnMtdHdvLXRvbmUud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpO1xcbn1cXG4ubWF0ZXJpYWwtaWNvbnMtdHdvLXRvbmUge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNYXRlcmlhbCBJY29ucyBUd28gVG9uZVxcXCI7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgd29yZC13cmFwOiBub3JtYWw7XFxuICBkaXJlY3Rpb246IGx0cjtcXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxuICBmb250LWZlYXR1cmUtc2V0dGluZ3M6IFxcXCJsaWdhXFxcIjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMF9fXyBmcm9tIFwiLSEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvbWF0ZXJpYWwtaWNvbnMvaWNvbmZvbnQvbWF0ZXJpYWwtaWNvbnMuY3NzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG86d2dodEAzMDA7NDAwOzcwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5pKF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqLFxcbio6OmFmdGVyLFxcbio6OmJlZm9yZSB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuLm1hdGVyaWFsLWljb25zLW91dGxpbmVkIHtcXG4gIGZvbnQtc2l6ZTogMy4ycmVtO1xcbn1cXG5cXG46cm9vdCB7XFxuICBmb250LXNpemU6IDEwcHg7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZDogI2VlZTtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuLmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kOiAjYWE5OTAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDZyZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDAgMS42cmVtO1xcbn1cXG5cXG4ubG9nbyB7XFxuICBjb2xvcjogI2U1ZTdlYjtcXG4gIGZvbnQtc2l6ZTogMi40cmVtO1xcbiAgZmxleDogMSAwIDQwJTtcXG59XFxuXFxuLm5vdGlmaWNhdGlvbnMge1xcbiAgZm9udC1zaXplOiAxLjNyZW07XFxuICBwYWRkaW5nOiAuOHJlbSAxLjJyZW07XFxuICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDEuNnJlbSk7XFxuICBmbGV4OiAxIDAgNjAlO1xcbiAgYmFja2dyb3VuZDogI2NjYztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ubWVzc2FnZSB7XFxuICBjb2xvcjogIzExMTtcXG4gIGZvbnQtd2VpZ2h0OiAzMDA7XFxufVxcblxcbi5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBwYWRkaW5nOiAxLjJyZW0gMDtcXG59XFxuXFxuLmRpc2FibGUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgYmFja2dyb3VuZDogI2FhOTkwMDJjO1xcbiAgei1pbmRleDogNTtcXG59XFxuXFxuLnBsYXllci1hcmVhLFxcbi5jb21wdXRlci1hcmVhIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxMGZyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgMTBmciAxZnI7XFxuICBncmlkLXRlbXBsYXRlLWFyZWFzOlxcbiAgICBcXFwiYiBiXFxcIlxcbiAgICBcXFwiYSBjXFxcIlxcbiAgICBcXFwiZCBkXFxcIjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHBhZGRpbmc6IDEuMnJlbSAxLjZyZW07XFxufVxcblxcbmgyIHtcXG4gIGZvbnQtc2l6ZTogMS42cmVtO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGdyaWQtYXJlYTogZDtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbn1cXG5cXG4ueC1jb29yZHMsXFxuLnktY29vcmRzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxufVxcblxcbi54LWNvb3JkcyB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMy4ycmVtKTtcXG4gIGp1c3RpZnktc2VsZjogZW5kO1xcbiAgZ3JpZC1hcmVhOiBiO1xcbn1cXG5cXG4ueS1jb29yZHMge1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDMuMnJlbSk7XFxuICBncmlkLWFyZWE6IGE7XFxufVxcblxcbi5ncmlkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBtYXJnaW46IGF1dG87XFxuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNhYTk5MDBhMTtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjYWE5OTAwYTE7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGdyaWQtYXJlYTogYztcXG59XFxuXFxuLmNlbGxzIHtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLXJpZ2h0OiAuMXJlbSBzb2xpZCAjYWE5OTAwYTE7XFxuICBib3JkZXItYm90dG9tOiAuMXJlbSBzb2xpZCAjYWE5OTAwYTE7XFxuICBjdXJzb3I6IGNyb3NzaGFpcjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi5zaGlwIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvcmRlcjogLjJyZW0gc29saWQgI2FhOTkwMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhYTk5MDA0OTtcXG4gIGN1cnNvcjogZ3JhYjtcXG59XFxuXFxuLnNoaXA6YWN0aXZlIHtcXG4gIGN1cnNvcjogZ3JhYmJpbmc7XFxuICBib3JkZXI6IDJweCBzb2xpZCByZWQ7XFxufVxcblxcbi5jb21wdXRlciAuY2VsbHMge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4uY29tcHV0ZXIgLmNlbGxzOmhvdmVyOjpiZWZvcmUsXFxuLmNvbXB1dGVyIC5jZWxsczpob3Zlcjo6YWZ0ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZm9udC1zaXplOiAuODVyZW07XFxuICB0b3A6IDA7XFxuICBwYWRkaW5nOiAuMXJlbSAuMjVyZW07XFxufVxcblxcbi5jb21wdXRlciAuY2VsbHM6aG92ZXI6OmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwieDpcXFwiIGF0dHIoZGF0YS14KTtcXG4gIGxlZnQ6IDA7XFxufVxcblxcbi5jb21wdXRlciAuY2VsbHM6aG92ZXI6OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJ5OlxcXCIgYXR0cihkYXRhLXkpO1xcbiAgcmlnaHQ6IDA7XFxufVxcblxcbi5maXJlZCB7XFxuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xcbn1cXG5cXG4ubWlzcyB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5kb3Qge1xcbiAgYmFja2dyb3VuZDogcmdiKDEyNCwgNTAsIDUwKTtcXG4gIHdpZHRoOiAuNXJlbTtcXG4gIGhlaWdodDogLjVyZW07XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcblxcbi5ob2xkIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJlZDtcXG59XFxuXFxuLmZvcm0ge1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgbWFyZ2luOiAwIGF1dG8gNnJlbTtcXG4gIHBhZGRpbmc6IDEuNnJlbSAzLjJyZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uYnRuIHtcXG4gIHBhZGRpbmc6IC44cmVtIDEuNnJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IC44cmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2FhOTkwMDtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uZm9vdGVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA2cmVtO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiAwO1xcbiAgYmFja2dyb3VuZDogI2FhOTkwMDtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMnJlbSAwO1xcbiAgY29sb3I6ICNlNWU3ZWI7XFxufVxcblxcbi5mb290ZXIgYSB7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIHRleHQtZGVjb3JhdGlvbjogb3ZlcmxpbmUgdW5kZXJsaW5lO1xcbiAgY29sb3I6ICMxMTE7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMjRweCkge1xcbiAgLmhlYWRlciB7XFxuICAgIHBhZGRpbmc6IDAgNC44cmVtO1xcbiAgfVxcblxcbiAgLm1haW4ge1xcbiAgICBwYWRkaW5nOiAyLjRyZW0gNC44cmVtO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIH1cXG5cXG4gIC5ub3RpZmljYXRpb25zIHtcXG4gICAgZm9udC1zaXplOiAxLjZyZW07XFxuICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUdBOzs7RUFHRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCxZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsaUJBQWlCO0VBQ2pCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixxQkFBcUI7RUFDckIsMkJBQTJCO0VBQzNCLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixRQUFRO0VBQ1IsU0FBUztFQUNULE9BQU87RUFDUCxxQkFBcUI7RUFDckIsVUFBVTtBQUNaOztBQUVBOztFQUVFLGFBQWE7RUFDYiwrQkFBK0I7RUFDL0IsZ0NBQWdDO0VBQ2hDOzs7U0FHTztFQUNQLGtCQUFrQjtFQUNsQixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsb0JBQW9CO0FBQ3RCOztBQUVBOztFQUVFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIscUJBQXFCO0VBQ3JCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLHlDQUF5QztFQUN6QyxpQkFBaUI7RUFDakIsWUFBWTtBQUNkOztBQUVBO0VBQ0Usc0NBQXNDO0VBQ3RDLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLGdDQUFnQztFQUNoQywrQkFBK0I7RUFDL0IsdUJBQXVCO0VBQ3ZCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2QixtQ0FBbUM7RUFDbkMsb0NBQW9DO0VBQ3BDLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsYUFBYTtBQUNmOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLDJCQUEyQjtFQUMzQiwyQkFBMkI7RUFDM0IsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTs7RUFFRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLE1BQU07RUFDTixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSwwQkFBMEI7RUFDMUIsT0FBTztBQUNUOztBQUVBO0VBQ0UsMEJBQTBCO0VBQzFCLFFBQVE7QUFDVjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSw0QkFBNEI7RUFDNUIsWUFBWTtFQUNaLGFBQWE7RUFDYixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixvQkFBb0I7RUFDcEIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixlQUFlO0VBQ2YsU0FBUztFQUNULG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1DQUFtQztFQUNuQyxXQUFXO0FBQ2I7O0FBRUE7RUFDRTtJQUNFLGlCQUFpQjtFQUNuQjs7RUFFQTtJQUNFLHNCQUFzQjtJQUN0Qiw2QkFBNkI7RUFDL0I7O0VBRUE7SUFDRSxpQkFBaUI7RUFDbkI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG86d2dodEAzMDA7NDAwOzcwMCZkaXNwbGF5PXN3YXAnKTtcXG5AaW1wb3J0ICdtYXRlcmlhbC1pY29ucy9pY29uZm9udC9tYXRlcmlhbC1pY29ucy5jc3MnO1xcblxcbiosXFxuKjo6YWZ0ZXIsXFxuKjo6YmVmb3JlIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4ubWF0ZXJpYWwtaWNvbnMtb3V0bGluZWQge1xcbiAgZm9udC1zaXplOiAzLjJyZW07XFxufVxcblxcbjpyb290IHtcXG4gIGZvbnQtc2l6ZTogMTBweDtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kOiAjZWVlO1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG4uaGVhZGVyIHtcXG4gIGJhY2tncm91bmQ6ICNhYTk5MDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogNnJlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZzogMCAxLjZyZW07XFxufVxcblxcbi5sb2dvIHtcXG4gIGNvbG9yOiAjZTVlN2ViO1xcbiAgZm9udC1zaXplOiAyLjRyZW07XFxuICBmbGV4OiAxIDAgNDAlO1xcbn1cXG5cXG4ubm90aWZpY2F0aW9ucyB7XFxuICBmb250LXNpemU6IDEuM3JlbTtcXG4gIHBhZGRpbmc6IC44cmVtIDEuMnJlbTtcXG4gIGhlaWdodDogY2FsYygxMDAlIC0gMS42cmVtKTtcXG4gIGZsZXg6IDEgMCA2MCU7XFxuICBiYWNrZ3JvdW5kOiAjY2NjO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5tZXNzYWdlIHtcXG4gIGNvbG9yOiAjMTExO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG59XFxuXFxuLm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDEuMnJlbSAwO1xcbn1cXG5cXG4uZGlzYWJsZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxuICBiYWNrZ3JvdW5kOiAjYWE5OTAwMmM7XFxuICB6LWluZGV4OiA1O1xcbn1cXG5cXG4ucGxheWVyLWFyZWEsXFxuLmNvbXB1dGVyLWFyZWEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDEwZnI7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciAxMGZyIDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgIFxcXCJiIGJcXFwiXFxuICAgIFxcXCJhIGNcXFwiXFxuICAgIFxcXCJkIGRcXFwiO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcGFkZGluZzogMS4ycmVtIDEuNnJlbTtcXG59XFxuXFxuaDIge1xcbiAgZm9udC1zaXplOiAxLjZyZW07XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZ3JpZC1hcmVhOiBkO1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi54LWNvb3JkcyxcXG4ueS1jb29yZHMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG59XFxuXFxuLngtY29vcmRzIHtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzLjJyZW0pO1xcbiAganVzdGlmeS1zZWxmOiBlbmQ7XFxuICBncmlkLWFyZWE6IGI7XFxufVxcblxcbi55LWNvb3JkcyB7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMy4ycmVtKTtcXG4gIGdyaWQtYXJlYTogYTtcXG59XFxuXFxuLmdyaWQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2FhOTkwMGExO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNhYTk5MDBhMTtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgZ3JpZC1hcmVhOiBjO1xcbn1cXG5cXG4uY2VsbHMge1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXItcmlnaHQ6IC4xcmVtIHNvbGlkICNhYTk5MDBhMTtcXG4gIGJvcmRlci1ib3R0b206IC4xcmVtIHNvbGlkICNhYTk5MDBhMTtcXG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLnNoaXAge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm9yZGVyOiAuMnJlbSBzb2xpZCAjYWE5OTAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FhOTkwMDQ5O1xcbiAgY3Vyc29yOiBncmFiO1xcbn1cXG5cXG4uc2hpcDphY3RpdmUge1xcbiAgY3Vyc29yOiBncmFiYmluZztcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJlZDtcXG59XFxuXFxuLmNvbXB1dGVyIC5jZWxscyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5jb21wdXRlciAuY2VsbHM6aG92ZXI6OmJlZm9yZSxcXG4uY29tcHV0ZXIgLmNlbGxzOmhvdmVyOjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBmb250LXNpemU6IC44NXJlbTtcXG4gIHRvcDogMDtcXG4gIHBhZGRpbmc6IC4xcmVtIC4yNXJlbTtcXG59XFxuXFxuLmNvbXB1dGVyIC5jZWxsczpob3Zlcjo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJ4OlxcXCIgYXR0cihkYXRhLXgpO1xcbiAgbGVmdDogMDtcXG59XFxuXFxuLmNvbXB1dGVyIC5jZWxsczpob3Zlcjo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcInk6XFxcIiBhdHRyKGRhdGEteSk7XFxuICByaWdodDogMDtcXG59XFxuXFxuLmZpcmVkIHtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcblxcbi5taXNzIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmRvdCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTI0LCA1MCwgNTApO1xcbiAgd2lkdGg6IC41cmVtO1xcbiAgaGVpZ2h0OiAuNXJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuLmhvbGQge1xcbiAgYm9yZGVyOiAycHggc29saWQgcmVkO1xcbn1cXG5cXG4uZm9ybSB7XFxuICB3aWR0aDogMzAwcHg7XFxuICBtYXJnaW46IDAgYXV0byA2cmVtO1xcbiAgcGFkZGluZzogMS42cmVtIDMuMnJlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5idG4ge1xcbiAgcGFkZGluZzogLjhyZW0gMS42cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogLjhyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCAjYWE5OTAwO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5mb290ZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDZyZW07XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBib3R0b206IDA7XFxuICBiYWNrZ3JvdW5kOiAjYWE5OTAwO1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAycmVtIDA7XFxuICBjb2xvcjogI2U1ZTdlYjtcXG59XFxuXFxuLmZvb3RlciBhIHtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBvdmVybGluZSB1bmRlcmxpbmU7XFxuICBjb2xvcjogIzExMTtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAyNHB4KSB7XFxuICAuaGVhZGVyIHtcXG4gICAgcGFkZGluZzogMCA0LjhyZW07XFxuICB9XFxuXFxuICAubWFpbiB7XFxuICAgIHBhZGRpbmc6IDIuNHJlbSA0LjhyZW07XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgfVxcblxcbiAgLm5vdGlmaWNhdGlvbnMge1xcbiAgICBmb250LXNpemU6IDEuNnJlbTtcXG4gIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTsgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJpbXBvcnQgXCIuL3N0eWxlcy5jc3NcIlxuaW1wb3J0IHsgZ2FtZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvZ2FtZVwiXG5cbmdhbWUuaW5pdCgpIl0sIm5hbWVzIjpbImRvbUVsZW1lbnRzIiwiaGVhZGVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaDEiLCJ0ZXh0Q29udGVudCIsImFwcGVuZENoaWxkIiwibm90aWZpY2F0aW9ucyIsIm1lc3NhZ2UiLCJtYWluIiwicGxheWVyQm9hcmQiLCJuYW1lIiwiYm9hcmQiLCJoZWFkaW5nIiwieENvb3JkcyIsInhDb29yZExhYmVscyIsImZvckVhY2giLCJpdGVtIiwieE5hbWUiLCJ5Q29vcmRzIiwieUNvb3JkTGFiZWxzIiwieU5hbWUiLCJmb3JtIiwiYnRuU3RhcnQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmQiLCJidG5SZXNldCIsImZvb3RlciIsImlubmVySFRNTCIsImdyaWQiLCJpIiwiY2VsbCIsInN0eWxlIiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsImdyaWRUZW1wbGF0ZVJvd3MiLCJjaGlsZE5vZGVzIiwieSIsImdldFNoaXBzRE9NIiwibGVuZ3RoIiwic3RhcnRDb29yZCIsImFsaWdubWVudCIsImlkIiwic2hpcERPTSIsIndpZHRoIiwiaGVpZ2h0IiwibWlzc2VkQXR0YWNrRE9NIiwibWlzc2VkQXR0YWNrIiwiZG90IiwiaGl0RE9NIiwiaGl0IiwiZGlzYWJsZUJvYXJkIiwiZGlzYWJsZSIsIlNoaXAiLCJHYW1lYm9hcmQiLCJBcnJheSIsImZpbGwiLCJtYXAiLCJoYXNTaGlwIiwiZ2V0Qm9hcmQiLCJyZW1vdmVCb2FyZCIsInBsYWNlU2hpcCIsImNvb3JkaW5hdGVzIiwic2hpcCIsImVsIiwicmVjZWl2ZUF0dGFjayIsImZpcmUiLCJ4IiwiaXNIaXQiLCJtaXNzZWRTaG90IiwiY2hlY2tSZXN1bHQiLCJmbGF0IiwiZmlsdGVyIiwiZXZlcnkiLCJpc1N1bmsiLCJjcmVhdGVGbGVldCIsIlBsYXllciIsImZsZWV0IiwiYXR0YWNrIiwicGxhY2VGbGVldCIsImZsZWV0QXJyYXkiLCJjb29yZGluYXRlIiwiY29vcmQiLCJ1aUNvbnRyb2xsZXIiLCJ1aSIsInJhbmRvbWl6ZSIsImJvYXJkQ29vcmRzIiwidGFyZ2V0Q29vcmRzIiwiZHJvcHBlZFNoaXAiLCJjaGVja0F2YWlsYWJpbGl0eSIsImdhbWUiLCJwMSIsInAyIiwiY3JlYXRlR3JpZCIsInNldEdhbWUiLCJmbGVldDEiLCJmbGVldDIiLCJzaG93U2hpcHMiLCJwbGF5ZXJNb3ZlIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJOdW1iZXIiLCJkYXRhc2V0IiwiYm9hcmRBcnJheSIsInN1bmtTaGlwSWRzIiwiU2V0Iiwic3Vua1NoaXBzIiwicmVtb3ZlU2hpcHMiLCJjZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0YXJnZXRzIiwidGFyZ2V0IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm1hcmtBdHRhY2siLCJzaG93TWVzc2FnZSIsImVuYWJsZUJvYXJkIiwic2V0VGltZW91dCIsImFpTW92ZSIsImFsbENvb3JkcyIsInJhbmRvbSIsImluZGV4IiwiZmluZEluZGV4Iiwic3BsaWNlIiwic3RhcnRHYW1lIiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGVCdG5zIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uY2UiLCJwbGF5ZXIiLCJyZXNldEdhbWUiLCJsb2FkRXZlbnRMaXN0ZW5lcnMiLCJkcmFnU3RhcnQiLCJkcmFnRW5kIiwiYWxpZ25TaGlwIiwiZHJhZ092ZXIiLCJkcmFnRHJvcCIsInF1ZXJ5U2VsZWN0b3IiLCJyZW1vdmUiLCJob2xkIiwicGFyZW50RWxlbWVudCIsIm5ld1NoaXAiLCJpc1ZhbGlkIiwiaW5pdCIsImxvYWRET00iLCJtaW4iLCJtYXgiLCJNYXRoIiwiY2VpbCIsImZsb29yIiwiZnJvbSIsInYiLCJhIiwiaiIsIm9jY3VwaWVkQ29vcmRzIiwiYXJyIiwiY29vcmRzIiwiaGl0c0JlZm9yZVN1bmsiLCJKU09OIiwic3RyaW5naWZ5IiwicGFyc2UiLCJzb3J0IiwiYWxsQ2VsbHMiLCJzdGFydEluZm8iLCJjcmVhdGVTaGlwQ29vcmRzIiwiYXJyYXkiLCJ2YWxpZCIsIm5leHRDb29yZCIsImF2YWlsYWJsZUNvb3JkcyIsInVzZWRDb29yZHMiLCJpbmZvIiwic2hpcENvb3JkcyIsIm92ZXJsYXAiLCJzb21lIiwidW5hdmFpbGFibGVDb29yZHMiLCJvdGhlclNoaXBzIiwib3V0T2ZHcmlkIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInJlbW92ZUNoaWxkIiwiY2hpbGRFbGVtZW50Q291bnQiLCJmaXJzdENoaWxkIiwiY29udGFpbnMiLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJzaGlwc0RPTSIsImJvZHkiLCJ0b2dnbGUiLCJsYXN0Q2hpbGQiXSwic291cmNlUm9vdCI6IiJ9