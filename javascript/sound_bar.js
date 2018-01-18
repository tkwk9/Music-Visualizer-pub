import THREE from './three';
// import SubdivisionModifier from 'three-subdivision-modifier';

class SoundBar {
  constructor(settings, camera, scene) {
    this.settings = settings;
    this.geometry = new THREE.BoxGeometry(...settings.scale);
    this.material = new THREE.MeshLambertMaterial({
      color: settings.color,
      // emissive: settings.emissive,
      // emissiveIntensity: settings.emissiveIntensity
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(...settings.pos);
    scene.add(this.mesh);

    // this.glowGeometry = this.geometry.clone();
    // this.modifier = new SubdivisionModifier( 2 );
    // this.modifier.modify(this.glowGeometry);
    //
    // this.glowMaterial = new THREE.ShaderMaterial(
    //   {
    //     uniforms: {
    //       "c":   { type: "f", value: 0.2 },
    // 			"p":   { type: "f", value: 0 },
    // 			glowColor: { type: "c", value: new THREE.Color(0x80d863) },
    // 			viewVector: { type: "v3", value: camera.position },
    //       // intensity:
    //     },
    //     vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
	  //     fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    //     side: THREE.FrontSide,
    // 		blending: THREE.AdditiveBlending,
    // 		transparent: true
    //   }
    // );
    // this.glowMesh = new THREE.Mesh(this.glowGeometry, this.glowMaterial);
    // this.glowMesh.position.set(this.mesh.position);
    // this.glowMesh.scale.set(this.mesh.scale);
    // this.glowMesh.scale.multiplyScalar(1.5);
    // scene.add(this.glowMesh);

  }

  setHeight(height) {
    this.mesh.position.y = height/2 + 1;
    this.mesh.scale.y = height + 1;
  }
}

export default SoundBar;
