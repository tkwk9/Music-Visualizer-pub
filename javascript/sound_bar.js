import THREE from './three';

class SoundBar {
  constructor(settings, scene) {
    this.settings = settings;
    this.geometry = new THREE.BoxGeometry(...settings.scale);
    this.material = new THREE.MeshLambertMaterial({color: settings.color});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(...settings.pos);
    scene.add(this.mesh);
  }

  setHeight(height) {
    this.mesh.position.y = height/2 + 1;
    this.mesh.scale.y = height + 1;
  }
}

export default SoundBar;
