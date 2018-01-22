// import Dropzone from "./external_packages/dropzone";

class MusicPlayer {
  constructor() {
    this.audio = $(".audio-source")[0];
    try {
      this.ctx = new (AudioContext || window.webkitAudioContext)();
    }
    catch (e) {
      this.ctx = new  window.webkitAudioContext();
    }

    this.audio.volume = 0.5;
    this.currentTrack = 2;


    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.audioSrc = this.ctx.createMediaElementSource(this.audio);
    this.freqArray = new Float32Array(this.analyser.frequencyBinCount);

    this.audioSrc.connect(this.analyser);
    this.audioSrc.connect(this.ctx.destination);

    this.barCount = 64;
    this.heightMultiplier = 3;

    this.samples = [
      "sample_music/Afrojack_Steve_Aoki_No_Beef_Clip.mp3",
      "sample_music/Breakers_Break_Daft_Punk_Mash_Up.mp3",
      "sample_music/ODESZA_-_Say_My_Name.mp3",
      "sample_music/Oh_Wonder_-_Body_Gold_Louis_The_Child_Remix.mp3",
      "sample_music/Ed_Sheeran_-_I_See_Fire_Kygo_Remix.mp3",
      "sample_music/Teemid_-_Crazy_feat_Joie_Tan_Gnarls_Barkely_Cover.mp3",
      "sample_music/Daft_Punk_-_Harder_Better_Faster_Stronger.mp3",
      "sample_music/Flight_Facilities_-_Crave_you.mp3",
      "sample_music/Bruno_Mars_-_Finesse_Remix_Feat_Cardi_B.mp3",
      "sample_music/Bebe_Rexha_-_Meant_to_Be.mp3",
      "sample_music/Bebe_Rexha_-_The_Way_I_Are_Dance_With_Somebody.mp3",
      "sample_music/Chance_The_Rapper_-_Good_Ass_Intro.mp3",
    ];

    this.mode = 'paused';
    this.flippedMode = {};
    this.flippedMode['paused'] = 'play';
    this.flippedMode['play'] = 'paused';

    this.fetchHiddenName();
    // TODO: remove
    this.setupDropzone();
    this.addListeners();

    this.timeoutId = setTimeout(this.renderLoop.bind(this), 16);
  }

  // TODO: remove
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

  renderLoop() {
    this.renderer.drawData(this.processFreqArray());
    this.timeoutId = setTimeout(this.renderLoop.bind(this), 16);
  }

  processFreqArray() {
    this.analyser.getFloatFrequencyData(this.freqArray);
    let tempArray = [];

    for (let i = 0; i<this.barCount ; i++) {
      let val = Math.max(this.freqArray[i] + 140, 0);
      let curveIntensity = (this.barCount - 1 - i) * (3/(this.barCount - 1)) + 1;
      val = Math.pow(val, curveIntensity + 1)/Math.pow(140, curveIntensity);
      tempArray.push(val);
    }

    return tempArray;
  }

  addListeners() {
    $(".play-button").click(this.togglePlay.bind(this));
    $(".sample.1").click(this.switchSongs(1));
    $(".sample.2").click(this.switchSongs(2));
    $(".sample.3").click(this.switchSongs(3));
    $(".sample.4").click(this.switchSongs(4));
    $(".sample.5").click(this.switchSongs(5));
    $(".sample.6").click(this.switchSongs(6));
    $(".sample.7").click(this.switchSongs(7));
    $(".sample.8").click(this.switchSongs(8));
    $(".sample.9").click(this.switchSongs(9));
    $(".sample.10").click(this.switchSongs(10));
    $(".sample.11").click(this.switchSongs(11));
    $(".sample.12").click(this.switchSongs(12));
    $(".audio-source").on("ended", () => {
      this.moveSong('forward');
    });
    $(".ff-button").click(() => {
      this.moveSong('forward');
    });
    $(".rewind-button").click(() => {
      this.moveSong('backward');
    });

    $(".slider").change(e => (this.audio.volume = e.target.value/100));
    document.addEventListener(this.visibilityChange, this.handleVisibilityChange.bind(this), false);
  }

  togglePlay() {
    switch (this.mode) {
      case 'play':
        this.mode = this.flippedMode[this.mode];
        this.audio.pause();
        $(".play-button img").attr("src", "images/play-button.svg");
        break;
      case 'paused':
        this.mode = this.flippedMode[this.mode];
        this.audio.play();
        // $(".play-button").empty();
        //
        // ))
        $(".play-button img").attr("src", "images/pause.svg");
        break;
    }
  }

  moveSong(mode) {
    switch(mode) {
      case "forward":
      console.log(mode);
        if (this.currentTrack === 12){
          this.switchSongs(1)();
        } else {
          this.switchSongs(this.currentTrack + 1)();
        }
        break;
      case "backward":
        if (this.currentTrack === 1){
          this.switchSongs(12)();
        } else {
          this.switchSongs(this.currentTrack - 1)();
        }
        break;
    }
  }

  switchSongs(songId) {
    return () => {
      $(".playing").removeClass("playing");
      $(`.sample.${songId}`).addClass("playing");
      this.currentTrack = songId;
      if (this.mode === 'play'){
        this.audio.pause();
        $(".audio-source").attr('src', this.samples[songId - 1]);
        this.audio.play();
      } else {
        $(".audio-source").attr('src', this.samples[songId - 1]);
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
