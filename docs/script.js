// Scene + Renderer
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(4, 3, 6);
scene.add(camera);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lights
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 10, 7);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.7));

// Loaders
const gltfLoader = new THREE.GLTFLoader();
const objLoader = new THREE.OBJLoader();
const mtlLoader = new THREE.MTLLoader();

//
// LOAD MAIN SCENE (scene.gltf)
//
gltfLoader.load("./assets/models/snowman/scene.gltf",
    (gltf) => {
        gltf.scene.scale.set(1, 1, 1);
        scene.add(gltf.scene);
        console.log("Scene loaded");
    },
    undefined,
    (err) => console.error("Scene error:", err)
);

//
// LOAD TREE (tree.gltf)
//
gltfLoader.load("./assets/models/snowman/tree.gltf",
    (gltf) => {
        gltf.scene.position.set(3, 0, -2);
        gltf.scene.scale.set(0.8, 0.8, 0.8);
        scene.add(gltf.scene);
        console.log("Tree GLTF loaded");
    }
);

//
// LOAD HOUSE (OBJ + MTL)
//
mtlLoader.load("./assets/models/House/materials.mtl", (materials) => {
    materials.preload();

    objLoader.setMaterials(materials);
    objLoader.load("./assets/models/House/model.obj",
        (obj) => {
            obj.position.set(-3, 0, -2);
            obj.scale.set(0.05, 0.05, 0.05);
            scene.add(obj);
            console.log("House loaded");
        }
    );
});

//
// LOAD CHRISTMAS TREE (OBJ + MTL) — nếu bạn muốn hiện thêm
//
mtlLoader.load("./assets/models/christmas_tree/materials.mtl", (materials) => {
    materials.preload();

    objLoader.setMaterials(materials);
    objLoader.load("./assets/models/christmas_tree/model.obj",
        (obj) => {
            obj.position.set(1.5, 0, 2);
            obj.scale.set(0.05, 0.05, 0.05);
            scene.add(obj);
            console.log("OBJ Christmas Tree loaded");
        }
    );
});

//
// SNOW PARTICLES
//
const textureLoader = new THREE.TextureLoader();
const snowflake = textureLoader.load("./assets/models/snowman/snowflake.png");

const snowGeometry = new THREE.BufferGeometry();
const snowCount = 5000;
const positions = new Float32Array(snowCount * 3);

for (let i = 0; i < snowCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
}

snowGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const snowMaterial = new THREE.PointsMaterial({
    size: 0.15,
    map: snowflake,
    transparent: true,
    depthWrite: false
});

const snow = new THREE.Points(snowGeometry, snowMaterial);
scene.add(snow);

//
// ANIMATE
//
function animate() {
    snow.rotation.y += 0.0005;

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

//
// RESIZE
//
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
