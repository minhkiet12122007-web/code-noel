// ====== THREE.JS SCENE ======
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(10, 6, 10);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('.webgl'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);


// ====== LIGHTING ======
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const dir = new THREE.DirectionalLight(0xffffff, 1);
dir.position.set(5, 10, 5);
scene.add(dir);


// ====== GROUND ======
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);


// ====== HOUSE ======
const houseGroup = new THREE.Group();

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({ color: 0xffe4c4 })
);
walls.position.y = 1.25;
houseGroup.add(walls);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.2, 2, 4),
  new THREE.MeshStandardMaterial({ color: 0x8b0000 })
);
roof.position.y = 3;
roof.rotation.y = Math.PI / 4;
houseGroup.add(roof);

houseGroup.position.set(0, 0, 0);
scene.add(houseGroup);


// ====== CHRISTMAS TREE ======
const treeGroup = new THREE.Group();

// Tree layers
for (let i = 0; i < 3; i++) {
  const leaves = new THREE.Mesh(
    new THREE.ConeGeometry(1.6 - i * 0.3, 2, 10),
    new THREE.MeshStandardMaterial({ color: 0x0b6623 })
  );
  leaves.position.y = 1.8 + i * 0.8;
  treeGroup.add(leaves);
}

// Trunk
const trunk = new THREE.Mesh(
  new THREE.CylinderGeometry(0.25, 0.25, 0.7),
  new THREE.MeshStandardMaterial({ color: 0x8b4513 })
);
trunk.position.y = 0.35;
treeGroup.add(trunk);

treeGroup.position.set(-4, 0, -2);
scene.add(treeGroup);


// ====== FENCE ======
const fence = new THREE.Group();
for (let i = -8; i <= 8; i += 1) {
  const stick = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 1, 0.2),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  stick.position.set(i, 0.5, 5);
  fence.add(stick);
}
scene.add(fence);


// ====== SANTA & SLEIGH ======
const santaGroup = new THREE.Group();

const sleigh = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 0.5, 0.7),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
sleigh.position.y = 0.3;
santaGroup.add(sleigh);

const reindeer = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.5, 0.5),
  new THREE.MeshStandardMaterial({ color: 0x8b4513 })
);
reindeer.position.set(-1.5, 0.3, 0);
santaGroup.add(reindeer);

santaGroup.position.set(0, 6, -10);
scene.add(santaGroup);


// ====== SNOW ======
const snowCount = 600;
const snowGeometry = new THREE.BufferGeometry();
const snowPositions = [];

for (let i = 0; i < snowCount; i++) {
  snowPositions.push(
    (Math.random() * 20) - 10,
    Math.random() * 10,
    (Math.random() * 20) - 10
  );
}
snowGeometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(snowPositions, 3)
);

const snow = new THREE.Points(
  snowGeometry,
  new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05
  })
);
scene.add(snow);


// ====== ANIMATION LOOP ======
let angle = 0;

function animate() {
  requestAnimationFrame(animate);

  angle += 0.003;

  // Camera orbit
  camera.position.x = Math.sin(angle) * 12;
  camera.position.z = Math.cos(angle) * 12;
  camera.lookAt(0, 1.2, 0);

  // Santa flying around
  santaGroup.position.x = Math.sin(angle * 2) * 10;
  santaGroup.position.z = Math.cos(angle * 2) * 10;

  // Snow falling
  const pos = snowGeometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.array[i * 3 + 1] -= 0.03;
    if (pos.array[i * 3 + 1] < 0) pos.array[i * 3 + 1] = 10;
  }
  pos.needsUpdate = true;

  renderer.render(scene, camera);
}
animate();


// ====== RESIZE ======
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
