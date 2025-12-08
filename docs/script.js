/* ======== HOUSE ========= */
const mtlLoader = new THREE.MTLLoader();
const objLoader = new THREE.OBJLoader();

mtlLoader.setPath("assets/models/snowman/House/");
objLoader.setPath("assets/models/snowman/House/");

mtlLoader.load("materials.mtl", (materials) => {
    materials.preload();
    objLoader.setMaterials(materials);

    objLoader.load("model.obj", (house) => {
        house.scale.set(4, 4, 4);
        house.position.set(-5, 0, -5);
        house.rotation.y = Math.PI / 3;

        scene.add(house);
        console.log("🏠 House loaded!");
    });
});


/* ======== CHRISTMAS TREE ========= */
const mtlLoader2 = new THREE.MTLLoader();
const objLoader2 = new THREE.OBJLoader();

mtlLoader2.setPath("assets/models/snowman/christmas_tree/");
objLoader2.setPath("assets/models/snowman/christmas_tree/");

mtlLoader2.load("materials.mtl", (materials) => {
    materials.preload();
    objLoader2.setMaterials(materials);

    objLoader2.load("model.obj", (tree) => {
        tree.scale.set(2, 2, 2);
        tree.position.set(6, 0, -3);
        tree.rotation.y = Math.PI / 4;

        scene.add(tree);
        console.log("🎄 Tree loaded!");
    });
});


  // Music
const bgm = document.getElementById("bgm");
bgm.volume = 0.8;

document.getElementById("musicToggle").onclick = () => {
    if (bgm.paused) {
        bgm.play();
        musicToggle.innerText = "🔊 Music: ON";
    } else {
        bgm.pause();
        musicToggle.innerText = "🔇 Music: OFF";
    }
};
