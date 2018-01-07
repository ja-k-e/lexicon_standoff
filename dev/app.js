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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
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
      return '<span class="user ' + classname + '"><img src="' + player.avatar + '" /> ' + name + '</span>';
    }
  }, {
    key: 'roleHeader',
    value: function roleHeader(title) {
      var _player = this.player,
          role = _player.role,
          capitalizedRole = _player.capitalizedRole;

      return '<span class="status">' + title + '</span>\n      <span class="info"><span class="' + role + '">' + capitalizedRole + '</span></span>';
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
        content = _ref$content === undefined ? '' : _ref$content,
        _ref$classname = _ref.classname,
        classname = _ref$classname === undefined ? '' : _ref$classname;

    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this));

    _this.$el = _this.el('button', content, classname);
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

var _App = __webpack_require__(12);

var _App2 = _interopRequireDefault(_App);

var _Games = __webpack_require__(13);

var _Games2 = _interopRequireDefault(_Games);

var _Players = __webpack_require__(15);

var _Players2 = _interopRequireDefault(_Players);

var _Users = __webpack_require__(16);

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

var _NewVersion = __webpack_require__(20);

var _NewVersion2 = _interopRequireDefault(_NewVersion);

var _Auth = __webpack_require__(21);

var _Auth2 = _interopRequireDefault(_Auth);

var _Launch = __webpack_require__(22);

var _Launch2 = _interopRequireDefault(_Launch);

var _Start = __webpack_require__(23);

var _Start2 = _interopRequireDefault(_Start);

var _Selections = __webpack_require__(24);

var _Selections2 = _interopRequireDefault(_Selections);

var _Reveal = __webpack_require__(25);

var _Reveal2 = _interopRequireDefault(_Reveal);

var _Actions = __webpack_require__(26);

var _Actions2 = _interopRequireDefault(_Actions);

var _Results = __webpack_require__(27);

