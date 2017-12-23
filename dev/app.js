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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
  function Renderer(player) {
    var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Renderer);

    this.player = player;
    this.events = events;
    this.$container = document.querySelector('.container > div');
    this.$section = this.el('section');
    this.$header = this.el('header');
    this.$main = this.el('main');
    this.$footer = this.el('footer');
    this.$container.appendChild(this.$section);
    this.$section.appendChild(this.$header);
    this.$section.appendChild(this.$main);
    this.$section.appendChild(this.$footer);
    this.$section.classList.add(this._name);
    this._activeSection = null;
  }

  _createClass(Renderer, [{
    key: 'toggleSections',
    value: function toggleSections() {
      var $existing = this.$container.querySelector('section.active');
      if ($existing) $existing.classList.remove('active');
      this.$section.classList.add('active');
      this.$container.className = 'active-' + this._name;
      this._activeSection = this._name;
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.$section.remove();
    }
  }, {
    key: 'userSpan',
    value: function userSpan(player, extraClassname) {
      var classname = player.id === this.player.id ? 'you' : '',
          name = player.id === this.player.id ? 'You' : player.name;
      if (extraClassname) classname += ' ' + extraClassname;
      return '<span class="user ' + classname + '"><img src="' + player.image + '" /> ' + name + '</span>';
    }
  }, {
    key: 'renderDead',
    value: function renderDead($el) {
      var role = this.player.capitalizedRole;
      $el.innerHTML = 'You\'re dead and will resurrect at the end of the Round.';
    }
  }, {
    key: 'el',
    value: function el(tagname, inner, classname) {
      var $el = document.createElement(tagname);
      if (inner) $el.innerHTML = inner;
      if (classname) $el.className = classname;
      return $el;
    }
  }, {
    key: 'append',
    value: function append($parent, $children) {
      $children.forEach(function ($child) {
        $parent.appendChild($child);
      });
    }
  }, {
    key: '_capitalize',
    value: function _capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  }, {
    key: 'events',
    set: function set(events) {
      this._eventsList.forEach(function (eventName) {
        if (!events[eventName]) console.error('Renderer Missing Event "' + eventName + '"');
      });
      this._events = events;
    },
    get: function get() {
      return this._events;
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Module2 = __webpack_require__(7);

var _Module3 = _interopRequireDefault(_Module2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_Module) {
  _inherits(Button, _Module);

  function Button(_ref) {
    var clickEvent = _ref.clickEvent,
        _ref$content = _ref.content,
        content = _ref$content === undefined ? '' : _ref$content;

    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this));

    _this.$el = _this.el('button', content);
    if (clickEvent) _this.$el.addEventListener('click', function () {
      return clickEvent();
    });
    return _this;
  }

  _createClass(Button, [{
    key: 'enable',
    value: function enable() {
      this.$el.removeAttribute('disabled');
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.$el.setAttribute('disabled', true);
    }
  }, {
    key: 'content',
    value: function content(value) {
      this.$el.innerHTML = value;
    }
  }]);

  return Button;
}(_Module3.default);

exports.default = Button;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = __webpack_require__(4),
    ROOT = config.env;

var Adapter = function () {
  function Adapter() {
    _classCallCheck(this, Adapter);
  }

  _createClass(Adapter, [{
    key: 'r',
    value: function r(val) {
      var p = typeof val === 'string' ? val : val.join('/');
      return ROOT + '/' + this._key + '/' + p;
    }
  }, {
    key: 'db',
    get: function get() {
      return firebase.database();
    }
  }]);

  return Adapter;
}();

exports.default = Adapter;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = __webpack_require__(10);

var _App2 = _interopRequireDefault(_App);

var _Games = __webpack_require__(11);

var _Games2 = _interopRequireDefault(_Games);

var _Players = __webpack_require__(13);

var _Players2 = _interopRequireDefault(_Players);

var _Users = __webpack_require__(14);

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Adapters = {
  App: new _App2.default(),
  Games: new _Games2.default(),
  Players: new _Players2.default(),
  Users: new _Users2.default()
};

exports.default = Adapters;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  env: 'development'
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Module2 = __webpack_require__(7);

var _Module3 = _interopRequireDefault(_Module2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = function (_Module) {
  _inherits(List, _Module);

  function List() {
    var listClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'flex-list';

    _classCallCheck(this, List);

    var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this));

    _this.$title = _this.el('p', null, 'label');
    _this.$ul = _this.el('ul', null, listClass);
    return _this;
  }

  _createClass(List, [{
    key: 'add',
    value: function add(liContent) {
      this.$ul.appendChild(this.el('li', liContent));
    }
  }, {
    key: 'title',
    value: function title(html) {
      this.$title.innerHTML = html;
    }
  }, {
    key: 'instruction',
    value: function instruction(html) {
      this.$instruction.innerHTML = html;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.title('');
      this.$ul.innerHTML = '';
    }
  }, {
    key: 'elements',
    get: function get() {
      return [this.$title, this.$ul];
    }
  }]);

  return List;
}(_Module3.default);

exports.default = List;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _NewVersion = __webpack_require__(18);

var _NewVersion2 = _interopRequireDefault(_NewVersion);

var _Auth = __webpack_require__(19);

var _Auth2 = _interopRequireDefault(_Auth);

var _Launch = __webpack_require__(20);

var _Launch2 = _interopRequireDefault(_Launch);

var _Start = __webpack_require__(21);

var _Start2 = _interopRequireDefault(_Start);

var _Turns = __webpack_require__(22);

var _Turns2 = _interopRequireDefault(_Turns);

var _Reveal = __webpack_require__(23);

var _Reveal2 = _interopRequireDefault(_Reveal);

var _Votes = __webpack_require__(24);

var _Votes2 = _interopRequireDefault(_Votes);

var _Results = __webpack_require__(25);

var _Results2 = _interopRequireDefault(_Results);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Renderers = {
  NewVersion: _NewVersion2.default,
  Auth: _Auth2.default,
  Launch: _Launch2.default,
  Start: _Start2.default,
  Turns: _Turns2.default,
  Reveal: _Reveal2.default,
  Votes: _Votes2.default,
  Results: _Results2.default
};

exports.default = Renderers;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Module = function () {
  function Module() {
    _classCallCheck(this, Module);
  }

  _createClass(Module, [{
    key: "el",
    value: function el(tagname, inner, classname) {
      var $el = document.createElement(tagname);
      if (inner) $el.innerHTML = inner;
      if (classname) $el.className = classname;
      return $el;
    }
  }]);

  return Module;
}();

exports.default = Module;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Adapters = __webpack_require__(3);

var _Adapters2 = _interopRequireDefault(_Adapters);

var _Topics = __webpack_require__(26);

var _Topics2 = _interopRequireDefault(_Topics);

var _shuffle = __webpack_require__(27);

var _shuffle2 = _interopRequireDefault(_shuffle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(_ref) {
    var state = _ref.state;

    _classCallCheck(this, Game);

    this.state = state;
    this.id = state.gameId;
    this.playerId = state.playerId;
    this._ = {};
    this.topicGenerator = new _Topics2.default();
  }

  _createClass(Game, [{
    key: 'detectAllVotesSubmitted',
    value: function detectAllVotesSubmitted() {
      return Object.keys(this._.votes).length === this._.playerCountAlive;
    }
  }, {
    key: 'calculateRoundOverData',
    value: function calculateRoundOverData(players) {
      var deadCounts = { impostor: 0, agent: 0 },
          aliveCounts = { impostor: 0, agent: 0 },
          aliveIds = [],
          deadIds = [];
      for (var playerId in players) {
        var role = players[playerId]._.role;
        if (players[playerId]._.alive) {
          aliveCounts[role]++;
          aliveIds.push(playerId);
        } else {
          deadCounts[role]++;
          deadIds.push(playerId);
        }
      }
      var roundOver = aliveCounts.impostor === 0 || aliveCounts.agent === 0 || aliveCounts.impostor === 1 && aliveCounts.agent === 1;
      return { aliveCounts: aliveCounts, aliveIds: aliveIds, deadCounts: deadCounts, deadIds: deadIds, roundOver: roundOver };
    }
  }, {
    key: 'calculatePoints',
    value: function calculatePoints(players, _ref2) {
      var aliveCounts = _ref2.aliveCounts,
          aliveIds = _ref2.aliveIds,
          roundOver = _ref2.roundOver;

      var points = {};
      if (roundOver) {
        if (aliveCounts.impostor === 1 && aliveCounts.agent === 1) {
          // no points
        } else if (aliveCounts.impostor > 0) {
          // Impostors score three
          for (var playerId in players) {
            if (players[playerId]._.role === 'impostor') points[playerId] = Game.survivePoints;
          }
        } else {
          // Agents score three
          for (var _playerId in players) {
            if (players[_playerId]._.role === 'agent') points[_playerId] = Game.survivePoints;
          }
        }
      } else {
        // Alive Impostors score two, alive Agents score one
        aliveIds.forEach(function (playerId) {
          points[playerId] = Game[players[playerId]._.role + 'Points'];
        });
      }
      return points;
    }
  }, {
    key: 'update',
    value: function update(values) {
      var _this = this;

      this.changes = {};
      ['status', 'votes', 'killedIds'].forEach(function (type) {
        _this.changes[type] = values[type] !== _this._[type];
      });
      this._ = values;
    }

    // Generators

  }, {
    key: 'generateRoundData',
    value: function generateRoundData() {
      var playerIds = Object.keys(this.state.players);

      var _generateRoles2 = this._generateRoles(playerIds),
          playerIdsImpostors = _generateRoles2.playerIdsImpostors,
          playerIdsAgents = _generateRoles2.playerIdsAgents,
          impostorCount = _generateRoles2.impostorCount;

      this.impostorCount = impostorCount;
      var playerCount = playerIds.length,
          topics = this.generateTopics(),
          playerCountAlive = playerCount,
          votes = {},
          killVotes = {},
          killedIds = [],
          roundOver = false,
          aliveCounts = { impostor: 0, agent: 0 },
          aliveIds = [],
          deadCounts = { impostor: 0, agent: 0 },
          deadIds = [];
      return {
        game: {
          playerCountAlive: playerCountAlive,
          playerCount: playerCount,
          votes: votes,
          killVotes: killVotes,
          killedIds: killedIds,
          aliveCounts: aliveCounts,
          aliveIds: aliveIds,
          deadCounts: deadCounts,
          deadIds: deadIds,
          impostorCount: impostorCount,
          topics: topics,
          roundOver: roundOver
        },
        players: { playerIdsImpostors: playerIdsImpostors, playerIdsAgents: playerIdsAgents }
      };
    }
  }, {
    key: 'generateTopics',
    value: function generateTopics() {
      return [this.topicGenerator.loadTopic(), this.topicGenerator.loadTopic()];
    }
  }, {
    key: 'generateKilledIds',
    value: function generateKilledIds() {
      var killVotes = {},
          killedIds = [],
          most = 0;
      for (var playerId in this._.votes) {
        var killedId = this._.votes[playerId];
        killVotes[killedId] = killVotes[killedId] || 0;
        killVotes[killedId]++;
      }
      for (var _playerId2 in killVotes) {
        var votes = killVotes[_playerId2];
        if (votes > most) {
          most = votes;
          killedIds = [_playerId2];
        } else if (votes === most) {
          killedIds.push(_playerId2);
        }
      }
      return { killVotes: killVotes, killedIds: killedIds };
    }

    // Generators

  }, {
    key: '_generateRoles',
    value: function _generateRoles(playerIds) {
      var ids = (0, _shuffle2.default)(Array.from(playerIds)),
          counts = this._distributor(playerIds.length),
          agentCount = counts[0],
          impostorCount = counts[1];
      var playerIdsAgents = ids.slice(0, agentCount);
      ids = ids.slice(agentCount);
      var playerIdsImpostors = ids;
      return {
        playerIdsImpostors: playerIdsImpostors,
        playerIdsAgents: playerIdsAgents,
        impostorCount: impostorCount
      };
    }

    // Private

  }, {
    key: '_distributor',
    value: function _distributor(number) {
      // Going for 2 to 1
      var agents = Math.floor(number * 0.66667),
          impostors = number - agents;
      return [agents, impostors];
    }
  }, {
    key: '_ref',
    get: function get() {
      return '/games/' + this.id;
    }
  }, {
    key: '_playersRef',
    get: function get() {
      return '/players/' + this.id;
    }

    // Class

  }], [{
    key: 'agentPoints',
    get: function get() {
      return 1;
    }
  }, {
    key: 'impostorPoints',
    get: function get() {
      return 2;
    }
  }, {
    key: 'survivePoints',
    get: function get() {
      return 3;
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Adapters = __webpack_require__(3);

var _Adapters2 = _interopRequireDefault(_Adapters);

var _Auth = __webpack_require__(15);

var _Auth2 = _interopRequireDefault(_Auth);

var _State = __webpack_require__(17);

var _State2 = _interopRequireDefault(_State);

var _Renderers = __webpack_require__(6);

var _Renderers2 = _interopRequireDefault(_Renderers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = __webpack_require__(4);

console.clear();

var //
AUTH = new _Auth2.default(),
    VERSION = 0.1;
var NEW_VERSION = false;

console.info('\n%cLexicon Standoff v' + VERSION + '\n%c\xA9 Jake Albaugh ' + new Date().getFullYear() + '\nhttps://twitter.com/jake_albaugh\nhttps://github.com/jakealbaugh/lexicon_standoff\n ', 'font-family: sans-serif; font-weight: bold;', 'font-family: sans-serif; font-weight: normal;');

AUTH.detectExisting().then(initializeUser).catch(function () {
  AUTH.detectRedirectResult().then(initializeUser).catch(handleNoUser);
});

function authFacebook() {
  AUTH.authenticate('FacebookAuthProvider');
}

function authGoogle() {
  AUTH.authenticate('GoogleAuthProvider');
}

function authTwitter() {
  AUTH.authenticate('TwitterAuthProvider');
}

function handleNewVersion() {
  var renderer = new _Renderers2.default.NewVersion(null, {});
  renderer.renderInitial();
  renderer.render();
}

function handleNoUser() {
  var renderer = new _Renderers2.default.Auth(null, {
    authTwitter: authTwitter,
    authFacebook: authFacebook,
    authGoogle: authGoogle
  });
  renderer.renderInitial();
  renderer.render();
}

function initializeState(existingUser) {
  _Adapters2.default.Users.globalFindOrCreate(existingUser).then(function (_ref) {
    var user = _ref.user;
    return new _State2.default({ user: user });
  }).catch(handleError);
}

function initializeUser(existingUser) {
  _Adapters2.default.App.findVersion().then(function (version) {
    if (version === VERSION) initializeState(existingUser);else if (version < VERSION || !version) _Adapters2.default.App.updateVersion(VERSION).then(function () {
      initializeState(existingUser);
    }).catch(handleError);else handleNewVersion();
  }).catch(handleError);
}

function handleError(error) {
  alert(error);
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Adapter2 = __webpack_require__(2);

var _Adapter3 = _interopRequireDefault(_Adapter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VERSION_REF = '_version';

var App = function (_Adapter) {
  _inherits(App, _Adapter);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'findVersion',
    value: function findVersion() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.db.ref(VERSION_REF).once('value').then(function (snap) {
          resolve(snap.val());
        }).catch(reject);
      });
    }
  }, {
    key: 'updateVersion',
    value: function updateVersion(version) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.db.ref(VERSION_REF).set(version).then(resolve).catch(reject);
      });
    }
  }]);

  return App;
}(_Adapter3.default);

