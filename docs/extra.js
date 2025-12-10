let wait = setInterval(() => {
    if (window.scene) {
        clearInterval(wait);
        console.log("🎉 Scene ready — loading extras...");
        loadExtras(window.scene);
    }
}, 200);

function loadExtras(scene) {

    /* ======== HOUSE ======== */
    const mtlLoader = new THREE.MTLLoader();
    const objLoader = new THREE.OBJLoader();

mtlLoader.setPath("assets/models/snowman/House/");
objLoader.setPath("assets/models/snowman/House/");

    mtlLoader.load("materials.mtl", (materials) => {
        materials.preload();
        objLoader.setMaterials(materials);

        objLoader.load("model.obj", (house) => {
            house.scale.set(5, 5, 5);
            house.position.set(-6, 0, -4);
            scene.add(house);
            console.log("🏠 House loaded!");
        });
    });

    /* ======== CHRISTMAS TREE ======== */
    const mtlLoader2 = new THREE.MTLLoader();
    const objLoader2 = new THREE.OBJLoader();

mtlLoader2.setPath("assets/models/snowman/christmas tree/");
objLoader2.setPath("assets/models/snowman/christmas tree/");


    mtlLoader2.load("materials.mtl", (materials) => {
        materials.preload();
        objLoader2.setMaterials(materials);

        objLoader2.load("model.obj", (tree) => {
            tree.scale.set(3, 3, 3);
            tree.position.set(7, 0, -3);
            scene.add(tree);
            console.log("🎄 Tree loaded!");
        });
    });
}
