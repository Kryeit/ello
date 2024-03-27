export function createBabylonInstance(playerName, canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error("Canvas element not found");
        return;
    }
    setCanvasSize();

    function setCanvasSize() {
        canvas.style.width = '100%';
    }

    function loadBabylonScript() {
        var babylonScript = document.createElement('script');
        babylonScript.src = 'https://cdn.babylonjs.com/babylon.js';
        babylonScript.onload = function () {
            var loadersScript = document.createElement('script');
            loadersScript.src = 'https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js';
            loadersScript.onload = function () {
                startBabylonScript();
            };
            document.head.appendChild(loadersScript);
        };
        document.head.appendChild(babylonScript);
    }

    function startBabylonScript() {
        const engine = new BABYLON.Engine(canvas, true);

        const createScene = function () {
            const scene = new BABYLON.Scene(engine);

            const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 3, 4, new BABYLON.Vector3(0, 1, 0), scene);

            const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 5, 0), scene);
            light.intensity = 0.7;

            const skinUrl = `https://api.mojang.com/users/profiles/minecraft/${playerName}`;

            fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(skinUrl)}`)
                .then(response => response.json())
                .then(data => {
                    const uuid = data.id;
                    const skinTextureUrl = `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`;

                    const material = new BABYLON.StandardMaterial("playerSkinMaterial", scene);
                    material.diffuseTexture = new BABYLON.Texture(skinTextureUrl, scene);

                    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
                    sphere.material = material;

                })
                .catch(error => {
                    console.error("Error fetching player data:", error);
                });

            return scene;
        };

        const scene = createScene();

        scene.clearColor = new BABYLON.Color4(0.898, 0.898, 0.898, 1);

        engine.runRenderLoop(function () {
            scene.render();
        });

        window.addEventListener("resize", function () {
            engine.resize();
            setCanvasSize();
        });

        canvas.onresize = function () {
            engine.resize();
        };

        var isHovering = false;
        var previousMouseX = 0;
        var initialRotation = 0;

        scene.meshes.forEach(function (mesh) {
            initialRotation = mesh.rotation.y;
        });

        canvas.addEventListener('mouseenter', function () {
            isHovering = true;
        });

        canvas.addEventListener('mouseleave', function () {
            isHovering = false;
            previousMouseX = 0;
            resetRotation();
        });

        canvas.addEventListener('mousemove', function (event) {
            if (isHovering) {
                const mouseX = event.clientX;
                const canvasWidth = canvas.width || canvas.clientWidth;

                if (previousMouseX !== 0) {
                    const deltaX = mouseX - previousMouseX;
                    rotateMeshes(deltaX, canvasWidth);
                }

                previousMouseX = mouseX;
            }
        });

        canvas.addEventListener('touchstart', function (event) {
            event.preventDefault();
            isHovering = true;
            previousMouseX = event.touches[0].clientX;
        });

        canvas.addEventListener('touchmove', function (event) {
            event.preventDefault();
            if (isHovering) {
                const mouseX = event.touches[0].clientX;
                const canvasWidth = canvas.width || canvas.clientWidth;

                if (previousMouseX !== 0) {
                    const deltaX = mouseX - previousMouseX;
                    rotateMeshes(deltaX, canvasWidth);
                }

                previousMouseX = mouseX;
            }
        });

        canvas.addEventListener('touchend', function () {
            isHovering = false;
            previousMouseX = 0;
            resetRotation();
        });

        window.addEventListener('mouseup', function () {
            isHovering = false;
        });

        function rotateMeshes(deltaX, canvasWidth) {
            scene.meshes.forEach(function (mesh) {
                mesh.rotation.y += (deltaX / canvasWidth) * Math.PI * 2;
            });
        }

        function resetRotation() {
            const animationTime = 25;
            const easingFunction = new BABYLON.BezierCurveEase(0.42, 0, 0.58, 1);

            scene.meshes.forEach(function (mesh) {
                const initialRotationY = mesh.rotation.y;
                const targetRotationY = initialRotation;

                const initialQuaternion = new BABYLON.Quaternion.RotationYawPitchRoll(initialRotationY, 0, 0);
                const targetQuaternion = new BABYLON.Quaternion.RotationYawPitchRoll(targetRotationY, 0, 0);

                const animation = new BABYLON.Animation(
                    "resetRotationAnimation",
                    "rotationQuaternion",
                    60,
                    BABYLON.Animation.ANIMATIONTYPE_QUATERNION,
                    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
                );

                const keyFrames = [];
                keyFrames.push({
                    frame: 0,
                    value: initialQuaternion
                });
                keyFrames.push({
                    frame: animationTime,
                    value: targetQuaternion
                });

                animation.setKeys(keyFrames);
                animation.setEasingFunction(easingFunction);

                mesh.animations = [];
                mesh.animations.push(animation);

                scene.beginAnimation(mesh, 0, animationTime, false, 1, () => {
                    mesh.rotation.y = targetRotationY;
                    mesh.rotationQuaternion = null;
                });
            });
        }
    }

    loadBabylonScript();
}
