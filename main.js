import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls'; 


var scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

addStelle()
addTrans()
addArc()


const light = new THREE.DirectionalLight(0xfff0dd, 1);
light.position.set(0, 5, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040); // Add ambient light
scene.add(ambientLight);

camera.position.set(0, 0, 5); // Adjust camera position

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = true;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update(); // Update controls in the animation loop
}

animate();



function addStelle(){
    let geometry = new THREE.SphereGeometry(1, 40,40);
    let material = new THREE.MeshNormalMaterial();
    let sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
}


function addTrans(){
    let geometry = new THREE.BoxGeometry(1.5,1.5,1.5);
    let material = new THREE.MeshNormalMaterial();
    let trans = new THREE.Mesh(geometry, material);
    scene.add(trans);
    trans.position.x = -4;
}

function addArc() {
    const pipePoints = [];
    
    // Get position of the sphere and the box
    const spherePosition = new THREE.Vector3(0, 0, 0);
    const boxPosition = new THREE.Vector3(-4, 0, 0);

    pipePoints.push(spherePosition, boxPosition); // Push sphere and box positions as points

    const pipeCurve = new THREE.CatmullRomCurve3(pipePoints);
    const pipeGeometry = new THREE.TubeGeometry(pipeCurve, 64, 0.5, 8, false); // Create tube geometry along the curve

    const pipeMaterial = new THREE.MeshNormalMaterial();
    const pipeMesh = new THREE.Mesh(pipeGeometry, pipeMaterial);
    scene.add(pipeMesh);
}

