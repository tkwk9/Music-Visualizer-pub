import THREE from './three';
import SoundBarsContainer from './sound_bars_container';

class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: $("#canvas")[0],
      antialias: true
    });

    // this.renderer.setClearColor(0x232c3a);
    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    const width = 1500;
    const height = 500;
    this.renderer.setSize(width, height);

    // TEMP CAMERA
    this.mainCamera =
      new THREE.PerspectiveCamera(20, width/height, 0.1, 3000);
    this.mainCamera.position.set(100,30, 200);
    // this.mainCamera.rotation.set(this.toRadian(-10.29),this.toRadian(75.69),this.toRadian(9.78));

    this.mainScene = new THREE.Scene();

    this.ambLight = new THREE.AmbientLight(0xffffff, 0.5);
    // this.mainScene.add(this.ambLight);

    this.pointLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.pointLight.position.set(4,6,2);
    // this.mainScene.add(this.pointLight);

    this.glowScene = new THREE.Scene();
    this.glowAmbLight = new THREE.AmbientLight(0xffffff, 0.5);

  }

  setupSoundBars(barCount) {
    this.soundBarsContainer = new SoundBarsContainer();
    this.soundBarsContainer.createSoundBars(this.mainScene, this.mainCamera, barCount);
  }

  toRadian(degree) {
    return degree * Math.PI/180;
  }

  drawData(freqArray) {
    this.freqArray = freqArray;
    requestAnimationFrame(this.render.bind(this));
  }

  render () {
    this.soundBarsContainer.updateSoundBars(this.freqArray);
    this.renderer.render(this.mainScene, this.mainCamera);
  }
}

export default Renderer;
