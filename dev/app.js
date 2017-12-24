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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = __webpack_require__(5),
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = __webpack_require__(11);

var _App2 = _interopRequireDefault(_App);

var _Games = __webpack_require__(12);

var _Games2 = _interopRequireDefault(_Games);

var _Players = __webpack_require__(14);

var _Players2 = _interopRequireDefault(_Players);

var _Users = __webpack_require__(15);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  env: 'development'
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _NewVersion = __webpack_require__(19);

var _NewVersion2 = _interopRequireDefault(_NewVersion);

var _Auth = __webpack_require__(20);

var _Auth2 = _interopRequireDefault(_Auth);

var _Launch = __webpack_require__(21);

var _Launch2 = _interopRequireDefault(_Launch);

var _Start = __webpack_require__(22);

var _Start2 = _interopRequireDefault(_Start);

var _Turns = __webpack_require__(23);

var _Turns2 = _interopRequireDefault(_Turns);

var _Reveal = __webpack_require__(24);

var _Reveal2 = _interopRequireDefault(_Reveal);

var _Votes = __webpack_require__(25);

var _Votes2 = _interopRequireDefault(_Votes);

var _Results = __webpack_require__(26);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Adapters = __webpack_require__(4);

var _Adapters2 = _interopRequireDefault(_Adapters);

var _Topics = __webpack_require__(27);

var _Topics2 = _interopRequireDefault(_Topics);

