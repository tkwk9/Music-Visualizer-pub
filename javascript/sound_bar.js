// import THREE from './three';
import THREELib from 'three-js';
const THREE = THREELib(["EffectComposer"]);
// import SubdivisionModifier from 'three-subdivision-modifier';

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
      opacity: 1
    });


    this.glowMesh = new THREE.Mesh(this.geometry, this.glowMaterial);
    this.glowMesh.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z );
    this.glowMesh.scale.set(this.mesh.scale.x, this.mesh.scale.y, this.mesh.scale.z);
    // this.glowMesh.scale.set(this.mesh.scale.x + 1, this.mesh.scale.y + 1, this.mesh.scale.z + 1);
    glowScene.add(this.glowMesh);

  }

  setHeight(height) {
    this.mesh.position.y = height/2 + 1;
    this.mesh.scale.y = height + 1;
    this.glowMesh.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z );
    // this.glowMesh.scale.set(this.mesh.scale.x + 1, this.mesh.scale.y + 1, this.mesh.scale.z + 1);
    this.glowMesh.scale.set(this.mesh.scale.x, this.mesh.scale.y, this.mesh.scale.z);
    // console.log(this.glowMesh.position);
  }
}

export default SoundBar;