exports.default = App;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Slugs = __webpack_require__(12);

var _Slugs2 = _interopRequireDefault(_Slugs);

var _Adapter2 = __webpack_require__(2);

var _Adapter3 = _interopRequireDefault(_Adapter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// All Database Actions for Games
var Games = function (_Adapter) {
  _inherits(Games, _Adapter);

  function Games() {
    _classCallCheck(this, Games);

    return _possibleConstructorReturn(this, (Games.__proto__ || Object.getPrototypeOf(Games)).apply(this, arguments));
  }

  _createClass(Games, [{
    key: 'globalFind',

    // Global Actions

    value: function globalFind(gameId) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.db.ref(_this2.r(gameId)).once('value').then(function (snap) {
          var game = snap.val();
          if (game !== null) resolve({ game: game });else reject('No Game Found with name ' + gameId);
        }).catch(reject);
      });
    }
  }, {
    key: 'globalKillVote',
    value: function globalKillVote(gameId, actingPlayerId, playerId) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.db.ref(_this3.r(gameId)).child('votes').update(_defineProperty({}, actingPlayerId, playerId)).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'globalListener',
    value: function globalListener(gameId, handler) {
      this.db.ref(this.r(gameId)).on('value', function (snap) {
        handler(snap.val());
      });
    }

    // Master Actions

  }, {
    key: 'masterCreate',
    value: function masterCreate(userId) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        var id = new _Slugs2.default().loadSlug();
        // Set listener
        _this4.db.ref(_this4.r(id)).on('value', function (snap) {
          var game = snap.val();
          if (game && game.id === id) {
            // Kill listener
            _this4.db.ref(_this4.r(id)).off();
            // Return the Game
            resolve({ game: game });
          }
        });
        // Create Game
        _this4.db.ref(_this4.r(id)).set({ id: id, status: 'start', inProgress: false, masterId: userId }).catch(reject);
      });
    }
  }, {
    key: 'masterDelete',
    value: function masterDelete(gameId) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5.db.ref(_this5.r(gameId)).set(null).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'masterUpdateKilledIds',
    value: function masterUpdateKilledIds(gameId, killedIds, killVotes, playerCountAlive) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        _this6.db.ref(_this6.r(gameId)).update({ killedIds: killedIds, killVotes: killVotes, playerCountAlive: playerCountAlive }).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'masterUpdateResults',
    value: function masterUpdateResults(gameId, params) {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        _this7.db.ref(_this7.r(gameId)).update(params).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'masterResetRound',
    value: function masterResetRound(gameId, topics) {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        _this8.db.ref(_this8.r(gameId)).update({
          votes: {},
          killedIds: [],
          killVotes: {},
          roundOver: false,
          aliveCounts: { impostor: 0, agent: 0 },
          aliveIds: [],
          deadCounts: { impostor: 0, agent: 0 },
          deadIds: [],
          topics: topics
        }).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'masterUpdateRoundData',
    value: function masterUpdateRoundData(gameId, gameData) {
      var _this9 = this;

      return new Promise(function (resolve, reject) {
        _this9.db.ref(_this9.r(gameId)).update(gameData).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'masterUpdateStatus',
    value: function masterUpdateStatus(gameId, status) {
      var _this10 = this;

      return new Promise(function (resolve, reject) {
        _this10.db.ref(_this10.r(gameId)).update({ status: status }).then(resolve).catch(reject);
      });
    }

    // Private

  }, {
    key: '_key',
    get: function get() {
      return 'games';
    }
  }]);

  return Games;
}(_Adapter3.default);

exports.default = Games;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// https://github.com/aaronbassett/Pass-phrase/blob/master/
var Slugs = function () {
  function Slugs() {
    _classCallCheck(this, Slugs);
  }

  _createClass(Slugs, [{
    key: 'loadSlug',
    value: function loadSlug() {
      return '' + this.getAdjective() + this.getNoun();
    }
  }, {
    key: 'getAdjective',
    value: function getAdjective() {
      return this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
    }
  }, {
    key: 'getNoun',
    value: function getNoun() {
      return this.nouns[Math.floor(Math.random() * this.nouns.length)];
    }
  }, {
    key: 'adjectives',
    get: function get() {
      return ['quizzical', 'highfalutin', 'dynamic', 'wakeful', 'cheerful', 'thoughtful', 'cooperative', 'questionable', 'abundant', 'uneven', 'yummy', 'juicy', 'vacuous', 'concerned', 'young', 'sparkling', 'abhorrent', 'sweltering', 'late', 'macho', 'scrawny', 'friendly', 'kaput', 'divergent', 'busy', 'charming', 'protective', 'premium', 'puzzled', 'waggish', 'rambunctious', 'puffy', 'hard', 'fat', 'sedate', 'yellow', 'resonant', 'dapper', 'courageous', 'vast', 'cool', 'elated', 'wary', 'bewildered', 'level', 'wooden', 'ceaseless', 'tearful', 'cloudy', 'gullible', 'flashy', 'trite', 'quick', 'nondescript', 'round', 'slow', 'spiritual', 'brave', 'tenuous', 'abstracted', 'colossal', 'sloppy', 'obsolete', 'elegant', 'fabulous', 'vivacious', 'exuberant', 'faithful', 'helpless', 'odd', 'sordid', 'blue', 'imported', 'ugly', 'ruthless', 'deeply', 'eminent', 'reminiscent', 'rotten', 'sour', 'volatile', 'succinct', 'judicious', 'abrupt', 'learned', 'stereotyped', 'evanescent', 'efficacious', 'festive', 'loose', 'torpid', 'condemned', 'selective', 'strong', 'momentous', 'ordinary', 'dry', 'great', 'ultra', 'ahead', 'broken', 'dusty', 'piquant', 'creepy', 'miniature', 'periodic', 'equable', 'unsightly', 'narrow', 'grieving', 'whimsical', 'fantastic', 'kindhearted', 'miscreant', 'cowardly', 'cloistered', 'marked', 'bloody', 'chunky', 'undesirable', 'oval', 'nauseating', 'aberrant', 'stingy', 'standing', 'distinct', 'illegal', 'angry', 'faint', 'rustic', 'few', 'calm', 'gorgeous', 'mysterious', 'tacky', 'unadvised', 'greasy', 'minor', 'loving', 'melodic', 'flat', 'wretched', 'clever', 'barbarous', 'pretty', 'endurable', 'handsomely', 'unequaled', 'acceptable', 'symptomatic', 'hurt', 'tested', 'long', 'warm', 'ignorant', 'ashamed', 'excellent', 'known', 'adamant', 'eatable', 'verdant', 'meek', 'unbiased', 'rampant', 'somber', 'cuddly', 'harmonious', 'salty', 'overwrought', 'stimulating', 'beautiful', 'crazy', 'grouchy', 'thirsty', 'joyous', 'confused', 'terrible', 'high', 'unarmed', 'gabby', 'wet', 'sharp', 'wonderful', 'magenta', 'tan', 'huge', 'productive', 'defective', 'chilly', 'needy', 'imminent', 'flaky', 'fortunate', 'neighborly', 'hot', 'husky', 'optimal', 'gaping', 'faulty', 'guttural', 'massive', 'watery', 'abrasive', 'ubiquitous', 'aspiring', 'impartial', 'annoyed', 'billowy', 'lucky', 'panoramic', 'heartbreaking', 'fragile', 'purring', 'wistful', 'burly', 'filthy', 'psychedelic', 'harsh', 'disagreeable', 'ambiguous', 'short', 'splendid', 'crowded', 'light', 'yielding', 'hypnotic', 'dispensable', 'deserted', 'nonchalant', 'green', 'puny', 'deafening', 'classy', 'tall', 'typical', 'exclusive', 'materialistic', 'mute', 'shaky', 'inconclusive', 'rebellious', 'doubtful', 'telling', 'unsuitable', 'woebegone', 'cold', 'sassy', 'arrogant', 'perfect', 'adhesive', 'industrious', 'crabby', 'curly', 'voiceless', 'nostalgic', 'better', 'slippery', 'willing', 'nifty', 'orange', 'victorious', 'ritzy', 'wacky', 'vigorous', 'spotless', 'good', 'powerful', 'bashful', 'soggy', 'grubby', 'moaning', 'placid', 'permissible', 'half', 'towering', 'bawdy', 'measly', 'abaft', 'delightful', 'goofy', 'capricious', 'nonstop', 'addicted', 'acoustic', 'furtive', 'erratic', 'heavy', 'square', 'delicious', 'needless', 'resolute', 'innocent', 'abnormal', 'hurried', 'awful', 'impossible', 'aloof', 'giddy', 'large', 'pointless', 'petite', 'jolly', 'boundless', 'abounding', 'hilarious', 'heavenly', 'honorable', 'squeamish', 'red', 'phobic', 'trashy', 'pathetic', 'parched', 'godly', 'greedy', 'pleasant', 'small', 'aboriginal', 'dashing', 'icky', 'bumpy', 'laughable', 'hapless', 'silent', 'scary', 'shaggy', 'organic', 'unbecoming', 'inexpensive', 'wrong', 'repulsive', 'flawless', 'labored', 'disturbed', 'aboard', 'gusty', 'loud', 'jumbled', 'exotic', 'vulgar', 'threatening', 'belligerent', 'synonymous', 'encouraging', 'fancy', 'embarrassed', 'clumsy', 'fast', 'ethereal', 'chubby', 'high-pitched', 'plastic', 'open', 'straight', 'little', 'ancient', 'fair', 'psychotic', 'murky', 'earthy', 'callous', 'heady', 'lamentable', 'hallowed', 'obtainable', 'toothsome', 'oafish', 'gainful', 'flippant', 'tangy', 'tightfisted', 'damaging', 'utopian', 'gaudy', 'brainy', 'imperfect', 'shiny', 'fanatical', 'snotty', 'relieved', 'shallow', 'foamy', 'parsimonious', 'gruesome', 'elite', 'wide', 'kind', 'bored', 'tangible', 'depressed', 'boring', 'screeching', 'outrageous', 'determined', 'picayune', 'glossy', 'historical', 'staking', 'curious', 'gigantic', 'wandering', 'profuse', 'vengeful', 'glib', 'unaccountable', 'frightened', 'outstanding', 'chivalrous', 'workable', 'modern', 'swanky', 'comfortable', 'gentle', 'substantial', 'brawny', 'curved', 'nebulous', 'boorish', 'afraid', 'fierce', 'efficient', 'lackadaisical', 'recondite', 'internal', 'absorbed', 'squealing', 'frail', 'thundering', 'wanting', 'cooing', 'axiomatic', 'debonair', 'boiling', 'tired', 'numberless', 'flowery', 'mushy', 'enthusiastic', 'proud', 'upset', 'hungry', 'astonishing', 'deadpan', 'prickly', 'mammoth', 'absurd', 'clean', 'jittery', 'wry', 'entertaining', 'literate', 'lying', 'uninterested', 'aquatic', 'super', 'languid', 'cute', 'absorbing', 'scattered', 'brief', 'halting', 'bright', 'fuzzy', 'lethal', 'scarce', 'aggressive', 'obsequious', 'fine', 'giant', 'holistic', 'pastoral', 'stormy', 'quaint', 'nervous', 'wasteful', 'grotesque', 'loutish', 'abiding', 'unable', 'black', 'dysfunctional', 'knowledgeable', 'truculent', 'various', 'luxuriant', 'shrill', 'spiffy', 'guarded', 'colorful', 'misty', 'spurious', 'freezing', 'glamorous', 'famous', 'new', 'instinctive', 'nasty', 'exultant', 'seemly', 'tawdry', 'maniacal', 'wrathful', 'shy', 'nutritious', 'idiotic', 'worried', 'bad', 'stupid', 'ruddy', 'wholesale', 'naughty', 'thoughtless', 'futuristic', 'available', 'slimy', 'cynical', 'fluffy', 'plausible', 'nasty', 'tender', 'changeable', 'smiling', 'oceanic', 'satisfying', 'steadfast', 'ugliest', 'crooked', 'subsequent', 'fascinated', 'woozy', 'teeny', 'quickest', 'moldy', 'uppity', 'sable', 'horrible', 'silly', 'adhoc', 'numerous', 'berserk', 'wiry', 'knowing', 'lazy', 'childlike', 'zippy', 'fearless', 'pumped', 'weak', 'tacit', 'weary', 'rapid', 'precious', 'smoggy', 'swift', 'lyrical', 'steep', 'quack', 'direful', 'talented', 'hesitant', 'fallacious', 'ill', 'quarrelsome', 'quiet', 'flipped-out', 'didactic', 'fluttering', 'glorious', 'tough', 'sulky', 'elfin', 'abortive', 'sweet', 'habitual', 'supreme', 'hollow', 'possessive', 'inquisitive', 'adjoining', 'incandescent', 'lowly', 'majestic', 'bizarre', 'acrid', 'expensive', 'aback', 'unusual', 'foolish', 'jobless', 'capable', 'damp', 'political', 'dazzling', 'erect', 'Early', 'immense', 'hellish', 'omniscient', 'reflective', 'lovely', 'incompetent', 'empty', 'breakable', 'educated', 'easy', 'devilish', 'assorted', 'decorous', 'jaded', 'homely', 'dangerous', 'adaptable', 'coherent', 'dramatic', 'tense', 'abject', 'fretful', 'troubled', 'diligent', 'solid', 'plain', 'raspy', 'irate', 'offbeat', 'healthy', 'melted', 'cagey', 'many', 'wild', 'venomous', 'animated', 'alike', 'youthful', 'ripe', 'alcoholic', 'sincere', 'teeny-tiny', 'lush', 'defeated', 'zonked', 'foregoing', 'dizzy', 'frantic', 'obnoxious', 'funny', 'damaged', 'grandiose', 'spectacular', 'maddening', 'defiant', 'makeshift', 'strange', 'painstaking', 'merciful', 'madly', 'clammy', 'itchy', 'difficult', 'clear', 'used', 'temporary', 'abandoned', 'null', 'rainy', 'evil', 'alert', 'domineering', 'amuck', 'rabid', 'jealous', 'robust', 'obeisant', 'overt', 'enchanting', 'longing', 'cautious', 'motionless', 'bitter', 'anxious', 'craven', 'breezy', 'ragged', 'skillful', 'quixotic', 'knotty', 'grumpy', 'dark', 'draconian', 'alluring', 'magical', 'versed', 'humdrum', 'accurate', 'ludicrous', 'sleepy', 'envious', 'lavish', 'roasted', 'thinkable', 'overconfident', 'roomy', 'painful', 'wee', 'observant', 'old-fashioned', 'drunk', 'royal', 'likeable', 'adventurous', 'eager', 'obedient', 'attractive', 'x-rated', 'spooky', 'poised', 'righteous', 'excited', 'real', 'abashed', 'womanly', 'ambitious', 'lacking', 'testy', 'big', 'gamy', 'early', 'auspicious', 'blue-eyed', 'discreet', 'nappy', 'vague', 'helpful', 'nosy', 'perpetual', 'disillusioned', 'overrated', 'gleaming', 'tart', 'soft', 'agreeable', 'therapeutic', 'accessible', 'poor', 'gifted', 'old', 'humorous', 'flagrant', 'magnificent', 'alive', 'understood', 'economic', 'mighty', 'ablaze', 'racial', 'tasteful', 'purple', 'broad', 'lean', 'legal', 'witty', 'nutty', 'icy', 'feigned', 'redundant', 'adorable', 'apathetic', 'jumpy', 'scientific', 'combative', 'worthless', 'tasteless', 'voracious', 'jazzy', 'uptight', 'utter', 'hospitable', 'imaginary', 'finicky', 'shocking', 'dead', 'noisy', 'shivering', 'subdued', 'rare', 'zealous', 'demonic', 'ratty', 'snobbish', 'deranged', 'muddy', 'whispering', 'credible', 'hulking', 'fertile', 'tight', 'abusive', 'functional', 'obscene', 'thankful', 'daffy', 'smelly', 'lively', 'homeless', 'secretive', 'amused', 'lewd', 'mere', 'agonizing', 'sad', 'innate', 'sneaky', 'noxious', 'illustrious', 'alleged', 'cultured', 'tame', 'macabre', 'lonely', 'mindless', 'low', 'scintillating', 'statuesque', 'decisive', 'rhetorical', 'hysterical', 'happy', 'earsplitting', 'mundane', 'spicy', 'overjoyed', 'taboo', 'peaceful', 'forgetful', 'elderly', 'upbeat', 'squalid', 'warlike', 'dull', 'plucky', 'handsome', 'groovy', 'absent', 'wise', 'romantic', 'invincible', 'receptive', 'smooth', 'different', 'tiny', 'cruel', 'dirty', 'mature', 'faded', 'tiresome', 'wicked', 'average', 'panicky', 'detailed', 'juvenile', 'scandalous', 'steady', 'wealthy', 'deep', 'sticky', 'jagged', 'wide-eyed', 'tasty', 'disgusted', 'garrulous', 'graceful', 'tranquil', 'annoying', 'hissing', 'noiseless', 'selfish', 'onerous', 'lopsided', 'ossified', 'penitent', 'malicious', 'aromatic', 'successful', 'zany', 'evasive', 'wet', 'naive', 'nice', 'uttermost', 'brash', 'muddled', 'energetic', 'accidental', 'silky', 'guiltless', 'important', 'drab', 'aware', 'skinny', 'careful', 'rightful', 'tricky', 'sore', 'rich', 'blushing', 'stale', 'daily', 'watchful', 'uncovered', 'rough', 'fresh', 'hushed', 'rural'];
    }
  }, {
    key: 'nouns',
    get: function get() {
      return ['ball', 'bat', 'bed', 'book', 'boy', 'bun', 'can', 'cake', 'cap', 'car', 'cat', 'cow', 'cub', 'cup', 'dad', 'day', 'dog', 'doll', 'dust', 'fan', 'feet', 'girl', 'gun', 'hall', 'hat', 'hen', 'jar', 'kite', 'man', 'map', 'men', 'mom', 'pan', 'pet', 'pie', 'pig', 'pot', 'rat', 'son', 'sun', 'toe', 'tub', 'van', 'apple', 'arm', 'banana', 'bike', 'bird', 'book', 'chin', 'clam', 'class', 'clover', 'club', 'corn', 'crayon', 'crow', 'crown', 'crowd', 'crib', 'desk', 'dime', 'dirt', 'dress', 'fang', 'field', 'flag', 'flower', 'fog', 'game', 'heat', 'hill', 'home', 'horn', 'hose', 'joke', 'juice', 'kite', 'lake', 'maid', 'mask', 'mice', 'milk', 'mint', 'meal', 'meat', 'moon', 'mother', 'morning', 'name', 'nest', 'nose', 'pear', 'pen', 'pencil', 'plant', 'rain', 'river', 'road', 'rock', 'room', 'rose', 'seed', 'shape', 'shoe', 'shop', 'show', 'sink', 'snail', 'snake', 'snow', 'soda', 'sofa', 'star', 'step', 'stew', 'stove', 'straw', 'string', 'summer', 'swing', 'table', 'tank', 'team', 'tent', 'test', 'toes', 'tree', 'vest', 'water', 'wing', 'winter', 'woman', 'women', 'alarm', 'animal', 'aunt', 'bait', 'balloon', 'bath', 'bead', 'beam', 'bean', 'bedroom', 'boot', 'bread', 'brick', 'brother', 'camp', 'chicken', 'children', 'crook', 'deer', 'dock', 'doctor', 'downtown', 'drum', 'dust', 'eye', 'family', 'father', 'fight', 'flesh', 'food', 'frog', 'goose', 'grade', 'grandfather', 'grandmother', 'grape', 'grass', 'hook', 'horse', 'jail', 'jam', 'kiss', 'kitten', 'light', 'loaf', 'lock', 'lunch', 'lunchroom', 'meal', 'mother', 'notebook', 'owl', 'pail', 'parent', 'park', 'plot', 'rabbit', 'rake', 'robin', 'sack', 'sail', 'scale', 'sea', 'sister', 'soap', 'song', 'spark', 'space', 'spoon', 'spot', 'spy', 'summer', 'tiger', 'toad', 'town', 'trail', 'tramp', 'tray', 'trick', 'trip', 'uncle', 'vase', 'winter', 'water', 'week', 'wheel', 'wish', 'wool', 'yard', 'zebra', 'actor', 'airplane', 'airport', 'army', 'baseball', 'beef', 'birthday', 'boy', 'brush', 'bushes', 'butter', 'cast', 'cave', 'cent', 'cherries', 'cherry', 'cobweb', 'coil', 'cracker', 'dinner', 'eggnog', 'elbow', 'face', 'fireman', 'flavor', 'gate', 'glove', 'glue', 'goldfish', 'goose', 'grain', 'hair', 'haircut', 'hobbies', 'holiday', 'hot', 'jellyfish', 'ladybug', 'mailbox', 'number', 'oatmeal', 'pail', 'pancake', 'pear', 'pest', 'popcorn', 'queen', 'quicksand', 'quiet', 'quilt', 'rainstorm', 'scarecrow', 'scarf', 'stream', 'street', 'sugar', 'throne', 'toothpaste', 'twig', 'volleyball', 'wood', 'wrench', 'advice', 'anger', 'answer', 'apple', 'arithmetic', 'badge', 'basket', 'basketball', 'battle', 'beast', 'beetle', 'beggar', 'brain', 'branch', 'bubble', 'bucket', 'cactus', 'cannon', 'cattle', 'celery', 'cellar', 'cloth', 'coach', 'coast', 'crate', 'cream', 'daughter', 'donkey', 'drug', 'earthquake', 'feast', 'fifth', 'finger', 'flock', 'frame', 'furniture', 'geese', 'ghost', 'giraffe', 'governor', 'honey', 'hope', 'hydrant', 'icicle', 'income', 'island', 'jeans', 'judge', 'lace', 'lamp', 'lettuce', 'marble', 'month', 'north', 'ocean', 'patch', 'plane', 'playground', 'poison', 'riddle', 'rifle', 'scale', 'seashore', 'sheet', 'sidewalk', 'skate', 'slave', 'sleet', 'smoke', 'stage', 'station', 'thrill', 'throat', 'throne', 'title', 'toothbrush', 'turkey', 'underwear', 'vacation', 'vegetable', 'visitor', 'voyage', 'year', 'able', 'achieve', 'acoustics', 'action', 'activity', 'aftermath', 'afternoon', 'afterthought', 'apparel', 'appliance', 'beginner', 'believe', 'bomb', 'border', 'boundary', 'breakfast', 'cabbage', 'cable', 'calculator', 'calendar', 'caption', 'carpenter', 'cemetery', 'channel', 'circle', 'creator', 'creature', 'education', 'faucet', 'feather', 'friction', 'fruit', 'fuel', 'galley', 'guide', 'guitar', 'health', 'heart', 'idea', 'kitten', 'laborer', 'language', 'lawyer', 'linen', 'locket', 'lumber', 'magic', 'minister', 'mitten', 'money', 'mountain', 'music', 'partner', 'passenger', 'pickle', 'picture', 'plantation', 'plastic', 'pleasure', 'pocket', 'police', 'pollution', 'railway', 'recess', 'reward', 'route', 'scene', 'scent', 'squirrel', 'stranger', 'suit', 'sweater', 'temper', 'territory', 'texture', 'thread', 'treatment', 'veil', 'vein', 'volcano', 'wealth', 'weather', 'wilderness', 'wren', 'wrist', 'writer', 'account', 'achiever', 'acoustics', 'act', 'action', 'activity', 'actor', 'addition', 'adjustment', 'advertisement', 'advice', 'aftermath', 'afternoon', 'afterthought', 'agreement', 'air', 'airplane', 'airport', 'alarm', 'amount', 'amusement', 'anger', 'angle', 'animal', 'answer', 'ant', 'ants', 'apparatus', 'apparel', 'apple', 'apples', 'appliance', 'approval', 'arch', 'argument', 'arithmetic', 'arm', 'army', 'art', 'attack', 'attempt', 'attention', 'attraction', 'aunt', 'authority', 'babies', 'baby', 'back', 'badge', 'bag', 'bait', 'balance', 'ball', 'balloon', 'balls', 'banana', 'band', 'base', 'baseball', 'basin', 'basket', 'basketball', 'bat', 'bath', 'battle', 'bead', 'beam', 'bean', 'bear', 'bears', 'beast', 'bed', 'bedroom', 'beds', 'bee', 'beef', 'beetle', 'beggar', 'beginner', 'behavior', 'belief', 'believe', 'bell', 'bells', 'berry', 'bike', 'bikes', 'bird', 'birds', 'birth', 'birthday', 'bit', 'bite', 'blade', 'blood', 'blow', 'board', 'boat', 'boats', 'body', 'bomb', 'bone', 'book', 'books', 'boot', 'border', 'bottle', 'boundary', 'box', 'boy', 'boys', 'brain', 'brake', 'branch', 'brass', 'bread', 'breakfast', 'breath', 'brick', 'bridge', 'brother', 'brothers', 'brush', 'bubble', 'bucket', 'building', 'bulb', 'bun', 'burn', 'burst', 'bushes', 'business', 'butter', 'button', 'cabbage', 'cable', 'cactus', 'cake', 'cakes', 'calculator', 'calendar', 'camera', 'camp', 'can', 'cannon', 'canvas', 'cap', 'caption', 'car', 'card', 'care', 'carpenter', 'carriage', 'cars', 'cart', 'cast', 'cat', 'cats', 'cattle', 'cause', 'cave', 'celery', 'cellar', 'cemetery', 'cent', 'chain', 'chair', 'chairs', 'chalk', 'chance', 'change', 'channel', 'cheese', 'cherries', 'cherry', 'chess', 'chicken', 'chickens', 'children', 'chin', 'church', 'circle', 'clam', 'class', 'clock', 'clocks', 'cloth', 'cloud', 'clouds', 'clover', 'club', 'coach', 'coal', 'coast', 'coat', 'cobweb', 'coil', 'collar', 'color', 'comb', 'comfort', 'committee', 'company', 'comparison', 'competition', 'condition', 'connection', 'control', 'cook', 'copper', 'copy', 'cord', 'cork', 'corn', 'cough', 'country', 'cover', 'cow', 'cows', 'crack', 'cracker', 'crate', 'crayon', 'cream', 'creator', 'creature', 'credit', 'crib', 'crime', 'crook', 'crow', 'crowd', 'crown', 'crush', 'cry', 'cub', 'cup', 'current', 'curtain', 'curve', 'cushion', 'dad', 'daughter', 'day', 'death', 'debt', 'decision', 'deer', 'degree', 'design', 'desire', 'desk', 'destruction', 'detail', 'development', 'digestion', 'dime', 'dinner', 'dinosaurs', 'direction', 'dirt', 'discovery', 'discussion', 'disease', 'disgust', 'distance', 'distribution', 'division', 'dock', 'doctor', 'dog', 'dogs', 'doll', 'dolls', 'donkey', 'door', 'downtown', 'drain', 'drawer', 'dress', 'drink', 'driving', 'drop', 'drug', 'drum', 'duck', 'ducks', 'dust', 'ear', 'earth', 'earthquake', 'edge', 'education', 'effect', 'egg', 'eggnog', 'eggs', 'elbow', 'end', 'engine', 'error', 'event', 'example', 'exchange', 'existence', 'expansion', 'experience', 'expert', 'eye', 'eyes', 'face', 'fact', 'fairies', 'fall', 'family', 'fan', 'fang', 'farm', 'farmer', 'father', 'father', 'faucet', 'fear', 'feast', 'feather', 'feeling', 'feet', 'fiction', 'field', 'fifth', 'fight', 'finger', 'finger', 'fire', 'fireman', 'fish', 'flag', 'flame', 'flavor', 'flesh', 'flight', 'flock', 'floor', 'flower', 'flowers', 'fly', 'fog', 'fold', 'food', 'foot', 'force', 'fork', 'form', 'fowl', 'frame', 'friction', 'friend', 'friends', 'frog', 'frogs', 'front', 'fruit', 'fuel', 'furniture', 'alley', 'game', 'garden', 'gate', 'geese', 'ghost', 'giants', 'giraffe', 'girl', 'girls', 'glass', 'glove', 'glue', 'goat', 'gold', 'goldfish', 'goodbye', 'goose', 'government', 'governor', 'grade', 'grain', 'grandfather', 'grandmother', 'grape', 'grass', 'grip', 'ground', 'group', 'growth', 'guide', 'guitar', 'gun', 'hair', 'haircut', 'hall', 'hammer', 'hand', 'hands', 'harbor', 'harmony', 'hat', 'hate', 'head', 'health', 'hearing', 'heart', 'heat', 'help', 'hen', 'hill', 'history', 'hobbies', 'hole', 'holiday', 'home', 'honey', 'hook', 'hope', 'horn', 'horse', 'horses', 'hose', 'hospital', 'hot', 'hour', 'house', 'houses', 'humor', 'hydrant', 'ice', 'icicle', 'idea', 'impulse', 'income', 'increase', 'industry', 'ink', 'insect', 'instrument', 'insurance', 'interest', 'invention', 'iron', 'island', 'jail', 'jam', 'jar', 'jeans', 'jelly', 'jellyfish', 'jewel', 'join', 'joke', 'journey', 'judge', 'juice', 'jump', 'kettle', 'key', 'kick', 'kiss', 'kite', 'kitten', 'kittens', 'kitty', 'knee', 'knife', 'knot', 'knowledge', 'laborer', 'lace', 'ladybug', 'lake', 'lamp', 'land', 'language', 'laugh', 'lawyer', 'lead', 'leaf', 'learning', 'leather', 'leg', 'legs', 'letter', 'letters', 'lettuce', 'level', 'library', 'lift', 'light', 'limit', 'line', 'linen', 'lip', 'liquid', 'list', 'lizards', 'loaf', 'lock', 'locket', 'look', 'loss', 'love', 'low', 'lumber', 'lunch', 'lunchroom', 'machine', 'magic', 'maid', 'mailbox', 'man', 'manager', 'map', 'marble', 'mark', 'market', 'mask', 'mass', 'match', 'meal', 'measure', 'meat', 'meeting', 'memory', 'men', 'metal', 'mice', 'middle', 'milk', 'mind', 'mine', 'minister', 'mint', 'minute', 'mist', 'mitten', 'mom', 'money', 'monkey', 'month', 'moon', 'morning', 'mother', 'motion', 'mountain', 'mouth', 'move', 'muscle', 'music', 'nail', 'name', 'nation', 'neck', 'need', 'needle', 'nerve', 'nest', 'net', 'news', 'night', 'noise', 'north', 'nose', 'note', 'notebook', 'number', 'nut', 'oatmeal', 'observation', 'ocean', 'offer', 'office', 'oil', 'operation', 'opinion', 'orange', 'oranges', 'order', 'organization', 'ornament', 'oven', 'owl', 'owner', 'page', 'pail', 'pain', 'paint', 'pan', 'pancake', 'paper', 'parcel', 'parent', 'park', 'part', 'partner', 'party', 'passenger', 'paste', 'patch', 'payment', 'peace', 'pear', 'pen', 'pencil', 'person', 'pest', 'pet', 'pets', 'pickle', 'picture', 'pie', 'pies', 'pig', 'pigs', 'pin', 'pipe', 'pizzas', 'place', 'plane', 'planes', 'plant', 'plantation', 'plants', 'plastic', 'plate', 'play', 'playground', 'pleasure', 'plot', 'plough', 'pocket', 'point', 'poison', 'police', 'polish', 'pollution', 'popcorn', 'porter', 'position', 'pot', 'potato', 'powder', 'power', 'price', 'print', 'prison', 'process', 'produce', 'profit', 'property', 'prose', 'protest', 'pull', 'pump', 'punishment', 'purpose', 'push', 'quarter', 'quartz', 'queen', 'question', 'quicksand', 'quiet', 'quill', 'quilt', 'quince', 'quiver', 'rabbit', 'rabbits', 'rail', 'railway', 'rain', 'rainstorm', 'rake', 'range', 'rat', 'rate', 'ray', 'reaction', 'reading', 'reason', 'receipt', 'recess', 'record', 'regret', 'relation', 'religion', 'representative', 'request', 'respect', 'rest', 'reward', 'rhythm', 'rice', 'riddle', 'rifle', 'ring', 'rings', 'river', 'road', 'robin', 'rock', 'rod', 'roll', 'roof', 'room', 'root', 'rose', 'route', 'rub', 'rule', 'run', 'sack', 'sail', 'salt', 'sand', 'scale', 'scarecrow', 'scarf', 'scene', 'scent', 'school', 'science', 'scissors', 'screw', 'sea', 'seashore', 'seat', 'secretary', 'seed', 'selection', 'self', 'sense', 'servant', 'shade', 'shake', 'shame', 'shape', 'sheep', 'sheet', 'shelf', 'ship', 'shirt', 'shock', 'shoe', 'shoes', 'shop', 'show', 'side', 'sidewalk', 'sign', 'silk', 'silver', 'sink', 'sister', 'sisters', 'size', 'skate', 'skin', 'skirt', 'sky', 'slave', 'sleep', 'sleet', 'slip', 'slope', 'smash', 'smell', 'smile', 'smoke', 'snail', 'snails', 'snake', 'snakes', 'sneeze', 'snow', 'soap', 'society', 'sock', 'soda', 'sofa', 'son', 'song', 'songs', 'sort', 'sound', 'soup', 'space', 'spade', 'spark', 'spiders', 'sponge', 'spoon', 'spot', 'spring', 'spy', 'square', 'squirrel', 'stage', 'stamp', 'star', 'start', 'statement', 'station', 'steam', 'steel', 'stem', 'step', 'stew', 'stick', 'sticks', 'stitch', 'stocking', 'stomach', 'stone', 'stop', 'store', 'story', 'stove', 'stranger', 'straw', 'stream', 'street', 'stretch', 'string', 'structure', 'substance', 'sugar', 'suggestion', 'suit', 'summer', 'sun', 'support', 'surprise', 'sweater', 'swim', 'swing', 'system', 'table', 'tail', 'talk', 'tank', 'taste', 'tax', 'teaching', 'team', 'teeth', 'temper', 'tendency', 'tent', 'territory', 'test', 'texture', 'theory', 'thing', 'things', 'thought', 'thread', 'thrill', 'throat', 'throne', 'thumb', 'thunder', 'ticket', 'tiger', 'time', 'tin', 'title', 'toad', 'toe', 'toes', 'tomatoes', 'tongue', 'tooth', 'toothbrush', 'toothpaste', 'top', 'touch', 'town', 'toy', 'toys', 'trade', 'trail', 'train', 'trains', 'tramp', 'transport', 'tray', 'treatment', 'tree', 'trees', 'trick', 'trip', 'trouble', 'trousers', 'truck', 'trucks', 'tub', 'turkey', 'turn', 'twig', 'twist', 'umbrella', 'uncle', 'underwear', 'unit', 'use', 'vacation', 'value', 'van', 'vase', 'vegetable', 'veil', 'vein', 'verse', 'vessel', 'vest', 'view', 'visitor', 'voice', 'volcano', 'volleyball', 'voyage', 'walk', 'wall', 'war', 'wash', 'waste', 'watch', 'water', 'wave', 'waves', 'wax', 'way', 'wealth', 'weather', 'week', 'weight', 'wheel', 'whip', 'whistle', 'wilderness', 'wind', 'window', 'wine', 'wing', 'winter', 'wire', 'wish', 'woman', 'women', 'wood', 'wool', 'word', 'work', 'worm', 'wound', 'wren', 'wrench', 'wrist', 'writer', 'writing', 'yak', 'yam', 'yard', 'yarn', 'year', 'yoke', 'zebra', 'zephyr', 'zinc', 'zipper', 'zoo'];
    }
  }]);

  return Slugs;
}();

exports.default = Slugs;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Adapter2 = __webpack_require__(2);

var _Adapter3 = _interopRequireDefault(_Adapter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Players = function (_Adapter) {
  _inherits(Players, _Adapter);

  function Players() {
    _classCallCheck(this, Players);

    return _possibleConstructorReturn(this, (Players.__proto__ || Object.getPrototypeOf(Players)).apply(this, arguments));
  }

  _createClass(Players, [{
    key: 'globalFindOrCreate',

    // Global Actions

    value: function globalFindOrCreate(user, gameId, master) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.globalFind(gameId, user.id).then(function (_ref) {
          var player = _ref.player;

          resolve({ player: player });
        }).catch(function () {
          _this2.globalCreate(gameId, user, master).then(function () {
            _this2.globalFind(gameId, user.id).then(function (_ref2) {
              var player = _ref2.player;

              resolve({ player: player });
            }).catch(reject);
          }).catch(reject);
        });
      });
    }
  }, {
    key: 'globalCreate',
    value: function globalCreate(gameId, user, master) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var id = user.id,
            name = user.name,
            image = user.image,
            alive = user.alive,
            params = {
          id: id,
          gameId: gameId,
          name: name,
          image: image,
          master: master,
          score: 0,
          scoreRound: 0
        };

        _this3.db.ref(_this3.r([gameId, id])).set(params).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'globalFind',
    value: function globalFind(gameId, userId) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.db.ref(_this4.r([gameId, userId])).once('value').then(function (snap) {
          var value = snap.val();
          if (value !== null) resolve({ player: value });else reject();
        }).catch(reject);
      });
    }
  }, {
    key: 'globalListenerAdded',
    value: function globalListenerAdded(gameId, handler) {
      this.db.ref(this.r(gameId)).on('child_added', function (snap) {
        handler(snap.val());
      });
    }
  }, {
    key: 'globalListenerPlayer',
    value: function globalListenerPlayer(gameId, playerId, handler) {
      this.db.ref(this.r([gameId, playerId])).on('value', function (snap) {
        handler(snap.val());
      });
    }

    // Master Actions

  }, {
    key: 'masterDelete',
    value: function masterDelete(gameId) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5.db.ref(_this5.r(gameId)).set(null).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'masterKillPlayers',
    value: function masterKillPlayers(gameId, playerIds) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        var playerCount = playerIds.length;
        playerIds.forEach(function (playerId) {
          _this6.db.ref(_this6.r([gameId, playerId])).update({ alive: false }).then(function () {
            playerCount--;
            if (playerCount <= 0) resolve();
          }).catch(reject);
        });
      });
    }
  }, {
    key: 'masterResetStart',
    value: function masterResetStart(players) {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        var playerCount = Object.keys(players).length;
        for (var playerId in players) {
          var params = { score: 0 };
          _this7.db.ref(_this7.r([players[playerId].gameId, playerId])).update(params).then(function () {
            playerCount--;
            if (playerCount <= 0) resolve();
          }).catch(reject);
        }
      });
    }
  }, {
    key: 'masterTallyScores',
    value: function masterTallyScores(players, points) {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        var playerCount = Object.keys(players).length;
        for (var playerId in players) {
          var pointsVal = points[playerId],
              player = players[playerId];
          if (pointsVal) {
            var scoreRound = player._.scoreRound + pointsVal,
                score = player._.score + pointsVal;
            _this8.db.ref(_this8.r([player.gameId, playerId])).update({ score: score, scoreRound: scoreRound }).then(function () {
              playerCount--;
              if (playerCount <= 0) resolve();
            }).catch(reject);
          } else {
            playerCount--;
            if (playerCount <= 0) resolve();
          }
        }
      });
    }
  }, {
    key: 'masterUpdateRoundData',
    value: function masterUpdateRoundData(players, _ref3) {
      var _this9 = this;

      var playerIdsImpostors = _ref3.playerIdsImpostors,
          playerIdsAgents = _ref3.playerIdsAgents;

      return new Promise(function (resolve, reject) {
        var playerCount = Object.keys(players).length;
        for (var playerId in players) {
          var player = players[playerId];
          var role = void 0,
              alive = true,
              score = 0,
              scoreRound = 0;
          if (playerIdsImpostors.includes(playerId)) role = 'impostor';else if (playerIdsAgents.includes(playerId)) role = 'agent';else role = 'agent';
          _this9.db.ref(_this9.r([player.gameId, playerId])).update({ role: role, alive: alive, score: score, scoreRound: scoreRound }).then(function () {
            playerCount--;
            if (playerCount <= 0) resolve();
          }).catch(reject);
        }
      });
    }

    // Private

  }, {
    key: '_key',
    get: function get() {
      return 'players';
    }
  }]);

  return Players;
}(_Adapter3.default);

