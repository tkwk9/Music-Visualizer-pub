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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__music_player__ = __webpack_require__(1);


$( () => {

  const audio = $("#audio-source");
  const musicPlayer = new __WEBPACK_IMPORTED_MODULE_0__music_player__["a" /* default */]();
  // const $mainDiv = $('#j-chess');

  // const game = new jChess();
  // const view = new jChessView($mainDiv, game, game.getBoard());
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MusicPlayer {
  constructor() {
    this.mode = 'paused';
    this.flippedMode = {};
    this.flippedMode['paused'] = 'play';
    this.flippedMode['play'] = 'paused';

    this.audio = $(".audio-source")[0];
    // this.audio.crossOrigin = "anonymous";

    this.ctx = new (AudioContext || window.webkitAudioContext)();
    this.analyser = this.ctx.createAnalyser();

    this.analyser.fftSize = 2048;
    this.audioSrc = this.ctx.createMediaElementSource(this.audio);
    this.freqArray = new Uint8Array(this.analyser.frequencyBinCount);
    console.log(this.freqArray.length);
    this.audioSrc.connect(this.analyser);
    this.audioSrc.connect(this.ctx.destination);

    this.addListeners();
    this.addBars();

  }

  addBars() {
    let tempArray = [];
    for (let i = 0; i < 64; i++){
      tempArray.push($(`<div class="testDivs ${i}"></div>`));
    }
    // this.shuffleArray(tempArray);
    tempArray.forEach(div => {
      $(".test").append(div);
    });
  }

  letThereBe() {
    this.analyser.getByteFrequencyData(this.freqArray);
    // this.analyser.getByteTimeDomainData(this.timeArray);
    this.processFreqArray().forEach((val, ind) => {
      // console.log(ind);
      // let newVal = Math.pow(val, Math.floor(((this.analyser.frequencyBinCount - ind)/this.analyser.frequencyBinCount) * 10)+1)/Math.pow(255, Math.floor(((this.analyser.frequencyBinCount - ind)/this.analyser.frequencyBinCount) * 10))* 10;
      // let newVal1 = ((val - (63-ind)*2)/(255 - (63-ind)*2))*255;
      let newVal;
      // newVal = Math.pow(val, (((64 - ind)/64) * 5)+1)/
      // Math.pow(255, (((64 - ind)/64) * 5));
      // if (ind < 15){
      // } else{
      //   newVal = (Math.pow(val/255, (1/((ind + 1)/64))) * 255);
      // }
      $(`.testDivs.${ind}`).height(val + 10);
    });
    this.timeOutId = setTimeout(this.letThereBe.bind(this), 16);
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
  }

  processFreqArray() {
    let tempArray = new Array(64);
    for (let i = 0; i < 64; i++){
      tempArray[i] = this.freqArray[i * 11 + 16];
      // console.log(i * 11 + 16);
    }
    // let adder = this.freqArray.slice(790).reduce((acc, cum) => {
    //   return acc + cum;
    // }, 0);
    // for (let i = 59; i < 64; i++){
    //   tempArray[i] += adder;
    // }
    // return tempArray.map( val => Math.floor(val/32));
    return tempArray;
  }

  addListeners() {
    $(".play-button").click(this.togglePlay.bind(this));
  }

  togglePlay() {
    switch (this.mode) {
      case 'play':
        this.mode = this.flippedMode[this.mode];
        this.audio.pause();
        $(".play-button img").attr("src", "images/circular-play-button.svg");
        clearTimeout(this.timeOutId);
        break;
      case 'paused':
        this.mode = this.flippedMode[this.mode];
        this.audio.play();
        $(".play-button img").attr("src", "images/circular-pause-button.svg");
        // this.intervalId = setInterval(this.letThereBe.bind(this), 16);
        this.timeOutId = setTimeout(this.letThereBe.bind(this), 16);

        break;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MusicPlayer);


/***/ })
/******/ ]);