var _Results2 = _interopRequireDefault(_Results);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Renderers = {
  NewVersion: _NewVersion2.default,
  Auth: _Auth2.default,
  Launch: _Launch2.default,
  Start: _Start2.default,
  Selections: _Selections2.default,
  Reveal: _Reveal2.default,
  Actions: _Actions2.default,
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

var _Topics = __webpack_require__(10);

var _Topics2 = _interopRequireDefault(_Topics);

var _shuffle = __webpack_require__(8);

var _shuffle2 = _interopRequireDefault(_shuffle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    key: 'detectAllActionsSubmitted',
    value: function detectAllActionsSubmitted() {
      return Object.keys(this.actions).length === this.playerCount;
    }
  }, {
    key: 'detectAllSelectionsSubmitted',
    value: function detectAllSelectionsSubmitted() {
      return Object.keys(this.selections).length === this.playerCountAlive;
    }
  }, {
    key: 'calculateRoundOverData',
    value: function calculateRoundOverData(players) {
      var deadCounts = { imposter: 0, agent: 0 },
          aliveCounts = { imposter: 0, agent: 0 },
          aliveIds = [],
          deadIds = [];
      for (var playerId in players) {
        var role = players[playerId].role;
        if (players[playerId].isAlive) {
          aliveCounts[role]++;
          aliveIds.push(playerId);
        } else {
          deadCounts[role]++;
          deadIds.push(playerId);
        }
      }
      var roundOver = aliveCounts.imposter === 0 || aliveCounts.agent === 0;
      return { aliveCounts: aliveCounts, aliveIds: aliveIds, deadCounts: deadCounts, deadIds: deadIds, roundOver: roundOver };
    }
  }, {
    key: 'calculatePoints',
    value: function calculatePoints(players, _ref2) {
      var aliveCounts = _ref2.aliveCounts,
          aliveIds = _ref2.aliveIds,
          roundOver = _ref2.roundOver;

      var points = {},
          winRole = null;
      if (roundOver) {
        if (aliveCounts.imposter > 0) winRole = 'imposter';else if (aliveCounts.agent > 0) winRole = 'agent';
      }
      // Alive Imposters score two, alive Agents score one
      for (var playerId in players) {
        var player = players[playerId],
            role = player.role,
            survivePts = Game.survivePoints[role];
        // If winning Team
        if (winRole && winRole === role) {
          // If alive, extra points
          var pts = player.isAlive ? Game.winPoints + survivePts : Game.winPoints;
          points[playerId] = pts;
        } else if (winRole) {
          // If Loser,
        } else {
          // Game Still playing
          if (player.isAlive) points[playerId] = survivePts;
        }
      }
      return points;
    }
  }, {
    key: 'update',
    value: function update(values) {
      var _this = this;

      this.changes = {};
      ['status', 'actions', 'selections', 'killedIds'].forEach(function (type) {
        _this.changes[type] = values[type] !== _this._[type];
      });
      this._ = values;
    }

    // Generators

  }, {
    key: 'generateRoundData',
    value: function generateRoundData() {
      var _game;

      var playerIds = Object.keys(this.state.players);

      var _generateRoles2 = this._generateRoles(playerIds),
          playerIdsImposters = _generateRoles2.playerIdsImposters,
          playerIdsAgents = _generateRoles2.playerIdsAgents,
          imposterCount = _generateRoles2.imposterCount;

      var playerCount = playerIds.length,
          topics = this.generateTopics();
      return {
        game: (_game = {
          playerCountAlive: playerCount,
          playerCount: playerCount,
          inProgress: true,
          actions: {},
          selections: {},
          killVotes: {},
          killedIds: [],
          aliveCounts: { imposter: 0, agent: 0 },
          aliveIds: [],
          deadCounts: { imposter: 0, agent: 0 },
          deadIds: []
        }, _defineProperty(_game, 'selections', 1), _defineProperty(_game, 'imposterCount', imposterCount), _defineProperty(_game, 'topics', topics), _defineProperty(_game, 'roundOver', false), _game),
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
    key: 'generateActionIds',
    value: function generateActionIds() {
      var killVotes = {},
          killedIds = [],
          confusionVotes = {},
          confusionIds = [],
          most = 0;
      for (var playerId in this.actions) {
        var actionId = this.actions[playerId],
            lastVote = this.playerCountAlive === 2,
            aliveAction = this.state.players[playerId].isAlive;
        if (aliveAction || lastVote) {
          killVotes[actionId] = killVotes[actionId] || 0;
          killVotes[actionId]++;
        } else {
          confusionVotes[actionId] = confusionVotes[actionId] || 0;
          confusionVotes[actionId]++;
        }
      }
      for (var _playerId in killVotes) {
        var actions = killVotes[_playerId];
        if (actions > most) {
          most = actions;
          killedIds = [_playerId];
        } else if (actions === most) {
          killedIds.push(_playerId);
        }
      }
      for (var _playerId2 in confusionVotes) {
        var _actions = confusionVotes[_playerId2];
        confusionIds.push(_playerId2);
      }
      return { confusionVotes: confusionVotes, confusionIds: confusionIds, killVotes: killVotes, killedIds: killedIds };
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

    // Getters

  }, {
    key: '_distributor',


    // Private

    value: function _distributor(number) {
      // Going for 3 to 1, minimum 1
      var agents = Math.max(Math.floor(number * 0.75), 1),
          imposters = number - agents;
      return [agents, imposters];
    }
  }, {
    key: 'aliveCounts',
    get: function get() {
      return this._.aliveCounts;
    }
  }, {
    key: 'aliveIds',
    get: function get() {
      return this._.aliveIds;
    }
  }, {
    key: 'confusionVotes',
    get: function get() {
      return this._.confusionVotes;
    }
  }, {
    key: 'deadCounts',
    get: function get() {
      return this._.deadCounts;
    }
  }, {
    key: 'deadIds',
    get: function get() {
      return this._.deadIds;
    }
  }, {
    key: 'imposterCount',
    get: function get() {
      return this._.imposterCount;
    }
  }, {
    key: 'killedIds',
    get: function get() {
      return this._.killedIds;
    }
  }, {
    key: 'killVotes',
    get: function get() {
      return this._.killVotes;
    }
  }, {
    key: 'playerCount',
    get: function get() {
      return this._.playerCount;
    }
  }, {
    key: 'playerCountAlive',
    get: function get() {
      return this._.playerCountAlive;
    }
  }, {
    key: 'roundOver',
    get: function get() {
      return this._.roundOver;
    }
  }, {
    key: 'selections',
    get: function get() {
      return this._.selections;
    }
  }, {
    key: 'status',
    get: function get() {
      return this._.status;
    }
  }, {
    key: 'topics',
    get: function get() {
      return this._.topics;
    }
  }, {
    key: 'actions',
    get: function get() {
      return this._.actions;
    }
  }, {
    key: 'isActions',
    get: function get() {
      return this.status === 'actions';
    }
  }, {
    key: 'isSelections',
    get: function get() {
      return this.status === 'selections';
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
      return [['activities', 'Archery'], ['activities', 'Artistry'], ['activities', 'Astronomy'], ['activities', 'Athletics'], ['activities', 'Baseball'], ['activities', 'Basketball'], ['activities', 'Billiards'], ['activities', 'Books'], ['activities', 'Boxing'], ['activities', 'Boy Scouts'], ['activities', 'Buddhism'], ['activities', 'Canoes'], ['activities', 'Car Racing'], ['activities', 'Carousel'], ['activities', 'Carpentry'], ['activities', 'Chess'], ['activities', 'Cigarettes'], ['activities', 'Cycling'], ['activities', 'Dance'], ['activities', 'Diving'], ['activities', 'Fencing'], ['activities', 'Fishing'], ['activities', 'Football'], ['activities', 'Games'], ['activities', 'Golf'], ['activities', 'Gymnastics'], ['activities', 'Hockey'], ['activities', 'Hunting'], ['activities', 'Mountaineering'], ['activities', 'Painting'], ['activities', 'Parachuting'], ['activities', 'Playing Cards'], ['activities', 'Pottery'], ['activities', 'Rugby'], ['activities', 'Saddle'], ['activities', 'Sailing'], ['activities', 'Seesaws'], ['activities', 'Skating'], ['activities', 'Skiing'], ['activities', 'Smoking'], ['activities', 'Soccer'], ['activities', 'Sports'], ['activities', 'Swimming Pool'], ['activities', 'Swings'], ['activities', 'Tanning'], ['activities', 'Tattoos'], ['activities', 'Tennis'], ['activities', 'Olympic Games'], ['activities', 'Tobacco'], ['activities', 'Treadmill'], ['activities', 'Volleyball'], ['activities', 'Water Skiing'], ['activities', 'Weaving'], ['activities', 'Whistling'], ['activities', 'Wrestling'], ['animals', 'Aardvark'], ['animals', 'Alligators'], ['animals', 'Alpacas'], ['animals', 'Ants'], ['animals', 'Armadillos'], ['animals', 'Baboons'], ['animals', 'Badger'], ['animals', 'Bats'], ['animals', 'Bears'], ['animals', 'Bees'], ['animals', 'Beetles'], ['animals', 'Birds'], ['animals', 'Buffaloes'], ['animals', 'Butterflies'], ['animals', 'Camels'], ['animals', 'Cats'], ['animals', 'Caterpillars'], ['animals', 'Cheetahs'], ['animals', 'Chipmunk'], ['animals', 'Cows'], ['animals', 'Coyotes'], ['animals', 'Cricket'], ['animals', 'Crocodiles'], ['animals', 'Deer'], ['animals', 'Dinosaurs'], ['animals', 'Dogs'], ['animals', 'Dolphins'], ['animals', 'Donkeys'], ['animals', 'Doves'], ['animals', 'Ducks'], ['animals', 'Eagle'], ['animals', 'Eels'], ['animals', 'Elephants'], ['animals', 'Ferrets'], ['animals', 'Fish'], ['animals', 'Flamingos'], ['animals', 'Foxes'], ['animals', 'Frogs'], ['animals', 'Geese'], ['animals', 'Giraffes'], ['animals', 'Goats'], ['animals', 'Goldfish'], ['animals', 'Gorillas'], ['animals', 'Hamsters'], ['animals', 'Hippopotamus'], ['animals', 'Horses'], ['animals', 'Hornets'], ['animals', 'Hummingbirds'], ['animals', 'Hyenas'], ['animals', 'Iguanas'], ['animals', 'Insects'], ['animals', 'Jaguars'], ['animals', 'Jellyfish'], ['animals', 'Kangaroos'], ['animals', 'Koalas'], ['animals', 'Komodo Dragons'], ['animals', 'Ladybugs'], ['animals', 'Leeches'], ['animals', 'Lemurs'], ['animals', 'Lions'], ['animals', 'Lizards'], ['animals', 'Llamas'], ['animals', 'Lobsters'], ['animals', 'Macaws'], ['animals', 'Manta Rays'], ['animals', 'Mastadons'], ['animals', 'Mice'], ['animals', 'Mollusks'], ['animals', 'Monkeys'], ['animals', 'Mosquitoes'], ['animals', 'Moths'], ['animals', 'Mules'], ['animals', 'Octopuses'], ['animals', 'Ostriches'], ['animals', 'Otters'], ['animals', 'Owls'], ['animals', 'Oxen'], ['animals', 'Pandas'], ['animals', 'Panthers'], ['animals', 'Peacocks'], ['animals', 'Pelicans'], ['animals', 'Penguins'], ['animals', 'Pigeons'], ['animals', 'Pigs'], ['animals', 'Piranhas'], ['animals', 'Porcupines'], ['animals', 'Possums'], ['animals', 'Pythons'], ['animals', 'Rabbits'], ['animals', 'Raccoons'], ['animals', 'Ravens'], ['animals', 'Rhinoceroses'], ['animals', 'Roosters'], ['animals', 'Scorpions'], ['animals', 'Sharks'], ['animals', 'Sheep'], ['animals', 'Shrimp'], ['animals', 'Snail'], ['animals', 'Snakes'], ['animals', 'Sparrows'], ['animals', 'Squids'], ['animals', 'Swans'], ['animals', 'Tarantulas'], ['animals', 'Tigers'], ['animals', 'Toads'], ['animals', 'Turkeys'], ['animals', 'Turtles'], ['animals', 'Vulture'], ['animals', 'Walruses'], ['animals', 'Whales'], ['animals', 'Wolves'], ['animals', 'Worms'], ['animals', 'Zebras'], ['art', 'Accordions'], ['art', 'Albums'], ['art', 'Artists'], ['art', 'Bass'], ['art', 'Bohemians'], ['art', 'Cameras'], ['art', 'Cellos'], ['art', 'Compact Discs'], ['art', 'Drawings'], ['art', 'Drums'], ['art', 'Films'], ['art', 'Flutes'], ['art', 'Guitars'], ['art', 'Harps'], ['art', 'Hieroglyphics'], ['art', 'Jewelery'], ['art', 'Mandolins'], ['art', 'Marionettes'], ['art', 'Movies'], ['art', 'Music'], ['art', 'Novels'], ['art', 'Pianos'], ['art', 'Pipe Organs'], ['art', 'Pottery'], ['art', 'Puppets'], ['art', 'Records'], ['art', 'Saxophones'], ['art', 'Sculpture'], ['art', 'Singing'], ['art', 'Sketching'], ['art', 'Synthesizers'], ['art', 'Trumpets'], ['art', 'Typewriters'], ['art', 'Ukuleles'], ['art', 'Violas'], ['art', 'Violins'], ['art', 'Writing'], ['art', 'Yodeling'], ['fiction', 'Aladdin'], ['fiction', 'Aliens'], ['fiction', 'Alice in Wonderland'], ['fiction', 'Bambi'], ['fiction', 'Batman'], ['fiction', 'Bilbo Baggins'], ['fiction', 'Boogeyman'], ['fiction', 'Cinderella'], ['fiction', 'Donald Duck'], ['fiction', 'E.T.'], ['fiction', 'Fairies'], ['fiction', 'Forrest Gump'], ['fiction', 'Freaks'], ['fiction', 'Gandalf'], ['fiction', 'Giants'], ['fiction', 'Harry Potter'], ['fiction', 'Hermione Granger'], ['fiction', 'Horoscope'], ['fiction', 'James Bond'], ['fiction', 'Luke Skywalker'], ['fiction', 'Mickey Mouse'], ['fiction', 'Minnie Mouse'], ['fiction', 'Monsters'], ['fiction', 'Mother Goose'], ['fiction', 'Mummies'], ['fiction', 'Muppets'], ['fiction', 'Optimus Prime'], ['fiction', 'Peter Pan'], ['fiction', 'Princess Leia'], ['fiction', 'Santa'], ['fiction', 'Shrek'], ['fiction', 'Snow White'], ['fiction', 'Superman'], ['fiction', 'The Joker'], ['fiction', 'Vampire'], ['fiction', 'Werewolves'], ['fiction', 'Winnie the Pooh'], ['fiction', 'Witch'], ['fiction', 'Wolverine'], ['fiction', 'Wonder Woman'], ['fiction', 'Yoda'], ['fiction', 'Zombies'], ['food', 'Apples'], ['food', 'Bakeries'], ['food', 'Bananas'], ['food', 'Barbecue'], ['food', 'Beef Jerky'], ['food', 'Beekeeping'], ['food', 'Breads'], ['food', 'Breastfeeding'], ['food', 'Cappuccino'], ['food', 'Carrots'], ['food', 'Cheeseburger'], ['food', 'Cheeses'], ['food', 'Chocolates'], ['food', 'Cocoa'], ['food', 'Coffee'], ['food', 'Cookies'], ['food', 'Doughnut'], ['food', 'Drink'], ['food', 'Eggs'], ['food', 'Fortune Cookies'], ['food', 'Fried Chicken'], ['food', 'Fruit'], ['food', 'Garden'], ['food', 'Grapes'], ['food', 'Grits'], ['food', 'Hot Dog'], ['food', 'Ice Cream'], ['food', 'Jello'], ['food', 'Meat'], ['food', 'Milkshake'], ['food', 'Onion'], ['food', 'Pancake'], ['food', 'Pepper'], ['food', 'Pineapple'], ['food', 'Pizza'], ['food', 'Pork'], ['food', 'Potatoes'], ['food', 'Rice'], ['food', 'Salt'], ['food', 'Sandwich'], ['food', 'Sausages'], ['food', 'Spice'], ['food', 'Sugar'], ['food', 'Tomatoes'], ['food', 'Vanilla'], ['food', 'Vegetables'], ['government', 'Agriculture'], ['government', 'Aircraft Carrier'], ['government', 'Airforce'], ['government', 'Army'], ['government', 'Budget'], ['government', 'CIA'], ['government', 'Communism'], ['government', 'Congress'], ['government', 'Crime'], ['government', 'Criminals'], ['government', 'Democracy'], ['government', 'Execution'], ['government', 'Health Insurance'], ['government', 'Homeland Security'], ['government', 'Judges'], ['government', 'Justice'], ['government', 'Mayors'], ['government', 'Military'], ['government', 'Monarchy'], ['government', 'Money'], ['government', 'Napoleon'], ['government', 'Native Americans'], ['government', 'Navy'], ['government', 'President'], ['government', 'Public Education'], ['government', 'Racism'], ['government', 'Red Cross'], ['government', 'Royalty'], ['government', 'Senate'], ['government', 'Slavery'], ['government', 'Socialism'], ['government', 'Spies'], ['government', 'Taxes'], ['government', 'The Economy'], ['government', 'Torture'], ['government', 'World War II'], ['household', 'Backpack'], ['household', 'Bathtub'], ['household', 'Beds'], ['household', 'Bible'], ['household', 'Bottle'], ['household', 'Bowl'], ['household', 'Boxes'], ['household', 'Button'], ['household', 'Cards'], ['household', 'Carpet'], ['household', 'Chair'], ['household', 'Checkbook'], ['household', 'Clock'], ['household', 'Coins'], ['household', 'Computer'], ['household', 'Cups'], ['household', 'Desk'], ['household', 'Disney Movies'], ['household', 'Dress'], ['household', 'Drill'], ['household', 'Eraser'], ['household', 'Fans'], ['household', 'Floodlight'], ['household', 'Fork'], ['household', 'Gate'], ['household', 'Gloves'], ['household', 'Hammer'], ['household', 'Hammocks'], ['household', 'Hats'], ['household', 'Hose'], ['household', 'Junk'], ['household', 'Kaleidoscope'], ['household', 'Knife'], ['household', 'Laundry'], ['household', 'Leather Jacket'], ['household', 'Lighters'], ['household', 'Matches'], ['household', 'Nail'], ['household', 'Necklace'], ['household', 'Needle'], ['household', 'Newspapers'], ['household', 'Pants'], ['household', 'Perfume'], ['household', 'Pillar'], ['household', 'Pillow'], ['household', 'Pipes'], ['household', 'Postcards'], ['household', 'Printer'], ['household', 'Radio'], ['household', 'Ring'], ['household', 'Roof'], ['household', 'Rope'], ['household', 'Sandpaper'], ['household', 'Sewing Machines'], ['household', 'Shoes'], ['household', 'Shovels'], ['household', 'Shower'], ['household', 'Spoon'], ['household', 'Spotlight'], ['household', 'Staircase'], ['household', 'Sunglasses'], ['household', 'Table'], ['household', 'Tapestry'], ['household', 'Television'], ['household', 'Toilet'], ['household', 'Umbrella'], ['household', 'Vacuum'], ['household', 'Wheelchair'], ['household', 'Window'], ['nature', 'Adult'], ['nature', 'Arms'], ['nature', 'Baby'], ['nature', 'Boys'], ['nature', 'Brain'], ['nature', 'Breeze'], ['nature', 'Cactus'], ['nature', 'Caves'], ['nature', 'Child'], ['nature', 'Coal'], ['nature', 'Comet'], ['nature', 'Cotton'], ['nature', 'Crystal'], ['nature', 'Diamonds'], ['nature', 'Disasters'], ['nature', 'Dung'], ['nature', 'Ears'], ['nature', 'Earthquake'], ['nature', 'Electricity'], ['nature', 'Eyes'], ['nature', 'Family'], ['nature', 'Feather'], ['nature', 'Finger'], ['nature', 'Fire'], ['nature', 'Flood'], ['nature', 'Flower'], ['nature', 'Foot'], ['nature', 'Fungus'], ['nature', 'Gases'], ['nature', 'Gemstone'], ['nature', 'Girl'], ['nature', 'God'], ['nature', 'Gold'], ['nature', 'Hurricanes'], ['nature', 'Icicle'], ['nature', 'Jungles'], ['nature', 'Leather'], ['nature', 'Legs'], ['nature', 'Liquid'], ['nature', 'Magnet'], ['nature', 'Meteor'], ['nature', 'Meteorology'], ['nature', 'Mist'], ['nature', 'Moon'], ['nature', 'Motherhood'], ['nature', 'Mouth'], ['nature', 'Oil'], ['nature', 'Outer Space'], ['nature', 'Pebble'], ['nature', 'Rainbow'], ['nature', 'Rock'], ['nature', 'Seashells'], ['nature', 'Shells'], ['nature', 'Skeleton'], ['nature', 'Skull'], ['nature', 'Snow'], ['nature', 'Spirits'], ['nature', 'Star'], ['nature', 'Stomach'], ['nature', 'Sun'], ['nature', 'Teeth'], ['nature', 'Tongue'], ['nature', 'Vaccines'], ['nature', 'Volcanoes'], ['nature', 'Water'], ['nature', 'Winter'], ['nature', 'Woman'], ['nature', 'Wood'], ['occupations', 'Accountant'], ['occupations', 'Archaeologist'], ['occupations', 'Architect'], ['occupations', 'Banker'], ['occupations', 'Boss'], ['occupations', 'Botanist'], ['occupations', 'Butler'], ['occupations', 'Chief'], ['occupations', 'Clowns'], ['occupations', 'Cobblers'], ['occupations', 'Electrician'], ['occupations', 'Engineering'], ['occupations', 'Fireman'], ['occupations', 'Fortune Tellers'], ['occupations', 'Journalism'], ['occupations', 'Librarians'], ['occupations', 'Magicians'], ['occupations', 'Mailperson'], ['occupations', 'Masonry'], ['occupations', 'Mechanic'], ['occupations', 'Medicine'], ['occupations', 'Mining'], ['occupations', 'Nurses'], ['occupations', 'Paper Delivery'], ['occupations', 'Pilot'], ['occupations', 'Plumber'], ['occupations', 'Police Officer'], ['occupations', 'Psychiatrists'], ['occupations', 'Shipping'], ['occupations', 'Surveyor'], ['occupations', 'Tax Collector'], ['occupations', 'Teacher'], ['occupations', 'Veterinarians'], ['occupations', 'Waiters'], ['occupations', 'Zookeepers'], ['personalities', 'Abraham Lincoln'], ['personalities', 'Adolf Hitler'], ['personalities', 'Albert Einstein'], ['personalities', 'Alfred Hitchcock'], ['personalities', 'Angelina Jolie'], ['personalities', 'Anne Frank'], ['personalities', 'Arnold Schwarzenegger'], ['personalities', 'Audrey Hepburn'], ['personalities', 'Barack Obama'], ['personalities', 'Bill Gates'], ['personalities', 'Charles Darwin'], ['personalities', 'Dalai Lama'], ['personalities', 'Donald Trump'], ['personalities', 'Elvis Presley'], ['personalities', 'George W Bush'], ['personalities', 'Jesse Owens'], ['personalities', 'John F Kennedy'], ['personalities', 'Lance Armstrong'], ['personalities', 'Madonna'], ['personalities', 'Marilyn Monroe'], ['personalities', 'Martin Luther King Jr'], ['personalities', 'Michael Jackson'], ['personalities', 'Michael Jordan'], ['personalities', 'Muhammad Ali'], ['personalities', 'Nelson Mandela'], ['personalities', 'Oprah Winfrey'], ['personalities', 'Pablo Picasso'], ['personalities', 'Paul McCartney'], ['personalities', 'Princess Diana'], ['personalities', 'Queen Elizabeth II'], ['personalities', 'Rosa Parks'], ['personalities', 'Steve Jobs'], ['personalities', 'Thomas Edison'], ['personalities', 'Tom Cruise'], ['personalities', 'Vincent Van Gogh'], ['personalities', 'Vladimir Putin'], ['places', 'Africa'], ['places', 'America'], ['places', 'Amusement Parks'], ['places', 'Asia'], ['places', 'Bank'], ['places', 'Barber'], ['places', 'Bathroom'], ['places', 'Blacksmiths'], ['places', 'Brewery'], ['places', 'Bridge'], ['places', 'Cemetery'], ['places', 'Central America'], ['places', 'Church'], ['places', 'Circus'], ['places', 'Coffee Shop'], ['places', 'Dentist'], ['places', 'Drugstores'], ['places', 'Earth'], ['places', 'Egypt'], ['places', 'Europe'], ['places', 'Farm'], ['places', 'Farmers Markets'], ['places', 'Festival'], ['places', 'France'], ['places', 'Freeway'], ['places', 'Funerals'], ['places', 'Gas Station'], ['places', 'Highway'], ['places', 'Hotels'], ['places', 'Jamaica'], ['places', 'Kitchen'], ['places', 'Library'], ['places', 'Lighthouses'], ['places', 'Mass'], ['places', 'Movie Theaters'], ['places', 'North Africa'], ['places', 'Pharmacy'], ['places', 'Planet'], ['places', 'Post Office'], ['places', 'Prisons'], ['places', 'Restaurant'], ['places', 'Room'], ['places', 'Salvation Army'], ['places', 'School'], ['places', 'Shop'], ['places', 'South America'], ['places', 'Spas'], ['places', 'Stadiums'], ['places', 'Theme Parks'], ['places', 'Wedding'], ['places', 'Windmills'], ['sciences', 'Antennas'], ['sciences', 'Cable'], ['sciences', 'Cancer'], ['sciences', 'Climate Change'], ['sciences', 'Code'], ['sciences', 'Databases'], ['sciences', 'Disease'], ['sciences', 'Internet'], ['sciences', 'Internet Providers'], ['sciences', 'Microscope'], ['sciences', 'Microsoft'], ['sciences', 'Programming'], ['sciences', 'Radar'], ['sciences', 'Radiology'], ['sciences', 'Robot'], ['sciences', 'Satellite'], ['sciences', 'Software'], ['sciences', 'Telephone'], ['sciences', 'Telescope'], ['sciences', 'The Cloud'], ['sciences', 'Thermometer'], ['sciences', 'Videotape'], ['sciences', 'X-rays'], ['travel', 'Airplane'], ['travel', 'Airports'], ['travel', 'Boats'], ['travel', 'Cars'], ['travel', 'Compass'], ['travel', 'Ferries'], ['travel', 'Flight'], ['travel', 'Jet Fighter'], ['travel', 'Maps'], ['travel', 'Motorcycles'], ['travel', 'Passport'], ['travel', 'Plane'], ['travel', 'Railroads'], ['travel', 'Rocket'], ['travel', 'Ship'], ['travel', 'Shipwreck'], ['travel', 'Space Shuttle'], ['travel', 'Sports Car'], ['travel', 'Submarines'], ['travel', 'Train'], ['travel', 'Tunnel'], ['travel', 'Zeppelins'], ['violence', 'Atomic Bomb'], ['violence', 'Axes'], ['violence', 'Coffin'], ['violence', 'Death'], ['violence', 'Explosive'], ['violence', 'Grenade'], ['violence', 'Hatchet'], ['violence', 'Machine Gun'], ['violence', 'Murder'], ['violence', 'Ninja Star'], ['violence', 'Pistol'], ['violence', 'Poison'], ['violence', 'Rifle'], ['violence', 'Spear'], ['violence', 'Sword'], ['violence', 'Torch'], ['violence', 'Torpedo'], ['violence', 'Weapon']];
    }
  }]);

  return Topics;
}();

exports.default = Topics;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Adapters = __webpack_require__(4);

var _Adapters2 = _interopRequireDefault(_Adapters);

var _Auth = __webpack_require__(17);

var _Auth2 = _interopRequireDefault(_Auth);

var _State = __webpack_require__(19);

var _State2 = _interopRequireDefault(_State);

var _Renderers = __webpack_require__(6);

var _Renderers2 = _interopRequireDefault(_Renderers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = __webpack_require__(5);

console.clear();

var //
AUTH = new _Auth2.default(),
    VERSION = 0.4;

console.info('\n%cLexicon Standoff v' + VERSION + '\n%c\xA9 Jake Albaugh ' + new Date().getFullYear() + '\nhttps://twitter.com/jake_albaugh\nhttps://github.com/jakealbaugh/lexicon_standoff\n', 'font-family: sans-serif; font-weight: bold;', 'font-family: sans-serif; font-weight: normal;');

AUTH.detectExisting().then(initializeUser).catch(handleNoUser);

function handleNewVersion() {
  var renderer = new _Renderers2.default.NewVersion(null, {});
  renderer.renderInitial();
  renderer.render();
}

function handleNoUser() {
  var renderer = new _Renderers2.default.Auth(null, {});
  renderer.renderInitial();
  renderer.render();
  AUTH.loadUI();
}

function initializeState(existingUser) {
  _Adapters2.default.Users.globalFindOrCreate(existingUser).then(function (_ref) {
    var user = _ref.user;

    var avatar = validAvatar(user);
    _Adapters2.default.Users.globalUpdate(user.id, { avatar: avatar }).then(function () {
      _Adapters2.default.Users.globalFind(user.id).then(function (user) {
        return new _State2.default({ user: user, auth: AUTH });
      }).catch(handleError);
    }).catch(handleError);
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
  console.error(error);
}

function validAvatar(user) {
  var def = 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg';
  if (user.avatar && user.avatar !== def) return user.avatar;
  if (user.image && user.image !== def) return user.image;
  var avatars = _Renderers2.default.Launch._avatars,
      name = avatars[Math.floor(Math.random() * avatars.length)];
  return _Renderers2.default.Launch._avatarUrl(name);
}

/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Slugs = __webpack_require__(14);

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

      var playerExists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return new Promise(function (resolve, reject) {
        _this2.db.ref(_this2.r(gameId)).once('value').then(function (snap) {
          var game = snap.val();
          if (game === null) reject('No Game Found with name ' + gameId);else if (game.inProgress === true && !playerExists) reject('Game ' + gameId + ' is already in progress');else resolve({ game: game });
        }).catch(reject);
      });
    }
  }, {
    key: 'globalAction',
    value: function globalAction(gameId, actingPlayerId, playerId) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.db.ref(_this3.r(gameId)).child('actions').update(_defineProperty({}, actingPlayerId, playerId)).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'globalSelection',
    value: function globalSelection(gameId, playerId, selection) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.db.ref(_this4.r(gameId)).child('selections').update(_defineProperty({}, playerId, selection)).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'globalListener',
    value: function globalListener(gameId, handler) {
      this.db.ref(this.r(gameId)).on('value', function (snap) {
        handler(snap.val());
      });
    }
  }, {
    key: 'globalKill',
    value: function globalKill(gameId) {
      this.db.ref(this.r(gameId)).off();
    }

    // Master Actions

  }, {
    key: 'masterCreate',
    value: function masterCreate(userId) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5._generateUniqueId().then(function (id) {
          // Set listener
          _this5.db.ref(_this5.r(id)).on('value', function (snap) {
            var game = snap.val();
            if (game && game.id === id) {
              // Kill listener
              _this5.db.ref(_this5.r(id)).off();
              // Reselection the Game
              resolve({ game: game });
            }
          });
          // Create Game
          _this5.db.ref(_this5.r(id)).set({ id: id, status: 'start', inProgress: false, masterId: userId }).catch(reject);
        }).catch(reject);
      });
    }
  }, {
    key: 'masterDelete',
    value: function masterDelete(gameId) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        _this6.db.ref(_this6.r(gameId)).set(null).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'masterUpdateActionIds',
    value: function masterUpdateActionIds(gameId, confusionVotes, confusionIds, killVotes, killedIds, playerCountAlive) {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        _this7.db.ref(_this7.r(gameId)).update({
          confusionVotes: confusionVotes,
          confusionIds: confusionIds,
          killedIds: killedIds,
          killVotes: killVotes,
          playerCountAlive: playerCountAlive
        }).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'masterUpdateResults',
    value: function masterUpdateResults(gameId, params) {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        _this8.db.ref(_this8.r(gameId)).update(params).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'masterResetSelections',
    value: function masterResetSelections(gameId, topics, selections) {
      var _this9 = this;

      return new Promise(function (resolve, reject) {
        var _this9$db$ref$update;

        _this9.db.ref(_this9.r(gameId)).update((_this9$db$ref$update = {
          actions: {},
          selections: {},
          killedIds: [],
          killVotes: {},
          roundOver: false
        }, _defineProperty(_this9$db$ref$update, 'selections', selections), _defineProperty(_this9$db$ref$update, 'aliveCounts', { imposter: 0, agent: 0 }), _defineProperty(_this9$db$ref$update, 'aliveIds', []), _defineProperty(_this9$db$ref$update, 'deadCounts', { imposter: 0, agent: 0 }), _defineProperty(_this9$db$ref$update, 'deadIds', []), _defineProperty(_this9$db$ref$update, 'topics', topics), _this9$db$ref$update)).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'masterUpdateRoundData',
    value: function masterUpdateRoundData(gameId, gameData) {
      var _this10 = this;

      return new Promise(function (resolve, reject) {
        _this10.db.ref(_this10.r(gameId)).update(gameData).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'masterUpdateStatus',
    value: function masterUpdateStatus(gameId, status) {
      var _this11 = this;

      return new Promise(function (resolve, reject) {
        _this11.db.ref(_this11.r(gameId)).update({ status: status }).then(resolve).catch(reject);
      });
    }

    // Private

    // Recursively finding a unique id

  }, {
    key: '_generateUniqueId',
    value: function _generateUniqueId() {
      var _this12 = this;

      return new Promise(function (resolve, reject) {
        var slug = new _Slugs2.default().loadSlug();
        _this12.db.ref(_this12.r('games/' + slug)).once('value').then(function (snap) {
          if (snap.val() === null) resolve(slug);else resolve(_this12._generateUniqueId());
        }).catch(reject);
      });
    }
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
/* 14 */
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
      return '' + this.getNoun() + this.getNumbers();
    }
  }, {
    key: 'getNumbers',
    value: function getNumbers() {
      return [this._number(), this._number(), this._number()].join('');
    }
  }, {
    key: '_number',
    value: function _number() {
      return Math.round(Math.random() * 9);
    }
  }, {
    key: 'getNoun',
    value: function getNoun() {
      return this.nouns[Math.floor(Math.random() * this.nouns.length)];
    }
  }, {
    key: 'nouns',
    get: function get() {
      return ['able', 'account', 'achieve', 'achiever', 'acoustics', 'act', 'action', 'activity', 'actor', 'addition', 'adjustment', 'advertisement', 'advice', 'aftermath', 'afternoon', 'afterthought', 'agreement', 'air', 'airplane', 'airport', 'alarm', 'alley', 'amount', 'amusement', 'anger', 'angle', 'animal', 'answer', 'ant', 'ants', 'apparatus', 'apparel', 'apple', 'apple', 'apples', 'appliance', 'approval', 'arch', 'argument', 'arithmetic', 'arm', 'army', 'art', 'attack', 'attempt', 'attention', 'attraction', 'aunt', 'authority', 'babies', 'baby', 'back', 'badge', 'bag', 'bait', 'balance', 'ball', 'balloon', 'balls', 'banana', 'band', 'base', 'baseball', 'basin', 'basket', 'basketball', 'bat', 'bath', 'battle', 'bead', 'beam', 'bean', 'bear', 'bears', 'beast', 'bed', 'bedroom', 'beds', 'bee', 'beef', 'beetle', 'beggar', 'beginner', 'behavior', 'belief', 'believe', 'bell', 'bells', 'berry', 'bike', 'bikes', 'bird', 'birds', 'birth', 'birthday', 'bit', 'bite', 'blade', 'blood', 'blow', 'board', 'boat', 'boats', 'body', 'bomb', 'bone', 'book', 'book', 'books', 'boot', 'border', 'bottle', 'boundary', 'box', 'boy', 'boy', 'boys', 'brain', 'brake', 'branch', 'brass', 'bread', 'breakfast', 'breath', 'brick', 'bridge', 'brother', 'brothers', 'brush', 'bubble', 'bucket', 'building', 'bulb', 'bun', 'burn', 'burst', 'bushes', 'business', 'butter', 'button', 'cabbage', 'cable', 'cactus', 'cake', 'cakes', 'calculator', 'calendar', 'camera', 'camp', 'can', 'cannon', 'canvas', 'cap', 'caption', 'car', 'card', 'care', 'carpenter', 'carriage', 'cars', 'cart', 'cast', 'cat', 'cats', 'cattle', 'cause', 'cave', 'celery', 'cellar', 'cemetery', 'cent', 'chain', 'chair', 'chairs', 'chalk', 'chance', 'change', 'channel', 'cheese', 'cherries', 'cherry', 'chess', 'chicken', 'chickens', 'children', 'chin', 'church', 'circle', 'clam', 'class', 'clock', 'clocks', 'cloth', 'cloud', 'clouds', 'clover', 'club', 'coach', 'coal', 'coast', 'coat', 'cobweb', 'coil', 'collar', 'color', 'comb', 'comfort', 'committee', 'company', 'comparison', 'competition', 'condition', 'connection', 'control', 'cook', 'copper', 'copy', 'cord', 'cork', 'corn', 'cough', 'country', 'cover', 'cow', 'cows', 'crack', 'cracker', 'crate', 'crayon', 'cream', 'creator', 'creature', 'credit', 'crib', 'crime', 'crook', 'crow', 'crowd', 'crown', 'crush', 'cry', 'cub', 'cup', 'current', 'curtain', 'curve', 'cushion', 'dad', 'daughter', 'day', 'death', 'debt', 'decision', 'deer', 'degree', 'design', 'desire', 'desk', 'destruction', 'detail', 'development', 'digestion', 'dime', 'dinner', 'dinosaurs', 'direction', 'dirt', 'discovery', 'discussion', 'disease', 'disgust', 'distance', 'distribution', 'division', 'dock', 'doctor', 'dog', 'dogs', 'doll', 'dolls', 'donkey', 'door', 'downtown', 'drain', 'drawer', 'dress', 'drink', 'driving', 'drop', 'drug', 'drum', 'duck', 'ducks', 'dust', 'dust', 'ear', 'earth', 'earthquake', 'edge', 'education', 'effect', 'egg', 'eggnog', 'eggs', 'elbow', 'end', 'engine', 'error', 'event', 'example', 'exchange', 'existence', 'expansion', 'experience', 'expert', 'eye', 'eyes', 'face', 'fact', 'fairies', 'fall', 'family', 'fan', 'fang', 'farm', 'farmer', 'father', 'father', 'faucet', 'fear', 'feast', 'feather', 'feeling', 'feet', 'fiction', 'field', 'fifth', 'fight', 'finger', 'finger', 'fire', 'fireman', 'fish', 'flag', 'flame', 'flavor', 'flesh', 'flight', 'flock', 'floor', 'flower', 'flowers', 'fly', 'fog', 'fold', 'food', 'foot', 'force', 'fork', 'form', 'fowl', 'frame', 'friction', 'friend', 'friends', 'frog', 'frogs', 'front', 'fruit', 'fuel', 'furniture', 'galley', 'game', 'garden', 'gate', 'geese', 'ghost', 'giants', 'giraffe', 'girl', 'girls', 'glass', 'glove', 'glue', 'goat', 'gold', 'goldfish', 'goodbye', 'goose', 'goose', 'government', 'governor', 'grade', 'grain', 'grandfather', 'grandmother', 'grape', 'grass', 'grip', 'ground', 'group', 'growth', 'guide', 'guitar', 'gun', 'hair', 'haircut', 'hall', 'hammer', 'hand', 'hands', 'harbor', 'harmony', 'hat', 'hate', 'head', 'health', 'hearing', 'heart', 'heat', 'help', 'hen', 'hill', 'history', 'hobbies', 'hole', 'holiday', 'home', 'honey', 'hook', 'hope', 'horn', 'horse', 'horses', 'hose', 'hospital', 'hot', 'hour', 'house', 'houses', 'humor', 'hydrant', 'ice', 'icicle', 'idea', 'impulse', 'income', 'increase', 'industry', 'ink', 'insect', 'instrument', 'insurance', 'interest', 'invention', 'iron', 'island', 'jail', 'jake', 'jam', 'jar', 'jeans', 'jelly', 'jellyfish', 'jewel', 'join', 'joke', 'journey', 'judge', 'juice', 'jump', 'kettle', 'key', 'kick', 'kiss', 'kite', 'kite', 'kitten', 'kitten', 'kittens', 'kitty', 'knee', 'knife', 'knot', 'knowledge', 'laborer', 'lace', 'ladybug', 'lake', 'lamp', 'land', 'language', 'laugh', 'lawyer', 'lead', 'leaf', 'learning', 'leather', 'leg', 'legs', 'letter', 'letters', 'lettuce', 'level', 'library', 'lift', 'light', 'limit', 'line', 'linen', 'lip', 'liquid', 'list', 'lizards', 'loaf', 'lock', 'locket', 'look', 'loss', 'love', 'low', 'lumber', 'lunch', 'lunchroom', 'machine', 'magic', 'maid', 'mailbox', 'man', 'manager', 'map', 'marble', 'mark', 'market', 'mask', 'mass', 'match', 'meal', 'meal', 'measure', 'meat', 'meeting', 'memory', 'men', 'metal', 'mice', 'middle', 'milk', 'mind', 'mine', 'minister', 'mint', 'minute', 'mist', 'mitten', 'mom', 'money', 'monkey', 'month', 'moon', 'morning', 'mother', 'mother', 'motion', 'mountain', 'mouth', 'move', 'muscle', 'music', 'nail', 'name', 'nation', 'neck', 'need', 'needle', 'nerve', 'nest', 'net', 'news', 'night', 'noise', 'north', 'nose', 'note', 'notebook', 'number', 'nut', 'oatmeal', 'observation', 'ocean', 'offer', 'office', 'oil', 'operation', 'opinion', 'orange', 'oranges', 'order', 'organization', 'ornament', 'oven', 'owl', 'owner', 'page', 'pail', 'pail', 'pain', 'paint', 'pan', 'pancake', 'paper', 'parcel', 'parent', 'park', 'part', 'partner', 'party', 'passenger', 'paste', 'patch', 'payment', 'peace', 'pear', 'pear', 'pen', 'pencil', 'person', 'pest', 'pet', 'pets', 'pickle', 'picture', 'pie', 'pies', 'pig', 'pigs', 'pin', 'pipe', 'pizzas', 'place', 'plane', 'planes', 'plant', 'plantation', 'plants', 'plastic', 'plate', 'play', 'playground', 'pleasure', 'plot', 'plough', 'pocket', 'point', 'poison', 'police', 'polish', 'pollution', 'popcorn', 'porter', 'position', 'pot', 'potato', 'powder', 'power', 'price', 'print', 'prison', 'process', 'produce', 'profit', 'property', 'prose', 'protest', 'pull', 'pump', 'punishment', 'purpose', 'push', 'quarter', 'quartz', 'queen', 'question', 'quicksand', 'quiet', 'quill', 'quilt', 'quince', 'quiver', 'rabbit', 'rabbits', 'rail', 'railway', 'rain', 'rainstorm', 'rake', 'range', 'rat', 'rate', 'ray', 'reaction', 'reading', 'reason', 'receipt', 'recess', 'record', 'regret', 'relation', 'religion', 'representative', 'request', 'respect', 'rest', 'reward', 'rhythm', 'rice', 'riddle', 'rifle', 'ring', 'rings', 'river', 'road', 'robin', 'rock', 'rod', 'roll', 'roof', 'room', 'root', 'rose', 'route', 'rub', 'rule', 'run', 'sack', 'sail', 'salt', 'sand', 'scale', 'scale', 'scarecrow', 'scarf', 'scene', 'scent', 'school', 'science', 'scissors', 'screw', 'sea', 'seashore', 'seat', 'secretary', 'seed', 'selection', 'self', 'sense', 'servant', 'shade', 'shake', 'shame', 'shape', 'sheep', 'sheet', 'shelf', 'ship', 'shirt', 'shock', 'shoe', 'shoes', 'shop', 'show', 'side', 'sidewalk', 'sign', 'silk', 'silver', 'sink', 'sister', 'sisters', 'size', 'skate', 'skin', 'skirt', 'sky', 'slave', 'sleep', 'sleet', 'slip', 'slope', 'smash', 'smell', 'smile', 'smoke', 'snail', 'snails', 'snake', 'snakes', 'sneeze', 'snow', 'soap', 'society', 'sock', 'soda', 'sofa', 'son', 'song', 'songs', 'sort', 'sound', 'soup', 'space', 'spade', 'spark', 'spiders', 'sponge', 'spoon', 'spot', 'spring', 'spy', 'square', 'squirrel', 'stage', 'stamp', 'star', 'start', 'statement', 'station', 'steam', 'steel', 'stem', 'step', 'stew', 'stick', 'sticks', 'stitch', 'stocking', 'stomach', 'stone', 'stop', 'store', 'story', 'stove', 'stranger', 'straw', 'stream', 'street', 'stretch', 'string', 'structure', 'substance', 'sugar', 'suggestion', 'suit', 'summer', 'summer', 'sun', 'support', 'surprise', 'sweater', 'swim', 'swing', 'system', 'table', 'tail', 'talk', 'tank', 'taste', 'tax', 'teaching', 'team', 'teeth', 'temper', 'tendency', 'tent', 'territory', 'test', 'texture', 'theory', 'thing', 'things', 'thought', 'thread', 'thrill', 'throat', 'throne', 'throne', 'thumb', 'thunder', 'ticket', 'tiger', 'time', 'tin', 'title', 'toad', 'toe', 'toes', 'tomatoes', 'tongue', 'tooth', 'toothbrush', 'toothpaste', 'top', 'touch', 'town', 'toy', 'toys', 'trade', 'trail', 'train', 'trains', 'tramp', 'transport', 'tray', 'treatment', 'tree', 'trees', 'trick', 'trip', 'trouble', 'trousers', 'truck', 'trucks', 'tub', 'turkey', 'selection', 'twig', 'twist', 'umbrella', 'uncle', 'underwear', 'unit', 'use', 'vacation', 'value', 'van', 'vase', 'vegetable', 'veil', 'vein', 'verse', 'vessel', 'vest', 'view', 'visitor', 'voice', 'volcano', 'volleyball', 'voyage', 'walk', 'wall', 'war', 'wash', 'waste', 'watch', 'water', 'water', 'wave', 'waves', 'wax', 'way', 'wealth', 'weather', 'week', 'weight', 'wheel', 'whip', 'whistle', 'wilderness', 'wind', 'window', 'wine', 'wing', 'winter', 'winter', 'wire', 'wish', 'woman', 'women', 'wood', 'wool', 'word', 'work', 'worm', 'wound', 'wren', 'wrench', 'wrist', 'writer', 'writing', 'yak', 'yam', 'yard', 'yarn', 'year', 'yoke', 'zebra', 'zephyr', 'zinc', 'zipper', 'zoo'];
    }
  }]);

  return Slugs;
}();

exports.default = Slugs;

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
            avatar = user.avatar,
            alive = user.alive,
            params = {
          id: id,
          gameId: gameId,
          name: name,
          avatar: avatar,
          master: master,
          score: 0,
          scoreRound: 0
        };

        _this3.db.ref(_this3.r([gameId, id])).set(params).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'globalLeave',
    value: function globalLeave(gameId, playerId) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.db.ref(_this4.r([gameId, playerId])).set(null).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'globalFind',
    value: function globalFind(gameId, userId) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5.db.ref(_this5.r([gameId, userId])).once('value').then(function (snap) {
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
    key: 'globalListenerRemoved',
    value: function globalListenerRemoved(gameId, handler) {
      var _this6 = this;

      this.db.ref(this.r(gameId)).on('child_removed', function (snap) {
        var player = snap.val();
        _this6.db.ref(_this6.r([gameId, player.id])).off();
        handler(player);
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
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        _this7.db.ref(_this7.r(gameId)).set(null).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'masterActOnPlayers',
    value: function masterActOnPlayers(gameId, players, killedIds, confusionIds) {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        var playerCount = Object.keys(players).length;
        for (var playerId in players) {
          var params = { confused: confusionIds.includes(playerId) };
          if (killedIds.includes(playerId)) params.alive = false;
          _this8.db.ref(_this8.r([gameId, playerId])).update(params).then(function () {
            playerCount--;
            if (playerCount <= 0) resolve();
          }).catch(reject);
        }
      });
    }
  }, {
    key: 'masterResetStart',
    value: function masterResetStart(players) {
      var _this9 = this;

      return new Promise(function (resolve, reject) {
        var playerCount = Object.keys(players).length;
        for (var playerId in players) {
          var params = { score: 0 };
          _this9.db.ref(_this9.r([players[playerId].gameId, playerId])).update(params).then(function () {
            playerCount--;
            if (playerCount <= 0) resolve();
          }).catch(reject);
        }
      });
    }
  }, {
    key: 'masterTallyScores',
    value: function masterTallyScores(players, points) {
      var _this10 = this;

      return new Promise(function (resolve, reject) {
        var playerCount = Object.keys(players).length;
        for (var playerId in players) {
          var pointsVal = points[playerId],
              player = players[playerId];
          if (pointsVal) {
            var scoreRound = player.scoreRound + pointsVal,
                score = player.score + pointsVal;
            _this10.db.ref(_this10.r([player.gameId, playerId])).update({ score: score, scoreRound: scoreRound }).then(function () {
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
      var _this11 = this;

      var playerIdsImposters = _ref3.playerIdsImposters,
          playerIdsAgents = _ref3.playerIdsAgents;

      return new Promise(function (resolve, reject) {
        var playerCount = Object.keys(players).length;
        for (var playerId in players) {
          var player = players[playerId];
          var role = void 0,
              confused = false,
              alive = true,
              scoreRound = 0;
          if (playerIdsImposters.includes(playerId)) role = 'imposter';else if (playerIdsAgents.includes(playerId)) role = 'agent';else role = 'agent';
          _this11.db.ref(_this11.r([player.gameId, playerId])).update({ role: role, alive: alive, confused: confused, scoreRound: scoreRound }).then(function () {
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
/* 16 */
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
        _this3.db.ref(_this3.r(params.id)).set(params).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'globalDelete',
    value: function globalDelete(id) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.db.ref(_this4.r(id)).set(null).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'globalFind',
    value: function globalFind(userId) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5.db.ref(_this5.r(userId)).once('value').then(function (snap) {
          var value = snap.val();
          if (value !== null) resolve(value);else reject();
        }).catch(reject);
      });
    }
  }, {
    key: 'globalUpdate',
    value: function globalUpdate(userId, params) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        _this6.db.ref(_this6.r(userId)).update(params).then(resolve).catch(reject);
      });
    }

    // Private

  }, {
    key: '_userDataFromParams',
    value: function _userDataFromParams(params) {
      var id = params.uid,
          image = params.photoURL,
          avatar = image,
          name = this._safeName(params.displayName);
      return { id: id, avatar: avatar, image: image, name: name };
    }
  }, {
    key: '_safeName',
    value: function _safeName(name) {
      if (name) return name.replace(/ .+$/, '').substring(0, 12);
      return this._names[Math.floor(Math.random() * this._names.length)];
    }
  }, {
    key: '_key',
    get: function get() {
      return 'users';
    }
  }, {
    key: '_names',
    get: function get() {
      return ['Angsty', 'Babe', 'Baby', 'BFF', 'Birdie', 'Booger', 'Captain', 'Cuddles', 'Darling', 'Doll', 'Fighter', 'Goober', 'Heisenberg', 'Honey', 'Hot Lips', 'Hunk', 'Jello', 'King', 'Lover', 'Mama', 'Muffin', 'Muppet', 'Papi', 'Peanut', 'Pookie', 'Pop Tart', 'Punk', 'Queen', 'Sailor', 'Shorty', 'Simba', 'Soldier', 'Sport', 'Sugar', 'Superstar', 'Tiger', 'Tinkerbell'];
    }
  }]);

  return Users;
}(_Adapter3.default);

exports.default = Users;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var firebaseKeys = __webpack_require__(18);

var Auth = function () {
  function Auth() {
    _classCallCheck(this, Auth);

    firebase.initializeApp(firebaseKeys);
  }

  _createClass(Auth, [{
    key: 'signOut',
    value: function signOut() {
      return new Promise(function (resolve, reject) {
        firebase.auth().signOut().then(resolve).catch(reject);
      });
    }
  }, {
    key: 'detectExisting',
    value: function detectExisting() {
      return new Promise(function (resolve, reject) {
        firebase.auth().onAuthStateChanged(function (existingUser) {
          if (existingUser) resolve(existingUser);else reject();
        });
      });
    }
  }, {
    key: 'loadUI',
    value: function loadUI() {
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('.firebaseui-auth', {
        signInSuccessUrl: '/',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.TwitterAuthProvider.PROVIDER_ID, firebase.auth.PhoneAuthProvider.PROVIDER_ID],
        tosUrl: '/toc'
      });
    }
  }]);

  return Auth;
}();

exports.default = Auth;

/***/ }),
/* 18 */
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
/* 19 */
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

var _Topics = __webpack_require__(10);

var _Topics2 = _interopRequireDefault(_Topics);

var _Player = __webpack_require__(28);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = __webpack_require__(5);

var //
STUB = config.env === 'development',
    STUB_COUNT = 2,
    STUB_PREFIX = 'TEST_USER_';

var State = function () {
  function State(_ref) {
    var user = _ref.user,
        auth = _ref.auth;

    _classCallCheck(this, State);

    this.auth = auth;
    this.user = user;
    this.initializeLaunch();
    this.initialize();
  }

  _createClass(State, [{
    key: 'initializeLaunch',
    value: function initializeLaunch() {
      this.launch = new _Renderers2.default.Launch(null, {
        createGame: this.createGame.bind(this),
        findGame: this.findGame.bind(this),
        signOut: this.signOut.bind(this),
        updateUser: this.updateUser.bind(this)
      });
      this.launch.renderInitial();
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      if (this.user.currentGameId) {
        _Adapters2.default.Games.globalFind(this.user.currentGameId, true).then(this.initializeGame.bind(this)).catch(function () {
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
      _Adapters2.default.Games.globalFind(slug, false).then(this.initializeGame.bind(this)).catch(this.handleError.bind(this));
    }
  }, {
    key: 'signOut',
    value: function signOut() {
      var _this3 = this;

      _Adapters2.default.Users.globalDelete(this.user.id).then(function () {
        _this3.auth.signOut().then(function () {
          window.location.reload(true);
        });
      });
    }
  }, {
    key: 'updateUser',
    value: function updateUser(params) {
      var _this4 = this;

      _Adapters2.default.Users.globalUpdate(this.user.id, params).then(function () {
        _Adapters2.default.Users.globalFind(_this4.user.id).then(function (user) {
          _this4.user = user;
          _this4.launch.render({ user: user });
        });
      });
    }

    // Handlers

  }, {
    key: 'handleGameChanges',
    value: function handleGameChanges() {
      if (this.game.changes.status) this.handleStatusChange();
      if (this.game.changes.actions) this.handleActionsChange();
      if (this.game.changes.selections) this.handleSelectionsChange();
      if (this.master) {
        if (this.game.isActions && this.game.changes.killedIds) this.handleKilledIdsChange();
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
      var _this5 = this;

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

        _Adapters2.default.Games.masterUpdateResults(_this5.game.id, params);
      });
    }
  }, {
    key: 'handleActionsChange',
    value: function handleActionsChange() {
      var _this6 = this;

      if (this.game.isActions) {
        if (this.master) {
          if (this.game.detectAllActionsSubmitted() && !this.actionLock) {
            this.actionLock = true;

            var _game$generateActionI = this.game.generateActionIds(),
                confusionVotes = _game$generateActionI.confusionVotes,
                confusionIds = _game$generateActionI.confusionIds,
                killVotes = _game$generateActionI.killVotes,
                killedIds = _game$generateActionI.killedIds;

            _Adapters2.default.Players.masterActOnPlayers(this.game.id, this.players, killedIds, confusionIds).then(function () {
              var playerCountAlive = _this6.game.playerCountAlive - killedIds.length;
              _Adapters2.default.Games.masterUpdateActionIds(_this6.game.id, confusionVotes, confusionIds, killVotes, killedIds, playerCountAlive).then(function () {
                _this6.actionLock = false;
              });
            });
          }
        }

        // Update everyone with who hasnt voted
        this.renderers.actions.renderWaiting({
          players: this.players,
          actions: this.game.actions
        });
      }
    }
  }, {
    key: 'handleSelectionsChange',
    value: function handleSelectionsChange() {
      if (this.game.isSelections) {
        if (this.master) if (this.game.detectAllSelectionsSubmitted()) this.dispatchReveal();

        // Update everyone with who hasnt selected
        this.renderers.selections.renderWaiting({
          players: this.players,
          selections: this.game.selections
        });
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
      var _this7 = this;

      var game = _ref2.game;
      var newGame = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (STUB && newGame) this._devCreateStubbedPlayers(game.id);
      this.playerId = this.user.id;
      this.gameId = game.id;
      this.master = game.masterId === this.playerId;
      this.players = {};
      _Adapters2.default.Players.globalListenerAdded(this.gameId, function (player) {
        _this7.initializePlayer(player);
      });
      _Adapters2.default.Players.globalListenerRemoved(this.gameId, function (player) {
        _this7.removePlayer(player);
      });
      _Adapters2.default.Users.globalUpdate(this.playerId, { currentGameId: this.gameId });
      _Adapters2.default.Players.globalFindOrCreate(this.user, this.gameId, this.master).then(function (player) {
        _this7.game = new _Game2.default({ state: _this7 });
        _Adapters2.default.Games.globalListener(_this7.gameId, function (game) {
          if (game) {
            _this7.game.update(game);
            _this7.handleGameChanges();
          } else {
            _this7.rendered = false;
            _Adapters2.default.Users.globalUpdate(_this7.playerId, { currentGameId: null });
            _this7.launch.render({ user: _this7.user });
          }
        });
      });
    }
  }, {
    key: 'initializePlayer',
    value: function initializePlayer(player) {
      var _this8 = this;

      this.players[player.id] = new _Player2.default(this, player);
      _Adapters2.default.Players.globalListenerPlayer(this.gameId, player.id, function (player) {
        if (player && _this8.players[player.id]) _this8.players[player.id].update(player);
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
    key: 'removePlayer',
    value: function removePlayer(player) {
      delete this.players[player.id];
    }
  }, {
    key: 'initializeRenderers',
    value: function initializeRenderers() {
      var _this9 = this;

      if (this.renderers) {
        for (var key in this.renderers) {
          this.renderers[key].remove();
        }
      }
      this.renderers = {
        start: new _Renderers2.default.Start(this.player, {
          dispatchStart: function dispatchStart() {
            return _this9.dispatchStart();
          },
          dispatchEnd: function dispatchEnd() {
            return _this9.dispatchEnd();
          }
        }),
        selections: new _Renderers2.default.Selections(this.player, {
          dispatchSelection: function dispatchSelection(p, a) {
            return _this9.dispatchSelection(p, a);
          },
          dispatchEnd: function dispatchEnd() {
            return _this9.dispatchEnd();
          }
        }),
        reveal: new _Renderers2.default.Reveal(this.player, {
          dispatchActions: function dispatchActions() {
            return _this9.dispatchActions();
          },
          back: function back() {
            return _Adapters2.default.Games.masterUpdateStatus(_this9.game.id, 'selections');
          }
        }),
        actions: new _Renderers2.default.Actions(this.player, {
          dispatchAction: function dispatchAction(p, a) {
            return _this9.dispatchAction(p, a);
          },
          back: function back() {
            return _Adapters2.default.Games.masterUpdateStatus(_this9.game.id, 'reveal');
          }
        }),
        results: new _Renderers2.default.Results(this.player, {
          dispatchEnd: function dispatchEnd() {
            return _this9.dispatchEnd();
          },
          dispatchLeave: function dispatchLeave() {
            return _this9.dispatchLeave();
          },
          dispatchSelections: function dispatchSelections() {
            return _this9.dispatchSelections();
          },
          dispatchNewRound: function dispatchNewRound() {
            return _this9.dispatchNewRound();
          }
        })
      };
      this.renderers.start.renderInitial();
      this.renderers.selections.renderInitial();
      this.renderers.reveal.renderInitial();
      this.renderers.actions.renderInitial();
      this.renderers.results.renderInitial();
      this.rendered = true;
    }

    // Dispatchers

  }, {
    key: 'dispatchStart',
    value: function dispatchStart() {
      var _this10 = this;

      _Adapters2.default.Players.masterResetStart(this.players).then(function () {
        _this10.dispatchNewRound();
      });
    }
  }, {
    key: 'dispatchSelections',
    value: function dispatchSelections() {
      var _this11 = this;

      var topics = this.game.generateTopics(),
          selections = this.game.selections + 1;
      _Adapters2.default.Games.masterResetSelections(this.game.id, topics, selections).then(function () {
        _Adapters2.default.Games.masterUpdateStatus(_this11.game.id, 'selections');
      });
    }
  }, {
    key: 'dispatchReveal',
    value: function dispatchReveal() {
      _Adapters2.default.Games.masterUpdateStatus(this.game.id, 'reveal');
    }
  }, {
    key: 'dispatchActions',
    value: function dispatchActions() {
      _Adapters2.default.Games.masterUpdateStatus(this.game.id, 'actions');
    }
  }, {
    key: 'dispatchNewRound',
    value: function dispatchNewRound() {
      var _this12 = this;

      var roundData = this.game.generateRoundData();
      _Adapters2.default.Games.masterUpdateRoundData(this.game.id, roundData.game).then(function () {
        _Adapters2.default.Players.masterUpdateRoundData(_this12.players, roundData.players).then(function () {
          _Adapters2.default.Games.masterUpdateStatus(_this12.game.id, 'selections');
        });
      });
    }
  }, {
    key: 'dispatchEnd',
    value: function dispatchEnd() {
      var _this13 = this;

      _Adapters2.default.Players.masterDelete(this.game.id).then(function () {
        _Adapters2.default.Games.masterDelete(_this13.game.id);
      });
    }
  }, {
    key: 'dispatchLeave',
    value: function dispatchLeave() {
      var _this14 = this;

      if (this.game.playerCount <= 3) {
        this.dispatchEnd();
      } else {
        _Adapters2.default.Games.globalKill(this.game.id);
        _Adapters2.default.Users.globalUpdate(this.playerId, { currentGameId: null }).then(function () {
          _Adapters2.default.Players.globalLeave(_this14.game.id, _this14.user.id).then(function () {
            _this14.launch.render({ user: _this14.user });
          });
        });
      }
    }
  }, {
    key: 'dispatchSelection',
    value: function dispatchSelection(selection) {
      _Adapters2.default.Games.globalSelection(this.game.id, this.user.id, selection);
      if (STUB) this.devDispatchSelection();
    }
  }, {
    key: 'devDispatchSelection',
    value: function devDispatchSelection() {
      if (this.player.isMaster) {
        var topics = new _Topics2.default().topics;
        for (var i = 0; i < STUB_COUNT; i++) {
          var id = '' + STUB_PREFIX + (i + 1);
          if (this.players[id].isAlive) {
            var topic = topics[Math.floor(Math.random() * topics.length)][1];
            _Adapters2.default.Games.globalSelection(this.game.id, id, topic);
          }
        }
      }
    }
  }, {
    key: 'dispatchAction',
    value: function dispatchAction(playerId) {
      _Adapters2.default.Games.globalAction(this.game.id, this.user.id, playerId);
      if (STUB) this.devDispatchAction(playerId);
    }
  }, {
    key: 'devDispatchAction',
    value: function devDispatchAction(playerId) {
      if (this.player.isMaster) for (var i = 0; i < STUB_COUNT; i++) {
        var id = '' + STUB_PREFIX + (i + 1),
            victimId = this.players[id].isAlive ? playerId : this.player.id;
        _Adapters2.default.Games.globalAction(this.game.id, id, victimId);
      }
    }

    // Rendering

  }, {
    key: 'render',
    value: function render() {
      var _this15 = this;

      var status = this.game.status;
      var map = {
        selections: function selections() {
          return _this15.renderers.selections.render(_this15.game, _this15.players);
        },
        reveal: function reveal() {
          return _this15.renderers.reveal.render(_this15.game, _this15.players);
        },
        actions: function actions() {
          return _this15.renderers.actions.render(_this15.game, _this15.players);
        },
        results: function results() {
          return _this15.renderers.results.render(_this15.game, _this15.players);
        }
      };
      return map[status] ? map[status]() : null;
    }
  }, {
    key: '_devCreateStubbedPlayers',


    // Private

    value: function _devCreateStubbedPlayers(gameId) {
      var avatars = _Renderers2.default.Launch._avatars;
      for (var i = 0; i < STUB_COUNT; i++) {
        var name = avatars[Math.floor(Math.random() * avatars.length)],
            avatar = _Renderers2.default.Launch._avatarUrl(name);
        _Adapters2.default.Players.globalCreate(gameId, {
          id: '' + STUB_PREFIX + (i + 1),
          name: 'Player' + (i + 1),
          avatar: avatar
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
/* 21 */
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
      var $h1 = this.el('h1', 'Lexicon Standoff'),
          $desc = this.el('p', 'Please Sign In', 'description');
      this.$auth = this.el('div', null, 'firebaseui-auth');
      this.append(this.$main, [$h1, this.$auth]);
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
      return [];
    }
  }]);

  return Auth;
}(_Renderer3.default);

exports.default = Auth;

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
          $or = this.el('p', 'OR', 'instruction'),
          $instructions = this.el('p', '<br><a href="/instructions/">Instructions</a>', 'instruction'),
          $signOut = this.el('div', null, 'instructions'),
          signOut = new _Button2.default({
        content: 'Sign Out',
        classname: 'small link',
        clickEvent: this.events.signOut.bind(this)
      }),
          $grp = this.el('div', null, 'item-group');
      this.$slug = this.el('input');
      this.$editor = this.el('div', null, 'editor');
      this.new = new _Button2.default({
        content: 'Create Game',
        clickEvent: this.events.createGame.bind(this)
      });
      this.join = new _Button2.default({
        content: 'Join',
        clickEvent: function clickEvent() {
          return _this2.events.findGame(_this2.$slug.value.replace(/ /g, '').toLowerCase());
        }
      });

      this.$user = this.el('p', null, 'user-info');
      this.$slug.setAttribute('type', 'text');
      this.$slug.setAttribute('placeholder', 'gamesecret');
      this.append($signOut, [signOut.$el]);
      this.append($grp, [this.$slug, this.join.$el]);
      this.append(this.$main, [this.$user, $grp, $or, this.new.$el, $instructions, $signOut, this.$editor]);
      this.$footer.appendChild($inst);
    }
  }, {
    key: 'render',
    value: function render(_ref) {
      var _this3 = this;

      var user = _ref.user;

      this.$slug.value = '';
      this.renderEditor(user);
      this.toggleSections();
      this.$avatar = this.el('img');
      this.$avatar.src = user.avatar;
      this.$name = this.el('span', user.name);
      var edit = new _Button2.default({
        content: '',
        clickEvent: function clickEvent() {
          return _this3.$editor.classList.add('active');
        }
      });
      edit.$el.appendChild(this.$avatar);
      edit.$el.appendChild(this.$name);

      this.$user.innerHTML = '';
      this.$user.appendChild(edit.$el);
    }
  }, {
    key: 'renderEditor',
    value: function renderEditor(user) {
      this.$editor.innerHTML = '';
      this._renderImageSelector(user);
      this._renderNameInput(user);
    }
  }, {
    key: '_renderNameInput',
    value: function _renderNameInput(user) {
      var _this4 = this;

      var $grp = this.el('div', null, 'item-group'),
          $input = this.el('input'),
          save = new _Button2.default({
        content: 'Save',
        clickEvent: function clickEvent() {
          return _this4.handleName($input.value);
        }
      });
      $input.setAttribute('type', 'text');
      $input.setAttribute('placeholder', 'Your Name');
      $input.setAttribute('maxlength', 8);
      $input.value = user.name;
      this.append($grp, [$input, save.$el]);
      this.$editor.appendChild($grp);
    }
  }, {
    key: '_renderImageSelector',
    value: function _renderImageSelector(user) {
      var _this5 = this;

      var $images = this.el('ul', null, 'image-select'),
          existing = user.avatar;
      Launch._avatars.forEach(function (name) {
        var $li = _this5.el('li'),
            url = Launch._avatarUrl(name),
            $button = new _Button2.default({
          content: '<img src="' + url + '" />',
          clickEvent: function clickEvent() {
            return _this5.handleAvatar($li, url);
          }
        });
        if (existing === url) $li.className = 'active';
        $li.appendChild($button.$el);
        $images.appendChild($li);
      });
      var def = 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg';
      if (user.image && user.image !== def) {
        var $li = this.el('li'),
            $button = new _Button2.default({
          content: '<img src="' + user.image + '" />',
          clickEvent: function clickEvent() {
            return _this5.handleAvatar($li, user.image);
          }
        });
        if (existing === user.image) $li.className = 'active';
        $li.appendChild($button.$el);
        $images.appendChild($li);
      }
      this.$editor.appendChild($images);
    }
  }, {
    key: 'handleAvatar',
    value: function handleAvatar($li, avatar) {
      var $existing = this.$editor.querySelector('li.active');
      if ($existing) $existing.classList.remove('active');
      $li.classList.add('active');
      this.$editor.classList.remove('active');
      this.events.updateUser({ avatar: avatar });
    }
  }, {
    key: 'handleName',
    value: function handleName(name) {
      name = name.substring(0, 8);
      this.$editor.classList.remove('active');
      this.events.updateUser({ name: name });
    }
  }, {
    key: '_name',
    get: function get() {
      return 'launch';
    }
  }, {
    key: '_eventsList',
    get: function get() {
      return ['createGame', 'findGame', 'signOut', 'updateUser'];
    }
  }], [{
    key: '_avatarUrl',
    value: function _avatarUrl(name) {
      return Launch._avatarBase + '/' + name;
    }
  }, {
    key: '_avatarBase',
    get: function get() {
      return '/assets';
    }
  }, {
    key: '_avatars',
    get: function get() {
      return ['avatar-bear.svg', 'avatar-donkey.svg', 'avatar-raccoon.svg', 'avatar-squirrel.svg', 'avatar-elephant.svg', 'avatar-mouse.svg', 'avatar-panda.svg', 'avatar-deer.svg', 'avatar-pig.svg', 'avatar-cat.svg', 'avatar-dog.svg', 'avatar-wolf.svg', 'avatar-monkey.svg', 'avatar-fox.svg', 'avatar-zebra.svg', 'avatar-rabbit.svg'];
    }
  }]);

  return Launch;
}(_Renderer3.default);

exports.default = Launch;

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

      this.players = new _List2.default('flex-list flex-list-small flex-list-quarter');
      this.append(this.$main, this.players.elements);

      this.$roles = this.el('p', null, 'description');
      this.$main.appendChild(this.$roles);

      if (this.player.isMaster) {
        var $inst = this.el('p', 'Once everyone is here, start the game. Players can join this Game using the Game Secret above.', 'instruction');
        var $group = this.el('div', null, 'item-group');
        var cancel = new _Button2.default({
          content: 'Cancel',
          clickEvent: this.events.dispatchEnd.bind(this),
          classname: 'flex'
        });
        this.start = new _Button2.default({
          content: 'Start',
          clickEvent: this.events.dispatchStart.bind(this),
          classname: 'flex'
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
      var playerCount = Object.keys(players).length,
          roles = this._distributor(playerCount),
          remain = 3 - playerCount,
          waiting = remain > 0,
          playerS = remain > 1 ? 'Players' : 'Player';
      this.players.title(waiting ? 'Need at least ' + remain + ' more ' + playerS : '');
      if (waiting) {
        this.$roles.innerHTML = '';
      } else {
        var imposterS = roles[1] === 1 ? 'Imposter' : 'Imposters';
        this.$roles.innerHTML = 'There will be ' + roles[0] + ' Agents and ' + roles[1] + ' ' + imposterS + '.';
      }

      if (this.player.isMaster && this.start) {
        if (waiting) this.start.disable();else this.start.enable();
      }
      this.$secret.innerHTML = '\u201C' + gameId + '\u201D';
      this.toggleSections();
      for (var playerId in players) {
        var _players$playerId = players[playerId],
            avatar = _players$playerId.avatar,
            name = _players$playerId.name;

        var you = playerId === this.player.id ? 'you' : '';
        var html = '<span class="user ' + you + '"><img src="' + avatar + '" /> <span>' + name + '</span></span>';
        this.players.add(html);
      }
    }
  }, {
    key: '_distributor',
    value: function _distributor(number) {
      // Going for 3 to 1, minimum 1
      var agents = Math.max(Math.floor(number * 0.75), 1),
          imposters = number - agents;
      return [agents, imposters];
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

var _shuffle = __webpack_require__(8);

var _shuffle2 = _interopRequireDefault(_shuffle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Selections = function (_Renderer) {
  _inherits(Selections, _Renderer);

  function Selections() {
    _classCallCheck(this, Selections);

    return _possibleConstructorReturn(this, (Selections.__proto__ || Object.getPrototypeOf(Selections)).apply(this, arguments));
  }

  _createClass(Selections, [{
    key: 'renderInitial',
    value: function renderInitial() {
      this.$h1 = this.el('h1');
      this.$topics = this.el('p', null, 'topics');
      this.$desc = this.el('p', null, 'description');
      this.$input = this.el('input', null, 'full margin');
      this.$input.setAttribute('type', 'text');
      this.$input.setAttribute('placeholder', 'Your Word');
      this.$input.setAttribute('maxlength', '16');

      this.$header.appendChild(this.$h1);
      this.append(this.$main, [this.$topics, this.$desc, this.$input]);

      this.waiting = new _List2.default('flex-list flex-list-small flex-list-quarter');
      this.append(this.$main, this.waiting.elements);

      var $inst = this.el('p', 'Enter your choice above then submit it below.', 'instruction'),
          $grp = this.el('div', null, 'item-group');
      this.submit = new _Button2.default({
        content: 'Submit',
        clickEvent: this.handleSubmit.bind(this),
        classname: 'flex'
      });
      if (this.player.isMaster) {
        var cancel = new _Button2.default({
          content: '◀',
          clickEvent: this.handleConfirmEnd.bind(this),
          classname: 'warning'
        });
        $grp.appendChild(cancel.$el);
      }
      this.append($grp, [this.submit.$el]);
      this.append(this.$footer, [$inst, $grp]);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit() {
      var selection = this.$input.value;
      if (selection.replace(/ /g, '').length > 0) {
        this.events.dispatchSelection(selection);
        this.$input.classList.add('hide');
        this.submit.disable();
      } else {
        alert('"' + selection + '" is not valid. Try again.');
      }
    }
  }, {
    key: 'render',
    value: function render(game, players) {
      this.topics = game.topics.map(function (t) {
        return t[1];
      });
      this.$input.value = '';
      var topics = game.topics,
          selections = game.selections,
          confusionVotes = game.confusionVotes,
          playerCount = game.playerCount,
          playerCountAlive = game.playerCountAlive;

      topics = topics.map(function (i) {
        return [i[0], i[1].split(' ').join('&nbsp;')];
      });
      this.$h1.innerHTML = this.roleHeader('Selections');

      if (this.player.isAlive) {
        if (selections[this.player.id]) {
          this.$input.classList.add('hide');
          this.submit.disable();
        } else {
          this.$input.classList.remove('hide');
          this.submit.enable();
        }
        var descHtml = '',
            topicsHtml = void 0;
        if (this.player.isConfused) {
          var confusionVoteCount = confusionVotes[this.player.id],
              confusionPlayers = confusionVoteCount === 1 ? 'Player' : 'Players';
          descHtml += '\n          ' + confusionVoteCount + ' dead ' + confusionPlayers + ' confused you with an extra Topic! ';
        }
        if (this.player.isImposter) {
          if (this.player.isConfused) topicsHtml = this._shuffledHtml([0, 1, 2, 3], topics);else topicsHtml = this._shuffledHtml([0, 1, 2], topics);
        } else {
          if (this.player.isConfused) topicsHtml = this._shuffledHtml([0, 1, 3], topics);else topicsHtml = this._shuffledHtml([0, 1], topics);
        }
        if (this.player.isConfused || this.player.isImposter) {
          descHtml += 'Enter one word that you associate with the <strong>two</strong> Agent Topics.';
        } else {
          descHtml = 'Enter one word that you associate with both of the Topics above.';
        }
        this.$topics.innerHTML = topicsHtml;
        this.$desc.innerHTML = descHtml;
      } else {
        this.$input.classList.add('hide');
        this.submit.disable();
        this.$topics.innerHTML = this._shuffledHtml([0, 1], topics);
        this.$desc.innerHTML = "You're dead. You don't get a selection.";
      }
      this.toggleSections();
      this.renderWaiting({ players: players, selections: selections });
    }
  }, {
    key: 'renderWaiting',
    value: function renderWaiting(_ref) {
      var players = _ref.players,
          selections = _ref.selections;

      this.waiting.reset();
      this.waiting.title('Waiting on...');
      for (var playerId in players) {
        if (!selections || !selections[playerId]) if (players[playerId].isAlive) this.waiting.add(this.userSpan(players[playerId]));
      }
    }
  }, {
    key: 'handleConfirmEnd',
    value: function handleConfirmEnd() {
      if (window.confirm('Are you sure you want to end the game?')) this.events.dispatchEnd();
    }
  }, {
    key: '_shuffledHtml',
    value: function _shuffledHtml(arr, topics) {
      if (arr.length === 2) {
        return '\u201C' + topics[arr[0]][1] + '\u201D &amp; \u201C' + topics[arr[1]][1] + '\u201D';
      } else {
        var shuffled = (0, _shuffle2.default)(arr).map(function (idx) {
          return topics[idx][1];
        });
        var html = '';
        shuffled.forEach(function (topic, i) {
          if (i < shuffled.length - 1) html += '\u201C' + topic + '\u201D, ';else html += ' \u201C' + topic + '\u201D';
        });
        return html;
      }
    }
  }, {
    key: '_name',
    get: function get() {
      return 'selections';
    }
  }, {
    key: '_eventsList',
    get: function get() {
      return ['dispatchSelection', 'dispatchEnd'];
    }
  }]);

  return Selections;
}(_Renderer3.default);

exports.default = Selections;

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

      this.selections = new _List2.default('flex-list flex-list-small flex-list-selections');
      this.selections.title('Selections');
      this.append(this.$main, this.selections.elements);

      if (this.player.isMaster) {
        var $inst = this.el('p', 'Players question each other and discuss who they think is an Imposter.\n          Once everyone is ready to vote, proceed.', 'instruction');
        var $grp = this.el('div', null, 'item-group'),
            back = new _Button2.default({
          content: '◀',
          clickEvent: this.events.back.bind(this)
        }),
            proceed = new _Button2.default({
          content: 'Proceed',
          clickEvent: this.events.dispatchActions.bind(this),
          classname: 'flex'
        });
        this.append($grp, [back.$el, proceed.$el]);
        this.append(this.$footer, [$inst, $grp]);
      }
    }
  }, {
    key: 'render',
    value: function render(game, players) {
      var topics = game.topics,
          playerCount = game.playerCount,
          selections = game.selections;


      this.selections.reset();
      for (var playerId in selections) {
        this.selections.add('\n        ' + this.userSpan(players[playerId]) + '\n        <span class="selection">' + selections[playerId] + '</span>\n      ');
      }this.$h1.innerHTML = this.roleHeader('Reveal');
      this.$topics.innerHTML = '\u201C' + topics[0][1] + '\u201D &amp; \u201C' + topics[1][1] + '\u201D';
      if (this.player.isAlive) {
        this.$desc.innerHTML = 'These were the two Topics. Explain why you chose your word.';
      } else {
        this.$desc.innerHTML = 'You are dead. You can still question Players.';
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
      return ['dispatchActions', 'back'];
    }
  }]);

  return Reveal;
}(_Renderer3.default);

exports.default = Reveal;

/***/ }),
/* 26 */
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

var Actions = function (_Renderer) {
  _inherits(Actions, _Renderer);

  function Actions() {
    _classCallCheck(this, Actions);

    return _possibleConstructorReturn(this, (Actions.__proto__ || Object.getPrototypeOf(Actions)).apply(this, arguments));
  }

  _createClass(Actions, [{
    key: 'renderInitial',
    value: function renderInitial() {
      var _this2 = this;

      this.$h1 = this.el('h1');
      this.$header.appendChild(this.$h1);

      this.$desc = this.el('p', null, 'description');
      this.$main.appendChild(this.$desc);

      this.actions = new _List2.default();
      this.append(this.$main, this.actions.elements);

      this.waiting = new _List2.default('flex-list flex-list-small flex-list-quarter');
      this.append(this.$main, this.waiting.elements);

      this.act = new _Button2.default({
        content: '',
        clickEvent: function clickEvent() {
          var playerId = _this2.$section.querySelector(':checked').value;
          _this2.events.dispatchAction(playerId);
          _this2.act.disable();
          _this2.$main.classList.add('inactive');
        }
      });
      if (this.player.isMaster) {
        var $inst = this.el('p', 'Play will proceed after every Player submits an Action.', 'instruction');
        var $grp = this.el('div', null, 'item-group'),
            back = new _Button2.default({
          content: '◀',
          clickEvent: this.events.back.bind(this)
        });
        this.append($grp, [back.$el, this.act.$el]);
        this.act.$el.classList.add('flex');
        this.append(this.$footer, [$inst, $grp]);
      } else {
        this.act.$el.classList.add('full');
        this.append(this.$footer, [this.act.$el]);
      }
    }
  }, {
    key: 'render',
    value: function render(game, players) {
      var actions = game.actions,
          imposterCount = game.imposterCount,
          playerCount = game.playerCount,
          playerCountAlive = game.playerCountAlive;

      this.$main.classList.remove('inactive');
      this.act.enable();
      this.actions.reset();
      this.toggleSections();

      this.$h1.innerHTML = this.roleHeader('Actions');

      // If this player has already voted (refreshed the vote page after voting)
      if (actions && actions[this.player.id]) {
        this.actions.title('You have already voted!');
        this.act.disable();
        this.$footer.classList.add('hide');
      } else {
        this.$footer.classList.remove('hide');
        this.actions.title('Select a Player');
        var agentCount = Object.keys(players).length - imposterCount,
            imposterS = this._pluralize(imposterCount, 'Imposter'),
            agentS = this._pluralize(agentCount, 'Agent'),
            alive = this.player.isAlive,
            last = playerCountAlive === 2,
            term = alive || last ? 'Kill' : 'Confuse',
            extra = alive || last ? '' : 'You’re Dead.';
        this.act.content(term);
        this.$desc.innerHTML = ' ' + (last ? 'This is the final vote!' : '') + '\n        ' + extra + ' Select a Player to <strong>' + term + '</strong>.';
        if (this.player.isAlive) this.$desc.innerHTML += ' There are ' + agentS + ' and ' + imposterS + ' in total.';
        var first = true;
        for (var playerId in players) {
          if (playerId !== this.player.id) {
            var player = players[playerId];
            if (player.isAlive) {
              var selected = first ? 'checked' : '';
              if (first) first = false;
              this.actions.add('\n              <input id="' + playerId + '" value="' + playerId + '"\n                type="radio" name="actions" ' + selected + ' />\n              <label for="' + playerId + '">' + this.userSpan(player) + '</label>\n            ');
            }
          }
        }
      }

      this.renderWaiting({ players: players, actions: actions });
    }
  }, {
    key: 'renderWaiting',
    value: function renderWaiting(_ref) {
      var players = _ref.players,
          actions = _ref.actions;

      this.waiting.reset();
      this.waiting.title('Waiting on...');
      for (var playerId in players) {
        if (!actions || !actions[playerId]) this.waiting.add(this.userSpan(players[playerId]));
      }
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
      return 'actions';
    }
  }, {
    key: '_eventsList',
    get: function get() {
      return ['dispatchAction', 'back'];
    }
  }]);

  return Actions;
}(_Renderer3.default);

exports.default = Actions;

/***/ }),
/* 27 */
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

      this.killed = new _List2.default();
      this.append(this.$main, this.killed.elements);

      this.survivors = new _List2.default('flex-list flex-list-small flex-list-quarter');
      this.append(this.$main, this.survivors.elements);

      this.imposters = new _List2.default('flex-list flex-list-small flex-list-quarter');
      this.append(this.$main, this.imposters.elements);

      this.$desc = this.el('div');
      this.$main.appendChild(this.$desc);

      this.extra2 = new _List2.default('flex-list flex-list-small');
      this.append(this.$main, this.extra2.elements);

      this.$score = this.el('p', null, 'description');
      this.$main.appendChild(this.$score);

      if (this.player.isMaster) this.renderInitialMaster();else this.renderInitialLeave();
    }
  }, {
    key: 'renderInitialMaster',
    value: function renderInitialMaster() {
      var $inst = this.el('p', 'Once everyone is ready, proceed below.', 'instruction'),
          round = new _Button2.default({
        content: 'Continue',
        clickEvent: this.events.dispatchNewRound.bind(this),
        classname: 'flex'
      }),
          end = new _Button2.default({
        content: '◀',
        clickEvent: this.confirmEnd.bind(this),
        classname: 'warning'
      });
      this.continue = new _Button2.default({
        content: 'Proceed',
        clickEvent: this.events.dispatchSelections.bind(this),
        classname: 'full'
      });
      this.$group = this.el('div', null, 'item-group');
      this.append(this.$group, [end.$el, round.$el]);
      this.append(this.$footer, [$inst, this.$group, this.continue.$el]);
    }
  }, {
    key: 'renderInitialLeave',
    value: function renderInitialLeave() {
      var _this2 = this;

      var self = this;
      this.leave = new _Button2.default({
        content: 'Leave Game',
        clickEvent: function clickEvent() {
          return _this2.confirmLeave();
        },
        classname: 'full'
      });
      this.append(this.$footer, [this.leave.$el]);
    }
  }, {
    key: 'confirmEnd',
    value: function confirmEnd() {
      if (window.confirm('Are you sure you want to end the game?')) this.events.dispatchEnd();
    }
  }, {
    key: 'confirmLeave',
    value: function confirmLeave() {
      if (window.confirm('Are you sure you want to leave the game?')) this.events.dispatchLeave();
    }
  }, {
    key: 'render',
    value: function render(game, players) {
      var _this3 = this;

      var aliveCounts = game.aliveCounts,
          aliveIds = game.aliveIds,
          deadCounts = game.deadCounts,
          deadIds = game.deadIds,
          roundOver = game.roundOver,
          killVotes = game.killVotes,
          killedIds = game.killedIds;

      this.killed.reset();
      this.survivors.reset();
      this.imposters.reset();
      this.extra2.reset();
      this.$score.innerHTML = '';
      this.$section.className = this.$section.className.replace(/(win-\d+)|(lose-\d+)/g, '');

      this.toggleSections();

      this.$h1.innerHTML = this.roleHeader('Results');

      var killedVotes = killVotes[killedIds[0]],
          voteS = killedVotes === 1 ? 'Vote' : 'Votes';
      this.killed.title('Killed this Round by ' + killedVotes + ' ' + voteS);
      killedIds.forEach(function (key) {
        _this3.killed.add(_this3.userSpan(players[key], 'dead'));
      });

      this.survivors.title('Survivors');
      if (roundOver) {
        if (this.leave) this.leave.enable();
        this.imposters.title('Imposters');
        this.extra2.title('Standings');
        var winClass = this._winLoseClass(aliveCounts),
            winnerText = this._winnerText(aliveCounts),
            roundText = this._roundPointsText(aliveCounts);
        this.$section.classList.add(winClass);
        this.$desc.innerHTML = '\n        <p class="description">\n          ' + winnerText + ' ' + this._playerPoints(true) + ' ' + roundText + '\n        </p>\n      ';
        var survivors = false,
            playerIds = Object.keys(players);
        playerIds.sort(function (a, b) {
          var aScore = players[a].score,
              bScore = players[b].score;
          if (aScore > bScore) return -1;
          if (aScore < bScore) return 1;
          return 0;
        }).forEach(function (playerId) {
          var player = players[playerId],
              score = '<span class="score">' + player.score + '</span>',
              html = _this3.userSpan(player) + ' ' + score;
          _this3.extra2.add(html);
          if (player.isImposter) _this3.imposters.add(_this3.userSpan(player));
          if (player.isAlive) {
            _this3.survivors.add(_this3.userSpan(player));
            survivors = true;
          }
        });
        if (!survivors) this.survivors.$ul.innerHTML = '<li class="empty">None</li>';
      } else {
        if (this.leave) this.leave.disable();
        this.extra2.title('Graveyard');
        this.extra2.$ul.classList.remove('flex-list-half');
        this.$desc.innerHTML = '\n        <p class="description">' + this._playerPoints(false) + '\n          The Round is in progress, roles stay the same.</p>\n      ';
        for (var playerId in players) {
          var player = players[playerId],
              alive = player.isAlive;
          if (alive) {
            this.survivors.add(this.userSpan(player));
          } else {
            this.extra2.add(this.userSpan(player, 'dead'));
          }
        }
      }

      if (this.player.isMaster) this.renderMaster(roundOver);
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
    key: '_winLoseClass',
    value: function _winLoseClass(_ref) {
      var imposter = _ref.imposter,
          agent = _ref.agent;

      var win = Math.ceil(Math.random() * 6),
          lose = Math.ceil(Math.random() * 10),
          role = this.player.role;
      if (imposter > 0) {
        return role === 'imposter' ? 'win-' + win : 'lose-' + lose;
      } else if (agent > 0) {
        return role === 'agent' ? 'win-' + win : 'lose-' + lose;
      }
      return 'lose-' + lose;
    }
  }, {
    key: '_winnerText',
    value: function _winnerText(_ref2) {
      var imposter = _ref2.imposter,
          agent = _ref2.agent;

      var role = this.player.capitalizedRole;
      if (imposter > 0) {
        var prefix = this.player.isImposter ? this._success() : this._failure(),
            wonLost = this.player.isImposter ? 'won' : 'lost';
        return prefix + ' The <span class="role">' + role + 's</span> ' + wonLost + '.';
      } else if (agent > 0) {
        var _prefix = this.player.isAgent ? this._success() : this._failure(),
            _wonLost = this.player.isAgent ? 'won' : 'lost';
        return _prefix + ' The <span class="role">' + role + 's</span> ' + _wonLost + '.';
      }
      return 'Everyone died!';
    }
  }, {
    key: '_roundPointsText',
    value: function _roundPointsText(_ref3) {
      var imposter = _ref3.imposter,
          agent = _ref3.agent;

      var addl = this._points(_Game2.default.winPoints);
      if (imposter > 0) return 'Each Imposter scored an additional ' + addl + '.';
      if (agent > 0) return 'Each Agent scored an additional ' + addl + '.';
      return 'No one scored additional points.';
    }
  }, {
    key: '_playerPoints',
    value: function _playerPoints(roundOver) {
      var _player$_ = this.player._,
          scoreRound = _player$_.scoreRound,
          role = _player$_.role,
          alive = _player$_.alive,
          scoreSelection = alive ? _Game2.default.survivePoints[role] : 0,
          points = this._points(scoreSelection),
          extra = roundOver ? 'in total' : 'so far';

      if (alive) return 'You scored ' + points + ' this Selection,\n        and ' + this._points(scoreRound) + ' ' + extra + ' this Round.';else return 'You are dead and scored ' + this._points(scoreRound) + ' ' + extra + ' this Round.';
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
      return ['dispatchEnd', 'dispatchSelections', 'dispatchNewRound', 'dispatchLeave'];
    }
  }]);

  return Results;
}(_Renderer3.default);

exports.default = Results;

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
        avatar = _ref.avatar,
        master = _ref.master;

    _classCallCheck(this, Player);

    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.gameId = gameId;
    this.state = state;
    this._ = {};
  }

  _createClass(Player, [{
    key: 'update',
    value: function update(values) {
      this._ = values;
    }
  }, {
    key: 'score',
    get: function get() {
      return this._.score;
    }
  }, {
    key: 'scoreRound',
    get: function get() {
      return this._.scoreRound;
    }
  }, {
    key: 'role',
    get: function get() {
      return this._.role;
    }
  }, {
    key: 'isAgent',
    get: function get() {
      return this.role === 'agent';
    }
  }, {
    key: 'isImposter',
    get: function get() {
      return !this.isAgent;
    }
  }, {
    key: 'isAlive',
    get: function get() {
      return this._.alive;
    }
  }, {
    key: 'isDead',
    get: function get() {
      return !this.isAlive;
    }
  }, {
    key: 'isMaster',
    get: function get() {
      return this._.master;
    }
  }, {
    key: 'isConfused',
    get: function get() {
      return this._.confused;
    }
  }, {
    key: 'capitalizedRole',
    get: function get() {
      return this._.role.charAt(0).toUpperCase() + this._.role.slice(1);
    }
  }, {
    key: 'key',
    get: function get() {
      return this.gameId + '/' + this.id;
    }
  }, {
    key: '_ref',
    get: function get() {
      return '/players/' + this.key;
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ })
/******/ ]);