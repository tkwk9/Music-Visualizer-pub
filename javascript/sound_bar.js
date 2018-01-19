import THREELib from 'three-js';
import {pickHex} from './util';
const THREE = THREELib();

class SoundBar {
  constructor(settings, scene, glowScene) {
    this.settings = settings;
    this.geometry = new THREE.BoxGeometry(...settings.scale);
    this.material = new THREE.MeshLambertMaterial({
      color: settings.color,
      emissive: settings.emissive,
      emissiveIntensity: settings.emissiveIntensity
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(...settings.pos);
    scene.add(this.mesh);

    //glow

    this.glowMaterial = new THREE.MeshBasicMaterial({
      color: settings.glowColor,
      transparent:true,
      opacity: settings.glowIntensity
    });


    this.glowMesh = new THREE.Mesh(this.geometry, this.glowMaterial);
    this.glowMesh.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z );
    this.glowMesh.scale.set(this.mesh.scale.x, this.mesh.scale.y, this.mesh.scale.z);
    glowScene.add(this.glowMesh);

  }

  setHeight(height) {
    let modHeight = Math.max(0, height);
    let color = pickHex([209, 2, 171], [74, 50, 130], modHeight/15);
    this.glowMaterial.color.set(color);
    this.mesh.position.y = modHeight/2 + 0.1;
    this.mesh.scale.y = modHeight + 0.1;
    this.glowMesh.position.y = this.mesh.position.y;
    this.glowMesh.scale.y = this.mesh.scale.y;
    // this.glowMesh.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z );
    // this.glowMesh.scale.set(this.mesh.scale.x, this.mesh.scale.y, this.mesh.scale.z);
  }
}

export default SoundBar;
