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
    this.cameraPosition = [150, 30, 80];
    // this.cameraRotation = [degToRadian(-15), degToRadian(55), degToRadian(15)];

    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.width = 1000;
    this.height = 700;
    this.renderer.setSize(this.width, this.height);

    // Scene Setup
    this.mainScene = new THREE.Scene();
    this.glowScene = new THREE.Scene();

    // Camera Setup
    this.mainCamera =
      new THREE.PerspectiveCamera(30, this.width/this.height, 0.1, 3000);
    this.mainCamera.position.set(...this.cameraPosition);
    // this.mainCamera.rotation.set(...this.cameraRotation);

    this.mainCamera.lookAt(new THREE.Vector3(this.barcount/2 + ((this.barcount/2) * 0.5), 10, 0));

    this.glowCamera =
      new THREE.PerspectiveCamera(30, this.width/this.height, 0.1, 3000);
    this.glowCamera.position.set(...this.cameraPosition);
    // this.glowCamera.rotation.set(...this.cameraRotation);

    this.glowCamera.lookAt(new THREE.Vector3(this.barcount/2 + ((this.barcount/2) * 0.5), 10, 0));
    // this.mainCamera.rotation.set(this.toRadian(-10.29),this.toRadian(75.69),this.toRadian(9.78));

    this.ambLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.mainScene.add(this.ambLight);

    this.pointLight = new THREE.DirectionalLight(0xffffff, 0.75);
    this.pointLight.position.set(4,6,2);
    this.mainScene.add(this.pointLight);

    this.glowAmbLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.glowScene.add(this.glowAmbLight);

    //GLOW
    this.glowPointLight = new THREE.DirectionalLight(0xffffff, 0.5);
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

    this.mainCamera.position.x = x * Math.cos(delta) + z * Math.sin(delta);
    this.mainCamera.position.z = z * Math.cos(delta) - x * Math.sin(delta);
    this.mainCamera.lookAt(new THREE.Vector3(63/2 + ((63/2) * 0.5), 10, 0));

    this.glowCamera.position.x = x * Math.cos(delta) + z * Math.sin(delta);
    this.glowCamera.position.z = z * Math.cos(delta) - x * Math.sin(delta);
    this.glowCamera.lookAt(new THREE.Vector3(63/2 + ((63/2) * 0.5), 10, 0));

    this.glowComposer.render();
    this.mainComposer.render();
  }
}

export default Renderer;
