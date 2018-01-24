import {pickHex, degToRadian} from './util';
import THREELib from 'three-js';
const THREE = THREELib();

class SoundBar {
  constructor(settings, scene, glowScene) {
    this.settings = settings;
    this.geometry = new THREE.SphereGeometry( 0.6, 10, 10 );

    this.lowColor = settings.lowColor;
    this.highColor = settings.highColor;

    this.material = new THREE.MeshLambertMaterial({
      color: settings.color,
      transparent: true,
      opacity: 1,
      emissive: settings.emissive,
      emissiveIntensity: settings.emissiveIntensity,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(...settings.pos);
    this.x = this.mesh.position.x;
    scene.add(this.mesh);

    // this.glowMaterial = new THREE.MeshBasicMaterial({
    //   color: settings.glowColor,
    //   transparent:true,
    //   opacity: settings.glowOpacity
    // });
    this.glowMaterial = new THREE.MeshLambertMaterial({
      color: settings.glowColor,
      transparent: true,
      opacity: 1,
      emissive: 0xffffff,
      emissiveIntensity: 0.2,
    });


    this.glowMesh = new THREE.Mesh(this.geometry, this.glowMaterial);
    this.glowMesh.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z );
    this.glowMesh.scale.set(this.mesh.scale.x, this.mesh.scale.y, this.mesh.scale.z);
    glowScene.add(this.glowMesh);

  }

  setHeight(height) {
    this.height = height;
    let modHeight = Math.max(0, this.height);
    let color = pickHex(this.highColor, this.lowColor, modHeight/15);
    this.glowMaterial.color.set(color);
    this.glowMaterial.emissive.set(color);
    this.mesh.position.y = modHeight;
    this.glowMesh.position.y = this.mesh.position.y;
  }
}

export default SoundBar;
