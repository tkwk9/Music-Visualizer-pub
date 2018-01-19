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
    // let color = pickHex([255, 255, 255], [0, 0, 0], height/70);
    // this.material.color.set(color);
    this.mesh.position.y = height/2 + 1;
    this.mesh.scale.y = height + 1;
    this.glowMesh.position.y = height/2 + 1;
    this.glowMesh.scale.y = height + 1;
    // this.glowMesh.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z );
    // this.glowMesh.scale.set(this.mesh.scale.x, this.mesh.scale.y, this.mesh.scale.z);
  }
}

export default SoundBar;
