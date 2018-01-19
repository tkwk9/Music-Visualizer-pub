import SoundBar from './sound_bar';
import {pickHex} from './util';


class SoundBarsContainer {
  constructor() {
    this.soundBars = [];
  }

  createSoundBars(scene, glowScene, barCount) {
    this.barCount = barCount;
    for(let i = 0; i < barCount; i++) {
      let glowColor = pickHex([0, 255, 255], [255, 0, 0], i/(barCount - 1));
      // console.log(glowColor);
      let settings = {
        pos: [i + (i * 0.75), 0, 0],
        scale: [1,1,1],
        color: 0x6c6d6d,
        emissive: 0xffffff,
        emissiveIntensity: 0,
        glowColor: glowColor,
        glowIntensity: 0.75,
        // glowColor: 0x91ff56,
      };
      this.soundBars.push(new SoundBar(settings, scene, glowScene));
    }
  }

  updateSoundBars(freqArray) {
    // console.log(Math.max(...freqArray) * 2);
    for (let i = 0; i < this.barCount; i++){
      let val = freqArray[i]/3;
      this.soundBars[i].setHeight(val * 2);
    }
  }
}

export default SoundBarsContainer;
