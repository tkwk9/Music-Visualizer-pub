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

export default MusicPlayer;
