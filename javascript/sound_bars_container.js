import SoundBar from './sound_bar';
import {pickHex, pickHexArray} from './util';


class SoundBarsContainer {
  constructor() {
    this.soundBars = [];
  }

  createSoundBars(scene, glowScene, barCount) {
    this.barCount = barCount;
    for(let i = 0; i < barCount + 6; i++) {

      let settings = {
        pos: [i + (i * 0.5), 0, 0],
        scale: [1,1,1],
        // color: 0x595759,
        color: 0x848484,
        emissive: 0x25c4a7,
        emissiveIntensity: 0.1,
        glowColor: 0x009933,
        glowIntensity: 1,
        highColor: [209, 2, 171],
        lowColor: [74, 50, 130]
      };

      if (i < 35) {
        settings.highColor = pickHexArray([0, 131, 142], [209, 2, 171], (i)/35);
        settings.lowColor = pickHexArray([26, 73, 27], [74, 50, 130], (i)/35);
      } else if (i < 70) {
        settings.highColor = pickHexArray([209, 2, 171], [0, 131, 142], (i- 35)/35);
        settings.lowColor = pickHexArray([74, 50, 130], [26, 73, 27], (i- 35)/35);
      }






      // console.log(glowColor);

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
      this.soundBars[i + 3].forEach((bar, ind) => {
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
    for (let i = 2; i >= 0; i--) {
      let val = this.soundBars[i + 1][6].height;
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
    for (let i = this.barCount + 3; i <= this.barCount + 5; i++) {
      let val = this.soundBars[i - 1][6].height;
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
