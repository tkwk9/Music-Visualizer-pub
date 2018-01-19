import SoundBar from './sound_bar';

class SoundBarsContainer {
  constructor() {
    this.soundBars = [];
  }

  createSoundBars(scene, glowScene, barCount) {
    this.barCount = barCount;
    for(let i = 0; i < barCount; i++) {
      let settings = {
        pos: [i + (i * 0.5), 0, 0],
        scale: [1,1,1],
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.1,
        glowColor: 0x91ff56,
      };
      this.soundBars.push(new SoundBar(settings, scene, glowScene));
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
