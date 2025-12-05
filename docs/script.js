// script.js (phần load house + tree + âm thanh, v.v.)
// Không dùng "import" ở đầu file — dùng global THREE từ CDN

// wait until THREE and the bundle scene exist
(function waitForThreeAndScene() {
  const MAX_TRIES = 100; // ~ 20s (100*200ms)
  let tries = 0;

  const interval = setInterval(() => {
    tries++;
    if (typeof THREE !== "undefined" && window.scene) {
      clearInterval(interval);
      console.log("✅ THREE and scene ready — starting extras");
      startExtras(window.scene);
      return;
    }
    if (tries >= MAX_TRIES) {
      clearInterval(interval);
      console.error("⛔ Timeout waiting for THREE or scene");
    }
  }, 200);
})();

function startExtras(scene) {
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

mtlLoader2.setPath("assets/models/snowman/christmas tree/");
objLoader2.setPath("assets/models/snowman/christmas tree/");

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
// Music — dùng đường dẫn relative so với index.html (trong docs/)

const music = new Audio("jingle.mp3");   // <--- sửa ở đây: bỏ "docs/"
music.loop = true;
music.volume = 0.8;
// không gọi play() tự động nếu trình duyệt chặn autoplay; you can call music.play() khi người dùng bấm nút
music.play().catch(e => {
  console.warn("Autoplay blocked — người dùng cần bấm nút để bật nhạc:", e);
});
document.getElementById('bgm').play().catch(()=>{/* show message */});

  // Snow texture (example)
  const texLoader = new THREE.TextureLoader();
  const snowflake = texLoader.load("assets/models/snowman/snowflake.png",
    () => {}, // success
    undefined,
    (err) => console.warn("Không load được snowflake.png:", err)
  );
}