exports.default = Players;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Adapter2 = __webpack_require__(2);

var _Adapter3 = _interopRequireDefault(_Adapter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Users = function (_Adapter) {
  _inherits(Users, _Adapter);

  function Users() {
    _classCallCheck(this, Users);

    return _possibleConstructorReturn(this, (Users.__proto__ || Object.getPrototypeOf(Users)).apply(this, arguments));
  }

  _createClass(Users, [{
    key: 'globalFindOrCreate',

    // Global Actions

    value: function globalFindOrCreate(params) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var data = _this2._userDataFromParams(params);
        _this2.globalFind(data.id).then(function (user) {
          resolve({ user: user });
        }).catch(function () {
          _this2.globalCreate(data).then(function () {
            _this2.globalFind(data.id).then(function (user) {
              resolve({ user: user });
            }).catch(reject);
          }).catch(reject);
        });
      });
    }
  }, {
    key: 'globalCreate',
    value: function globalCreate(params) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.db.ref(_this3.r(params.id)).set(params).then(function () {
          resolve(true);
        }).catch(reject);
      });
    }
  }, {
    key: 'globalFind',
    value: function globalFind(userId) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.db.ref(_this4.r(userId)).once('value').then(function (snap) {
          var value = snap.val();
          if (value !== null) resolve(value);else reject();
        }).catch(reject);
      });
    }
  }, {
    key: 'globalUpdate',
    value: function globalUpdate(userId, params) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5.db.ref(_this5.r(userId)).update(params).then(function () {
          resolve(true);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }

    // Private

  }, {
    key: '_userDataFromParams',
    value: function _userDataFromParams(params) {
      var id = params.uid,
          image = params.photoURL,
          name = params.displayName.replace(/ .+$/, '');
      return { id: id, image: image, name: name };
    }
  }, {
    key: '_key',
    get: function get() {
      return 'users';
    }
  }]);

  return Users;
}(_Adapter3.default);

