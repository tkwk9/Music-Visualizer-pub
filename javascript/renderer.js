import SoundBarsContainer from './sound_bars_container';
import AdditiveBlendShader from "./shaders/additive_blend_shader";
import {degToRadian} from './util';
import THREELib from 'three-js';
const THREE = THREELib([
  "EffectComposer",
  "ShaderPass",
  "RenderPass",
  "HorizontalBlurShader",
  "VerticalBlurShader",
  "CopyShader",
  "MaskPass",
  "OrbitControls"
]);

class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: $("#canvas")[0],
      antialias: true
    });

    this.bluriness = 2;

    this.cameraPosition = [-23.42959864476863, 44.0308677857665, -80.80610975224909];

    this.renderer.setClearColor( 0x000000, 0 );
    this.renderer.setPixelRatio(window.devicePixelRatio);

    const WIDTH = 800;
    const HEIGHT = 500;
    this.renderer.setSize(WIDTH, HEIGHT);

    // Scene Setup
    this.mainScene = new THREE.Scene();
    this.glowScene = new THREE.Scene();

    // Camera Setup
    this.mainCamera =
      new THREE.PerspectiveCamera(40, WIDTH/HEIGHT, 0.1, 3000);
    window.cam = this.mainCamera;
    this.mainCamera.position.set(...this.cameraPosition);

    this.mainControl = new THREE.OrbitControls(this.mainCamera, $("#canvas")[0]);
    this.mainControl.autoRotateSpeed = -2;
    this.mainControl.autoRotate = true;
    this.mainControl.enablePan = false;
    this.mainControl.enableKeys = false;
    this.mainControl.update();


    this.glowCamera =
      new THREE.PerspectiveCamera(40, WIDTH/HEIGHT, 0.1, 3000);
    this.glowCamera.position.set(...this.cameraPosition);

    this.glowControl = new THREE.OrbitControls(this.glowCamera, $("#canvas")[0]);
    this.glowControl.autoRotateSpeed = -2;
    this.glowControl.autoRotate = true;
    this.glowControl.enablePan = false;
    this.glowControl.enableKeys = false;
    // this.glowControl.domElement($("#canvas")[0]);
    this.glowControl.update();

    // Lights
    this.ambLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.mainScene.add(this.ambLight);

    this.pointLight = new THREE.DirectionalLight(0xffffff, 0.75);
    this.pointLight.position.set(4,6,2);
    this.dirLight = new THREE.DirectionalLight(0xffffff, 0.75);
    this.dirLight.position.set(-4,6,-2);
    this.mainScene.add(this.dirLight);
    this.mainScene.add(this.pointLight);

    this.glowAmbLight = new THREE.AmbientLight(0xffffff, 1);
    this.glowScene.add(this.glowAmbLight);

    //GLOW
    this.glowPointLight = new THREE.DirectionalLight(0xffffff, 1);
    this.glowPointLight.position.set(4,6,2);
    this.glowScene.add(this.glowPointLight);

    let renderTargetParameters = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBFormat,
      stencilBufer: false
    };
    this.renderTarget = new THREE.WebGLRenderTarget(
                          WIDTH,
                          HEIGHT,
                          renderTargetParameters
                        );


    const renderModelGlow =
      new THREE.RenderPass(this.glowScene, this.glowCamera);
    this.glowComposer =
      new THREE.EffectComposer(this.renderer, this.renderTarget);
    this.glowComposer.addPass(renderModelGlow);

    this.hblur = new THREE.ShaderPass(THREE.HorizontalBlurShader);
    this.vblur = new THREE.ShaderPass(THREE.VerticalBlurShader);


    this.hblur.uniforms["h"].value = this.bluriness/WIDTH;
    this.vblur.uniforms["v"].value = this.bluriness/HEIGHT;
    this.glowComposer.addPass(this.hblur);
    this.glowComposer.addPass(this.vblur);

    this.mainComposer =
      new THREE.EffectComposer(this.renderer, this.renderTarget);
    const renderModel = new THREE.RenderPass(this.mainScene, this.mainCamera);
    this.mainComposer.addPass(renderModel);

    const blendShaderPass =
      new THREE.ShaderPass(AdditiveBlendShader, "tDiffuse1");
    blendShaderPass.uniforms['tDiffuse2'].value =
      this.glowComposer.renderTarget2;
    blendShaderPass.renderToScreen = true;

    this.mainComposer.addPass(blendShaderPass);
  }

  setupSoundBars(barCount) {
    this.soundBarsContainer = new SoundBarsContainer();
    this.soundBarsContainer.createSoundBars(this.mainScene, this.glowScene, barCount);
    this.setCenter();
  }

  setCenter() {
    this.center = new THREE.Vector3(this.soundBarsContainer.getCenterX(), 5, 0);
    this.glowControl.target = this.center;
    this.mainControl.target = this.center;
  }

  drawData(freqArray) {
    this.soundBarsContainer.updateSoundBars(freqArray);
    requestAnimationFrame(this.render.bind(this));
  }

  render () {
    this.mainControl.update();
    this.glowControl.update();

    this.mainComposer.render();
    this.glowComposer.render();
  }
}

export default Renderer;
