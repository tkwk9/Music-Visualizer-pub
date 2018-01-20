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
    // this.cameraPosition = [157, 30, 60];

    this.cameraPosition = [-19.629262331960803, 47.16337406952673, 70.5704374318499];

    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.width = 1200;
    this.height = 700;
    this.renderer.setSize(this.width, this.height);

    // Scene Setup
    this.mainScene = new THREE.Scene();
    this.glowScene = new THREE.Scene();

    this.center = new THREE.Vector3(67/2 + ((67/2) * 0.5), 10, 0);

    // Camera Setup
    this.mainCamera =
      new THREE.PerspectiveCamera(40, this.width/this.height, 0.1, 3000);
    window.cam = this.mainCamera;
    this.mainCamera.position.set(...this.cameraPosition);
    this.mainCamera.lookAt(this.center);

    this.mainControl = new THREE.OrbitControls(this.mainCamera);
    this.mainControl.autoRotateSpeed = -2;
    this.mainControl.autoRotate = false;
    this.mainControl.target = this.center;
    this.mainControl.update();


    this.glowCamera =
      new THREE.PerspectiveCamera(40, this.width/this.height, 0.1, 3000);
    this.glowCamera.position.set(...this.cameraPosition);
    this.glowCamera.lookAt(this.center);

    this.glowControl = new THREE.OrbitControls(this.glowCamera);
    this.glowControl.autoRotateSpeed = -2;
    this.glowControl.autoRotate = false;
    this.glowControl.target = this.center;
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
                          this.width,
                          this.height,
                          renderTargetParameters
                        );


    const renderModelGlow =
      new THREE.RenderPass(this.glowScene, this.glowCamera);
    this.glowComposer =
      new THREE.EffectComposer(this.renderer, this.renderTarget);
    this.glowComposer.addPass(renderModelGlow);

    this.hblur = new THREE.ShaderPass(THREE.HorizontalBlurShader);
    this.vblur = new THREE.ShaderPass(THREE.VerticalBlurShader);


    this.hblur.uniforms["h"].value = this.bluriness/this.width;
    this.vblur.uniforms["v"].value = this.bluriness/this.height;
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
  }

  drawData(freqArray) {
    this.soundBarsContainer.updateSoundBars(freqArray);
    requestAnimationFrame(this.render.bind(this));
  }

  render () {
    let x = this.mainCamera.position.x;
    let z = this.mainCamera.position.z;
    let delta = 0.005;

    this.mainControl.update();
    this.glowControl.update();

    // this.mainCamera.position.x = x * Math.cos(delta) + z * Math.sin(delta);
    // this.mainCamera.position.z = z * Math.cos(delta) - x * Math.sin(delta);
    this.mainCamera.lookAt(this.center);

    // this.glowCamera.position.x = x * Math.cos(delta) + z * Math.sin(delta);
    // this.glowCamera.position.z = z * Math.cos(delta) - x * Math.sin(delta);
    this.glowCamera.lookAt(this.center);

    this.mainComposer.render();
    this.glowComposer.render();
  }
}

export default Renderer;
