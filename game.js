window.addEventListener("DOMContentLoaded", function () {

    const canvas = document.getElementById("gameCanvas");
    const playBtn = document.getElementById("playBtn");

    playBtn.addEventListener("click", () => {
        playBtn.style.display = "none";
        startGame();
    });

    function startGame() {
        const engine = new BABYLON.Engine(canvas, true);

        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(0.1, 0.1, 0.1);

        // Cámara
        const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        // Luz
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

        // Suelo
        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);

        // Jugador (cubito temporal solo para confirmar que inicia)
        const player = BABYLON.MeshBuilder.CreateBox("player", { size: 2 }, scene);
        player.position.y = 1;

        engine.runRenderLoop(function () {
            scene.render();
        });

        window.addEventListener("resize", function () {
            engine.resize();
        });
    }
});
