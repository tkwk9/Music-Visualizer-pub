import {pickHex, degToRadian} from './util';
import THREELib from 'three-js';
const THREE = THREELib([
  // "SubdivisionModifier",
  // "EffectComposer",
  // "ShaderPass",
  // "RenderPass",
  // "HorizontalBlurShader",
  // "VerticalBlurShader",
  // "CopyShader",
  // "MaskPass",
  // "OrbitControls"
]);
class SoundBar {
  constructor(settings, scene, glowScene) {
    this.settings = settings;
    // this.geometry = new THREE.BoxGeometry(...settings.scale);
    // this.geometry = new THREE.CylinderGeometry (0.9, 0.1, 1, 6);
    // this.geometry = new THREE.CylinderGeometry (0.8, 0.6, 1, 10);
    this.geometry = new THREE.SphereGeometry( 0.6, 10, 10 );
    // this.geometry = new THREE.IcosahedronGeometry( 1, 0);
    // this.geometry = new THREE.SphereGeometry( 1, 5, 5 );
//     var length = 0.25, width = 0.25;
//
var shape = new THREE.Shape();
shape.moveTo( 0,0 );
shape.lineTo( 0, 0.5 );
shape.lineTo( 0.5, 0.5 );
shape.lineTo( 0.5, 0 );
shape.lineTo( 0, 0 );

var extrudeSettings = {
	steps: 1,
	amount: 0.5,
	bevelEnabled: true,
	bevelThickness: 0.2,
	bevelSize: 0.2,
	bevelSegments: 4
};

// this.geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

    // var SubdivisionModifier = require('three-subdivision-modifier');
    //
    // var modifier = new SubdivisionModifier( 2 ); // Number of subdivisions
    //
    // modifier.modify( this.geometry );

    this.lowColor = settings.lowColor;
    this.highColor = settings.highColor;

    this.material = new THREE.MeshLambertMaterial({
      color: settings.color,
      emissive: settings.emissive,
      emissiveIntensity: settings.emissiveIntensity,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(...settings.pos);
    this.mesh.rotation.x += degToRadian(90);
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
    this.glowMesh.rotation.x += degToRadian(90);
    // this.glowMesh.scale.set(this.mesh.scale.x + 0.1, this.mesh.scale.y + 0.1, this.mesh.scale.z + 0.1);
    // this.glowMesh.scale.set(this.mesh.scale * 1.1);
    glowScene.add(this.glowMesh);

  }

  // getHeight() {
  //   return this.mesh.scale.y;
  // }

  setHeight(height) {
    this.height = height;
    let modHeight = Math.max(0, this.height);
    let color = pickHex(this.highColor, this.lowColor, modHeight/15);
    this.glowMaterial.color.set(color);
    // this.glowMesh.position.y = modHeight/2 + 0.5;
    // this.glowMesh.scale.y = modHeight + 1;
    this.mesh.position.y = modHeight;
    // this.mesh.position.y = this.glowMesh.position.y + (this.glowMesh.scale.y*2)/3;
    // this.mesh.amount = modHeight + 1;
    // this.glowMesh.position.y = this.mesh.position.y+ 0.5;
    // this.glowMesh.position.y = this.mesh.position.y+ 0.5;
    // this.glowMesh.scale.y = this.mesh.scale.y + 1;
    // this.glowMesh.position.y = this.mesh.position.y;
    // this.glowMesh.amount = this.mesh.amount;
    // this.glowMesh.scale.y = this.mesh.scale.y;
    // this.glowMesh.scale.y = this.mesh.scale.y;
    this.glowMesh.position.y = this.mesh.position.y;
    // this.glowMesh.scale.y = modHeight/2;
    // this.glowMesh.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z );
    // this.glowMesh.scale.set(this.mesh.scale.x, this.mesh.scale.y, this.mesh.scale.z);
  }
}

export default SoundBar;
