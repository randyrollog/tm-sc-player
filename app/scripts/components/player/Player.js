'use strict';

class Player {

  constructor() {

    // cache dom
    this._playBtn = document.querySelector('.player__btn--play');
    this._muteBtn = document.querySelector('.player__btn--mute');
    this._restartBtn = document.querySelector('.player__btn--restart');
    this._playBtnIcons = this._playBtn.querySelector('.icon--group');
    this._widget = document.querySelector('#song');
    this._song = SC.Widget(this._widget);
    this._progressCirc = document.querySelector('.progress-circle');
    this._progressLength = this._progressCirc.getTotalLength();

    // set initial state
    this._totalTime;
    this._paused = true;
    this._muted = false;
    this._rate = .1;

    // bindings
    ['_init', '_handlePlayBtnClick', '_handleMuteBtnClick', '_restart']
      .forEach(fn => this[fn] = this[fn].bind(this));
  }
  
  load() {
    this._totalTime = this._song.duration;
    this._addEventListeners();
  }

  _addEventListeners() {
    this._song.bind(SC.Widget.Events.READY, _ => {
      this._song.bind(SC.Widget.Events.PLAY_PROGRESS, this._init);
      this._playBtn.addEventListener('click', this._handlePlayBtnClick);
      this._muteBtn.addEventListener('click', this._handleMuteBtnClick);
      this._restartBtn.addEventListener('click', this._restart);
    });
  }

  _init(PLAY_PROGRESS) {
    this._progressCirc.style.strokeDasharray = this._progressLength;
    this._progressCirc.style.strokeDashoffset = this._progressLength * 2;

    this._progress = PLAY_PROGRESS.relativePosition * 100;

    this._offset = this._progressLength + (this._progress * this._progressLength / 100);

    this._progressCirc.style.strokeDashoffset = `${this._offset}`;
  }

  _handlePlayBtnClick() {
    this._paused ? this._play() : this._pause();
  }

  _handleMuteBtnClick() {
    this._muted ? this._unmute() : this._mute();
  }

  _play() {
    this._playBtn.classList.remove('paused');
    this._song.play();
    this._paused = false;
  }

  _pause() {
    this._playBtn.classList.add('paused');
    this._song.pause();
    this._paused = true;
  }

  _restart() {
    this._song.seekTo(0);
  }

  _unmute() {
    this._muteBtn.classList.remove('muted');
    this._song.setVolume(1);
    this._muted = false;
  }

  _mute() {
    this._muteBtn.classList.add('muted');
    this._song.setVolume(0);
    this._muted = true;
  }
}

const player = new Player();

player.load();