var _shuffle = __webpack_require__(8);

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
      var deadCounts = { imposter: 0, agent: 0 },
          aliveCounts = { imposter: 0, agent: 0 },
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
      var roundOver = aliveCounts.imposter === 0 || aliveCounts.agent === 0 || aliveCounts.imposter === 1 && aliveCounts.agent === 1;
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
        if (aliveCounts.imposter === 1 && aliveCounts.agent === 1) {
          // It is a Draw. No points
        } else if (aliveCounts.imposter > 0) {
          // Imposters score three
          for (var playerId in players) {
            if (players[playerId]._.role === 'imposter') points[playerId] = Game.winPoints;
          }
        } else if (aliveCounts.agent > 0) {
          // Agents score three
          for (var _playerId in players) {
            if (players[_playerId]._.role === 'agent') points[_playerId] = Game.winPoints;
          }
        } else {
          // Everyone is dead. No points
        }
      } else {
        // Alive Imposters score two, alive Agents score one
        aliveIds.forEach(function (playerId) {
          points[playerId] = Game.survivePoints[players[playerId]._.role];
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
          playerIdsImposters = _generateRoles2.playerIdsImposters,
          playerIdsAgents = _generateRoles2.playerIdsAgents,
          imposterCount = _generateRoles2.imposterCount;

      this.imposterCount = imposterCount;
      var playerCount = playerIds.length,
          topics = this.generateTopics(),
          playerCountAlive = playerCount,
          votes = {},
          killVotes = {},
          killedIds = [],
          roundOver = false,
          aliveCounts = { imposter: 0, agent: 0 },
          aliveIds = [],
          deadCounts = { imposter: 0, agent: 0 },
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
          imposterCount: imposterCount,
          topics: topics,
          roundOver: roundOver
        },
        players: { playerIdsImposters: playerIdsImposters, playerIdsAgents: playerIdsAgents }
      };
    }
  }, {
    key: 'generateTopics',
    value: function generateTopics() {
      var _this2 = this;

      return [1, 2, 3, 4].map(function (_) {
        return _this2.topicGenerator.loadTopic();
      });
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
          imposterCount = counts[1];
      var playerIdsAgents = ids.slice(0, agentCount);
      ids = ids.slice(agentCount);
      var playerIdsImposters = ids;
      return {
        playerIdsImposters: playerIdsImposters,
        playerIdsAgents: playerIdsAgents,
        imposterCount: imposterCount
      };
    }

    // Private

  }, {
    key: '_distributor',
    value: function _distributor(number) {
      // Going for 2 to 1
      var agents = Math.floor(number * 0.66667),
          imposters = number - agents;
      return [agents, imposters];
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
    key: 'survivePoints',
    get: function get() {
      return { agent: 1, imposter: 2 };
    }
  }, {
    key: 'winPoints',
    get: function get() {
      return 3;
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Adapters = __webpack_require__(4);

var _Adapters2 = _interopRequireDefault(_Adapters);

var _Auth = __webpack_require__(16);

var _Auth2 = _interopRequireDefault(_Auth);

var _State = __webpack_require__(18);

var _State2 = _interopRequireDefault(_State);

var _Renderers = __webpack_require__(6);

var _Renderers2 = _interopRequireDefault(_Renderers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = __webpack_require__(5);

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Adapter2 = __webpack_require__(3);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Slugs = __webpack_require__(13);

var _Slugs2 = _interopRequireDefault(_Slugs);

var _Adapter2 = __webpack_require__(3);

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
          aliveCounts: { imposter: 0, agent: 0 },
          aliveIds: [],
          deadCounts: { imposter: 0, agent: 0 },
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
/* 13 */
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
      return ['Aback', 'Abaft', 'Abandoned', 'Abashed', 'Aberrant', 'Abhorrent', 'Abiding', 'Abject', 'Ablaze', 'Abnormal', 'Aboard', 'Aboriginal', 'Abortive', 'Abounding', 'Abrasive', 'Abrupt', 'Absent', 'Absorbed', 'Absorbing', 'Abstracted', 'Absurd', 'Abundant', 'Abusive', 'Acceptable', 'Accessible', 'Accidental', 'Accurate', 'Acoustic', 'Acrid', 'Adamant', 'Adaptable', 'Addicted', 'Adhesive', 'Adhoc', 'Adjoining', 'Adorable', 'Adventurous', 'Afraid', 'Aggressive', 'Agonizing', 'Agreeable', 'Ahead', 'Alcoholic', 'Alert', 'Alike', 'Alive', 'Alleged', 'Alluring', 'Aloof', 'Ambiguous', 'Ambitious', 'Amuck', 'Amused', 'Ancient', 'Angry', 'Animated', 'Annoyed', 'Annoying', 'Anxious', 'Apathetic', 'Aquatic', 'Aromatic', 'Arrogant', 'Ashamed', 'Aspiring', 'Assorted', 'Astonishing', 'Attractive', 'Auspicious', 'Available', 'Average', 'Aware', 'Awful', 'Axiomatic', 'Bad', 'Barbarous', 'Bashful', 'Bawdy', 'Beautiful', 'Belligerent', 'Berserk', 'Better', 'Bewildered', 'Big', 'Billowy', 'Bitter', 'Bizarre', 'Black', 'Bloody', 'Blue', 'Blushing', 'Boiling', 'Boorish', 'Bored', 'Boring', 'Boundless', 'Brainy', 'Brash', 'Brave', 'Brawny', 'Breakable', 'Breezy', 'Brief', 'Bright', 'Broad', 'Broken', 'Bumpy', 'Burly', 'Busy', 'Cagey', 'Callous', 'Calm', 'Capable', 'Capricious', 'Careful', 'Cautious', 'Ceaseless', 'Changeable', 'Charming', 'Cheerful', 'Childlike', 'Chilly', 'Chivalrous', 'Chubby', 'Chunky', 'Clammy', 'Classy', 'Clean', 'Clear', 'Clever', 'Cloistered', 'Cloudy', 'Clumsy', 'Coherent', 'Cold', 'Colorful', 'Colossal', 'Combative', 'Comfortable', 'Concerned', 'Condemned', 'Confused', 'Cooing', 'Cool', 'Cooperative', 'Courageous', 'Cowardly', 'Crabby', 'Craven', 'Crazy', 'Credible', 'Creepy', 'Crooked', 'Crowded', 'Cruel', 'Cuddly', 'Cultured', 'Curious', 'Curly', 'Curved', 'Cute', 'Cynical', 'Daffy', 'Daily', 'Damaged', 'Damaging', 'Damp', 'Dangerous', 'Dapper', 'Dark', 'Dashing', 'Dazzling', 'Dead', 'Deadpan', 'Deafening', 'Debonair', 'Decisive', 'Decorous', 'Deep', 'Deeply', 'Defeated', 'Defective', 'Defiant', 'Delicious', 'Delightful', 'Demonic', 'Depressed', 'Deranged', 'Deserted', 'Detailed', 'Determined', 'Devilish', 'Didactic', 'Different', 'Difficult', 'Diligent', 'Direful', 'Dirty', 'Disagreeable', 'Discreet', 'Disgusted', 'Disillusioned', 'Dispensable', 'Distinct', 'Disturbed', 'Divergent', 'Dizzy', 'Domineering', 'Doubtful', 'Drab', 'Draconian', 'Dramatic', 'Drunk', 'Dry', 'Dull', 'Dusty', 'Dynamic', 'Dysfunctional', 'Eager', 'EARLY', 'Early', 'Earsplitting', 'Earthy', 'Easy', 'Eatable', 'Economic', 'Educated', 'Efficacious', 'Efficient', 'Elated', 'Elderly', 'Elegant', 'Elfin', 'Elite', 'Embarrassed', 'Eminent', 'Empty', 'Enchanting', 'Encouraging', 'Endurable', 'Energetic', 'Entertaining', 'Enthusiastic', 'Envious', 'Equable', 'Erect', 'Erratic', 'Ethereal', 'Evanescent', 'Evasive', 'Evil', 'Excellent', 'Excited', 'Exclusive', 'Exotic', 'Expensive', 'Exuberant', 'Exultant', 'Fabulous', 'Faded', 'Faint', 'Fair', 'Faithful', 'Fallacious', 'Famous', 'Fanatical', 'Fancy', 'Fantastic', 'Fascinated', 'Fast', 'Fat', 'Faulty', 'Fearless', 'Feigned', 'Fertile', 'Festive', 'Few', 'Fierce', 'Filthy', 'Fine', 'Finicky', 'Flagrant', 'Flaky', 'Flashy', 'Flat', 'Flawless', 'Flippant', 'Flowery', 'Fluffy', 'Fluttering', 'Foamy', 'Foolish', 'Foregoing', 'Forgetful', 'Fortunate', 'Fragile', 'Frail', 'Frantic', 'Freezing', 'Fresh', 'Fretful', 'Friendly', 'Frightened', 'Functional', 'Funny', 'Furtive', 'Futuristic', 'Fuzzy', 'Gabby', 'Gainful', 'Gamy', 'Gaping', 'Garrulous', 'Gaudy', 'Gentle', 'Giant', 'Giddy', 'Gifted', 'Gigantic', 'Glamorous', 'Gleaming', 'Glib', 'Glorious', 'Glossy', 'Godly', 'Good', 'Goofy', 'Gorgeous', 'Graceful', 'Grandiose', 'Greasy', 'Great', 'Greedy', 'Green', 'Grieving', 'Groovy', 'Grotesque', 'Grouchy', 'Grubby', 'Gruesome', 'Grumpy', 'Guarded', 'Guiltless', 'Gullible', 'Gusty', 'Guttural', 'Habitual', 'Half', 'Hallowed', 'Halting', 'Handsome', 'Handsomely', 'Hapless', 'Happy', 'Hard', 'Harmonious', 'Harsh', 'Heady', 'Healthy', 'Heartbreaking', 'Heavenly', 'Heavy', 'Hellish', 'Helpful', 'Helpless', 'Hesitant', 'High', 'Highfalutin', 'Hilarious', 'Hissing', 'Historical', 'Holistic', 'Hollow', 'Homeless', 'Homely', 'Honorable', 'Horrible', 'Hospitable', 'Hot', 'Huge', 'Hulking', 'Humdrum', 'Humorous', 'Hungry', 'Hurried', 'Hurt', 'Hushed', 'Husky', 'Hypnotic', 'Hysterical', 'Icky', 'Icy', 'Idiotic', 'Ignorant', 'Ill', 'Illegal', 'Illustrious', 'Imaginary', 'Immense', 'Imminent', 'Impartial', 'Imperfect', 'Important', 'Imported', 'Impossible', 'Incandescent', 'Incompetent', 'Inconclusive', 'Industrious', 'Inexpensive', 'Innate', 'Innocent', 'Inquisitive', 'Instinctive', 'Internal', 'Invincible', 'Irate', 'Itchy', 'Jaded', 'Jagged', 'Jazzy', 'Jealous', 'Jittery', 'Jobless', 'Jolly', 'Joyous', 'Judicious', 'Juicy', 'Jumbled', 'Jumpy', 'Juvenile', 'Kaput', 'Kind', 'Kindhearted', 'Knotty', 'Knowing', 'Knowledgeable', 'Known', 'Labored', 'Lackadaisical', 'Lacking', 'Lamentable', 'Languid', 'Large', 'Late', 'Laughable', 'Lavish', 'Lazy', 'Lean', 'Learned', 'Legal', 'Lethal', 'Level', 'Lewd', 'Light', 'Likeable', 'Literate', 'Little', 'Lively', 'Lonely', 'Long', 'Longing', 'Loose', 'Lopsided', 'Loud', 'Loutish', 'Lovely', 'Loving', 'Low', 'Lowly', 'Lucky', 'Ludicrous', 'Lush', 'Luxuriant', 'Lying', 'Lyrical', 'Macabre', 'Macho', 'Maddening', 'Madly', 'Magenta', 'Magical', 'Magnificent', 'Majestic', 'Makeshift', 'Malicious', 'Mammoth', 'Maniacal', 'Many', 'Marked', 'Massive', 'Materialistic', 'Mature', 'Measly', 'Meek', 'Melodic', 'Melted', 'Merciful', 'Mere', 'Mighty', 'Mindless', 'Miniature', 'Minor', 'Miscreant', 'Misty', 'Moaning', 'Modern', 'Moldy', 'Momentous', 'Motionless', 'Muddled', 'Muddy', 'Mundane', 'Murky', 'Mushy', 'Mute', 'Mysterious', 'Naive', 'Nappy', 'Narrow', 'Nasty', 'Naughty', 'Nauseating', 'Nebulous', 'Needless', 'Needy', 'Neighborly', 'Nervous', 'New', 'Nice', 'Nifty', 'Noiseless', 'Noisy', 'Nonchalant', 'Nondescript', 'Nonstop', 'Nostalgic', 'Nosy', 'Noxious', 'Null', 'Numberless', 'Numerous', 'Nutritious', 'Nutty', 'Oafish', 'Obedient', 'Obeisant', 'Obnoxious', 'Obscene', 'Obsequious', 'Observant', 'Obsolete', 'Obtainable', 'Oceanic', 'Odd', 'Offbeat', 'Old', 'Omniscient', 'Onerous', 'Open', 'Optimal', 'Orange', 'Ordinary', 'Organic', 'Ossified', 'Outrageous', 'Outstanding', 'Oval', 'Overconfident', 'Overjoyed', 'Overrated', 'Overt', 'Overwrought', 'Painful', 'Painstaking', 'Panicky', 'Panoramic', 'Parched', 'Parsimonious', 'Pastoral', 'Pathetic', 'Peaceful', 'Penitent', 'Perfect', 'Periodic', 'Permissible', 'Perpetual', 'Petite', 'Phobic', 'Picayune', 'Piquant', 'Placid', 'Plain', 'Plastic', 'Plausible', 'Pleasant', 'Plucky', 'Pointless', 'Poised', 'Political', 'Poor', 'Possessive', 'Powerful', 'Precious', 'Premium', 'Pretty', 'Prickly', 'Productive', 'Profuse', 'Protective', 'Proud', 'Psychedelic', 'Psychotic', 'Puffy', 'Pumped', 'Puny', 'Purple', 'Purring', 'Puzzled', 'Quack', 'Quaint', 'Quarrelsome', 'Questionable', 'Quick', 'Quickest', 'Quiet', 'Quixotic', 'Quizzical', 'Rabid', 'Racial', 'Ragged', 'Rainy', 'Rambunctious', 'Rampant', 'Rapid', 'Rare', 'Raspy', 'Ratty', 'Real', 'Rebellious', 'Receptive', 'Recondite', 'Red', 'Redundant', 'Reflective', 'Relieved', 'Reminiscent', 'Repulsive', 'Resolute', 'Resonant', 'Rhetorical', 'Rich', 'Righteous', 'Rightful', 'Ripe', 'Ritzy', 'Roasted', 'Robust', 'Romantic', 'Roomy', 'Rotten', 'Rough', 'Round', 'Royal', 'Ruddy', 'Rural', 'Rustic', 'Ruthless', 'Sable', 'Sad', 'Salty', 'Sassy', 'Satisfying', 'Scandalous', 'Scarce', 'Scary', 'Scattered', 'Scientific', 'Scintillating', 'Scrawny', 'Screeching', 'Secretive', 'Sedate', 'Seemly', 'Selective', 'Selfish', 'Shaggy', 'Shaky', 'Shallow', 'Sharp', 'Shiny', 'Shivering', 'Shocking', 'Short', 'Shrill', 'Shy', 'Silent', 'Silky', 'Silly', 'Sincere', 'Skillful', 'Skinny', 'Sleepy', 'Slimy', 'Slippery', 'Sloppy', 'Slow', 'Small', 'Smelly', 'Smiling', 'Smoggy', 'Smooth', 'Sneaky', 'Snobbish', 'Snotty', 'Soft', 'Soggy', 'Solid', 'Somber', 'Sordid', 'Sore', 'Sour', 'Sparkling', 'Spectacular', 'Spicy', 'Spiffy', 'Spiritual', 'Splendid', 'Spooky', 'Spotless', 'Spurious', 'Squalid', 'Square', 'Squealing', 'Squeamish', 'Staking', 'Stale', 'Standing', 'Statuesque', 'Steadfast', 'Steady', 'Steep', 'Stereotyped', 'Sticky', 'Stimulating', 'Stingy', 'Stormy', 'Straight', 'Strange', 'Strong', 'Stupid', 'Subdued', 'Subsequent', 'Substantial', 'Successful', 'Succinct', 'Sulky', 'Super', 'Supreme', 'Swanky', 'Sweet', 'Sweltering', 'Swift', 'Symptomatic', 'Synonymous', 'Taboo', 'Tacit', 'Tacky', 'Talented', 'Tall', 'Tame', 'Tan', 'Tangible', 'Tangy', 'Tart', 'Tasteful', 'Tasteless', 'Tasty', 'Tawdry', 'Tearful', 'Teeny', 'Telling', 'Temporary', 'Tender', 'Tense', 'Tenuous', 'Terrible', 'Tested', 'Testy', 'Thankful', 'Therapeutic', 'Thinkable', 'Thirsty', 'Thoughtful', 'Thoughtless', 'Threatening', 'Thundering', 'Tight', 'Tightfisted', 'Tiny', 'Tired', 'Tiresome', 'Toothsome', 'Torpid', 'Tough', 'Towering', 'Tranquil', 'Trashy', 'Tricky', 'Trite', 'Troubled', 'Truculent', 'Typical', 'Ubiquitous', 'Ugliest', 'Ugly', 'Ultra', 'Unable', 'Unaccountable', 'Unadvised', 'Unarmed', 'Unbecoming', 'Unbiased', 'Uncovered', 'Understood', 'Undesirable', 'Unequaled', 'Uneven', 'Uninterested', 'Unsightly', 'Unsuitable', 'Unusual', 'Upbeat', 'Uppity', 'Upset', 'Uptight', 'Used', 'Utopian', 'Utter', 'Uttermost', 'Vacuous', 'Vague', 'Various', 'Vast', 'Vengeful', 'Venomous', 'Verdant', 'Versed', 'Victorious', 'Vigorous', 'Vivacious', 'Voiceless', 'Volatile', 'Voracious', 'Vulgar', 'Wacky', 'Waggish', 'Wakeful', 'Wandering', 'Wanting', 'Warlike', 'Warm', 'Wary', 'Wasteful', 'Watchful', 'Watery', 'Weak', 'Wealthy', 'Weary', 'Wee', 'Wet', 'Whimsical', 'Whispering', 'Wholesale', 'Wicked', 'Wide', 'Wild', 'Willing', 'Wiry', 'Wise', 'Wistful', 'Witty', 'Woebegone', 'Womanly', 'Wonderful', 'Wooden', 'Woozy', 'Workable', 'Worried', 'Worthless', 'Wrathful', 'Wretched', 'Wrong', 'Wry', 'Yellow', 'Yielding', 'Young', 'Youthful', 'Yummy', 'Zany', 'Zealous', 'Zippy', 'Zonked'];
    }
  }, {
    key: 'nouns',
    get: function get() {
      return ['Able', 'Account', 'Achieve', 'Achiever', 'Acoustics', 'Act', 'Action', 'Activity', 'Actor', 'Addition', 'Adjustment', 'Advertisement', 'Advice', 'Aftermath', 'Afternoon', 'Afterthought', 'Agreement', 'Air', 'Airplane', 'Airport', 'Alarm', 'Alley', 'Amount', 'Amusement', 'Anger', 'Angle', 'Animal', 'Answer', 'Ant', 'Ants', 'Apparatus', 'Apparel', 'Apple', 'Apple', 'Apples', 'Appliance', 'Approval', 'Arch', 'Argument', 'Arithmetic', 'Arm', 'Army', 'Art', 'Attack', 'Attempt', 'Attention', 'Attraction', 'Aunt', 'Authority', 'Babies', 'Baby', 'Back', 'Badge', 'Bag', 'Bait', 'Balance', 'Ball', 'Balloon', 'Balls', 'Banana', 'Band', 'Base', 'Baseball', 'Basin', 'Basket', 'Basketball', 'Bat', 'Bath', 'Battle', 'Bead', 'Beam', 'Bean', 'Bear', 'Bears', 'Beast', 'Bed', 'Bedroom', 'Beds', 'Bee', 'Beef', 'Beetle', 'Beggar', 'Beginner', 'Behavior', 'Belief', 'Believe', 'Bell', 'Bells', 'Berry', 'Bike', 'Bikes', 'Bird', 'Birds', 'Birth', 'Birthday', 'Bit', 'Bite', 'Blade', 'Blood', 'Blow', 'Board', 'Boat', 'Boats', 'Body', 'Bomb', 'Bone', 'Book', 'Book', 'Books', 'Boot', 'Border', 'Bottle', 'Boundary', 'Box', 'Boy', 'Boy', 'Boys', 'Brain', 'Brake', 'Branch', 'Brass', 'Bread', 'Breakfast', 'Breath', 'Brick', 'Bridge', 'Brother', 'Brothers', 'Brush', 'Bubble', 'Bucket', 'Building', 'Bulb', 'Bun', 'Burn', 'Burst', 'Bushes', 'Business', 'Butter', 'Button', 'Cabbage', 'Cable', 'Cactus', 'Cake', 'Cakes', 'Calculator', 'Calendar', 'Camera', 'Camp', 'Can', 'Cannon', 'Canvas', 'Cap', 'Caption', 'Car', 'Card', 'Care', 'Carpenter', 'Carriage', 'Cars', 'Cart', 'Cast', 'Cat', 'Cats', 'Cattle', 'Cause', 'Cave', 'Celery', 'Cellar', 'Cemetery', 'Cent', 'Chain', 'Chair', 'Chairs', 'Chalk', 'Chance', 'Change', 'Channel', 'Cheese', 'Cherries', 'Cherry', 'Chess', 'Chicken', 'Chickens', 'Children', 'Chin', 'Church', 'Circle', 'Clam', 'Class', 'Clock', 'Clocks', 'Cloth', 'Cloud', 'Clouds', 'Clover', 'Club', 'Coach', 'Coal', 'Coast', 'Coat', 'Cobweb', 'Coil', 'Collar', 'Color', 'Comb', 'Comfort', 'Committee', 'Company', 'Comparison', 'Competition', 'Condition', 'Connection', 'Control', 'Cook', 'Copper', 'Copy', 'Cord', 'Cork', 'Corn', 'Cough', 'Country', 'Cover', 'Cow', 'Cows', 'Crack', 'Cracker', 'Crate', 'Crayon', 'Cream', 'Creator', 'Creature', 'Credit', 'Crib', 'Crime', 'Crook', 'Crow', 'Crowd', 'Crown', 'Crush', 'Cry', 'Cub', 'Cup', 'Current', 'Curtain', 'Curve', 'Cushion', 'Dad', 'Daughter', 'Day', 'Death', 'Debt', 'Decision', 'Deer', 'Degree', 'Design', 'Desire', 'Desk', 'Destruction', 'Detail', 'Development', 'Digestion', 'Dime', 'Dinner', 'Dinosaurs', 'Direction', 'Dirt', 'Discovery', 'Discussion', 'Disease', 'Disgust', 'Distance', 'Distribution', 'Division', 'Dock', 'Doctor', 'Dog', 'Dogs', 'Doll', 'Dolls', 'Donkey', 'Door', 'Downtown', 'Drain', 'Drawer', 'Dress', 'Drink', 'Driving', 'Drop', 'Drug', 'Drum', 'Duck', 'Ducks', 'Dust', 'Dust', 'Ear', 'Earth', 'Earthquake', 'Edge', 'Education', 'Effect', 'Egg', 'Eggnog', 'Eggs', 'Elbow', 'End', 'Engine', 'Error', 'Event', 'Example', 'Exchange', 'Existence', 'Expansion', 'Experience', 'Expert', 'Eye', 'Eyes', 'Face', 'Fact', 'Fairies', 'Fall', 'Family', 'Fan', 'Fang', 'Farm', 'Farmer', 'Father', 'Father', 'Faucet', 'Fear', 'Feast', 'Feather', 'Feeling', 'Feet', 'Fiction', 'Field', 'Fifth', 'Fight', 'Finger', 'Finger', 'Fire', 'Fireman', 'Fish', 'Flag', 'Flame', 'Flavor', 'Flesh', 'Flight', 'Flock', 'Floor', 'Flower', 'Flowers', 'Fly', 'Fog', 'Fold', 'Food', 'Foot', 'Force', 'Fork', 'Form', 'Fowl', 'Frame', 'Friction', 'Friend', 'Friends', 'Frog', 'Frogs', 'Front', 'Fruit', 'Fuel', 'Furniture', 'Galley', 'Game', 'Garden', 'Gate', 'Geese', 'Ghost', 'Giants', 'Giraffe', 'Girl', 'Girls', 'Glass', 'Glove', 'Glue', 'Goat', 'Gold', 'Goldfish', 'Goodbye', 'Goose', 'Goose', 'Government', 'Governor', 'Grade', 'Grain', 'Grandfather', 'Grandmother', 'Grape', 'Grass', 'Grip', 'Ground', 'Group', 'Growth', 'Guide', 'Guitar', 'Gun', 'Hair', 'Haircut', 'Hall', 'Hammer', 'Hand', 'Hands', 'Harbor', 'Harmony', 'Hat', 'Hate', 'Head', 'Health', 'Hearing', 'Heart', 'Heat', 'Help', 'Hen', 'Hill', 'History', 'Hobbies', 'Hole', 'Holiday', 'Home', 'Honey', 'Hook', 'Hope', 'Horn', 'Horse', 'Horses', 'Hose', 'Hospital', 'Hot', 'Hour', 'House', 'Houses', 'Humor', 'Hydrant', 'Ice', 'Icicle', 'Idea', 'Impulse', 'Income', 'Increase', 'Industry', 'Ink', 'Insect', 'Instrument', 'Insurance', 'Interest', 'Invention', 'Iron', 'Island', 'Jail', 'Jam', 'Jar', 'Jeans', 'Jelly', 'Jellyfish', 'Jewel', 'Join', 'Joke', 'Journey', 'Judge', 'Juice', 'Jump', 'Kettle', 'Key', 'Kick', 'Kiss', 'Kite', 'Kite', 'Kitten', 'Kitten', 'Kittens', 'Kitty', 'Knee', 'Knife', 'Knot', 'Knowledge', 'Laborer', 'Lace', 'Ladybug', 'Lake', 'Lamp', 'Land', 'Language', 'Laugh', 'Lawyer', 'Lead', 'Leaf', 'Learning', 'Leather', 'Leg', 'Legs', 'Letter', 'Letters', 'Lettuce', 'Level', 'Library', 'Lift', 'Light', 'Limit', 'Line', 'Linen', 'Lip', 'Liquid', 'List', 'Lizards', 'Loaf', 'Lock', 'Locket', 'Look', 'Loss', 'Love', 'Low', 'Lumber', 'Lunch', 'Lunchroom', 'Machine', 'Magic', 'Maid', 'Mailbox', 'Man', 'Manager', 'Map', 'Marble', 'Mark', 'Market', 'Mask', 'Mass', 'Match', 'Meal', 'Meal', 'Measure', 'Meat', 'Meeting', 'Memory', 'Men', 'Metal', 'Mice', 'Middle', 'Milk', 'Mind', 'Mine', 'Minister', 'Mint', 'Minute', 'Mist', 'Mitten', 'Mom', 'Money', 'Monkey', 'Month', 'Moon', 'Morning', 'Mother', 'Mother', 'Motion', 'Mountain', 'Mouth', 'Move', 'Muscle', 'Music', 'Nail', 'Name', 'Nation', 'Neck', 'Need', 'Needle', 'Nerve', 'Nest', 'Net', 'News', 'Night', 'Noise', 'North', 'Nose', 'Note', 'Notebook', 'Number', 'Nut', 'Oatmeal', 'Observation', 'Ocean', 'Offer', 'Office', 'Oil', 'Operation', 'Opinion', 'Orange', 'Oranges', 'Order', 'Organization', 'Ornament', 'Oven', 'Owl', 'Owner', 'Page', 'Pail', 'Pail', 'Pain', 'Paint', 'Pan', 'Pancake', 'Paper', 'Parcel', 'Parent', 'Park', 'Part', 'Partner', 'Party', 'Passenger', 'Paste', 'Patch', 'Payment', 'Peace', 'Pear', 'Pear', 'Pen', 'Pencil', 'Person', 'Pest', 'Pet', 'Pets', 'Pickle', 'Picture', 'Pie', 'Pies', 'Pig', 'Pigs', 'Pin', 'Pipe', 'Pizzas', 'Place', 'Plane', 'Planes', 'Plant', 'Plantation', 'Plants', 'Plastic', 'Plate', 'Play', 'Playground', 'Pleasure', 'Plot', 'Plough', 'Pocket', 'Point', 'Poison', 'Police', 'Polish', 'Pollution', 'Popcorn', 'Porter', 'Position', 'Pot', 'Potato', 'Powder', 'Power', 'Price', 'Print', 'Prison', 'Process', 'Produce', 'Profit', 'Property', 'Prose', 'Protest', 'Pull', 'Pump', 'Punishment', 'Purpose', 'Push', 'Quarter', 'Quartz', 'Queen', 'Question', 'Quicksand', 'Quiet', 'Quill', 'Quilt', 'Quince', 'Quiver', 'Rabbit', 'Rabbits', 'Rail', 'Railway', 'Rain', 'Rainstorm', 'Rake', 'Range', 'Rat', 'Rate', 'Ray', 'Reaction', 'Reading', 'Reason', 'Receipt', 'Recess', 'Record', 'Regret', 'Relation', 'Religion', 'Representative', 'Request', 'Respect', 'Rest', 'Reward', 'Rhythm', 'Rice', 'Riddle', 'Rifle', 'Ring', 'Rings', 'River', 'Road', 'Robin', 'Rock', 'Rod', 'Roll', 'Roof', 'Room', 'Root', 'Rose', 'Route', 'Rub', 'Rule', 'Run', 'Sack', 'Sail', 'Salt', 'Sand', 'Scale', 'Scale', 'Scarecrow', 'Scarf', 'Scene', 'Scent', 'School', 'Science', 'Scissors', 'Screw', 'Sea', 'Seashore', 'Seat', 'Secretary', 'Seed', 'Selection', 'Self', 'Sense', 'Servant', 'Shade', 'Shake', 'Shame', 'Shape', 'Sheep', 'Sheet', 'Shelf', 'Ship', 'Shirt', 'Shock', 'Shoe', 'Shoes', 'Shop', 'Show', 'Side', 'Sidewalk', 'Sign', 'Silk', 'Silver', 'Sink', 'Sister', 'Sisters', 'Size', 'Skate', 'Skin', 'Skirt', 'Sky', 'Slave', 'Sleep', 'Sleet', 'Slip', 'Slope', 'Smash', 'Smell', 'Smile', 'Smoke', 'Snail', 'Snails', 'Snake', 'Snakes', 'Sneeze', 'Snow', 'Soap', 'Society', 'Sock', 'Soda', 'Sofa', 'Son', 'Song', 'Songs', 'Sort', 'Sound', 'Soup', 'Space', 'Spade', 'Spark', 'Spiders', 'Sponge', 'Spoon', 'Spot', 'Spring', 'Spy', 'Square', 'Squirrel', 'Stage', 'Stamp', 'Star', 'Start', 'Statement', 'Station', 'Steam', 'Steel', 'Stem', 'Step', 'Stew', 'Stick', 'Sticks', 'Stitch', 'Stocking', 'Stomach', 'Stone', 'Stop', 'Store', 'Story', 'Stove', 'Stranger', 'Straw', 'Stream', 'Street', 'Stretch', 'String', 'Structure', 'Substance', 'Sugar', 'Suggestion', 'Suit', 'Summer', 'Summer', 'Sun', 'Support', 'Surprise', 'Sweater', 'Swim', 'Swing', 'System', 'Table', 'Tail', 'Talk', 'Tank', 'Taste', 'Tax', 'Teaching', 'Team', 'Teeth', 'Temper', 'Tendency', 'Tent', 'Territory', 'Test', 'Texture', 'Theory', 'Thing', 'Things', 'Thought', 'Thread', 'Thrill', 'Throat', 'Throne', 'Throne', 'Thumb', 'Thunder', 'Ticket', 'Tiger', 'Time', 'Tin', 'Title', 'Toad', 'Toe', 'Toes', 'Tomatoes', 'Tongue', 'Tooth', 'Toothbrush', 'Toothpaste', 'Top', 'Touch', 'Town', 'Toy', 'Toys', 'Trade', 'Trail', 'Train', 'Trains', 'Tramp', 'Transport', 'Tray', 'Treatment', 'Tree', 'Trees', 'Trick', 'Trip', 'Trouble', 'Trousers', 'Truck', 'Trucks', 'Tub', 'Turkey', 'Turn', 'Twig', 'Twist', 'Umbrella', 'Uncle', 'Underwear', 'Unit', 'Use', 'Vacation', 'Value', 'Van', 'Vase', 'Vegetable', 'Veil', 'Vein', 'Verse', 'Vessel', 'Vest', 'View', 'Visitor', 'Voice', 'Volcano', 'Volleyball', 'Voyage', 'Walk', 'Wall', 'War', 'Wash', 'Waste', 'Watch', 'Water', 'Water', 'Wave', 'Waves', 'Wax', 'Way', 'Wealth', 'Weather', 'Week', 'Weight', 'Wheel', 'Whip', 'Whistle', 'Wilderness', 'Wind', 'Window', 'Wine', 'Wing', 'Winter', 'Winter', 'Wire', 'Wish', 'Woman', 'Women', 'Wood', 'Wool', 'Word', 'Work', 'Worm', 'Wound', 'Wren', 'Wrench', 'Wrist', 'Writer', 'Writing', 'Yak', 'Yam', 'Yard', 'Yarn', 'Year', 'Yoke', 'Zebra', 'Zephyr', 'Zinc', 'Zipper', 'Zoo'];
    }
  }]);

  return Slugs;
}();

