// import Dropzone from "./external_packages/dropzone";

class MusicPlayer {
  constructor() {
    this.audio = $(".audio-source")[0];
    this.ctx = new (AudioContext || window.webkitAudioContext)();
    this.analyser = this.ctx.createAnalyser();


    this.analyser.fftSize = 2048;
    this.audioSrc = this.ctx.createMediaElementSource(this.audio);
    this.freqArray = new Float32Array(this.analyser.frequencyBinCount);

    this.audioSrc.connect(this.analyser);
    this.audioSrc.connect(this.ctx.destination);

    this.barCount = 64;
    this.heightMultiplier = 3;

    this.samples = [
      "sample_music/harderbetterfasterstronger.mp3",
      "sample_music/Afrojack_Steve_Aoki_ft_Miss_Palmer_-_No_Beef_Official_Music_Video (mp3cut.net).mp3",
      "sample_music/Ed_Sheeran_-_I_See_Fire_Kygo_Remix[Mp3Converter.net].mp3"
    ];

    this.mode = 'paused';
    this.flippedMode = {};
    this.flippedMode['paused'] = 'play';
    this.flippedMode['play'] = 'paused';

    this.fetchHiddenName();
    this.setupDropzone();
    this.addListeners();

    this.timeoutId = setTimeout(this.renderLoop.bind(this), 16);



  }

  processData(file) {
    let x = 1;
    return `/file-upload`;
  }

  setupDropzone() {
    $(".dropzone").on({
      dragstart: () => {
      },

      dragleave: () => {
      },

      dragenter: (e) => {
      },

      dragover: (e) => {
          return false;
      },

      dragend: () => {
      },
      drop: (e)=> {
        let reader = new FileReader();
        // let fileTest;
        reader.onload = evt => {
          if (evt.target.result.slice(0,14) === "data:audio/mp3") {
            this.audiocrossOrigin = "anonymous";
            // $(".audio-source").attr("cross-origin", "anonymous");
            $(".audio-source").attr('src', evt.target.result);
          } else {
            // TODO: show error
          }
        };
        reader.readAsDataURL(e.originalEvent.dataTransfer.files[0]);
        let x = 1;
      }
    });
  }

  fetchHiddenName(){
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
      this.hidden = "hidden";
      this.visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      this.hidden = "msHidden";
      this.visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      this.hidden = "webkitHidden";
      this.visibilityChange = "webkitvisibilitychange";
    }
  }



  setRenderer(renderer) {
    this.renderer = renderer;
    this.renderer.setupSoundBars(this.barCount);
  }

  addBars() { // This is Test Function, this will move somewhere else
    let tempArray = [];
    for (let i = 0; i < this.barCount ; i++){
      tempArray.push($(`<div class="testDivs ${i}"></div>`));
    }
    tempArray.forEach(div => {
      $(".test").append(div);
    });
  }

  renderLoop() {
    this.renderer.drawData(this.processFreqArray());
    this.timeoutId = setTimeout(this.renderLoop.bind(this), 16);
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
    this.analyser.getFloatFrequencyData(this.freqArray);
    let tempArray = [];

    for (let i = 0; i<this.barCount ; i++) {
      let val = Math.max(this.freqArray[i] + 140, 0);
      // console.log(val);
      let curveIntensity = (this.barCount - 1 - i) * (3/(this.barCount - 1)) + 1;
      // let curveIntensity = 2;
      val = Math.pow(val, curveIntensity + 1)/Math.pow(140, curveIntensity);
      tempArray.push(val);
    }

    return tempArray;
  }

  addListeners() {
    $(".play-button").click(this.togglePlay.bind(this));
    // $(document).on(this.visibilityChange, this.handleVisibilityChange.bind(this), false);
    $(".sample.1").click(this.switchSongs(1));
    $(".sample.2").click(this.switchSongs(2));
    $(".sample.3").click(this.switchSongs(3));
    document.addEventListener(this.visibilityChange, this.handleVisibilityChange.bind(this), false);
  }

  togglePlay() {
    switch (this.mode) {
      case 'play':
        this.mode = this.flippedMode[this.mode];
        this.audio.pause();
        $(".play-button img").attr("src", "images/circular-play-button.svg");
        // clearTimeout(this.timeoutId);
        break;
      case 'paused':
        this.mode = this.flippedMode[this.mode];
        this.audio.play();
        $(".play-button img").attr("src", "images/circular-pause-button.svg");
        // this.timeoutId = setTimeout(this.renderLoop.bind(this), 16); // timeout enables Soundbar Visuals
        break;
    }
  }

  switchSongs(songId) {
    return () => {
      if (isNaN(songId)){

      } else {
        if (this.mode === 'play'){
          this.mode = this.flippedMode[this.mode];
          this.audio.pause();
          $(".play-button img").attr("src", "images/circular-play-button.svg");
          $(".audio-source").attr('src', this.samples[songId - 1]);
          this.audio.play();
        } else {
          $(".audio-source").attr('src', this.samples[songId - 1]);
        }
      }
    };
  }

  handleVisibilityChange(){
    if (this.mode === 'play'){
      if(document[this.hidden]){
        clearTimeout(this.timeoutId);
      } else {
        this.timeoutId = setTimeout(this.renderLoop.bind(this), 16);
      }
    }
  }
}

export default MusicPlayer;
