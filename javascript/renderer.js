import SoundBarsContainer from './sound_bars_container';
import THREELib from 'three-js';
import AdditiveBlendShader from "./shaders/additive_blend_shader";
import {degToRadian} from './util';
const THREE = THREELib([
  "EffectComposer",
  "ShaderPass",
  "RenderPass",
  "HorizontalBlurShader",
  "VerticalBlurShader",
  "CopyShader",
  "MaskPass"
]);

class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: $("#canvas")[0],
      antialias: true
    });

    this.bluriness = 4;
    this.cameraPosition = [290, 20, 140];
    this.cameraRotation = [0, degToRadian(45), 0];

    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.width = 1500;
    this.height = 700;
    this.renderer.setSize(this.width, this.height);

    // Scene Setup
    this.mainScene = new THREE.Scene();
    this.glowScene = new THREE.Scene();

    // Camera Setup
    this.mainCamera =
      new THREE.PerspectiveCamera(20, this.width/this.height, 0.1, 3000);
    this.mainCamera.position.set(...this.cameraPosition);
    this.mainCamera.rotation.set(...this.cameraRotation);

    this.glowCamera =
      new THREE.PerspectiveCamera(20, this.width/this.height, 0.1, 3000);
    this.glowCamera.position.set(...this.cameraPosition);
    this.glowCamera.rotation.set(...this.cameraRotation);

    // this.mainCamera.rotation.set(this.toRadian(-10.29),this.toRadian(75.69),this.toRadian(9.78));

    this.ambLight = new THREE.AmbientLight(0xffffff, 0.25);
    this.mainScene.add(this.ambLight);

    this.pointLight = new THREE.DirectionalLight(0xffffff, 1);
    this.pointLight.position.set(4,6,2);
    this.mainScene.add(this.pointLight);

    this.glowAmbLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.glowScene.add(this.glowAmbLight);

    //GLOW
    // this.glowPointLight = new THREE.DirectionalLight(0xffffff, 0.5);
    // this.glowPointLight.position.set(4,6,2);
    // this.glowScene.add(this.glowPointLight);

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
    requestAnimationFrame(this.render.bind(this));
    this.soundBarsContainer.updateSoundBars(freqArray);
  }

  render () {
    this.mainComposer.render();
    this.glowComposer.render();
  }
}

export default Renderer;
