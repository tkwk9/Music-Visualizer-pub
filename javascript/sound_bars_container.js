import SoundBar from './sound_bar';

class SoundBarsContainer {
  constructor() {
    this.soundBars = [];
  }

  createSoundBars(scene, camera, barCount) {
    this.barCount = barCount;
    for(let i = 0; i < barCount; i++) {
      let settings = {
        pos: [i + (i * 0.5), 0, 0],
        scale: [1,1,1],
        color: 0x000000,
        emissive: 0xffffff,
        emissiveIntensity: 0.5
        // F3FFE2
      };
      this.soundBars.push(new SoundBar(settings, camera, scene));
    }
  }

  updateSoundBars(freqArray) {
    for (let i = 0; i < this.barCount; i++){
      let val = freqArray[i]/3;
      this.soundBars[i].setHeight(val * 2);
    }
  }
}

export default SoundBarsContainer;
