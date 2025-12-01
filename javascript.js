window.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("gameCanvas");
    const engine = new BABYLON.Engine(canvas, true);

    const createScene = function() {
        const scene = new BABYLON.Scene(engine);

        // Cámara estilo FPS
        const camera = new BABYLON.UniversalCamera("cam", new BABYLON.Vector3(0, 2, -5), scene);
        camera.attachControl(canvas, true);
        camera.speed = 0.4;

        // Luz
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0,1,0), scene);

        // Piso
        const ground = BABYLON.MeshBuilder.CreateGround("ground", {
            width: 200,
            height: 200
        }, scene);

        const groundMat = new BABYLON.StandardMaterial("gmat", scene);
        groundMat.diffuseColor = new BABYLON.Color3(0.2, 0.7, 0.2);
        ground.material = groundMat;

        // Zombie placeholder
        BABYLON.SceneLoader.ImportMesh(
            "",
            "assets/models/",
            "placeholder_model.gltf",
            scene,
            function(meshes) {
                const zombie = meshes[0];
                zombie.position = new BABYLON.Vector3(0, 0, 5);
            }
        );

        return scene;
    };

    let scene;

    document.getElementById("playBtn").onclick = () => {
        document.getElementById("hud").style.display = "none";
        scene = createScene();
        engine.runRenderLoop(() => scene.render());
    };

    window.addEventListener("resize", () => engine.resize());
});
