import * as THREE from 'three';
import { TweenMax, TimelineMax } from "gsap/TweenMax";
import { loadImages, fillUp, shuffle } from './modules/helpers';

const OrbitControls = require('three-orbit-controls')(THREE);

export default class Flying {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      1,
      3000,
    );
    this.camera.position.z = 500;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerWidth);

    this.container = document.querySelector('.container');
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.time = 0;

    this.resizeListener();
    this.clickListener();
    this.resize();

    // svg get pointers
    this.size = 50;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.canvas.classList.add('tempcanvas');
    document.body.appendChild(this.canvas);

    this.imgs = ['svgs/galka.svg', 'svgs/heart.svg', 'svgs/javanese-cat.svg', 'svgs/airplane.svg', 'svgs/cloud.svg'];
    this.verticesArr = [];

    loadImages(this.imgs, (imgs) => {
      imgs.forEach(img => this.verticesArr.push(this.getArrayFromImgs(img)));

      this.addObjects();
      this.animate();
    });
  }

  getArrayFromImgs(img) {
    this.ctx.clearRect(0, 0, this.size, this.size);
    this.ctx.drawImage(img, 0, 0, this.size, this.size);
    const { data } = this.ctx.getImageData(0, 0, this.size, this.size);
    const vertices = [];
    for (let y = 0; y < this.size; y += 1) {
      for (let x = 0; x < this.size; x += 1) {
        if (data[((this.size * y) + x) * 4 + 3]) {
          vertices.push([10 * (x - this.size / 2), 10 * (this.size / 2 - y)]);
        }
      }
    }

    return shuffle(fillUp(vertices, 1500));
  }

  clickListener() {
    const that = this;
    let current = 0;

    document.body.addEventListener('click', () => {
      current += 1;
      current %= that.verticesArr.length;
      that.geometry.vertices.forEach((el, ind) => {
        const tlx = new TimelineMax();
        tlx.to(el, 1, {
          x: that.verticesArr[current][ind][0],
          y: that.verticesArr[current][ind][1],
          z: Math.random() * 100,
        });
      });
    });
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
      size: 4,
      vertexColors: THREE.VertexColors,
      map: this.texture,
      alphaTest: 0.5,
    });
    this.geometry = new THREE.Geometry();

    this.verticesArr[0].forEach((el, index) => {
      this.geometry.vertices.push(new THREE.Vector3(el[0], el[1], Math.random() * 100));
      this.geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
    });

    this.instance = new THREE.PointCloud(this.geometry, this.material);

    this.scene.add(this.instance);
  }

  animate() {
    this.time += 0.1;

    requestAnimationFrame(this.animate.bind(this));
    this.geometry.vertices.forEach((particle, index) => {
      particle.add(new THREE.Vector3(Math.sin(this.time + index / 2) / 10, 0, 0));
    });
    this.geometry.verticesNeedUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }
}

const fly = new Flying();
