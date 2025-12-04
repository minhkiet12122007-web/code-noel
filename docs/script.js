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
  // HOUSE (OBJ + MTL)
  const mtlLoader = new THREE.MTLLoader();
  const objLoader = new THREE.OBJLoader();

  mtlLoader.setPath("assets/models/snowman/House/");
  mtlLoader.load("materials.mtl",
    (materials) => {
      materials.preload();
      objLoader.setMaterials(materials);

      objLoader.setPath("assets/models/snowman/House/");
      objLoader.load("model.obj", (object) => {
        object.position.set(0, 0, 0);
        object.scale.set(3, 3, 3);
        scene.add(object);
        console.log("🏠 Nhà đã load");
      }, undefined, (err) => {
        console.error("Lỗi load house.obj:", err);
      });
    },
    undefined,
    (err) => console.error("Lỗi load house.mtl:", err)
  );

  // CHRISTMAS TREE (OBJ + MTL)
  const mtlLoader2 = new THREE.MTLLoader();
  const objLoader2 = new THREE.OBJLoader();

  mtlLoader2.setPath("assets/models/snowman/christmas tree/");
  mtlLoader2.load("materials.mtl",
    (materials) => {
      materials.preload();
      objLoader2.setMaterials(materials);

      objLoader2.setPath("assets/models/snowman/christmas tree/");
      objLoader2.load("model.obj", (object) => {
        object.position.set(5, 0, -2);
        object.scale.set(1.5, 1.5, 1.5);
        scene.add(object);
        console.log("🎄 Cây thông đã load");
      }, undefined, (err) => {
        console.error("Lỗi load tree.obj:", err);
      });
    },
    undefined,
    (err) => console.error("Lỗi load tree.mtl:", err)
  );

  // Music
  const music = new Audio("assets/models/snowman/jingle.mp3");
  music.loop = true;
  music.volume = 0.8;
  music.play().catch(e => {
    // Autoplay may be blocked — that's normal in browsers, so do not crash
    console.warn("Autoplay blocked:", e);
  });

  // Snow texture (example)
  const texLoader = new THREE.TextureLoader();
  const snowflake = texLoader.load("assets/models/snowman/snowflake.png",
    () => {}, // success
    undefined,
    (err) => console.warn("Không load được snowflake.png:", err)
  );
}
