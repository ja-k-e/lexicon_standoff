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
    var form = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Renderer);

    this.player = player;
    this.events = events;
    this.$container = document.querySelector('.container > div');
    this.$section = this.el('section');
    this.$header = this.el('header');
    this.$main = this.el('main');
    this.$footer = this.el('footer');
    this.$container.appendChild(this.$section);
    if (form) {
      this.$form = this.el('form');
      this.$form.addEventListener('submit', function (e) {
        return e.preventDefault();
      });
      this.$form.appendChild(this.$header);
      this.$form.appendChild(this.$main);
      this.$form.appendChild(this.$footer);
      this.$section.appendChild(this.$form);
    } else {
      this.$section.appendChild(this.$header);
      this.$section.appendChild(this.$main);
      this.$section.appendChild(this.$footer);
    }
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
    key: 'handleConfirmEnd',
    value: function handleConfirmEnd() {
      if (window.confirm('Are you sure you want to end the game?')) this.events.dispatchEnd();
    }
  }, {
    key: 'timeSinceSelection',
    value: function timeSinceSelection(selection, start) {
      var ms = selection - start;
      return Math.round(ms / 1000 * 100) / 100;
    }
  }, {
    key: 'renderTime',
    value: function renderTime(seconds) {
      seconds = Math.round(seconds * 100) / 100;
      return seconds.toFixed(2) + 's';
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.$section.remove();
    }
  }, {
    key: 'userSpan',
    value: function userSpan(player, extraClassname) {
      if (!player) return '';
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
        classname = _ref$classname === undefined ? '' : _ref$classname,
        _ref$submit = _ref.submit,
        submit = _ref$submit === undefined ? false : _ref$submit;

    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this));

    _this.$el = _this.el('button', content, classname);
    if (submit) _this.$el.setAttribute('type', 'submit');else _this.$el.setAttribute('type', 'button');
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
    value: function add(liContent, classname) {
      var $li = this.el('li', liContent);
      if (classname) $li.className = classname;
      this.$ul.appendChild($li);
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

var config = __webpack_require__(4);

var Adapter = function () {
  function Adapter() {
    _classCallCheck(this, Adapter);

    this.root = config.env;
  }

  _createClass(Adapter, [{
    key: 'initialize',
    value: function initialize(_ref) {
      var db = _ref.db;

      this.db = db;
    }
  }]);

  return Adapter;
}();

exports.default = Adapter;

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

var _Lobby = __webpack_require__(23);

var _Lobby2 = _interopRequireDefault(_Lobby);

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
  Lobby: _Lobby2.default,
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

var _Adapters = __webpack_require__(5);

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
      return Object.keys(this.selections).length === this.playerCount;
    }
  }, {
    key: 'calculatePoints',
    value: function calculatePoints(players) {
      var points = {};

      // Alive Imposters score two, alive Agents score one
      for (var playerId in players) {
        if (players[playerId].isAlive) points[playerId] = Game.survivePoints[players[playerId].role];
      }return points;
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
          playerCount: playerCount,
          inProgress: true,
          actions: {},
          selections: {},
          killVotesByPlayer: {},
          killVotes: {},
          killedIds: []
        }, _defineProperty(_game, 'selections', 1), _defineProperty(_game, 'imposterCount', imposterCount), _defineProperty(_game, 'topics', topics), _game),
        players: { playerIdsImposters: playerIdsImposters, playerIdsAgents: playerIdsAgents }
      };
    }
  }, {
    key: 'generateTopics',
    value: function generateTopics() {
      var _this2 = this;

      return [1, 2, 3].map(function (_) {
        return _this2.topicGenerator.loadTopic();
      });
    }
  }, {
    key: 'generateActionIds',
    value: function generateActionIds() {
      var sums = {};
      for (var voterId in this.actions) {
        var voteIds = this.actions[voterId];
        voteIds.forEach(function (voteId) {
          sums[voteId] = sums[voteId] || 0;
          sums[voteId]++;
        });
      }

      var sorted = Object.keys(sums).sort(function (a, b) {
        if (sums[a] > sums[b]) return -1;
        if (sums[a] < sums[b]) return 1;
        return 0;
      }).map(function (a) {
        return [a, sums[a]];
      });

      var imposterCount = this.imposterCount,
          killedIds = [],
          killVotes = {},
          killVotesByPlayer = {};

      pluck();

      function pluck() {
        var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var curr = sorted[i],
            next = sorted[i + 1];
        killedIds.push(curr[0]);
        killVotes[curr[1]] = killVotes[curr[1]] || [];
        killVotes[curr[1]].push(curr[0]);
        killVotesByPlayer[curr[0]] = curr[1];
        var same = next ? curr[1] === next[1] : false,
            remaining = i < sorted.length - 1,
            enough = killedIds.length < imposterCount;
        if (remaining && (enough || same)) pluck(i + 1);
      }

      return { killVotes: killVotes, killedIds: killedIds, killVotesByPlayer: killVotesByPlayer };
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
    key: 'actions',
    get: function get() {
      return this._.actions;
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
    key: 'killVotesByPlayer',
    get: function get() {
      return this._.killVotesByPlayer;
    }
  }, {
    key: 'playerCount',
    get: function get() {
      return this._.playerCount;
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
    key: 'selectionStart',
    get: function get() {
      return this._.selectionStart;
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
      return this.topics[this.findIndex()][1];
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


var _Adapters = __webpack_require__(5);

var _Adapters2 = _interopRequireDefault(_Adapters);

var _Auth = __webpack_require__(17);

var _Auth2 = _interopRequireDefault(_Auth);

var _State = __webpack_require__(19);

var _State2 = _interopRequireDefault(_State);

var _Renderers = __webpack_require__(6);

var _Renderers2 = _interopRequireDefault(_Renderers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = __webpack_require__(4);

var //
AUTH = new _Auth2.default(),
    VERSION = 0.6;

console.info('\n%cLexicon Standoff v' + VERSION + '\n%c\xA9 Jake Albaugh ' + new Date().getFullYear() + '\nhttps://twitter.com/jake_albaugh\nhttps://github.com/jakealbaugh/lexicon_standoff\n', 'font-family: sans-serif; font-weight: bold;', 'font-family: sans-serif; font-weight: normal;');

var $CONTAINER = document.querySelector('.container'),
    VISIBLE = void 0,
    HEIGHT = void 0,
    WIDTH = void 0;

updateDimensions();
window.addEventListener('resize', function () {
  return updateDimensions();
});
// document.addEventListener('visibilitychange', () => {
//   let state = document.visibilityState;
//   if (state !== VISIBLE) {
//     if (state === 'visible') window.location.reload();
//     VISIBLE = state;
//   }
// });
function updateDimensions() {
  var h = window.innerHeight,
      w = window.innerWidth;
  if (h > 500) {
    $CONTAINER.style.height = h + 'px';
    $CONTAINER.style.width = w + 'px';
    HEIGHT = h;
    WIDTH = w;
  }
}

// Binding the database to each adapter
for (var name in _Adapters2.default) {
  _Adapters2.default[name].initialize(AUTH);
}AUTH.detectExisting().then(initializeUser).catch(function () {
  AUTH.detectRedirectResult().then(initializeUser).catch(handleNoUser);
});

function authGoogle() {
  AUTH.authenticate('GoogleAuthProvider');
}

function authTwitter() {
  AUTH.authenticate('TwitterAuthProvider');
}

function authAnon() {
  AUTH.authenticateAnon();
}

function initializeUser(existingUser) {
  _Adapters2.default.App.findVersion(VERSION).then(function (version) {
    if (version === VERSION) initializeState(existingUser);else if (version < VERSION || !version) _Adapters2.default.App.updateVersion(VERSION).then(function () {
      initializeState(existingUser);
    }).catch(handleError);else handleNewVersion();
  }).catch(handleError);
}

function handleNoUser() {
  var renderer = new _Renderers2.default.Auth(null, {
    authTwitter: authTwitter,
    authGoogle: authGoogle,
    authAnon: authAnon
  });
  renderer.renderInitial();
  renderer.render();
  // AUTH.loadUI();
}

function handleNewVersion() {
  var renderer = new _Renderers2.default.NewVersion(null, {});
  renderer.renderInitial();
  renderer.render();
}

function initializeState(existingUser) {
  _Adapters2.default.Users.globalFindOrCreate(existingUser).then(function (_ref) {
    var user = _ref.user;

    var avatar = validAvatar(user);
    _Adapters2.default.Users.globalUpdate(user.id, { avatar: avatar }).then(function () {
      _Adapters2.default.Users.globalFind(user.id).then(function (user) {
        return new _State2.default({ user: user, auth: AUTH, anon: existingUser.isAnonymous });
      }).catch(handleError);
    }).catch(handleError);
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

var App = function (_Adapter) {
  _inherits(App, _Adapter);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'findVersion',
    value: function findVersion(version) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.db.collection('app').doc(_this2.root).get().then(function (doc) {
          if (doc.exists) resolve(doc.data().version);else resolve(_this2.updateVersion(version));
        }).catch(reject);
      });
    }
  }, {
    key: 'updateVersion',
    value: function updateVersion(version) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.db.collection('app').doc(_this3.root).set({ version: version }).then(resolve).catch(reject);
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

    value: function globalFind(id) {
      var _this2 = this;

      var playerExists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return new Promise(function (resolve, reject) {
        _this2.db.collection('app').doc(_this2.root).collection('games').doc(id).get().then(function (doc) {
          if (doc.exists) {
            var game = doc.data();
            if (game.inProgress === true && !playerExists) reject('Game ' + id + ' is already in progress');else resolve({ game: game });
          } else reject('No Game Found with name ' + id);
        });
      });
    }
  }, {
    key: 'globalAction',
    value: function globalAction(id, playerId, playerIds) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.db.collection('app').doc(_this3.root).collection('games').doc(id).update(_defineProperty({}, 'actions.' + playerId, playerIds)).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'globalSelection',
    value: function globalSelection(id, playerId, selection, time) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.db.collection('app').doc(_this4.root).collection('games').doc(id).update(_defineProperty({}, 'selections.' + playerId, { selection: selection, time: time })).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'globalListener',
    value: function globalListener(id, handler) {
      this.unsubscribeGameListener = this.db.collection('app').doc(this.root).collection('games').doc(id).onSnapshot(function (doc) {
        handler(doc.exists ? doc.data() : null);
      });
    }
  }, {
    key: 'globalKill',
    value: function globalKill() {
      this.unsubscribeGameListener();
    }

    // Master Actions

  }, {
    key: 'masterCreate',
    value: function masterCreate(userId) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5._generateUniqueId().then(function (id) {
          _this5.db.collection('app').doc(_this5.root).collection('games').doc(id).set({ id: id, status: 'start', inProgress: false, masterId: userId }).then(function () {
            return resolve(_this5.globalFind(id));
          }).catch(reject);
        }).catch(reject);
      });
    }
  }, {
    key: 'masterDelete',
    value: function masterDelete(id) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        _this6.db.collection('app').doc(_this6.root).collection('games').doc(id).delete().then(resolve).catch(reject);
      });
    }
  }, {
    key: 'masterUpdate',
    value: function masterUpdate(id, params) {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        _this7.db.collection('app').doc(_this7.root).collection('games').doc(id).update(params).then(resolve).catch(reject);
      });
    }

    // Private

    // Recursively finding a unique id

  }, {
    key: '_generateUniqueId',
    value: function _generateUniqueId() {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        var slug = new _Slugs2.default().loadSlug();
        _this8.db.collection('app').doc(_this8.root).collection('games').doc(slug).get().then(function (doc) {
          if (doc.exists) resolve(_this8._generateUniqueId());else resolve(slug);
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
        _this2.globalFind(user.id).then(function (_ref) {
          var player = _ref.player;

          resolve({ player: player });
        }).catch(function () {
          _this2.globalCreate(gameId, user, master).then(function () {
            _this2.globalFind(user.id).then(function (_ref2) {
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
            avatar = user.avatar;

        _this3.db.collection('app').doc(_this3.root).collection('players').doc(id).set({ id: id, gameId: gameId, name: name, avatar: avatar, master: master, role: 'joined', score: 0 }).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'globalDelete',
    value: function globalDelete(id) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.db.collection('app').doc(_this4.root).collection('players').doc(id).delete().then(resolve).catch(reject);
      });
    }
  }, {
    key: 'globalFind',
    value: function globalFind(id) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5.db.collection('app').doc(_this5.root).collection('players').doc(id).get().then(function (doc) {
          if (doc.exists) resolve({ player: doc.data() });else reject();
        }).catch(reject);
      });
    }
  }, {
    key: 'globalListenerPlayerEvents',
    value: function globalListenerPlayerEvents(gameId, handleAdded, handleRemoved) {
      this.db.collection('app').doc(this.root).collection('players').where('gameId', '==', gameId).onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges.forEach(function (change) {
          if (change.type === 'added') handleAdded(change.doc.data());
          if (change.type === 'removed') handleRemoved(change.doc.data());
        });
      });
    }
  }, {
    key: 'globalListenerPlayer',
    value: function globalListenerPlayer(id, handler) {
      this.db.collection('app').doc(this.root).collection('players').doc(id).onSnapshot(function (doc) {
        handler(doc.exists ? doc.data() : null);
      });
    }

    // Master Actions

  }, {
    key: 'masterDeleteAll',
    value: function masterDeleteAll(gameId) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        _this6.db.collection('app').doc(_this6.root).collection('players').where('gameId', '==', gameId).get().then(function (querySnapshot) {
          var batch = _this6.db.batch();
          querySnapshot.forEach(function (doc) {
            batch.delete(doc.ref);
          });
          batch.commit().then(resolve).catch(reject);
        }).catch(reject);
      });
    }
  }, {
    key: 'masterActOnPlayers',
    value: function masterActOnPlayers(gameId, players, killedIds) {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        var batch = _this7.db.batch();
        for (var playerId in players) {
          var ref = _this7.db.collection('app').doc(_this7.root).collection('players').doc(playerId);
          batch.update(ref, { alive: !killedIds.includes(playerId) });
        }
        batch.commit().then(resolve).catch(reject);
      });
    }
  }, {
    key: 'masterResetStart',
    value: function masterResetStart(players) {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        var batch = _this8.db.batch();
        for (var playerId in players) {
          var ref = _this8.db.collection('app').doc(_this8.root).collection('players').doc(playerId);
          batch.update(ref, { score: 0 });
        }
        batch.commit().then(resolve).catch(reject);
      });
    }
  }, {
    key: 'masterTallyScores',
    value: function masterTallyScores(players, points) {
      var _this9 = this;

      return new Promise(function (resolve, reject) {
        var batch = _this9.db.batch();
        for (var playerId in players) {
          var pointsVal = points[playerId],
              score = players[playerId].score + pointsVal;
          if (pointsVal) {
            var ref = _this9.db.collection('app').doc(_this9.root).collection('players').doc(playerId);
            batch.update(ref, { score: score });
          }
        }
        batch.commit().then(resolve).catch(reject);
      });
    }
  }, {
    key: 'masterUpdateRoundData',
    value: function masterUpdateRoundData(players, _ref3) {
      var _this10 = this;

      var playerIdsImposters = _ref3.playerIdsImposters,
          playerIdsAgents = _ref3.playerIdsAgents;

      return new Promise(function (resolve, reject) {
        var batch = _this10.db.batch();
        for (var playerId in players) {
          var role = void 0;
          if (playerIdsImposters.includes(playerId)) role = 'imposter';else if (playerIdsAgents.includes(playerId)) role = 'agent';else role = 'agent';
          var ref = _this10.db.collection('app').doc(_this10.root).collection('players').doc(playerId);
          batch.update(ref, { alive: true, role: role });
        }
        batch.commit().then(resolve).catch(reject);
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
        _this3.db.collection('app').doc(_this3.root).collection('users').doc(params.id).set(params).then(resolve).catch(reject);
      });
    }
  }, {
    key: 'globalDelete',
    value: function globalDelete(id) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.db.collection('app').doc(_this4.root).collection('users').doc(id).delete().then(resolve).catch(reject);
      });
    }
  }, {
    key: 'globalFind',
    value: function globalFind(id) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5.db.collection('app').doc(_this5.root).collection('users').doc(id).get().then(function (doc) {
          if (doc.exists) resolve(doc.data());else reject();
        }).catch(reject);
      });
    }
  }, {
    key: 'globalUpdate',
    value: function globalUpdate(id, params) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        _this6.db.collection('app').doc(_this6.root).collection('users').doc(id).update(params).then(resolve).catch(reject);
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
      if (image && image.match(/pbs\.twimg\.com/)) image = image.replace(/normal\.jpg$/, '400x400.jpg');
      return { id: id, avatar: avatar, image: image, name: name };
    }
  }, {
    key: '_safeName',
    value: function _safeName(name) {
      if (name) return name.replace(/ .+$/, '').substring(0, 12);
      return this._names[Math.floor(Math.random() * this._names.length)];
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
var config = __webpack_require__(4);
var redirect = config.env === 'development' ? 'http://localhost:8000' : 'https://lexiconstandoff.com';

var Auth = function () {
  function Auth() {
    _classCallCheck(this, Auth);

    this.db = firebase.firestore(firebase.initializeApp(firebaseKeys));
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
  }, {
    key: 'authenticateAnon',
    value: function authenticateAnon() {
      firebase.auth().signInAnonymously().then(function () {
        return window.location.reload();
      }).catch(function (error) {
        console.error(error);
      });
    }
  }, {
    key: 'loadUI',
    value: function loadUI() {
      // let ui = new firebaseui.auth.AuthUI(firebase.auth());
      // ui.start('.firebaseui-auth', {
      //   signInSuccessUrl: redirect,
      //   signInOptions: [
      //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //     firebase.auth.PhoneAuthProvider.PROVIDER_ID
      //   ],
      //   tosUrl: '/toc'
      // });
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
  storageBucket: 'lexicon-standoff.appspot.com',
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

var _Adapters = __webpack_require__(5);

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

var config = __webpack_require__(4);

var //
STUB = config.env === 'development',
    STUB_COUNT = 4,
    STUB_PREFIX = 'TEST_USER_';

var State = function () {
  function State(_ref) {
    var user = _ref.user,
        auth = _ref.auth,
        anon = _ref.anon;

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
      }, true);
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
        if (this.game.isActions && this.game.changes.killedIds && this.game.killedIds.length > 0) this.handleKilledIdsChange();
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

      var points = this.game.calculatePoints(this.players);
      // Add player points then update results
      _Adapters2.default.Players.masterTallyScores(this.players, points).then(function () {
        _Adapters2.default.Games.masterUpdate(_this5.game.id, {
          status: 'results',
          inProgress: false
        });
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
                killVotesByPlayer = _game$generateActionI.killVotesByPlayer,
                killVotes = _game$generateActionI.killVotes,
                killedIds = _game$generateActionI.killedIds;

            _Adapters2.default.Players.masterActOnPlayers(this.game.id, this.players, killedIds).then(function () {
              _Adapters2.default.Games.masterUpdate(_this6.game.id, {
                killVotesByPlayer: killVotesByPlayer,
                killVotes: killVotes,
                killedIds: killedIds
              }).then(function () {
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
      _Adapters2.default.Players.globalListenerPlayerEvents(this.gameId, this.initializePlayer.bind(this), this.removePlayer.bind(this));
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

      if (!this.players[player.id]) this.players[player.id] = new _Player2.default(this, player);
      _Adapters2.default.Players.globalListenerPlayer(player.id, function (player) {
        if (player && _this8.players[player.id]) _this8.players[player.id].update(player);
      });
      // If we have this Player's data
      if (this.player) {
        // Initial Render
        if (!this.rendered) this.initializeRenderers();
        this.touchPlayers();
        this.renderers.lobby.render({
          players: this.players,
          gameId: this.gameId
        });
      }
    }
  }, {
    key: 'removePlayer',
    value: function removePlayer(player) {
      delete this.players[player.id];
      this.touchPlayers();
    }
  }, {
    key: 'touchPlayers',
    value: function touchPlayers() {
      // If results, we remove the player there
      if (this.game && this.game.status === 'results') this.renderers.results.render(this.game, this.players);else if (this.game && this.game.status === 'lobby')
        // If not results, we're at Lobby
        // Render joining Players
        this.renderers.lobby.render({
          players: this.players,
          gameId: this.gameId
        });
    }
  }, {
    key: 'initializeRenderers',
    value: function initializeRenderers() {
      var _this9 = this;

      // Cleaning renders from last game
      if (this.renderers) for (var key in this.renderers) {
        this.renderers[key].remove();
      }this.renderers = {
        lobby: new _Renderers2.default.Lobby(this.player, {
          dispatchStart: function dispatchStart() {
            return _this9.dispatchStart();
          },
          dispatchEnd: function dispatchEnd() {
            return _this9.dispatchEnd();
          }
        }),
        selections: new _Renderers2.default.Selections(this.player, {
          dispatchSelection: function dispatchSelection(sel) {
            return _this9.dispatchSelection(sel);
          },
          dispatchEnd: function dispatchEnd() {
            return _this9.dispatchEnd();
          }
        }, true),
        reveal: new _Renderers2.default.Reveal(this.player, {
          dispatchActions: function dispatchActions() {
            return _this9.dispatchActions();
          },
          dispatchEnd: function dispatchEnd() {
            return _this9.dispatchEnd();
          }
        }),
        actions: new _Renderers2.default.Actions(this.player, {
          dispatchAction: function dispatchAction(ids) {
            return _this9.dispatchAction(ids);
          },
          dispatchEnd: function dispatchEnd() {
            return _this9.dispatchEnd();
          }
        }),
        results: new _Renderers2.default.Results(this.player, {
          dispatchEnd: function dispatchEnd() {
            return _this9.dispatchEnd();
          },
          dispatchLeave: function dispatchLeave() {
            return _this9.dispatchLeave();
          },
          dispatchNewRound: function dispatchNewRound() {
            return _this9.dispatchNewRound();
          }
        })
      };
      this.renderers.lobby.renderInitial();
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
    key: 'dispatchReveal',
    value: function dispatchReveal() {
      _Adapters2.default.Games.masterUpdate(this.game.id, { status: 'reveal' });
    }
  }, {
    key: 'dispatchActions',
    value: function dispatchActions() {
      _Adapters2.default.Games.masterUpdate(this.game.id, { status: 'actions' });
    }
  }, {
    key: 'dispatchNewRound',
    value: function dispatchNewRound() {
      var _this11 = this;

      var roundData = this.game.generateRoundData();
      _Adapters2.default.Games.masterUpdate(this.game.id, roundData.game).then(function () {
        _Adapters2.default.Players.masterUpdateRoundData(_this11.players, roundData.players).then(function () {
          var selectionStart = new Date().getTime(),
              status = 'selections';
          _Adapters2.default.Games.masterUpdate(_this11.game.id, {
            status: status,
            selectionStart: selectionStart
          });
        });
      });
    }
  }, {
    key: 'dispatchEnd',
    value: function dispatchEnd() {
      var _this12 = this;

      _Adapters2.default.Players.masterDeleteAll(this.game.id).then(function () {
        _Adapters2.default.Games.masterDelete(_this12.game.id);
      });
    }
  }, {
    key: 'dispatchLeave',
    value: function dispatchLeave() {
      var _this13 = this;

      if (this.game.playerCount <= 3) {
        this.dispatchEnd();
      } else {
        _Adapters2.default.Games.globalKill();
        _Adapters2.default.Users.globalUpdate(this.playerId, { currentGameId: null }).then(function () {
          _Adapters2.default.Players.globalDelete(_this13.user.id).then(function () {
            _this13.launch.render({ user: _this13.user });
          });
        });
      }
    }
  }, {
    key: 'dispatchSelection',
    value: function dispatchSelection(selection) {
      _Adapters2.default.Games.globalSelection(this.game.id, this.user.id, selection, new Date().getTime());
      if (STUB) this.devDispatchSelection();
    }
  }, {
    key: 'devDispatchSelection',
    value: function devDispatchSelection() {
      if (this.player.isMaster) {
        var topics = new _Topics2.default().topics;
        for (var i = 0; i < STUB_COUNT; i++) {
          var id = '' + STUB_PREFIX + (i + 1);
          var topic = topics[Math.floor(Math.random() * topics.length)][1].toLowerCase();
          _Adapters2.default.Games.globalSelection(this.game.id, id, topic, new Date().getTime());
        }
      }
    }
  }, {
    key: 'dispatchAction',
    value: function dispatchAction(playerIds) {
      _Adapters2.default.Games.globalAction(this.game.id, this.user.id, playerIds);
      if (STUB) this.devDispatchAction(playerIds);
    }
  }, {
    key: 'devDispatchAction',
    value: function devDispatchAction(playerIds) {
      if (this.player.isMaster) for (var i = 0; i < STUB_COUNT; i++) {
        var id = '' + STUB_PREFIX + (i + 1),
            victimIds = [];
        for (var j = 0; j < this.game.imposterCount; j++) {
          victimIds.push('' + STUB_PREFIX + Math.ceil(Math.random() * STUB_COUNT));
        }_Adapters2.default.Games.globalAction(this.game.id, id, victimIds);
      }
    }

    // Rendering

  }, {
    key: 'render',
    value: function render() {
      var _this14 = this;

      var status = this.game.status;
      var map = {
        selections: function selections() {
          return _this14.renderers.selections.render(_this14.game, _this14.players);
        },
        reveal: function reveal() {
          return _this14.renderers.reveal.render(_this14.game, _this14.players);
        },
        actions: function actions() {
          return _this14.renderers.actions.render(_this14.game, _this14.players);
        },
        results: function results() {
          return _this14.renderers.results.render(_this14.game, _this14.players);
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
      var _this2 = this;

      var $h1 = this.el('h1', 'Lexicon Standoff'),
          $desc = this.el('p', 'Please Sign In', 'description'),
          $google = this.el('button', 'Google'),
          $twitter = this.el('button', 'Twitter'),
          $anon = this.el('button', 'Anonymously');
      this.append(this.$main, [$h1, $desc, $google, $twitter, $anon]);
      $google.addEventListener('click', function () {
        _this2.events.authGoogle();
      });
      $twitter.addEventListener('click', function () {
        _this2.events.authTwitter();
      });
      $anon.addEventListener('click', function () {
        _this2.events.authAnon();
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
      return ['authTwitter', 'authGoogle', 'authAnon'];
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

      var $inst = this.el('p', 'WARNING: If you let your phone go to sleep, you may have problems.\n        Try refreshing the page. If that doesn\'t work,\n        don\'t fret, just open the site again in a new tab.\n        I know it is incredibly annoying. Workin\' on it.', 'instruction'),
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
      this.$slug.setAttribute('autocomplete', 'off');
      this.$slug.setAttribute('autocorrect', 'off');
      this.$slug.setAttribute('autocapitalize', 'off');
      this.$slug.setAttribute('spellcheck', 'false');
      this.$editor = this.el('div', null, 'editor');
      this.new = new _Button2.default({
        content: 'Create Game',
        clickEvent: function clickEvent() {
          _this2.$main.classList.add('inactive');
          _this2.events.createGame();
        }
      });
      this.join = new _Button2.default({
        content: 'Join',
        clickEvent: function clickEvent() {
          _this2.events.findGame(_this2.$slug.value.replace(/ /g, '').toLowerCase());
        },
        submit: true
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

      this.$main.classList.remove('inactive');
      this.$slug.value = '';
      this.renderEditor(user);
      this.toggleSections();
      this.$avatar = this.el('img');
      this.$avatar.src = user.avatar;
      this.$name = this.el('span', user.name);
      this.edit = new _Button2.default({
        content: '',
        clickEvent: function clickEvent() {
          return _this3.$editor.classList.add('active');
        }
      });
      this.edit.$el.appendChild(this.$avatar);
      this.edit.$el.appendChild(this.$name);

      this.$user.innerHTML = '';
      this.$user.appendChild(this.edit.$el);
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

var Lobby = function (_Renderer) {
  _inherits(Lobby, _Renderer);

  function Lobby() {
    _classCallCheck(this, Lobby);

    return _possibleConstructorReturn(this, (Lobby.__proto__ || Object.getPrototypeOf(Lobby)).apply(this, arguments));
  }

  _createClass(Lobby, [{
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

  return Lobby;
}(_Renderer3.default);

exports.default = Lobby;

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
      this.$input.setAttribute('autocomplete', 'off');
      this.$input.setAttribute('autocorrect', 'off');
      this.$input.setAttribute('autocapitalize', 'off');
      this.$input.setAttribute('spellcheck', 'false');
      this.$input.setAttribute('placeholder', 'Word');
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
        classname: 'flex',
        submit: true
      });
      if (this.player.isMaster) {
        var cancel = new _Button2.default({
          content: 'End',
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
      selection = selection.replace(/[^\w ]/g, '').toLowerCase();
      if (selection.match(/\d/)) {
        alert('Letters only.');
      } else if (this.matchesTopic(selection)) {
        alert("You can't submit one of the Topics, dummy. This is a game. Play it.");
      } else if (selection.replace(/ /g, '').length > 0) {
        this.$input.blur();
        this.events.dispatchSelection(selection);
        this.$input.classList.add('hide');
        this.submit.disable();
      } else {
        alert("C'mon. You gotta submit something.");
      }
    }
  }, {
    key: 'matchesTopic',
    value: function matchesTopic(selection) {
      var topics = this.player.isImposter ? this.topics : [this.topics[0], this.topics[1]];
      var clean = selection.replace(/[^\w]/g, ''),
          arr = topics.map(function (t) {
        return t[1].toLowerCase().replace(/[^\w]/g, '');
      });
      return arr.includes(clean);
    }
  }, {
    key: 'render',
    value: function render(game, players) {
      this.topics = game.topics;
      this.$input.value = '';
      var topics = game.topics,
          selections = game.selections,
          playerCount = game.playerCount;

      topics = topics.map(function (i) {
        return i.split(' ').join('&nbsp;');
      });
      this.$h1.innerHTML = this.roleHeader('Selections');

      if (selections[this.player.id]) {
        this.$input.classList.add('hide');
        this.submit.disable();
      } else {
        this.$input.classList.remove('hide');
        this.submit.enable();
      }
      var descHtml = '',
          topicsHtml = void 0;
      if (this.player.isImposter) topicsHtml = this._shuffledHtml([0, 1, 2], topics);else topicsHtml = this._shuffledHtml([0, 1], topics);
      if (this.player.isImposter) {
        descHtml += 'Enter one word or name below that you associate with the <strong>two</strong> Agent Topics.';
      } else {
        descHtml = 'Enter one word or name below that you associate with both of the Topics above.';
      }
      this.$topics.innerHTML = topicsHtml;
      this.$desc.innerHTML = descHtml;
      this.toggleSections();
      this.renderWaiting({ players: players, selections: selections });
    }
  }, {
    key: 'renderWaiting',
    value: function renderWaiting(_ref) {
      var players = _ref.players,
          selections = _ref.selections;

      this.waiting.reset();
      for (var playerId in players) {
        if (!selections || !selections[playerId]) if (players[playerId].isAlive) {
          this.waiting.title('Waiting on...');
          this.waiting.add(this.userSpan(players[playerId]));
        }
      }
    }
  }, {
    key: '_shuffledHtml',
    value: function _shuffledHtml(arr, topics) {
      if (arr.length === 2) {
        return '\u201C' + topics[arr[0]] + '\u201D &amp; \u201C' + topics[arr[1]] + '\u201D';
      } else {
        var shuffled = (0, _shuffle2.default)(arr).map(function (idx) {
          return topics[idx];
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
        var $inst = this.el('p', 'Players discuss their answers. Proceed once everyone is ready to vote.', 'instruction');
        var $grp = this.el('div', null, 'item-group'),
            proceed = new _Button2.default({
          content: 'Proceed',
          clickEvent: this.events.dispatchActions.bind(this),
          classname: 'flex'
        }),
            cancel = new _Button2.default({
          content: 'End',
          clickEvent: this.handleConfirmEnd.bind(this),
          classname: 'warning'
        });
        this.append($grp, [cancel.$el, proceed.$el]);
        this.append(this.$footer, [$inst, $grp]);
      }
    }
  }, {
    key: 'render',
    value: function render(game, players) {
      var _this2 = this;

      var topics = game.topics,
          playerCount = game.playerCount,
          imposterCount = game.imposterCount,
          selections = game.selections,
          selectionStart = game.selectionStart;


      this.selections.reset();
      var playerIds = Object.keys(selections).sort(function (a, b) {
        var sa = selections[a].time,
            sb = selections[b].time;
        if (sa < sb) return 1;
        if (sa > sb) return -1;
        sa = selections[a].selection.toLowerCase();
        sb = selections[b].selection.toLowerCase();
        if (sa < sb) return -1;
        if (sa > sb) return 1;
        return 0;
      });
      playerIds.forEach(function (playerId) {
        var _selections$playerId = selections[playerId],
            selection = _selections$playerId.selection,
            time = _selections$playerId.time;

        _this2.selections.add('\n        ' + _this2.userSpan(players[playerId]) + '\n        <span class="selection">\n          ' + selection + '\n          <span class="seconds">' + _this2.renderTime((time - selectionStart) / 1000) + '</span>\n        </span>\n      ');
      });

      this.$h1.innerHTML = this.roleHeader('Reveal');
      this.$topics.innerHTML = '\u201C' + topics[0] + '\u201D &amp; \u201C' + topics[1] + '\u201D';
      var playerS = imposterCount === 1 ? 'Player' : 'Players';
      this.$desc.innerHTML = '\n      These were the two Topics. Explain and argue your choice.\n      You\'ll need to vote to kill <strong>' + imposterCount + '</strong> ' + playerS + '.\n    ';
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
      return ['dispatchActions', 'dispatchEnd'];
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

      this.actions = new _List2.default('flex-list flex-list-half');
      this.append(this.$main, this.actions.elements);

      this.waiting = new _List2.default('flex-list flex-list-small flex-list-quarter');
      this.append(this.$main, this.waiting.elements);

      this.act = new _Button2.default({
        content: '',
        clickEvent: function clickEvent() {
          var playerIds = Array.from(_this2.$section.querySelectorAll(':checked')).map(function (el) {
            return el.value;
          });
          _this2.events.dispatchAction(playerIds);
          _this2.act.disable();
          _this2.$main.classList.add('inactive');
        }
      });
      if (this.player.isMaster) {
        var $inst = this.el('p', 'Play will proceed after everyone submits a Vote.', 'instruction'),
            cancel = new _Button2.default({
          content: 'End',
          clickEvent: this.handleConfirmEnd.bind(this),
          classname: 'warning'
        });
        var $grp = this.el('div', null, 'item-group');
        this.append($grp, [cancel.$el, this.act.$el]);
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
      var _this3 = this;

      var actions = game.actions,
          imposterCount = game.imposterCount,
          playerCount = game.playerCount,
          selections = game.selections;

      this.$main.classList.remove('inactive');
      this.actions.reset();
      this.act.disable();
      this.toggleSections();

      this.$h1.innerHTML = this.roleHeader('Actions');

      // If this player has already voted (refreshed the vote page after voting)
      if (actions && actions[this.player.id]) {
        this.actions.title('You have already voted!');
        this.act.content('You have voted');
        this.act.disable();
      } else {
        this.$footer.classList.remove('hide');
        var agentCount = Object.keys(players).length - imposterCount,
            agentS = this._pluralize(agentCount, 'Agent'),
            voteS = imposterCount === 1 ? '1 Vote' : imposterCount + ' Votes',
            playerS = imposterCount === 1 ? '1 Player' : imposterCount + ' Players';

        this.act.content('Submit ' + voteS);
        this.$desc.innerHTML = ' Select ' + playerS + ' to <strong>Kill</strong>. There are ' + agentS + '.';
        var playerIds = Object.keys(selections).sort(function (a, b) {
          var sa = selections[a].time,
              sb = selections[b].time;
          if (sa < sb) return 1;
          if (sa > sb) return -1;
          sa = selections[a].selection.toLowerCase();
          sb = selections[b].selection.toLowerCase();
          if (sa < sb) return -1;
          if (sa > sb) return 1;
          return 0;
        });
        playerIds.forEach(function (playerId) {
          if (playerId !== _this3.player.id) {
            var player = players[playerId];
            var $input = _this3.el('input');
            $input.setAttribute('type', 'checkbox');
            $input.setAttribute('value', playerId);
            $input.addEventListener('change', function () {
              _this3.handleChangedInput(imposterCount);
            });
            $input.setAttribute('id', playerId);
            var selection = selections[playerId].selection,
                $label = _this3.el('label', '\n            ' + _this3.userSpan(player) + '\n            <span class="selection">' + selection + '</span>\n            ');

            $label.setAttribute('for', playerId);
            var $li = _this3.el('li');
            _this3.append($li, [$input, $label]);
            _this3.actions.$ul.appendChild($li);
          }
        });
      }

      this.renderWaiting({ players: players, actions: actions });
    }
  }, {
    key: 'handleChangedInput',
    value: function handleChangedInput(count) {
      var checked = this.actions.$ul.querySelectorAll('input:checked');
      if (checked.length === count) this.act.enable();else this.act.disable();
    }
  }, {
    key: 'renderWaiting',
    value: function renderWaiting(_ref) {
      var players = _ref.players,
          actions = _ref.actions;

      this.waiting.reset();
      for (var playerId in players) {
        if (!actions || !actions[playerId]) {
          this.waiting.title('Waiting on...');
          this.waiting.add(this.userSpan(players[playerId]));
        }
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
      return ['dispatchAction', 'dispatchEnd'];
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

      this.$desc = this.el('div');
      this.$main.appendChild(this.$desc);

      this.killed = new _List2.default('flex-list flex-list-small');
      this.append(this.$main, this.killed.elements);

      this.imposters = new _List2.default('flex-list flex-list-small');
      this.append(this.$main, this.imposters.elements);

      this.$main.appendChild(document.createElement('hr'));

      this.standings = new _List2.default('flex-list flex-list-small');
      this.append(this.$main, this.standings.elements);

      this.joined = new _List2.default('list-joined flex-list flex-list-small');
      this.append(this.$main, this.joined.elements);

      if (this.player.isMaster) this.renderInitialMaster();else this.renderInitialLeave();
    }
  }, {
    key: 'renderInitialMaster',
    value: function renderInitialMaster() {
      this.$inst = this.el('p', null, 'instruction');
      var round = new _Button2.default({
        content: 'Continue',
        clickEvent: this.events.dispatchNewRound.bind(this),
        classname: 'flex'
      }),
          end = new _Button2.default({
        content: 'End',
        clickEvent: this.confirmEnd.bind(this),
        classname: 'warning'
      });
      this.$group = this.el('div', null, 'item-group');
      this.append(this.$group, [end.$el, round.$el]);
      this.append(this.$footer, [this.$inst, this.$group]);
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
        classname: 'full warning'
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
    value: function render(game, players, joined) {
      var _this3 = this;

      if (this.player.isMaster) this.$inst.innerHTML = '\n        More Players can join using the code \u201C' + game.id + '\u201D.\n        Once everyone is ready, proceed below.\n      ';
      var killVotesByPlayer = game.killVotesByPlayer,
          killVotes = game.killVotes,
          killedIds = game.killedIds,
          topics = game.topics;

      this.killed.reset();
      this.imposters.reset();
      this.standings.reset();
      this.joined.reset();
      this.$section.className = this.$section.className.replace(/(win-\d+)|(lose-\d+)/g, '');

      if (this.detectJoined(players)) {
        this.joined.title('Joined Players');
        for (var playerId in players) {
          var player = players[playerId];
          if (player.isJoined) {
            this.joined.title('Joined Players');
            this.joined.add(this.userSpan(player));
          }
        }
      }

      this.toggleSections();

      this.$h1.innerHTML = this.roleHeader('Results');

      this.killed.title('Killed by popular Vote');
      killedIds.forEach(function (key) {
        var user = _this3.userSpan(players[key], 'dead');
        _this3.killed.add(user + ' <span class="votes">' + killVotesByPlayer[key] + '</span>');
      });

      if (this.leave) this.leave.enable();
      this.imposters.title('Imposters');
      this.standings.title('Standings');
      this.$section.classList.add(this._winLoseClass());
      this.$desc.innerHTML = '\n      <p>' + this._winnerText() + ' ' + this._playerPoints() + '<br>\n      The Imposter Topic was \u201C' + topics[2].replace(/ /g, '&nbsp;') + '\u201D.</p>\n    ';
      var sorted = Object.keys(players).sort(function (a, b) {
        var aScore = players[a].score,
            bScore = players[b].score;
        if (aScore > bScore) return -1;
        if (aScore < bScore) return 1;
        return 0;
      });
      sorted.forEach(function (playerId, i) {
        var player = players[playerId],
            score = '<span class="score">' + player.score + '</span>',
            html = _this3.userSpan(player) + ' ' + score;
        if (!player.isJoined) {
          _this3.standings.add(html);
          if (player.isImposter) _this3.imposters.add(_this3.userSpan(player));
        }
      });

      if (this.player.isMaster) this.renderMaster();
    }
  }, {
    key: 'renderMaster',
    value: function renderMaster() {
      this.$group.classList.remove('hide');
    }
  }, {
    key: 'detectJoined',
    value: function detectJoined(players) {
      var i = 0,
          ids = Object.keys(players),
          joined = false;
      while (i < ids.length && !joined) {
        joined = players[ids[i]].isJoined;
        i++;
      }
      return joined;
    }
  }, {
    key: '_points',
    value: function _points(count) {
      return '<span class="points">' + count + '</span>';
    }
  }, {
    key: '_winLoseClass',
    value: function _winLoseClass() {
      var win = Math.ceil(Math.random() * 6),
          lose = Math.ceil(Math.random() * 10);
      return this.player.isAlive ? 'win-' + win : 'lose-' + lose;
    }
  }, {
    key: '_winnerText',
    value: function _winnerText() {
      if (this.player.isAlive) return this._success();else return this._failure();
    }
  }, {
    key: '_playerPoints',
    value: function _playerPoints() {
      var _player$_ = this.player._,
          role = _player$_.role,
          alive = _player$_.alive,
          scoreSelection = alive ? _Game2.default.survivePoints[role] : 0,
          points = this._points(scoreSelection);

      return 'You scored ' + points + ' this Round.';
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
      return ['dispatchEnd', 'dispatchNewRound', 'dispatchLeave'];
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
  function Player(state, player) {
    _classCallCheck(this, Player);

    this.state = state;
    this._ = player;
  }

  _createClass(Player, [{
    key: 'update',
    value: function update(values) {
      this._ = values;
    }
  }, {
    key: 'avatar',
    get: function get() {
      return this._.avatar;
    }
  }, {
    key: 'gameId',
    get: function get() {
      return this._.gameId;
    }
  }, {
    key: 'id',
    get: function get() {
      return this._.id;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._.name;
    }
  }, {
    key: 'role',
    get: function get() {
      return this._.role;
    }
  }, {
    key: 'score',
    get: function get() {
      return this._.score;
    }
  }, {
    key: 'isAgent',
    get: function get() {
      return this.role === 'agent';
    }
  }, {
    key: 'isImposter',
    get: function get() {
      return this.role === 'imposter';
    }
  }, {
    key: 'isJoined',
    get: function get() {
      return this.role === 'joined';
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
    key: 'capitalizedRole',
    get: function get() {
      var safeRole = this._.role || '';
      return safeRole.charAt(0).toUpperCase() + safeRole.slice(1);
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