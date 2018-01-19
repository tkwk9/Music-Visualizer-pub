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
        pos: [i + (i * 0.5), 0, 0],
        scale: [1,1,1],
        color: 0x595759,
        emissive: 0x25c4a7,
        emissiveIntensity: 0.1,
        glowColor: 0x009933,
        glowIntensity: 1,
        // glowColor: 0x91ff56,
      };
      let set = [];

      set[6] = new SoundBar(settings, scene, glowScene);

      settings.pos[2] = 1.5;
      set[5] = new SoundBar(settings, scene, glowScene);
      settings.pos[2] = -1.5;
      set[7] = new SoundBar(settings, scene, glowScene);

      settings.pos[2] = 3;
      set[4] = new SoundBar(settings, scene, glowScene);
      settings.pos[2] = -3;
      set[8] = new SoundBar(settings, scene, glowScene);

      settings.pos[2] = 4.5;
      set[3] = new SoundBar(settings, scene, glowScene);
      settings.pos[2] = -4.5;
      set[9] = new SoundBar(settings, scene, glowScene);

      settings.pos[2] = 6;
      set[2] = new SoundBar(settings, scene, glowScene);
      settings.pos[2] = -6;
      set[10] = new SoundBar(settings, scene, glowScene);

      settings.pos[2] = 7.5;
      set[1] = new SoundBar(settings, scene, glowScene);
      settings.pos[2] = -7.5;
      set[11] = new SoundBar(settings, scene, glowScene);

      settings.pos[2] = 9;
      set[0] = new SoundBar(settings, scene, glowScene);
      settings.pos[2] = -9;
      set[12] = new SoundBar(settings, scene, glowScene);


      this.soundBars.push(set);
    }
  }

  updateSoundBars(freqArray) {
    // console.log(Math.max(...freqArray) * 2);
    for (let i = 0; i < this.barCount; i++){
      let val = freqArray[i]/2;
      this.soundBars[i].forEach((bar, ind) => {
        if (ind === 6){
          bar.setHeight(val/2);
        } else if (ind === 5 || ind === 7) {
          bar.setHeight(val/3);
          bar.setHeight(val/3);
        } else if (ind === 4 || ind === 8) {
          bar.setHeight(val/5.5);
          bar.setHeight(val/5.5);
        } else if (ind === 3 || ind === 9) {
          bar.setHeight(val/8);
          bar.setHeight(val/8);
        } else if (ind === 2 || ind === 10) {
          bar.setHeight(val/10);
          bar.setHeight(val/10);
        } else if (ind === 1 || ind === 11) {
          bar.setHeight(val/12);
          bar.setHeight(val/12);
        } else if (ind === 0 || ind === 12) {
          bar.setHeight(val/14);
          bar.setHeight(val/14);
        }
      });
    }
  }
}

export default SoundBarsContainer;
