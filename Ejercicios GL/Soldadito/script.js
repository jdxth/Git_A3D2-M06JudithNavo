import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// -------------------- ESCENA --------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color('rgba(147, 183, 245, 1)');

// -------------------- CÁMARA --------------------
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 2, 6);

// -------------------- RENDERER --------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// -------------------- LUCES --------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// -------------------- SOLDADITO --------------------
const soldado = new THREE.Group();

// Material sencillo (plomo)
const material = new THREE.MeshStandardMaterial({
    color: 'rgba(255, 115, 0, 1)',
    roughness: 0.6,
    metalness: 0.3
});

// Sombrero
const sombrero = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 0.9),
    material
);
sombrero.position.set(0, 2.7, 0);
sombrero.rotation.z = Math.PI / 1;
soldado.add(sombrero);

// Cabeza
const cabeza = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 16, 16),
    material
);
cabeza.position.y = 1.9;
soldado.add(cabeza);

// Cuerpo
const cuerpo = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 1.1, 0.3),
    material
);
cuerpo.position.y = 1;
soldado.add(cuerpo);

// Brazo izquierdo
const brazoIzq = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.1, 1),
    material
);
brazoIzq.position.set(-0.5, 1, 0);
brazoIzq.rotation.z = Math.PI / 1.1;
soldado.add(brazoIzq);

// Brazo derecho
const brazoDer = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.1, 1),
    material
);
brazoDer.position.set(0.5, 1, 0);
brazoDer.rotation.z = Math.PI / 0.9;
soldado.add(brazoDer);

// Pierna izquierda
const piernaIzq = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.12, 1),
    material
);
piernaIzq.position.set(-0.2, 0, 0);
soldado.add(piernaIzq);

// Pierna derecha
const piernaDer = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.12, 1),
    material
);
piernaDer.position.set(0.2, 0, 0);
soldado.add(piernaDer);

// Añadimos el soldado a la escena
scene.add(soldado);

// --------------------
// CONTROLES
// --------------------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// --------------------
// ANIMACIÓN
// --------------------
function animate() {
    requestAnimationFrame(animate);

    // Giro suave del soldadito
    soldado.rotation.y += 0.005;

    controls.update();
    renderer.render(scene, camera);
}

animate();

// --------------------
// RESIZE
// --------------------
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});