exports.default = Users;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var firebaseKeys = __webpack_require__(16);

var Auth = function () {
  function Auth() {
    _classCallCheck(this, Auth);

    firebase.initializeApp(firebaseKeys);
  }

  _createClass(Auth, [{
    key: 'detectExisting',
    value: function detectExisting() {
      return new Promise(function (resolve, reject) {
        firebase.auth().onAuthStateChanged(function (existingUser) {
          if (existingUser) resolve(existingUser);else reject();
        });
      });
    }
  }, {
    key: 'detectRedirectResult',
    value: function detectRedirectResult() {
      return new Promise(function (resolve, reject) {
        firebase.auth().getRedirectResult(function (result) {
          if (result) resolve(result.user);else reject();
        });
      });
    }
  }, {
    key: 'authenticate',
    value: function authenticate(type) {
      var provider = new firebase.auth[type]();
      firebase.auth().signInWithRedirect(provider);
    }
  }]);

  return Auth;
}();

exports.default = Auth;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  apiKey: 'AIzaSyBpZA1-uyug0KrUvgAOSfQwrMVvw4BtV-Y',
  authDomain: 'lexicon-standoff.firebaseapp.com',
  databaseURL: 'https://lexicon-standoff.firebaseio.com',
  projectId: 'lexicon-standoff',
  storageBucket: '',
  messagingSenderId: '856454410862'
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Adapters = __webpack_require__(3);

