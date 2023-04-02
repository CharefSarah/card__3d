import * as THREE from './js/three.module.js';
import { OrbitControls } from './js/OrbitControls.js';

const canvas = document.getElementById('canvas');

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });

// Load the panoramic image and create a texture
const loader = new THREE.TextureLoader();
const texture = loader.load('sea.jpg');

// Create a spherical geometry and map the texture to it
const geometry = new THREE.SphereGeometry(500, 60, 40);

// Flip the geometry inside out
geometry.scale(-1, 1, 1);

const material = new THREE.MeshBasicMaterial({
    map: texture
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Set up the camera and controls
camera.position.set(0, 0, 0.1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.rotateSpeed = 0.3;

function onWindowResize() {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

window.addEventListener('resize', onWindowResize, false);
onWindowResize();

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

function onTiltMouseMove(event) {
    const tiltRotationX = (event.clientY / window.innerHeight - 0.5) * 50;
    const tiltRotationY = (event.clientX / window.innerWidth - 0.5) * 50;

    const card = document.querySelector('.card-wrapper');
    card.style.transform = `rotateX(${tiltRotationX * -1}deg) rotateY(${tiltRotationY}deg)`;

    camera.position.x = tiltRotationY * 0.015; // Divisez par 2 ici
    camera.position.y = -tiltRotationX * 0.015; // Divisez par 2 ici
}

document.addEventListener('mousemove', onTiltMouseMove);