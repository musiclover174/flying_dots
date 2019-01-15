// import {resizeWatcher} from './modules/helpers';
import * as THREE from 'three';

const OrbitControls = require('three-orbit-controls')(THREE);

export default class Flying {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xEF6C00);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.z = 500;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerWidth);

    this.container = document.querySelector('.container');
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.resizeListener();

    this.resize();
    this.addObjects();
    this.animate();
  }

  resizeListener() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    this.texture = new THREE.TextureLoader().load('i/particle.png');
    this.material = new THREE.PointsMaterial({
      size: 10,
      vertexColors: THREE.VertexColors,
      map: this.texture,
    });
    this.geometry = new THREE.Geometry();

    for (let i = 0; i < 10; i += 1) {
      this.geometry.vertices.push(new THREE.Vector3(0, 0, i));
      this.geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
    }

    this.instance = new THREE.PointCloud(this.geometry, this.material);

    this.scene.add(this.instance);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    // this.geometry.verticesNeedUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }
}

const fly = new Flying();