var _Adapters2 = _interopRequireDefault(_Adapters);

var _Renderers = __webpack_require__(6);

var _Renderers2 = _interopRequireDefault(_Renderers);

var _Game = __webpack_require__(8);

var _Game2 = _interopRequireDefault(_Game);

var _Player = __webpack_require__(28);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = __webpack_require__(4);

var //
STUB = config.env === 'development',
    STUB_COUNT = 5,
    STUB_PREFIX = 'TEST_USER_';

var State = function () {
  function State(_ref) {
    var user = _ref.user;

    _classCallCheck(this, State);

    this.user = user;
    this.initializeLaunch();
    this.initialize();
  }

  _createClass(State, [{
    key: 'initializeLaunch',
    value: function initializeLaunch() {
      this.launch = new _Renderers2.default.Launch(null, {
        createGame: this.createGame.bind(this),
        findGame: this.findGame.bind(this)
      });
      this.launch.renderInitial();
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      if (this.user.currentGameId) {
        _Adapters2.default.Games.globalFind(this.user.currentGameId).then(this.initializeGame.bind(this)).catch(function () {
          _this.launch.render({ user: _this.user });
        });
      } else {
        this.launch.render({ user: this.user });
      }
    }
  }, {
    key: 'createGame',
    value: function createGame() {
      var _this2 = this;

      _Adapters2.default.Games.masterCreate(this.user.id).then(function (props) {
        return _this2.initializeGame(props, true);
      }).catch(this.handleError.bind(this));
    }
  }, {
    key: 'findGame',
    value: function findGame(slug) {
      _Adapters2.default.Games.globalFind(slug).then(this.initializeGame.bind(this)).catch(this.handleError.bind(this));
    }

    // Handlers

  }, {
    key: 'handleGameChanges',
    value: function handleGameChanges() {
      if (this.game.changes.status) this.handleStatusChange();
      if (this.master) {
        if (this.game.changes.votes) this.handleVotesChange();
        if (this.game._.status === 'votes' && this.game.changes.killedIds) this.handleKilledIdsChange();
      }
    }
  }, {
    key: 'handleStatusChange',
    value: function handleStatusChange() {
      if (this.game._) this.render();
    }
  }, {
    key: 'handleKilledIdsChange',
    value: function handleKilledIdsChange() {
      var _this3 = this;

      var roundOverData = this.game.calculateRoundOverData(this.players),
          points = this.game.calculatePoints(this.players, roundOverData);
      // Add player points then update results
      _Adapters2.default.Players.masterTallyScores(this.players, points).then(function () {
        var aliveCounts = roundOverData.aliveCounts,
            aliveIds = roundOverData.aliveIds,
            deadCounts = roundOverData.deadCounts,
            deadIds = roundOverData.deadIds,
            roundOver = roundOverData.roundOver,
            params = {
          status: 'results',
          aliveCounts: aliveCounts,
          aliveIds: aliveIds,
          deadCounts: deadCounts,
          deadIds: deadIds,
          roundOver: roundOver
        };

        _Adapters2.default.Games.masterUpdateResults(_this3.game.id, params);
      });
    }
  }, {
    key: 'handleVotesChange',
    value: function handleVotesChange() {
      var _this4 = this;

      if (this.game._.status === 'votes') {
        if (this.game.detectAllVotesSubmitted() && !this.killLock) {
          this.killLock = true;

          var _game$generateKilledI = this.game.generateKilledIds(),
              killVotes = _game$generateKilledI.killVotes,
              killedIds = _game$generateKilledI.killedIds;

          _Adapters2.default.Players.masterKillPlayers(this.game.id, killedIds).then(function () {
            var playerCountAlive = _this4.game._.playerCountAlive - killedIds.length;
            _Adapters2.default.Games.masterUpdateKilledIds(_this4.game.id, killedIds, killVotes, playerCountAlive).then(function () {
              _this4.killLock = false;
            });
          });
        }
      }
    }
  }, {
    key: 'handleError',
    value: function handleError(message) {
      alert(message);
    }

    // Initializers

  }, {
    key: 'initializeGame',
    value: function initializeGame(_ref2) {
      var _this5 = this;

      var game = _ref2.game;
      var newGame = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (STUB && newGame) this._devCreateStubbedPlayers(game.id);
      this.playerId = this.user.id;
      this.gameId = game.id;
      this.master = game.masterId === this.playerId;
      this.players = {};
      _Adapters2.default.Players.globalListenerAdded(this.gameId, function (player) {
        _this5.initializePlayer(player);
      });
      _Adapters2.default.Users.globalUpdate(this.playerId, { currentGameId: this.gameId });
      _Adapters2.default.Players.globalFindOrCreate(this.user, this.gameId, this.master).then(function (player) {
        _this5.game = new _Game2.default({ state: _this5 });
        _Adapters2.default.Games.globalListener(_this5.gameId, function (game) {
          if (game) {
            _this5.game.update(game);
            _this5.handleGameChanges();
          } else {
            _this5.rendered = false;
            _Adapters2.default.Users.globalUpdate(_this5.playerId, { currentGameId: null });
            _this5.launch.render({ user: _this5.user });
          }
        });
      });
    }
  }, {
    key: 'initializePlayer',
    value: function initializePlayer(player) {
      var _this6 = this;

      this.players[player.id] = new _Player2.default(this, player);
      _Adapters2.default.Players.globalListenerPlayer(this.gameId, player.id, function (player) {
        if (player && _this6.players[player.id]) _this6.players[player.id].update(player);
      });
      if (!this.rendered && this.player) this.initializeRenderers();
      if (this.player) {
        // We dont have it on initial render
        this.renderers.start.player = this.player;
        this.renderers.start.render({
          players: this.players,
          gameId: this.gameId
        });
      }
    }
  }, {
    key: 'initializeRenderers',
    value: function initializeRenderers() {
      var _this7 = this;

      if (this.renderers) {
        for (var key in this.renderers) {
          this.renderers[key].remove();
        }
      }
      this.renderers = {
        start: new _Renderers2.default.Start(this.player, {
          dispatchStart: function dispatchStart() {
            return _this7.dispatchStart();
          },
          dispatchEnd: function dispatchEnd() {
            return _this7.dispatchEnd();
          }
        }),
        turns: new _Renderers2.default.Turns(this.player, {
          dispatchReveal: function dispatchReveal() {
            return _this7.dispatchReveal();
          }
        }),
        reveal: new _Renderers2.default.Reveal(this.player, {
          dispatchVotes: function dispatchVotes() {
            return _this7.dispatchVotes();
          }
        }),
        votes: new _Renderers2.default.Votes(this.player, {
          dispatchVote: function dispatchVote(p) {
            return _this7.dispatchVote(p);
          }
        }),
        results: new _Renderers2.default.Results(this.player, {
          dispatchEnd: function dispatchEnd() {
            return _this7.dispatchEnd();
          },
          dispatchTurns: function dispatchTurns() {
            return _this7.dispatchTurns();
          },
          dispatchNewRound: function dispatchNewRound() {
            return _this7.dispatchNewRound();
          }
        })
      };
      this.renderers.start.renderInitial();
      this.renderers.turns.renderInitial();
      this.renderers.reveal.renderInitial();
      this.renderers.votes.renderInitial();
      this.renderers.results.renderInitial();
      this.rendered = true;
    }

    // Dispatchers

  }, {
    key: 'dispatchStart',
    value: function dispatchStart() {
      var _this8 = this;

      _Adapters2.default.Players.masterResetStart(this.players).then(function () {
        _this8.dispatchNewRound();
      });
    }
  }, {
    key: 'dispatchTurns',
    value: function dispatchTurns() {
      var _this9 = this;

      var topics = this.game.generateTopics();
      _Adapters2.default.Games.masterResetRound(this.game.id, topics).then(function () {
        _Adapters2.default.Games.masterUpdateStatus(_this9.game.id, 'turns');
      });
    }
  }, {
    key: 'dispatchReveal',
    value: function dispatchReveal() {
      _Adapters2.default.Games.masterUpdateStatus(this.game.id, 'reveal');
    }
  }, {
    key: 'dispatchVotes',
    value: function dispatchVotes() {
      _Adapters2.default.Games.masterUpdateStatus(this.game.id, 'votes');
    }
  }, {
    key: 'dispatchNewRound',
    value: function dispatchNewRound() {
      var _this10 = this;

      var roundData = this.game.generateRoundData();
      _Adapters2.default.Games.masterUpdateRoundData(this.game.id, roundData.game).then(function () {
        _Adapters2.default.Players.masterUpdateRoundData(_this10.players, roundData.players).then(function () {
          _Adapters2.default.Games.masterUpdateStatus(_this10.game.id, 'turns');
        });
      });
    }
  }, {
    key: 'dispatchEnd',
    value: function dispatchEnd() {
      var _this11 = this;

      _Adapters2.default.Players.masterDelete(this.game.id).then(function () {
        _Adapters2.default.Games.masterDelete(_this11.game.id);
      });
    }
  }, {
    key: 'dispatchVote',
    value: function dispatchVote(playerId) {
      _Adapters2.default.Games.globalKillVote(this.game.id, this.user.id, playerId);
      if (STUB) this.devDispatchVote(playerId);
    }
  }, {
    key: 'devDispatchVote',
    value: function devDispatchVote(playerId) {
      var spoofs = this.game._.playerCount - STUB_COUNT;
      if (this.player._.master) for (var i = 0; i < this.game._.playerCountAlive - 1; i++) {
        var id = '' + STUB_PREFIX + (i + 1);
        _Adapters2.default.Games.globalKillVote(this.game.id, id, playerId);
      }
    }

    // Rendering

  }, {
    key: 'render',
    value: function render() {
      var _this12 = this;

      var status = this.game._.status;
      var map = {
        turns: function turns() {
          return _this12.renderers.turns.render(_this12.game._);
        },
        reveal: function reveal() {
          return _this12.renderers.reveal.render(_this12.game._);
        },
        votes: function votes() {
          return _this12.renderers.votes.render({
            players: _this12.players,
            impostorCount: _this12.game._.impostorCount,
            votes: _this12.game._.votes
          });
        },
        results: function results() {
          return _this12.renderers.results.render({
            players: _this12.players,
            gameData: _this12.game._
          });
        }
      };
      return map[status] ? map[status]() : null;
    }
  }, {
    key: '_devCreateStubbedPlayers',


    // Private

    value: function _devCreateStubbedPlayers(gameId) {
      var image = 'https://lh4.googleusercontent.com/-qkrR_IJ6BCc/AAAAAAAAAAI/AAAAAAAABGU/SQGbIJDw4NQ/photo.jpg';
      for (var i = 0; i < STUB_COUNT; i++) {
        _Adapters2.default.Players.globalCreate(gameId, {
          id: '' + STUB_PREFIX + (i + 1),
          name: 'Player' + (i + 1),
          image: image
        }, false);
      }
    }
  }, {
    key: 'player',
    get: function get() {
      return this.players[this.playerId];
    }
  }]);

  return State;
}();

