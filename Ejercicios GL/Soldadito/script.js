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
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// -------------------- SOLDADO --------------------
const soldado = new THREE.Group();

const material = new THREE.MeshStandardMaterial({
    color: 'rgba(96, 213, 255, 1)',
    roughness: 0.6,
    metalness: 0.3
});

// Sombrero
const sombrero = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.35, 0.9),
    material
);
sombrero.position.set(0, 2.5, 0);
sombrero.rotation.z = Math.PI / 1;
soldado.add(sombrero);

// Copa
const copa = new THREE.Mesh(
    new THREE.CylinderGeometry(0.52, 0.52, 0.1),
    material
);
copa.position.set(0, 2.2, 0);
copa.rotation.z = Math.PI / 1;
soldado.add(copa);

// Cabeza
const cabeza = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 16, 16),
    material
);
cabeza.position.y = 1.9;
soldado.add(cabeza);

// Cuello
const cuello = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.15, 0.2),
    material
);
cuello.position.set(0, 1.5, 0);
cuello.rotation.z = Math.PI / 1;
soldado.add(cuello);

// Cuerpo
const cuerpo = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.35, 0.7),
    material
);
cuerpo.position.set(0, 1.05, 0);
cuerpo.rotation.z = Math.PI / 1;
soldado.add(cuerpo);

// Cinturón
const cinturon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 0.5),
    material
);
cinturon.position.set(0, 0.7, 0);
cinturon.rotation.z = Math.PI / 1;
soldado.add(cinturon);

// Cintura
const cintura = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.3, 0.5),
    material
);
cintura.position.set(0, 0.4, 0);
cintura.rotation.z = Math.PI / 1;
soldado.add(cintura);

// -------------------- BRAZO IZQUIERDO --------------------
const brazoIzqGroup = new THREE.Group();
brazoIzqGroup.position.set(-0.45, 1.3, 0); // pivote en el hombro

const brazoIzq = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.13, 1),
    material
);
brazoIzq.position.set(0, -0.5, 0);
brazoIzq.rotation.z = Math.PI / 1;

brazoIzqGroup.add(brazoIzq);
soldado.add(brazoIzqGroup);

// -------------------- BRAZO DERECHO --------------------
const brazoDerGroup = new THREE.Group();
brazoDerGroup.position.set(0.45, 1.3, 0); // pivote en el hombro

const brazoDer = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.13, 1),
    material
);
brazoDer.position.set(0, -0.5, 0);
brazoDer.rotation.z = Math.PI / 1;

brazoDerGroup.add(brazoDer);
soldado.add(brazoDerGroup);

// -------------------- PIERNA IZQUIERDA --------------------
const piernaIzqGroup = new THREE.Group();
piernaIzqGroup.position.set(-0.2, 0.05, 0); // pivote en la cadera

const piernaIzq = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.12, 1.3),
    material
);
piernaIzq.position.set(0, -0.5, 0); // baja desde la cadera
piernaIzqGroup.add(piernaIzq);
soldado.add(piernaIzqGroup);

// -------------------- PIERNA DERECHA --------------------
const piernaDerGroup = new THREE.Group();
piernaDerGroup.position.set(0.2, 0.05, 0); // pivote en la cadera

const piernaDer = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.12, 1.3),
    material
);
piernaDer.position.set(0, -0.5, 0);
piernaDerGroup.add(piernaDer);
soldado.add(piernaDerGroup);

// -------------------- ESCENA --------------------
scene.add(soldado);

// -------------------- CONTROLES --------------------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// -------------------- ANIMACIÓN --------------------
let tiempo = 0;

function animate() {
    requestAnimationFrame(animate);

    tiempo += 0.05;

    // Movimiento de brazos
    brazoIzqGroup.rotation.x = Math.sin(tiempo) * 0.6;
    brazoDerGroup.rotation.x = Math.sin(tiempo + Math.PI) * 0.6;

    // Movimiento de piernas (opuesto a los brazos)
    piernaIzqGroup.rotation.x = Math.sin(tiempo + Math.PI) * 0.4;
    piernaDerGroup.rotation.x = Math.sin(tiempo) * 0.4;

    // Giro del soldado
    //soldado.rotation.y += 0.005;

    controls.update();
    renderer.render(scene, camera);
}

animate();

// -------------------- RESIZE --------------------
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