exports.default = Slugs;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Adapter2 = __webpack_require__(3);

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

      var playerIdsImposters = _ref3.playerIdsImposters,
          playerIdsAgents = _ref3.playerIdsAgents;

      return new Promise(function (resolve, reject) {
        var playerCount = Object.keys(players).length;
        for (var playerId in players) {
          var player = players[playerId];
          var role = void 0,
              alive = true,
              scoreRound = 0;
          if (playerIdsImposters.includes(playerId)) role = 'imposter';else if (playerIdsAgents.includes(playerId)) role = 'agent';else role = 'agent';
          _this9.db.ref(_this9.r([player.gameId, playerId])).update({ role: role, alive: alive, scoreRound: scoreRound }).then(function () {
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Adapter2 = __webpack_require__(3);

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
      // Default Google image (can replace?):
      // https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var firebaseKeys = __webpack_require__(17);

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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Adapters = __webpack_require__(4);

var _Adapters2 = _interopRequireDefault(_Adapters);

var _Renderers = __webpack_require__(6);

var _Renderers2 = _interopRequireDefault(_Renderers);

var _Game = __webpack_require__(9);

var _Game2 = _interopRequireDefault(_Game);

var _Player = __webpack_require__(28);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = __webpack_require__(5);

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
          return _this12.renderers.reveal.render(_this12.game._, _this12.players);
        },
        votes: function votes() {
          return _this12.renderers.votes.render({
            players: _this12.players,
            imposterCount: _this12.game._.imposterCount,
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
/* 20 */
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

      // $facebook = this.el('button', 'Facebook'),
      $twitter = this.el('button', 'Twitter');
      // this.append(this.$main, [$h1, $desc, $google, $facebook, $twitter]);
      this.append(this.$main, [$h1, $desc, $google, $twitter]);
      $google.addEventListener('click', function () {
        _this2.events.authGoogle();
      });
      // $facebook.addEventListener('click', () => {
      //   this.events.authFacebook();
      // });
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

var _List = __webpack_require__(2);

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

var _List = __webpack_require__(2);

var _List2 = _interopRequireDefault(_List);

var _shuffle = __webpack_require__(8);

var _shuffle2 = _interopRequireDefault(_shuffle);

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
      topics = topics.map(function (i) {
        return [i[0], i[1].split(' ').join('&nbsp;')];
      });
      this.$h1.innerHTML = '\n      <span class="status">Turns</span> <span class="info"><span class="throb">' + role + '</span></span>';
      if (this.player._.alive) {
        var descHtml = void 0,
            topicsHtml = void 0;
        if (this.player._.role === 'imposter') {
          descHtml = 'On your turn, say one word that you associate with the <strong>two</strong> Agent Topics.\n          They are two of the above.';
          var shuffled = (0, _shuffle2.default)([0, 1, 2, 3]).map(function (idx) {
            return topics[idx][1];
          });
          topicsHtml = '\n          \u201C' + shuffled[0] + '\u201D, \u201C' + shuffled[1] + '\u201D, \u201C' + shuffled[2] + '\u201D, or \u201C' + shuffled[3] + '\u201D\n        ';
        } else {
          descHtml = 'On your turn, say one word that you associate with both of the Topics above.';
          topicsHtml = '\u201C' + topics[0][1] + '\u201D &amp; \u201C' + topics[1][1] + '\u201D';
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

var _List = __webpack_require__(2);

var _List2 = _interopRequireDefault(_List);

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
      this.$header.appendChild(this.$h1);

      this.$topics = this.el('p', null, 'topics');
      this.$desc = this.el('p', null, 'description');
      this.append(this.$main, [this.$topics, this.$desc]);

      this.imposters = new _List2.default();
      this.append(this.$main, this.imposters.elements);

      if (this.player._.master) {
        var $inst = this.el('p', 'Players question each other\'s word selections and discuss who they think is an Imposter.\n          Once everyone is ready to vote, proceed.', 'instruction');
        var proceed = new _Button2.default({
          content: 'Proceed',
          clickEvent: this.events.dispatchVotes.bind(this)
        });
        this.append(this.$footer, [$inst, proceed.$el]);
      }
    }
  }, {
    key: 'render',
    value: function render(_ref, players) {
      var topics = _ref.topics;

      this.imposters.reset();
      var role = this.player.capitalizedRole;
      this.$h1.innerHTML = '\n      <span class="status">Reveal</span> <span class="info"><span class="throb">' + role + '</span></span>';
      this.$topics.innerHTML = '\u201C' + topics[0][1] + '\u201D &amp; \u201C' + topics[1][1] + '\u201D';
      if (this.player._.alive) {
        this.$desc.innerHTML = 'These were the two Topics. Explain why you chose your word.';
        if (this.player._.role === 'imposter') {
          this.imposters.title('Other Imposters');
          for (var playerId in players) {
            var player = players[playerId];
            if (player._.role === 'imposter' && playerId !== this.player.id) {
              var classname = player._.alive ? '' : 'dead';
              this.imposters.add(this.userSpan(player, classname));
            }
          }
        }
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
/* 25 */
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

var _List = __webpack_require__(2);

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
          imposterCount = _ref.imposterCount;

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
          var agentCount = Object.keys(players).length - imposterCount,
              isAre = imposterCount === 1 ? 'is' : 'are',
              imposterS = this._pluralize(imposterCount, 'Imposter'),
              agentS = this._pluralize(agentCount, 'Agent');
          this.$desc.innerHTML = '\n          Vote for the Player you want to Kill. There ' + isAre + ' a total of ' + imposterS + ' and ' + agentS + '.';

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Game = __webpack_require__(9);

var _Game2 = _interopRequireDefault(_Game);

var _Renderer2 = __webpack_require__(0);

var _Renderer3 = _interopRequireDefault(_Renderer2);

var _Button = __webpack_require__(1);

var _Button2 = _interopRequireDefault(_Button);

var _List = __webpack_require__(2);

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

      this.killed = new _List2.default('flex-list flex-list-large');
      this.append(this.$main, this.killed.elements);

      this.$desc = this.el('div');
      this.$main.appendChild(this.$desc);

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
        this.extra1.title('Imposters');
        this.extra2.title('Standings');
        this.extra2.$ul.classList.add('flex-list-half');
        var winnerText = this._winnerText(aliveCounts),
            roundText = this._roundPointsText(aliveCounts);
        this.$desc.innerHTML = '\n        <p class="description">\n          ' + winnerText + ' ' + roundText + ' ' + this._roundPoints() + '\n        </p>\n      ';
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
          if (player._.role === 'imposter') _this2.extra1.add(_this2.userSpan(player));
        });
      } else {
        this.extra1.title('Survivors');
        this.extra2.title('Graveyard');
        this.extra2.$ul.classList.remove('flex-list-half');
        this.$desc.innerHTML = '\n        <p class="description">The Round is still in progress. Player roles will stay the same.\n        ' + this._playerPoints() + '</p>\n      ';
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
      return '<span class="points">' + count + '</span>';
    }
  }, {
    key: '_winnerText',
    value: function _winnerText(_ref2) {
      var imposter = _ref2.imposter,
          agent = _ref2.agent;

      var role = this.player._.role;
      if (imposter === 1 && agent === 1) {
        return 'One Imposter and one Agent are left so it is a draw!';
      } else if (imposter > 0) {
        var prefix = role === 'imposter' ? this._success() : this._failure();
        return prefix + ' The <span class="role">Imposters</span> won.';
      } else if (agent > 0) {
        var _prefix = role === 'agent' ? this._success() : this._failure();
        return _prefix + ' The <span class="role">Agents</span> won.';
      }
      return 'Everyone died!';
    }
  }, {
    key: '_roundPointsText',
    value: function _roundPointsText(_ref3) {
      var imposter = _ref3.imposter,
          agent = _ref3.agent;

      if (imposter === 1 && agent === 1) return 'No one scores additional points.';
      if (imposter > 0 || agent > 0) return 'Each score ' + this._points(_Game2.default.winPoints) + '.';
      return 'No one scores additional points.';
    }
  }, {
    key: '_playerPoints',
    value: function _playerPoints() {
      var _player$_ = this.player._,
          scoreRound = _player$_.scoreRound,
          role = _player$_.role,
          alive = _player$_.alive,
          scoreTurn = alive ? _Game2.default.survivePoints[role] : 0,
          reason = alive ? 'survived' : 'died',
          points = this._points(scoreTurn);

      return 'You scored ' + points + ' this Turn because you ' + reason + ',\n      and have scored ' + this._points(scoreRound) + ' this Round.';
    }
  }, {
    key: '_roundPoints',
    value: function _roundPoints() {
      var scoreRound = this.player._.scoreRound;

      return 'You scored ' + this._points(scoreRound) + ' this Round.';
    }
  }, {
    key: '_success',
    value: function _success() {
      var messages = ['Awesome', 'Radical', 'Great job', 'Wow', 'Kapow'];
      return messages[Math.floor(Math.random() * messages.length)] + '!';
    }
  }, {
    key: '_failure',
    value: function _failure() {
      var messages = ['Shucks', 'Darn it all', 'Ugh', 'Whelp'];
      return messages[Math.floor(Math.random() * messages.length)] + '!';
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
/* 27 */
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
      return [['activities', 'Archery'], ['activities', 'Artistry'], ['activities', 'Astronomy'], ['activities', 'Athletics'], ['activities', 'Baseball'], ['activities', 'Basketball'], ['activities', 'Billiards'], ['activities', 'Books'], ['activities', 'Boxing'], ['activities', 'Boy Scouts'], ['activities', 'Buddhism'], ['activities', 'Canoes'], ['activities', 'Car-race'], ['activities', 'Carousel'], ['activities', 'Carpentry'], ['activities', 'Chess'], ['activities', 'Cigarettes'], ['activities', 'Cycling'], ['activities', 'Dance'], ['activities', 'Diving'], ['activities', 'Fencing'], ['activities', 'Fishing'], ['activities', 'Football'], ['activities', 'Games'], ['activities', 'Golf'], ['activities', 'Gymnastics'], ['activities', 'Hockey'], ['activities', 'Hunting'], ['activities', 'Mountaineering'], ['activities', 'Painting'], ['activities', 'Parachuting'], ['activities', 'Playing Cards'], ['activities', 'Pottery'], ['activities', 'Rugby'], ['activities', 'Saddle'], ['activities', 'Sailing'], ['activities', 'Seesaws'], ['activities', 'Skating'], ['activities', 'Skiing'], ['activities', 'Smoking'], ['activities', 'Soccer'], ['activities', 'Sports'], ['activities', 'Swimming Pool'], ['activities', 'Swings'], ['activities', 'Tanning'], ['activities', 'Tattoos'], ['activities', 'Tennis'], ['activities', 'Olympic Games'], ['activities', 'Tobacco'], ['activities', 'Treadmill'], ['activities', 'Volleyball'], ['activities', 'Water Skiing'], ['activities', 'Weaving'], ['activities', 'Whistling'], ['activities', 'Wrestling'], ['animals', 'Aardvark'], ['animals', 'Alligators'], ['animals', 'Alpacas'], ['animals', 'Ants'], ['animals', 'Armadillos'], ['animals', 'Baboons'], ['animals', 'Badger'], ['animals', 'Bats'], ['animals', 'Bears'], ['animals', 'Bees'], ['animals', 'Beetles'], ['animals', 'Birds'], ['animals', 'Buffaloes'], ['animals', 'Butterflies'], ['animals', 'Camels'], ['animals', 'Cats'], ['animals', 'Caterpillars'], ['animals', 'Cheetahs'], ['animals', 'Chipmunk'], ['animals', 'Cows'], ['animals', 'Coyotes'], ['animals', 'Cricket'], ['animals', 'Crocodiles'], ['animals', 'Deer'], ['animals', 'Dinosaurs'], ['animals', 'Dogs'], ['animals', 'Dolphins'], ['animals', 'Donkeys'], ['animals', 'Doves'], ['animals', 'Ducks'], ['animals', 'Eagle'], ['animals', 'Eels'], ['animals', 'Elephants'], ['animals', 'Ferrets'], ['animals', 'Fish'], ['animals', 'Flamingos'], ['animals', 'Foxes'], ['animals', 'Frogs'], ['animals', 'Geese'], ['animals', 'Giraffes'], ['animals', 'Goats'], ['animals', 'Goldfish'], ['animals', 'Gorillas'], ['animals', 'Hamsters'], ['animals', 'Hippopotamus'], ['animals', 'Horses'], ['animals', 'Hornets'], ['animals', 'Hummingbirds'], ['animals', 'Hyenas'], ['animals', 'Iguanas'], ['animals', 'Insects'], ['animals', 'Jaguars'], ['animals', 'Jellyfish'], ['animals', 'Kangaroos'], ['animals', 'Koalas'], ['animals', 'Komodo Dragons'], ['animals', 'Ladybugs'], ['animals', 'Leeches'], ['animals', 'Lemurs'], ['animals', 'Lions'], ['animals', 'Lizards'], ['animals', 'Llamas'], ['animals', 'Lobsters'], ['animals', 'Macaws'], ['animals', 'Manta Rays'], ['animals', 'Mastadons'], ['animals', 'Mice'], ['animals', 'Mollusks'], ['animals', 'Monkeys'], ['animals', 'Mosquitoes'], ['animals', 'Moths'], ['animals', 'Mules'], ['animals', 'Octopuses'], ['animals', 'Ostriches'], ['animals', 'Otters'], ['animals', 'Owls'], ['animals', 'Oxen'], ['animals', 'Pandas'], ['animals', 'Panthers'], ['animals', 'Peacocks'], ['animals', 'Pelicans'], ['animals', 'Penguins'], ['animals', 'Pigeons'], ['animals', 'Pigs'], ['animals', 'Piranhas'], ['animals', 'Porcupines'], ['animals', 'Possums'], ['animals', 'Pythons'], ['animals', 'Rabbits'], ['animals', 'Raccoons'], ['animals', 'Ravens'], ['animals', 'Rhinoceroses'], ['animals', 'Roosters'], ['animals', 'Scorpions'], ['animals', 'Sharks'], ['animals', 'Sheep'], ['animals', 'Shrimp'], ['animals', 'Snail'], ['animals', 'Snakes'], ['animals', 'Sparrows'], ['animals', 'Squids'], ['animals', 'Swans'], ['animals', 'Tarantulas'], ['animals', 'Tigers'], ['animals', 'Toads'], ['animals', 'Turkeys'], ['animals', 'Turtles'], ['animals', 'Vulture'], ['animals', 'Walruses'], ['animals', 'Whales'], ['animals', 'Wolves'], ['animals', 'Worms'], ['animals', 'Zebras'], ['art', 'Accordions'], ['art', 'Albums'], ['art', 'Artists'], ['art', 'Basses'], ['art', 'Bohemians'], ['art', 'Cameras'], ['art', 'Cellos'], ['art', 'Compact Discs'], ['art', 'Drawings'], ['art', 'Drums'], ['art', 'Films'], ['art', 'Flutes'], ['art', 'Guitars'], ['art', 'Harps'], ['art', 'Hieroglyphics'], ['art', 'Jewelery'], ['art', 'Mandolins'], ['art', 'Marionettes'], ['art', 'Movies'], ['art', 'Music'], ['art', 'Novels'], ['art', 'Pianos'], ['art', 'Pipe Organs'], ['art', 'Pottery'], ['art', 'Puppets'], ['art', 'Records'], ['art', 'Saxophones'], ['art', 'Sculpture'], ['art', 'Singing'], ['art', 'Sketching'], ['art', 'Synthesizers'], ['art', 'Trumpets'], ['art', 'Typewriters'], ['art', 'Ukuleles'], ['art', 'Violas'], ['art', 'Violins'], ['art', 'Writing'], ['art', 'Yodeling'], ['fiction', 'Aladdin'], ['fiction', 'Aliens'], ['fiction', 'Alice in Wonderland'], ['fiction', 'Bambi'], ['fiction', 'Batman'], ['fiction', 'Bilbo Baggins'], ['fiction', 'Boogeyman'], ['fiction', 'Cinderella'], ['fiction', 'Donald Duck'], ['fiction', 'E.T.'], ['fiction', 'Fairies'], ['fiction', 'Forrest Gump'], ['fiction', 'Freaks'], ['fiction', 'Gandalf'], ['fiction', 'Giants'], ['fiction', 'Harry Potter'], ['fiction', 'Hermione Granger'], ['fiction', 'Horoscope'], ['fiction', 'James Bond'], ['fiction', 'Luke Skywalker'], ['fiction', 'Mickey Mouse'], ['fiction', 'Minnie Mouse'], ['fiction', 'Monsters'], ['fiction', 'Mother Goose'], ['fiction', 'Mummies'], ['fiction', 'Muppets'], ['fiction', 'Optimus Prime'], ['fiction', 'Peter Pan'], ['fiction', 'Princess Leia'], ['fiction', 'Santa'], ['fiction', 'Shrek'], ['fiction', 'Snow White'], ['fiction', 'Superman'], ['fiction', 'The Joker'], ['fiction', 'Vampire'], ['fiction', 'Werewolves'], ['fiction', 'Winnie the Pooh'], ['fiction', 'Witch'], ['fiction', 'Wolverine'], ['fiction', 'Wonder Woman'], ['fiction', 'Yoda'], ['fiction', 'Zombies'], ['food', 'Apples'], ['food', 'Bakeries'], ['food', 'Bananas'], ['food', 'Barbecue'], ['food', 'Beef Jerky'], ['food', 'Beekeeping'], ['food', 'Breads'], ['food', 'Breastfeeding'], ['food', 'Cappuccino'], ['food', 'Carrots'], ['food', 'Cheeseburger'], ['food', 'Cheeses'], ['food', 'Chocolates'], ['food', 'Cocoa'], ['food', 'Coffee'], ['food', 'Cookies'], ['food', 'Doughnut'], ['food', 'Drink'], ['food', 'Eggs'], ['food', 'Fortune Cookies'], ['food', 'Fried Chicken'], ['food', 'Fruit'], ['food', 'Garden'], ['food', 'Grapes'], ['food', 'Grits'], ['food', 'Hot Dog'], ['food', 'Ice-cream'], ['food', 'Jello'], ['food', 'Meat'], ['food', 'Milkshake'], ['food', 'Onion'], ['food', 'Pancake'], ['food', 'Pepper'], ['food', 'Pineapple'], ['food', 'Pizza'], ['food', 'Pork'], ['food', 'Potatoes'], ['food', 'Rice'], ['food', 'Salt'], ['food', 'Sandwich'], ['food', 'Sausages'], ['food', 'Spice'], ['food', 'Sugar'], ['food', 'Tomatoes'], ['food', 'Vanilla'], ['food', 'Vegetables'], ['government', 'Agriculture'], ['government', 'Aircraft Carrier'], ['government', 'Airforce'], ['government', 'Army'], ['government', 'Budget'], ['government', 'CIA'], ['government', 'Communism'], ['government', 'Congress'], ['government', 'Crime'], ['government', 'Criminals'], ['government', 'Democracy'], ['government', 'Execution'], ['government', 'Health Insurance'], ['government', 'Homeland Security'], ['government', 'Judges'], ['government', 'Justice'], ['government', 'Mayors'], ['government', 'Military'], ['government', 'Monarchy'], ['government', 'Money'], ['government', 'Napoleon'], ['government', 'Native Americans'], ['government', 'Navy'], ['government', 'President'], ['government', 'Public Education'], ['government', 'Racism'], ['government', 'Red Cross'], ['government', 'Royalty'], ['government', 'Senate'], ['government', 'Slavery'], ['government', 'Socialism'], ['government', 'Spies'], ['government', 'Taxes'], ['government', 'The Economy'], ['government', 'Torture'], ['government', 'World War II'], ['household', 'Backpack'], ['household', 'Bathtub'], ['household', 'Beds'], ['household', 'Bible'], ['household', 'Bottle'], ['household', 'Bowl'], ['household', 'Boxes'], ['household', 'Button'], ['household', 'Cards'], ['household', 'Carpet'], ['household', 'Chair'], ['household', 'Checkbook'], ['household', 'Clock'], ['household', 'Coins'], ['household', 'Computer'], ['household', 'Cups'], ['household', 'Desk'], ['household', 'Disney Movies'], ['household', 'Dress'], ['household', 'Drill'], ['household', 'Eraser'], ['household', 'Fans'], ['household', 'Floodlight'], ['household', 'Fork'], ['household', 'Gate'], ['household', 'Gloves'], ['household', 'Hammer'], ['household', 'Hammocks'], ['household', 'Hats'], ['household', 'Hose'], ['household', 'Junk'], ['household', 'Kaleidoscope'], ['household', 'Knife'], ['household', 'Laundry'], ['household', 'Leather jacket'], ['household', 'Lighters'], ['household', 'Matches'], ['household', 'Nail'], ['household', 'Necklace'], ['household', 'Needle'], ['household', 'Newspapers'], ['household', 'Pants'], ['household', 'Perfume'], ['household', 'Pillar'], ['household', 'Pillow'], ['household', 'Pipes'], ['household', 'Postcards'], ['household', 'Printer'], ['household', 'Radio'], ['household', 'Ring'], ['household', 'Roof'], ['household', 'Rope'], ['household', 'Sandpaper'], ['household', 'Sewing Machines'], ['household', 'Shoes'], ['household', 'Shovels'], ['household', 'Shower'], ['household', 'Spoon'], ['household', 'Spotlight'], ['household', 'Staircase'], ['household', 'Sunglasses'], ['household', 'Table'], ['household', 'Tapestry'], ['household', 'Television'], ['household', 'Toilet'], ['household', 'Umbrella'], ['household', 'Vacuum'], ['household', 'Wheelchair'], ['household', 'Window'], ['nature', 'Adult'], ['nature', 'Arms'], ['nature', 'Baby'], ['nature', 'Boys'], ['nature', 'Brain'], ['nature', 'Breeze'], ['nature', 'Cactus'], ['nature', 'Caves'], ['nature', 'Child'], ['nature', 'Coal'], ['nature', 'Comet'], ['nature', 'Cotton'], ['nature', 'Crystal'], ['nature', 'Diamonds'], ['nature', 'Disasters'], ['nature', 'Dung'], ['nature', 'Ears'], ['nature', 'Earthquake'], ['nature', 'Electricity'], ['nature', 'Eyes'], ['nature', 'Family'], ['nature', 'Feather'], ['nature', 'Finger'], ['nature', 'Fire'], ['nature', 'Flood'], ['nature', 'Flower'], ['nature', 'Foot'], ['nature', 'Fungus'], ['nature', 'Gases'], ['nature', 'Gemstone'], ['nature', 'Girl'], ['nature', 'God'], ['nature', 'Gold'], ['nature', 'Hurricanes'], ['nature', 'Icicle'], ['nature', 'Jungles'], ['nature', 'Leather'], ['nature', 'Legs'], ['nature', 'Liquid'], ['nature', 'Magnet'], ['nature', 'Meteor'], ['nature', 'Meteorology'], ['nature', 'Mist'], ['nature', 'Moon'], ['nature', 'Motherhood'], ['nature', 'Mouth'], ['nature', 'Oil'], ['nature', 'Outer Space'], ['nature', 'Pebble'], ['nature', 'Rainbow'], ['nature', 'Rock'], ['nature', 'Seashells'], ['nature', 'Shells'], ['nature', 'Skeleton'], ['nature', 'Skull'], ['nature', 'Snow'], ['nature', 'Spirits'], ['nature', 'Star'], ['nature', 'Stomach'], ['nature', 'Sun'], ['nature', 'Teeth'], ['nature', 'Tongue'], ['nature', 'Vaccines'], ['nature', 'Volcanoes'], ['nature', 'Water'], ['nature', 'Winter'], ['nature', 'Woman'], ['nature', 'Wood'], ['occupations', 'Accountant'], ['occupations', 'Archaeologist'], ['occupations', 'Architect'], ['occupations', 'Banker'], ['occupations', 'Boss'], ['occupations', 'Botanist'], ['occupations', 'Butler'], ['occupations', 'Chief'], ['occupations', 'Clowns'], ['occupations', 'Cobblers'], ['occupations', 'Electrician'], ['occupations', 'Engineering'], ['occupations', 'Fireman'], ['occupations', 'Fortune Tellers'], ['occupations', 'Journalism'], ['occupations', 'Librarians'], ['occupations', 'Magicians'], ['occupations', 'Mailperson'], ['occupations', 'Masonry'], ['occupations', 'Mechanic'], ['occupations', 'Medicine'], ['occupations', 'Mining'], ['occupations', 'Nurses'], ['occupations', 'Paper Delivery'], ['occupations', 'Pilot'], ['occupations', 'Plumber'], ['occupations', 'Police Officer'], ['occupations', 'Psychiatrists'], ['occupations', 'Shipping'], ['occupations', 'Surveyor'], ['occupations', 'Tax Collector'], ['occupations', 'Teacher'], ['occupations', 'Veterinarians'], ['occupations', 'Waiters'], ['occupations', 'Zookeepers'], ['personalities', 'Abraham Lincoln'], ['personalities', 'Adolf Hitler'], ['personalities', 'Albert Einstein'], ['personalities', 'Alfred Hitchcock'], ['personalities', 'Angelina Jolie'], ['personalities', 'Anne Frank'], ['personalities', 'Arnold Schwarzenegger'], ['personalities', 'Audrey Hepburn'], ['personalities', 'Barack Obama'], ['personalities', 'Bill Gates'], ['personalities', 'Charles Darwin'], ['personalities', 'Dalai Lama'], ['personalities', 'Donald Trump'], ['personalities', 'Elvis Presley'], ['personalities', 'George W Bush'], ['personalities', 'Jesse Owens'], ['personalities', 'John F Kennedy'], ['personalities', 'Lance Armstrong'], ['personalities', 'Madonna'], ['personalities', 'Marilyn Monroe'], ['personalities', 'Martin Luther King Jr'], ['personalities', 'Michael Jackson'], ['personalities', 'Michael Jordan'], ['personalities', 'Muhammad Ali'], ['personalities', 'Nelson Mandela'], ['personalities', 'Oprah Winfrey'], ['personalities', 'Pablo Picasso'], ['personalities', 'Paul McCartney'], ['personalities', 'Princess Diana'], ['personalities', 'Queen Elizabeth II'], ['personalities', 'Rosa Parks'], ['personalities', 'Steve Jobs'], ['personalities', 'Thomas Edison'], ['personalities', 'Tom Cruise'], ['personalities', 'Vincent Van Gogh'], ['personalities', 'Vladimir Putin'], ['places', 'Africa'], ['places', 'America'], ['places', 'Amusement Parks'], ['places', 'Asia'], ['places', 'Bank'], ['places', 'Barber'], ['places', 'Bathroom'], ['places', 'Blacksmiths'], ['places', 'Brewery'], ['places', 'Bridge'], ['places', 'Cemetery'], ['places', 'Central America'], ['places', 'Church'], ['places', 'Circus'], ['places', 'Coffee-shop'], ['places', 'Dentist'], ['places', 'Drugstores'], ['places', 'Earth'], ['places', 'Egypt'], ['places', 'Europe'], ['places', 'Farm'], ['places', 'Farmers Markets'], ['places', 'Festival'], ['places', 'France'], ['places', 'Freeway'], ['places', 'Funerals'], ['places', 'Gas Station'], ['places', 'Highway'], ['places', 'Hotels'], ['places', 'Jamaica'], ['places', 'Kitchen'], ['places', 'Library'], ['places', 'Lighthouses'], ['places', 'Mass'], ['places', 'Movie Theaters'], ['places', 'North Africa'], ['places', 'Pharmacy'], ['places', 'Planet'], ['places', 'Post-office'], ['places', 'Prisons'], ['places', 'Restaurant'], ['places', 'Room'], ['places', 'Salvation Army'], ['places', 'School'], ['places', 'Shop'], ['places', 'South America'], ['places', 'Spas'], ['places', 'Stadiums'], ['places', 'The Post Office'], ['places', 'Theme Parks'], ['places', 'Wedding'], ['places', 'Windmills'], ['sciences', 'Antennas'], ['sciences', 'Cable'], ['sciences', 'Cancer'], ['sciences', 'Climate Change'], ['sciences', 'Code'], ['sciences', 'Databases'], ['sciences', 'Disease'], ['sciences', 'Internet'], ['sciences', 'Internet Providers'], ['sciences', 'Microscope'], ['sciences', 'Microsoft'], ['sciences', 'Programming'], ['sciences', 'Radar'], ['sciences', 'Radiology'], ['sciences', 'Robot'], ['sciences', 'Satellite'], ['sciences', 'Software'], ['sciences', 'Telephone'], ['sciences', 'Telescope'], ['sciences', 'The Cloud'], ['sciences', 'Thermometer'], ['sciences', 'Videotape'], ['sciences', 'X-rays'], ['travel', 'Airplane'], ['travel', 'Airports'], ['travel', 'Boats'], ['travel', 'Cars'], ['travel', 'Compass'], ['travel', 'Ferries'], ['travel', 'Flight'], ['travel', 'Jet fighter'], ['travel', 'Maps'], ['travel', 'Motorcycles'], ['travel', 'Passport'], ['travel', 'Plane'], ['travel', 'Railroads'], ['travel', 'Rocket'], ['travel', 'Ship'], ['travel', 'Shipwreck'], ['travel', 'Space Shuttle'], ['travel', 'Sports-car'], ['travel', 'Submarines'], ['travel', 'Train'], ['travel', 'Tunnel'], ['travel', 'Zeppelins'], ['violence', 'Atomic Bomb'], ['violence', 'Axes'], ['violence', 'Coffin'], ['violence', 'Death'], ['violence', 'Explosive'], ['violence', 'Grenade'], ['violence', 'Hatchet'], ['violence', 'Machine Gun'], ['violence', 'Murder'], ['violence', 'Ninja Star'], ['violence', 'Pistol'], ['violence', 'Poison'], ['violence', 'Rifle'], ['violence', 'Spear'], ['violence', 'Sword'], ['violence', 'Torch'], ['violence', 'Torpedo'], ['violence', 'Weapon']];
    }
  }]);

  return Topics;
}();

exports.default = Topics;

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