exports.default = State;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Renderer2 = __webpack_require__(0);

var _Renderer3 = _interopRequireDefault(_Renderer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Launch = function (_Renderer) {
  _inherits(Launch, _Renderer);

  function Launch() {
    _classCallCheck(this, Launch);

    return _possibleConstructorReturn(this, (Launch.__proto__ || Object.getPrototypeOf(Launch)).apply(this, arguments));
  }

  _createClass(Launch, [{
    key: 'renderInitial',
    value: function renderInitial() {
      var $h1 = this.el('h1', 'Lexicon Standoff'),
          $desc = this.el('p', 'Your web app is out of date. Please close and reopen it.', 'description');
      this.append(this.$main, [$h1, $desc]);
    }
  }, {
    key: 'render',
    value: function render() {
      this.toggleSections();
    }
  }, {
    key: '_name',
    get: function get() {
      return 'new-version';
    }
  }, {
    key: '_eventsList',
    get: function get() {
      return [];
    }
  }]);

  return Launch;
}(_Renderer3.default);

exports.default = Launch;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Renderer2 = __webpack_require__(0);

var _Renderer3 = _interopRequireDefault(_Renderer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Auth = function (_Renderer) {
  _inherits(Auth, _Renderer);

  function Auth() {
    _classCallCheck(this, Auth);

    return _possibleConstructorReturn(this, (Auth.__proto__ || Object.getPrototypeOf(Auth)).apply(this, arguments));
  }

  _createClass(Auth, [{
    key: 'renderInitial',
    value: function renderInitial() {
      var _this2 = this;

      var $h1 = this.el('h1', 'Lexicon Standoff'),
          $desc = this.el('p', 'Please Sign In', 'description'),
          $google = this.el('button', 'Google'),
          $facebook = this.el('button', 'Facebook'),
          $twitter = this.el('button', 'Twitter');
      this.append(this.$main, [$h1, $desc, $google, $facebook, $twitter]);
      $google.addEventListener('click', function () {
        _this2.events.authGoogle();
      });
      $facebook.addEventListener('click', function () {
        _this2.events.authFacebook();
      });
      $twitter.addEventListener('click', function () {
        _this2.events.authTwitter();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      this.toggleSections();
    }
  }, {
    key: '_name',
    get: function get() {
      return 'auth';
    }
  }, {
    key: '_eventsList',
    get: function get() {
      return ['authTwitter', 'authGoogle', 'authFacebook'];
    }
  }]);

  return Auth;
}(_Renderer3.default);

exports.default = Auth;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Renderer2 = __webpack_require__(0);

var _Renderer3 = _interopRequireDefault(_Renderer2);

var _Button = __webpack_require__(1);

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Launch = function (_Renderer) {
  _inherits(Launch, _Renderer);

  function Launch() {
    _classCallCheck(this, Launch);

    return _possibleConstructorReturn(this, (Launch.__proto__ || Object.getPrototypeOf(Launch)).apply(this, arguments));
  }

  _createClass(Launch, [{
    key: 'renderInitial',
    value: function renderInitial() {
      var _this2 = this;

      var $inst = this.el('p', 'If you are on a mobile device, add this site to your home screen to get full screen.\n          iOS can only do this through Safari.', 'instruction'),
          $or = this.el('p', 'Enter a Secret to Join'),
          $slug = this.el('input'),
          $grp = this.el('div', null, 'item-group');
      this.new = new _Button2.default({
        content: 'Create a Game',
        clickEvent: this.events.createGame.bind(this)
      });
      this.join = new _Button2.default({
        content: 'Join',
        clickEvent: function clickEvent() {
          return _this2.events.findGame($slug.value.replace(/ /g, '').toLowerCase());
        }
      });

      this.$user = this.el('p', null, 'user-info');
      $slug.setAttribute('type', 'text');
      $slug.setAttribute('placeholder', 'gamesecret');
      this.append($grp, [$slug, this.join.$el]);
      this.append(this.$main, [this.$user, this.new.$el, $or, $grp]);
      this.$footer.appendChild($inst);
    }
  }, {
    key: 'render',
    value: function render(_ref) {
      var user = _ref.user;

      this.toggleSections();
      this.$user.innerHTML = '<img src="' + user.image + '" /> <span>' + user.name + '</span>';
    }
  }, {
    key: '_name',
    get: function get() {
      return 'launch';
    }
  }, {
    key: '_eventsList',
    get: function get() {
      return ['createGame', 'findGame'];
    }
  }]);

  return Launch;
}(_Renderer3.default);

exports.default = Launch;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Renderer2 = __webpack_require__(0);

var _Renderer3 = _interopRequireDefault(_Renderer2);

var _Button = __webpack_require__(1);

var _Button2 = _interopRequireDefault(_Button);

var _List = __webpack_require__(5);

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Start = function (_Renderer) {
  _inherits(Start, _Renderer);

  function Start() {
    _classCallCheck(this, Start);

    return _possibleConstructorReturn(this, (Start.__proto__ || Object.getPrototypeOf(Start)).apply(this, arguments));
  }

  _createClass(Start, [{
    key: 'renderInitial',
    value: function renderInitial() {
      this.$h1 = this.el('h1', 'Waiting for Players...');
      this.$header.appendChild(this.$h1);

      this.$secretLabel = this.el('p', 'Game Secret', 'label');
      this.$secret = this.el('p', null, 'secret');
      this.append(this.$main, [this.$secretLabel, this.$secret]);

      this.players = new _List2.default();
      this.append(this.$main, this.players.elements);

      if (this.player._.master) {
        var $inst = this.el('p', 'Once everyone is here, start the game. Players can join this Game using the Game Secret above.', 'instruction');
        var $group = this.el('div', null, 'item-group');
        var cancel = new _Button2.default({
          content: 'Cancel',
          clickEvent: this.events.dispatchEnd.bind(this)
        });
        this.start = new _Button2.default({
          content: 'Start',
          clickEvent: this.events.dispatchStart.bind(this)
        });
        this.append($group, [cancel.$el, this.start.$el]);
        this.append(this.$footer, [$inst, $group]);
      }
    }
  }, {
    key: 'render',
    value: function render(_ref) {
      var players = _ref.players,
          gameId = _ref.gameId;

      this.players.reset();
      var playerCount = Object.keys(players).length;
      var remain = 3 - playerCount,
          waiting = remain > 0,
          playerS = remain > 1 ? 'Players' : 'Player';
      this.players.title(waiting ? 'Need at least ' + remain + ' more ' + playerS : '');
      if (this.player._.master && this.start) {
        if (waiting) this.start.disable();else this.start.enable();
      }
      this.$secret.innerHTML = '\u201C' + gameId + '\u201D';
      this.toggleSections();
      for (var playerId in players) {
        var _players$playerId = players[playerId],
            image = _players$playerId.image,
            name = _players$playerId.name;

        var you = playerId === this.player.id ? 'you' : '';
        var html = '<span class="user ' + you + '"><img src="' + image + '" /> <span>' + name + '</span></span>';
        this.players.add(html);
      }
    }
  }, {
    key: '_name',
    get: function get() {
      return 'start';
    }
  }, {
    key: '_eventsList',
    get: function get() {
      return ['dispatchStart', 'dispatchEnd'];
    }
  }]);

  return Start;
}(_Renderer3.default);

exports.default = Start;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Renderer2 = __webpack_require__(0);

var _Renderer3 = _interopRequireDefault(_Renderer2);

var _Button = __webpack_require__(1);

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Turns = function (_Renderer) {
  _inherits(Turns, _Renderer);

  function Turns() {
    _classCallCheck(this, Turns);

    return _possibleConstructorReturn(this, (Turns.__proto__ || Object.getPrototypeOf(Turns)).apply(this, arguments));
  }

  _createClass(Turns, [{
    key: 'renderInitial',
    value: function renderInitial() {
      this.$h1 = this.el('h1');
      this.$topics = this.el('p', null, 'topics');
      this.$desc = this.el('p', null, 'description');
      this.$header.appendChild(this.$h1);
      this.append(this.$main, [this.$topics, this.$desc]);

      if (this.player._.master) this.renderInitialMaster();
    }
  }, {
    key: 'renderInitialMaster',
    value: function renderInitialMaster() {
      var $inst = this.el('p', 'Take clockwise turns saying a word. You\'re first in round one.\n        After a round, the first turn moves clockwise to the next alive Player.\n        Once everyone says a word, proceed.', 'instruction');
      this.proceed = new _Button2.default({
        content: 'Proceed',
        clickEvent: this.events.dispatchReveal.bind(this)
      });
      this.append(this.$footer, [$inst, this.proceed.$el]);
    }
  }, {
    key: 'render',
    value: function render(_ref) {
      var topics = _ref.topics;

      var role = this.player.capitalizedRole;
      this.$h1.innerHTML = '\n      <span class="status">Turns</span> <span class="info"><span class="throb">' + role + '</span></span>';
      if (this.player._.alive) {
        var descHtml = void 0,
            topicsHtml = void 0;
        if (this.player._.role === 'impostor') {
          descHtml = 'On your turn, say one word that you associate with this Topic. Be abstract.';
          topicsHtml = topics[0];
        } else {
          var first = Math.round(Math.random()),
              last = first === 0 ? 1 : 0;
          descHtml = 'On your turn, say one word that you associate with both of the Topics above.';
          topicsHtml = topics[first] + ' &amp; ' + topics[last];
        }
        this.$topics.innerHTML = topicsHtml;
        this.$desc.innerHTML = descHtml;
      } else {
        this.$topics.innerHTML = '';
        this.renderDead(this.$desc);
      }
      this.toggleSections();
    }
  }, {
    key: '_name',
    get: function get() {
      return 'turns';
    }
  }, {
    key: '_eventsList',
    get: function get() {
      return ['dispatchReveal'];
    }
  }]);

  return Turns;
}(_Renderer3.default);

exports.default = Turns;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Renderer2 = __webpack_require__(0);

var _Renderer3 = _interopRequireDefault(_Renderer2);

var _Button = __webpack_require__(1);

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Reveal = function (_Renderer) {
  _inherits(Reveal, _Renderer);

  function Reveal() {
    _classCallCheck(this, Reveal);

    return _possibleConstructorReturn(this, (Reveal.__proto__ || Object.getPrototypeOf(Reveal)).apply(this, arguments));
  }

  _createClass(Reveal, [{
    key: 'renderInitial',
    value: function renderInitial() {
      this.$h1 = this.el('h1');
      this.$topics = this.el('p', null, 'topics');
      this.$desc = this.el('p', null, 'description');
      this.$header.appendChild(this.$h1);
      this.append(this.$main, [this.$topics, this.$desc]);
      if (this.player._.master) {
        var $inst = this.el('p', 'Players question each other\'s word selections and discuss who they think is an Impostor.\n          Once everyone is ready to vote, proceed.', 'instruction');
        var proceed = new _Button2.default({
          content: 'Proceed',
          clickEvent: this.events.dispatchVotes.bind(this)
        });
        this.append(this.$footer, [$inst, proceed.$el]);
      }
    }
  }, {
    key: 'render',
    value: function render(_ref) {
      var topics = _ref.topics;

      var role = this.player.capitalizedRole;
      this.$h1.innerHTML = '\n      <span class="status">Reveal</span> <span class="info"><span class="throb">' + role + '</span></span>';
      this.$topics.innerHTML = topics[0] + ' &amp; ' + topics[1];
      if (this.player._.alive) {
        this.$desc.innerHTML = "If questioned, explain your association for the Topics. Question other's choices.";
      } else {
        this.renderDead(this.$desc);
      }
      this.toggleSections();
    }
  }, {
    key: '_name',
    get: function get() {
      return 'reveal';
    }
  }, {
    key: '_eventsList',
    get: function get() {
      return ['dispatchVotes'];
    }
  }]);

  return Reveal;
}(_Renderer3.default);

exports.default = Reveal;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Renderer2 = __webpack_require__(0);

var _Renderer3 = _interopRequireDefault(_Renderer2);

var _Button = __webpack_require__(1);

var _Button2 = _interopRequireDefault(_Button);

var _List = __webpack_require__(5);

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Votes = function (_Renderer) {
  _inherits(Votes, _Renderer);

  function Votes() {
    _classCallCheck(this, Votes);

    return _possibleConstructorReturn(this, (Votes.__proto__ || Object.getPrototypeOf(Votes)).apply(this, arguments));
  }

  _createClass(Votes, [{
    key: 'renderInitial',
    value: function renderInitial() {
      var _this2 = this;

      this.$h1 = this.el('h1');
      this.$header.appendChild(this.$h1);

      this.$desc = this.el('p', null, 'description');
      this.$main.appendChild(this.$desc);

      this.votes = new _List2.default();
      this.append(this.$main, this.votes.elements);

      this.graveyard = new _List2.default();
      this.append(this.$main, this.graveyard.elements);

      this.vote = new _Button2.default({
        content: 'Vote',
        clickEvent: function clickEvent() {
          var playerId = _this2.$section.querySelector(':checked').value;
          _this2.events.dispatchVote(playerId);
          _this2.vote.disable();
          _this2.$main.classList.add('inactive');
        }
      });
      this.append(this.$footer, [this.vote.$el]);
    }
  }, {
    key: 'render',
    value: function render(_ref) {
      var players = _ref.players,
          votes = _ref.votes,
          impostorCount = _ref.impostorCount;

      this.$main.classList.remove('inactive');
      this.vote.enable();
      this.votes.reset();
      this.graveyard.reset();
      this.toggleSections();

      this.graveyard.title('Graveyard');
      var role = this.player.capitalizedRole;
      this.$h1.innerHTML = '\n      <span class="status">Votes</span> <span class="info"><span class="throb">' + role + '</span></span>';
      // If this player has already voted (refreshed the vote page after voting)
      if (votes && votes[this.player.id]) {
        this.votes.title('You have already voted!');
        this.$footer.classList.add('hide');
        this.vote.disable();
      } else {
        if (this.player._.alive) {
          this.$footer.classList.remove('hide');
          this.votes.title('Select a Player');
          var agentCount = Object.keys(players).length - impostorCount,
              isAre = impostorCount === 1 ? 'is' : 'are',
              impostorS = this._pluralize(impostorCount, 'Impostor'),
              agentS = this._pluralize(agentCount, 'Agent');
          this.$desc.innerHTML = '\n          Vote for the Player you want to Kill. There ' + isAre + ' a total of ' + impostorS + ' and ' + agentS + '.';

          var first = true;
          for (var playerId in players) {
            if (playerId !== this.player.id) {
              var player = players[playerId];
              if (player._.alive) {
                var selected = first ? 'checked' : '';
                if (first) first = false;
                this.votes.add('\n                <input id="' + playerId + '" value="' + playerId + '"\n                  type="radio" name="votes" ' + selected + ' />\n                <label for="' + playerId + '">' + this.userSpan(player) + '</label>\n              ');
              }
            }
          }
        } else {
          this.renderDead(this.$desc);
          this.$footer.classList.add('hide');
        }
      }

      var graveyard = false;
      for (var _playerId in players) {
        var _player = players[_playerId];
        if (!_player._.alive) {
          graveyard = true;
          this.graveyard.add(this.userSpan(_player));
        }
      }
      if (!graveyard) this.graveyard.$ul.innerHTML = '<li class="empty">Empty</li>';
    }
  }, {
    key: '_pluralize',
    value: function _pluralize(count, word) {
      if (count === 1) {
        return '1 ' + word;
      } else {
        return count + ' ' + word + 's';
      }
    }
  }, {
    key: '_name',
    get: function get() {
      return 'votes';
    }
  }, {
    key: '_eventsList',
    get: function get() {
      return ['dispatchVote'];
    }
  }]);

  return Votes;
}(_Renderer3.default);

exports.default = Votes;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Game = __webpack_require__(8);

var _Game2 = _interopRequireDefault(_Game);

var _Renderer2 = __webpack_require__(0);

var _Renderer3 = _interopRequireDefault(_Renderer2);

var _Button = __webpack_require__(1);

var _Button2 = _interopRequireDefault(_Button);

var _List = __webpack_require__(5);

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Results = function (_Renderer) {
  _inherits(Results, _Renderer);

  function Results() {
    _classCallCheck(this, Results);

    return _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).apply(this, arguments));
  }

  _createClass(Results, [{
    key: 'renderInitial',
    value: function renderInitial() {
      this.$h1 = this.el('h1');
      this.$header.appendChild(this.$h1);

      this.$desc = this.el('div');
      this.$main.appendChild(this.$desc);

      this.killed = new _List2.default();
      this.append(this.$main, this.killed.elements);

      this.players = new _List2.default();
      this.append(this.$main, this.players.elements);

      this.extra1 = new _List2.default();
      this.append(this.$main, this.extra1.elements);

      this.extra2 = new _List2.default();
      this.append(this.$main, this.extra2.elements);

      this.$score = this.el('p', null, 'description');
      this.$main.appendChild(this.$score);

      if (this.player._.master) this.renderInitialMaster();
    }
  }, {
    key: 'renderInitialMaster',
    value: function renderInitialMaster() {
      var $inst = this.el('p', 'Once everyone is ready, you may proceed below.', 'instruction'),
          round = new _Button2.default({
        content: 'Continue',
        clickEvent: this.events.dispatchNewRound.bind(this)
      }),
          end = new _Button2.default({
        content: 'End',
        clickEvent: this.events.dispatchEnd.bind(this)
      });
      this.continue = new _Button2.default({
        content: 'Proceed',
        clickEvent: this.events.dispatchTurns.bind(this)
      });
      this.$group = this.el('div', null, 'item-group');
      this.append(this.$group, [round.$el, end.$el]);
      this.append(this.$footer, [$inst, this.$group, this.continue.$el]);
    }
  }, {
    key: 'render',
    value: function render(_ref) {
      var _this2 = this;

      var players = _ref.players,
          gameData = _ref.gameData;
      var aliveCounts = gameData.aliveCounts,
          aliveIds = gameData.aliveIds,
          deadCounts = gameData.deadCounts,
          deadIds = gameData.deadIds,
          roundOver = gameData.roundOver,
          killVotes = gameData.killVotes,
          killedIds = gameData.killedIds;

      this.killed.reset();
      this.players.reset();
      this.extra1.reset();
      this.extra2.reset();
      this.$score.innerHTML = '';

      this.toggleSections();

      var role = this.player.capitalizedRole;
      this.$h1.innerHTML = '\n      <span class="status">Results</span> <span class="info"><span class="throb">' + role + '</span></span>';

      var killedVotes = killVotes[killedIds[0]];

      this.killed.title('\n      Killed this Round by ' + killedVotes + ' Vote' + (killedVotes > 1 ? 's' : ''));

      killedIds.forEach(function (key) {
        _this2.killed.add(_this2.userSpan(players[key], 'dead'));
      });

      if (roundOver) {
        this.extra1.title('Impostors');
        this.extra2.title('Standings');
        this.extra2.$ul.classList.add('flex-list-half');
        var winnerText = this._winnerText(aliveCounts);
        this.$desc.innerHTML = '\n        <p class="description">' + winnerText + '</p>\n        <p class="description">' + this._roundPointsText(aliveCounts) + '</p>\n      ';
        var playerIds = Object.keys(players);
        playerIds.sort(function (a, b) {
          var aScore = players[a]._.score,
              bScore = players[b]._.score;
          if (aScore > bScore) return -1;
          if (aScore < bScore) return 1;
          return 0;
        }).forEach(function (playerId) {
          var player = players[playerId],
              score = '<span class="score">' + player._.score + '</span>',
              html = _this2.userSpan(player) + ' ' + score;
          _this2.extra2.add(html);
          if (player._.role === 'impostor') _this2.extra1.add(_this2.userSpan(player));
        });
      } else {
        this.extra1.title('Survivors');
        this.extra2.title('Graveyard');
        this.extra2.$ul.classList.remove('flex-list-half');
        this.$desc.innerHTML = '\n        <p class="description">The Round is still in progress. Player roles will be maintained.</p>\n        <p class="description">' + this._playerPoints() + '</p>\n      ';
        for (var playerId in players) {
          var player = players[playerId],
              alive = player._.alive;
          if (alive) {
            this.extra1.add(this.userSpan(player));
          } else {
            this.extra2.add(this.userSpan(player));
          }
        }
      }

      if (this.player._.master) this.renderMaster(roundOver);
    }
  }, {
    key: 'renderMaster',
    value: function renderMaster(roundOver) {
      if (roundOver) {
        this.continue.$el.classList.add('hide');
        this.$group.classList.remove('hide');
      } else {
        this.continue.$el.classList.remove('hide');
        this.$group.classList.add('hide');
      }
    }
  }, {
    key: '_points',
    value: function _points(count) {
      var pointS = count === 1 ? 'point' : 'points';
      return '<span class="points">' + count + ' ' + pointS + '</span>';
    }
  }, {
    key: '_winnerText',
    value: function _winnerText(_ref2) {
      var imposter = _ref2.imposter,
          agent = _ref2.agent;

      if (imposter > 0) return 'The <span class="role">Impostors</span> won!';
      if (agent > 0) return 'The <span class="role">Agents</span> won!';
      return 'It was a draw!';
    }
  }, {
    key: '_roundPointsText',
    value: function _roundPointsText(_ref3) {
      var imposter = _ref3.imposter,
          agent = _ref3.agent;

      if (imposter > 0) return 'All Impostors receive ' + this._points(_Game2.default.survivePoints) + '.';
      if (agent > 0) return 'All Agents receive ' + this._points(_Game2.default.survivePoints) + '.';
      return 'No one receives additional points.';
    }
  }, {
    key: '_playerPoints',
    value: function _playerPoints() {
      var _player$_ = this.player._,
          scoreRound = _player$_.scoreRound,
          role = _player$_.role,
          alive = _player$_.alive,
          scoreTurn = alive ? _Game2.default[role + 'Points'] : 0,
          reason = alive ? 'survived' : 'died';

      return 'You received ' + this._points(scoreTurn) + ' this Turn because you ' + reason + '\n      and have scored ' + this._points(scoreRound) + ' this Round.';
    }
  }, {
    key: '_name',
    get: function get() {
      return 'results';
    }
  }, {
    key: '_eventsList',
    get: function get() {
      return ['dispatchEnd', 'dispatchTurns', 'dispatchNewRound'];
    }
  }]);

  return Results;
}(_Renderer3.default);

exports.default = Results;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Topics = function () {
  function Topics() {
    _classCallCheck(this, Topics);

    this.indexes = [];
  }

  _createClass(Topics, [{
    key: 'loadTopic',
    value: function loadTopic() {
      return this.topics[this.findIndex()];
    }
  }, {
    key: 'findIndex',
    value: function findIndex() {
      var index = Math.floor(Math.random() * this.topics.length);
      if (this.indexes.includes(index)) {
        return this.findIndex();
      } else {
        this.indexes.push(index);
        return index;
      }
    }
  }, {
    key: 'topics',
    get: function get() {
      return ['Accordions', 'Adult', 'Aeroplane', 'Africa', 'Agriculture', 'Air', 'Aircraft Carrier', 'Airforce', 'Airplane', 'Airports', 'Album', 'Alligators', 'Alphabet', 'America', 'Amusement Parks', 'Apes', 'Apple', 'Archery', 'Arm', 'Army', 'Art', 'Artists', 'Asia', 'Astronomy', 'Athletics', 'Baby', 'Backpack', 'Bakeries', 'Balloons', 'Bananas', 'Bank', 'Barbecue', 'Barbers', 'Baseball', 'Basketball', 'Bathroom', 'Bathtub', 'Bats', 'Bears', 'Bed', 'Bee', 'Beekeeping', 'Bible', 'Billiards', 'Birds', 'Blacksmiths', 'Boats', 'Bohemians', 'Bomb', 'Books', 'Boss', 'Bottle', 'Bowl', 'Box', 'Boxing', 'Boy', 'Boy Scouts', 'Brain', 'Bread', 'Breastfeeding', 'Breweries', 'Bridges', 'Buddhism', 'Buffaloes', 'Butterfly', 'Button', 'Cactus', 'Camels', 'Canoes', 'Cappuccino', 'Car', 'Car-race', 'Cards', 'Carousels', 'Carpentry', 'Carpet', 'Carrot', 'Cats', 'Caves', 'Cemetery', 'Central America', 'Chair', 'Checkbook', 'Cheese', 'Chess', 'Chess Board', 'Chief', 'Child', 'Chisel', 'Chocolates', 'Church', 'Cigarettes', 'Circle', 'Circus', 'Clock', 'Clowns', 'Coal', 'Cobblers', 'Cocoa', 'Code', 'Coffee', 'Coffee-shop', 'Coffin', 'Coins', 'Comet', 'Communism', 'Compact Disc', 'Compass', 'Computer', 'Cotton', 'Cows', 'Cricket', 'Crime', 'Criminals', 'Crocodiles', 'Crystal', 'Cup', 'Cycle', 'Cycling', 'Dance', 'Data Base', 'Death', 'Dentistry', 'Desk', 'Diamonds', 'Disasters', 'Disney Movies', 'Diving', 'Dogs', 'Dolphins', 'Donkeys', 'Dress', 'Drill', 'Drink', 'Drugstores', 'Drum', 'Dung', 'Ears', 'Earth', 'Earthquake', 'Egg', 'Electricity', 'Elephants', 'Engineering', 'Eraser', 'Europe', 'Execution', 'Explosive', 'Eyes', 'Family', 'Fan', 'Farm', 'Farmers Markets', 'Feather', 'Fencing', 'Ferry Boats', 'Festival', 'Film', 'Finger', 'Fire', 'Firemen', 'Fishing', 'Flight', 'Flood', 'Floodlight', 'Flower', 'Foot', 'Football', 'Fork', 'Fortune Tellers', 'Foxes', 'France', 'Freaks', 'Freeway', 'Frogs', 'Fruit', 'Funerals', 'Fungus', 'Games', 'Garden', 'Gas', 'Gas Station', 'Gate', 'Geese', 'Gemstone', 'Giants', 'Giraffes', 'Girl', 'Gloves', 'Goats', 'God', 'Gold', 'Golf', 'Gorillas', 'Grapes', 'Guitar', 'Gymnastics', 'Gypsies', 'Hammer', 'Hammocks', 'Hat', 'Hieroglyphics', 'Highway', 'Hippopotamus', 'Hockey', 'Horoscope', 'Horses', 'Hose', 'Hotels', 'Hunting', 'Hurricanes', 'Ice', 'Ice-cream', 'Insects', 'Jamaica', 'Jet fighter', 'Jewelery', 'Journalism', 'Jungles', 'Junk', 'Justice', 'Kaleidoscope', 'Kitchen', 'Knife', 'Laundry', 'Leather', 'Leather jacket', 'Leg', 'Library', 'Lighters', 'Lighthouses', 'Lions', 'Liquid', 'Magicians', 'Magnet', 'Man', 'Map', 'Marionettes', 'Masonry', 'Mass', 'Matches', 'Maze', 'Meat', 'Medicine', 'Meteor', 'Meteorology', 'Microscope', 'Military', 'Milkshake', 'Mining', 'Mist', 'Money', 'Monkeys', 'Monster', 'Mosquito', 'Motherhood', 'Motorcycles', 'Mountaineering', 'Mouth', 'Movie', 'Movie Theaters', 'Mules', 'Mummies', 'Muppets', 'Murderers', 'Music', 'Nail', 'Napoleon', 'Native Americans', 'Navy', 'Necklace', 'Needle', 'Newspapers', 'North Africa', 'Nurses', 'Oil', 'Onion', 'Ostriches', 'Outer Space', 'Paint Brush', 'Pants', 'Paper Boys', 'Parachute', 'Parachuting', 'Passport', 'Pebble', 'Pendulum', 'Pepper', 'Perfume', 'Pharmacy', 'Pigeons', 'Pigs', 'Pillar', 'Pillow', 'Pineapple', 'Pipe Organs', 'Pipes', 'Plane', 'Planet', 'Playing Cards', 'Pocket', 'Police', 'Politics', 'Pork', 'Post-office', 'Postcards', 'Potatoes', 'Pottery', 'President', 'Printer', 'Printing', 'Prisons', 'Programming', 'Puppets', 'Pyramid', 'Rabbits', 'Radar', 'Radio', 'Radiology', 'Railroads', 'Rainbow', 'Record', 'Red Cross', 'Restaurant', 'Rhinoceros', 'Rice', 'Rifle', 'Ring', 'Robot', 'Rock', 'Rocket', 'Roof', 'Room', 'Rope', 'Royalty', 'Rugby', 'Saddle', 'Sailing', 'Salt', 'Salvation Army', 'Sandpaper', 'Sandwich', 'Satellite', 'School', 'Seashells', 'Seesaws', 'Sewing Machines', 'Sex', 'Sharks', 'Sheep', 'Shells', 'Ship', 'Shipping', 'Shipwrecks', 'Shoes', 'Shop', 'Shovels', 'Shower', 'Signature', 'Skating', 'Skeleton', 'Skiing', 'Skull', 'Slave', 'Slavery', 'Smoking', 'Snail', 'Snakes', 'Soccer', 'Socialism', 'Software', 'Solid', 'Sorrow', 'South America', 'Space Shuttle', 'Spas', 'Spectrum', 'Sphere', 'Spice', 'Spinning', 'Spiral', 'Spirits', 'Spoon', 'Sports', 'Sports-car', 'Spotlight', 'Square', 'Stadiums', 'Staircase', 'Star', 'Stomach', 'Submarines', 'Sugar', 'Sun', 'Sunglasses', 'Surveyor', 'Swimming Pool', 'Swings', 'Sword', 'Table', 'Tanning', 'Tapestry', 'Tattoos', 'Technology', 'Teeth', 'Telephone', 'Telescope', 'Television', 'Tennis', 'The Olympic Games', 'The Post Office', 'Thermometer', 'Tigers', 'Toads', 'Tobacco', 'Toilet', 'Tongue', 'Torch', 'Torpedo', 'Torture', 'Train', 'Treadmill', 'Triangle', 'Tunnel', 'Turtles', 'Typewriters', 'Umbrella', 'Vaccines', 'Vacuum', 'Vampire', 'Vanilla', 'Vegetables', 'Veterinarians', 'Videotape', 'Volcanoes', 'Volleyball', 'Vulture', 'Water', 'Water Skiing', 'Weapon', 'Weaving', 'Web', 'Wedding', 'Whales', 'Wheelchair', 'Whistling', 'Windmills', 'Window', 'Winter', 'Woman', 'Women in the Army', 'Wood', 'World War 1', 'Worm', 'Wrestling', 'X-rays', 'Zebras', 'Zeppelins'];
    }
  }]);

  return Topics;
}();

exports.default = Topics;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var shuffle = function shuffle(a) {
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [a[j], a[i]];
    a[i] = _ref[0];
    a[j] = _ref[1];
  }
  return a;
};

exports.default = shuffle;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(state, _ref) {
    var id = _ref.id,
        gameId = _ref.gameId,
        name = _ref.name,
        image = _ref.image,
        master = _ref.master;

    _classCallCheck(this, Player);

    this.id = id;
    this.name = name;
    this.image = image;
    this.gameId = gameId;
    this.state = state;
    this._ = {};
  }

  _createClass(Player, [{
    key: "update",
    value: function update(values) {
      this._ = values;
    }
  }, {
    key: "capitalizedRole",
    get: function get() {
      return this._.role.charAt(0).toUpperCase() + this._.role.slice(1);
    }
  }, {
    key: "key",
    get: function get() {
      return this.gameId + "/" + this.id;
    }
  }, {
    key: "_ref",
    get: function get() {
      return "/players/" + this.key;
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ })
/******/ ]);