import {
    Engine, Scene, FreeCamera, Vector3, HemisphericLight, SpotLight, Vector4, DynamicTexture, ParticleSystem,
    Color4, Texture, MeshBuilder, SceneLoader, PickingInfo, Sound, GlowLayer, StandardMaterial, Color3,
    ArcRotateCamera,
    Size,
    CubeTexture
} from "@babylonjs/core";
import '@babylonjs/loaders';
import "@babylonjs/loaders/glTF/2.0";
import * as GUI from '@babylonjs/gui';


//Get the canvas elememt
const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

//Create babylon engine
const engine = new Engine(canvas, true);

const createScene = (): Scene => {

    var filsSet: File

    //Create a scene
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.5, 0.7, 1.0);

    // Add camera and light
    const camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
    const light2 = new HemisphericLight("light", new Vector3(0, 1, 1), scene);
    const light3 = new HemisphericLight("light", new Vector3(1, 0, 1), scene);
    const light4 = new HemisphericLight("light", new Vector3(1, 1, 1), scene);

    // Add GUI
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // UI to toggle values
    let card = MeshBuilder.CreatePlane("card", { size: 5 });
    card.setEnabled(true);
    card.position.z = 1;
    card.position.y = 0.5;
    card.rotation.y = Math.PI / 1;
    card.accessibilityTag = {
        description: "Easter Event Card",
    };


    let adt = GUI.AdvancedDynamicTexture.CreateForMesh(card);

    let wrapFront = new GUI.Rectangle("wrapFront");
    wrapFront.background = "white";
    adt.addControl(wrapFront);

    let url = "https://images.pexels.com/photos/1028723/pexels-photo-1028723.jpeg";
    let thumbnailCustomized = new GUI.Image("Card_ThumbnailImage", url);
    thumbnailCustomized.alt = "Background image";
    thumbnailCustomized.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    thumbnailCustomized.width = "110%";
    thumbnailCustomized.height = "100%";
    thumbnailCustomized.left = "-29px";
    adt.addControl(thumbnailCustomized);

    let text = new GUI.TextBlock("text", "Welcome");
    text.fontSize = 100;
    text.top = "5%";
    text.height = "15%";
    text.width = "90%";
    text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    text.textHorizontalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    text.textWrapping = GUI.TextWrapping.WordWrap;
    wrapFront.addControl(text);
    adt.addControl(text);

    // Create input text field
    const inputText = new GUI.InputText();
    inputText.width = "800px";
    inputText.height = "80px";
    inputText.fontSize = "40";
    inputText.color = "white";
    inputText.top = "100px";
    inputText.background = "black";
    inputText.placeholderText = "Enter your full name...";
    adt.addControl(inputText);

    // //Create simpal text
    // const normaltext = new GUI.TextBlock("name", "");
    // normaltext.fontSize = "40";
    // normaltext.top = "210px";
    // // normaltext.paddingLeftInPixels = 550;
    // normaltext.left = "200px";
    // normaltext.color = "white";
    // normaltext.resizeToFit = true;
    // adt.addControl(normaltext);

    // Create Input imamge button
    const InputImgButton = GUI.Button.CreateSimpleButton("ImageButton", "Upload Image");
    InputImgButton.width = "400px";
    InputImgButton.height = "70px";
    InputImgButton.color = "white";
    InputImgButton.fontSize = "40";
    InputImgButton.background = "green";
    InputImgButton.cornerRadius = 10;
    InputImgButton.top = "210px";
    InputImgButton.left = "-200px";
    InputImgButton.onPointerDownObservable.add(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = () => {
            const files = Array.from(input.files);
            const file = files[0];
            const render = new FileReader();

            // normaltext.text = file.name;
            localStorage.setItem("images", URL.createObjectURL(file));
            // filsSet=file;
        };
        input.click();
    });
    adt.addControl(InputImgButton);

    // Create Next button
    const nextButton = GUI.Button.CreateSimpleButton("nextButton", "Next");
    nextButton.width = "500px";
    nextButton.height = "70px";
    nextButton.color = "white";
    nextButton.fontSize = "40";
    nextButton.background = "green";
    nextButton.cornerRadius = 10;
    nextButton.top = "400px";
    adt.addControl(nextButton);

    // Handle button click
    nextButton.onPointerClickObservable.add(() => {
        if (inputText.text.trim()) {
            localStorage.setItem("userInput", inputText.text); // Save text

            // Call the createScene function
            const scene = createScene1();

            // Render the scene
            engine.runRenderLoop(() => {
                scene.render();
            });

            // Resize the engine on window resize
            window.addEventListener('resize', () => {
                engine.resize();
            });
        } else {
            alert("Please enter a full name and upload image...!");// Validation
        }
    });

    //Return scene...
    return scene;
};


const createScene1 = (): Scene => {

    // Create a scene
    const scene = new Scene(engine);

    const hemisphericLight = new HemisphericLight("hemisphericLight", new Vector3(0, 0.8, 0), scene);
    hemisphericLight.intensity = 0.5; // Ambient

    var light1 = new HemisphericLight("hemiLight", new Vector3(-1, 1, 0), scene);
    // light1.diffuse = new Color3(1, 0, 0);
    // // light1.direction = new Vector3(5,1,5);
    // light1.specular = new Color3(0, 1, 0);
    // light1.groundColor = new Color3(1, 1, 0);

    // Load the sound and use the callback to initialize the button once it's loaded
    const music = new Sound(
        "christmas_sound",
        "sound/audioblocks-christmas-011221-short_H_rTTu85t_NWM.wav",
        scene,
        () => {
            // This callback is called when the sound is fully loaded

            // Create a fullscreen UI for the button
            const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

            // Create the button
            const button = GUI.Button.CreateSimpleButton("soundButton", "Sound Off");
            button.width = "80px";
            button.height = "70px";
            button.color = "white";
            button.background = "green";
            button.top = 20;
            button.paddingRight = 10;
            button.cornerRadius = 100;
            button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
            advancedTexture.addControl(button);

            // Create the button
            const button2 = GUI.Button.CreateSimpleButton("LogoutButton", "Logout");
            button2.width = "80px";
            button2.height = "70px";
            button2.color = "white";
            button2.background = "green";
            button2.top = 100;
            button2.paddingRight = 10;
            button2.cornerRadius = 100;
            button2.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            button2.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
            advancedTexture.addControl(button2);

            // Button click event to toggle sound
            button2.onPointerUpObservable.add(() => {
                localStorage.clear();

                //Call the areate scene function
                const scene = createScene();

                //Render the Scene
                engine.runRenderLoop(() => {
                    scene.render();
                });

                //Resize the engine on window resize
                window.addEventListener('resize', () => {
                    engine.resize();
                });

            });

            // Button click event to toggle sound
            button.onPointerUpObservable.add(() => {
                if (music.isPlaying) {
                    music.pause();
                    button.textBlock.text = "Sound On";
                } else {
                    music.play();
                    button.textBlock.text = "Sound Off";
                }
            });
        },
        { loop: true, autoplay: true }
    );

    // var light = new SpotLight("spotLight", new Vector3(-Math.cos(Math.PI/6), 4 , -Math.sin(Math.PI/6)), new Vector3(0, -1, 0), Math.PI / 4, 1.5, scene);
    // // light.position = new Vector3(18,5,2);
    // light.intensity = 8;

    // Create a FreeCamera
    const camera = new FreeCamera("camera", new Vector3(0.5, 2, 5), scene);
    camera.attachControl(canvas, true);
    camera.screenArea;

    // Enable collision detection for the camera
    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera.ellipsoid = new Vector3(1, 5, 0.5); // Adjust this for the camera's collision shape

    // Handle scroll zooming
    const zoomSpeed = 0.5; // Adjust this value to change zoom speed


    // Create a skybox mesh
    const skybox = MeshBuilder.CreateBox("skyBox", { size: 3000.0 }, scene);
    skybox.infiniteDistance = true; // Makes the skybox follow the camera

    // Create a skybox material
    const skyboxMaterial = new StandardMaterial("skyBoxMaterial", scene);
    skyboxMaterial.backFaceCulling = false; // Render both sides of the skybox
    skyboxMaterial.disableLighting = true;


    // Load the six images for the CubeTexture, using ".png" for each
    skyboxMaterial.reflectionTexture = new CubeTexture("./textures/skybox/", scene, [
        "nightsky_f.jpg",   // front
        "nightsky_bt.jpg",   // bottom
        "nightsky_l.jpg",   // left
        "nightsky_b.jpg",   // back
        "nightsky_t.jpg",   // top
        "nightsky_r.jpg",   //right
    ]);
    skybox.material = skyboxMaterial;


    canvas.addEventListener('wheel', (event) => {
        event.preventDefault(); // Prevent default scrolling
        const zoomDirection = event.deltaY > 0 ? 1 : -1; // Zoom in or out based on scroll direction
        const forward = camera.getDirection(Vector3.Forward());

        // Move the camera along its forward vector
        camera.position.addInPlace(forward.scale(zoomSpeed * zoomDirection));

        // Clamp the camera position to avoid going too close or too far
        const minDistance = 5; // Minimum distance from the target
        const maxDistance = 100; // Maximum distance from the target
        const cameraTarget = new Vector3(5, 2, 5); // The target position to zoom in/out towards

        const distanceToTarget = Vector3.Distance(camera.position, cameraTarget);

        // If the camera goes too close or too far, reset its position
        if (distanceToTarget < minDistance) {
            camera.position = cameraTarget.add(forward.scale(minDistance));
        } else if (distanceToTarget > maxDistance) {
            camera.position = cameraTarget.add(forward.scale(maxDistance));
        }
    });

    // Define specific spots where the user can click to move the camera
    const hotspotPositions = [
        new Vector3(0.5, 2, 5),   // Spot 1
        new Vector3(-15, 2, -9.8), // Spot 2
        new Vector3(-20, 2, -5)   // Spot 3
    ];


    // Create highlighted hotspots at these positions
    hotspotPositions.forEach((position, index) => {
        const hotspot = MeshBuilder.CreateSphere(`hotspot${index}`, { diameter: 0.5 }, scene);
        hotspot.position = position;

        // Create a material with an emissive color to highlight the hotspot
        const highlightMaterial = new StandardMaterial(`highlightMaterial${index}`, scene);
        highlightMaterial.emissiveColor = new Color3(0.1, 0, 0.6); // Yellow glow
        highlightMaterial.diffuseColor = new Color3(0.1, 0, 0.6); // Yellow for more visibility
        hotspot.material = highlightMaterial;

        // Enable interaction with the hotspot
        hotspot.isPickable = true;
        hotspot.checkCollisions = true; // Enable collisions for hotspots
    });

    // Handle click events on the hotspots
    scene.onPointerDown = (evt, pickInfo: PickingInfo) => {
        if (pickInfo.hit && pickInfo.pickedMesh && pickInfo.pickedMesh.name.startsWith("hotspot")) {
            const pickedPosition = pickInfo.pickedMesh.position;

            // Move the camera to the hotspot position
            camera.position = pickedPosition.clone();

            // Set the camera target slightly above the position for an eye-level view
            camera.setTarget(pickedPosition.add(new Vector3(5, 2, 0)));
        }
    };


    // Define initial position and scale for models
    const positionData = { x: 0, y: 0, z: 0, scale: { x: 1, y: 1, z: 1 } };
    const positionData1 = { x: 18, y: -0.5, z: 20, scale: { x: 0.6, y: 0.6, z: 0.5 } };
    const positionData2 = { x: 18, y: 0, z: 2, scale: { x: 0.03, y: 0.03, z: 0.03 } };
    const positionData3 = { x: 7.2, y: 3, z: 1.1, scale: { x: 5, y: 5, z: 5 } };
    const positionData4 = { x: -28, y: 0, z: -7, scale: { x: 0.8, y: 0.8, z: 0.8 } };
    const positionData5 = { x: 25, y: 5, z: 12, scale: { x: 2, y: 2, z: 2 } };
    const positionData6 = { x: 7, y: -0.3, z: 6, scale: { x: 0.5, y: 0.5, z: 0.5 } };
    const positionData7 = { x: 10, y: -0.3, z: 0.1, scale: { x: 2, y: 2, z: 2 } };
    const positionData8 = { x: 6.8, y: 1.5, z: 5.8, scale: { x: 0.8, y: 0.8, z: 0.8 } };


    // var playerMaterial = new StandardMaterial("ground", scene);
    // playerMaterial.diffuseTexture = new Texture("textures/santa_claus.png",scene);

    // Create a plane to display the image
    const plane = MeshBuilder.CreatePlane("plane", { width: 5, height: 5 }, scene);
    plane.position.set(positionData5.x, positionData5.y, positionData5.z); // Position the plane
    plane.scaling.set(positionData5.scale.x, positionData5.scale.y, positionData5.scale.z); // Scale the plane
    plane.rotation = new Vector3(0, 1.1, 0);

    // Create a material with the PNG as a texture
    const material = new StandardMaterial("imageMaterial", scene);
    const getImage = localStorage.getItem("images");
    const texture = new Texture(getImage, scene); // Path to your PNG file
    material.diffuseTexture = texture;
    plane.material = material; // Apply the material to the plane

    // Import meshes
    SceneLoader.ImportMesh("", "textures/", "snowy_cabin_game_assets.glb", scene, (meshes) => {
        meshes.forEach((mesh) => {
            mesh.position.set(positionData.x, positionData.y, positionData.z);
            mesh.scaling.set(positionData.scale.x, positionData.scale.y, positionData.scale.z);
            mesh.checkCollisions = true; // Enable collisions for the cabin
        });
    });

    SceneLoader.ImportMesh("", "textures/", "building_in_christmas.glb", scene, (mesh) => {
        mesh[0].position.set(positionData1.x, positionData1.y, positionData1.z);
        mesh[0].scaling.set(positionData1.scale.x, positionData1.scale.y, positionData1.scale.z);
        mesh[0].checkCollisions = true; // Enable collisions for the building
    });

    SceneLoader.ImportMesh("", "textures/", "christmas_tree_polycraft.glb", scene, (mesh) => {
        mesh[0].position.set(positionData2.x, positionData2.y, positionData2.z);
        mesh[0].scaling.set(positionData2.scale.x, positionData2.scale.y, positionData2.scale.z);
        mesh[0].rotation = new Vector3(0, -1.5, 0); // Set rotation to 90 degrees on Y-axis
        mesh[0].checkCollisions = true; // Enable collisions for the tree
    });

    SceneLoader.ImportMesh("", "textures/", "merry_christmas_sign_with_snow.glb", scene, (mesh) => {
        mesh[0].position.set(positionData3.x, positionData3.y, positionData3.z);
        mesh[0].scaling.set(positionData3.scale.x, positionData3.scale.y, positionData3.scale.z);
        mesh[0].rotation = new Vector3(0, -3.2, 0); // Set rotation to 90 degrees on Y-axis
        mesh[0].checkCollisions = true; // Enable collisions for the tree
    });

    SceneLoader.ImportMesh("", "textures/", "rustborn_-_house_model.glb", scene, (mesh) => {
        mesh[0].position.set(positionData4.x, positionData4.y, positionData4.z);
        mesh[0].scaling.set(positionData4.scale.x, positionData4.scale.y, positionData4.scale.z);
        mesh[0].rotation = new Vector3(0, -1.5, 0); // Set rotation to 90 degrees on Y-axis
        mesh[0].checkCollisions = true; // Enable collisions for the tree
    });

    SceneLoader.ImportMesh("", "textures/", "camp_fire.glb", scene, (mesh) => {
        mesh[0].position.set(positionData6.x, positionData6.y, positionData6.z);
        mesh[0].scaling.set(positionData6.scale.x, positionData6.scale.y, positionData6.scale.z);
        mesh[0].rotation = new Vector3(0, -1.5, 0); // Set rotation to 90 degrees on Y-axis
        mesh[0].checkCollisions = true; // Enable collisions for the tree
    });

    // SceneLoader.ImportMesh("", "textures/", "fire.glb", scene, (mesh) => {
    //     mesh[0].position.set(positionData7.x, positionData7.y, positionData7.z);
    //     mesh[0].scaling.set(positionData7.scale.x, positionData7.scale.y, positionData7.scale.z);
    //     mesh[0].rotation = new Vector3(0, -1.5, 0); // Set rotation to 90 degrees on Y-axis
    //     mesh[0].checkCollisions = true; // Enable collisions for the tree
    // });

    SceneLoader.ImportMesh("", "textures/", "fire_animation.glb", scene, (mesh) => {
        mesh[0].position.set(positionData8.x, positionData8.y, positionData8.z);
        mesh[0].scaling.set(positionData8.scale.x, positionData8.scale.y, positionData8.scale.z);
        mesh[0].rotation = new Vector3(0, -1.5, 0); // Set rotation to 90 degrees on Y-axis
        mesh[0].checkCollisions = true; // Enable collisions for the tree
    });

    // Text properties for title style
    const userInput = localStorage.getItem("userInput") || "Guest";

    const text1 = "Happy New Year";
    const text2 = userInput;
    const fontSize = 130; // Slightly reduced font size for single-line display
    const planeWidth = 10;
    const planeHeight = 5;

    // Create a plane to display the text
    const textPlane1 = MeshBuilder.CreatePlane("textPlane", { width: planeWidth, height: planeHeight }, scene);

    const textPlane2 = MeshBuilder.CreatePlane("textPlane", { width: planeWidth, height: planeHeight }, scene);

    // Set the position and rotation of the text plane
    textPlane1.position = new Vector3(20, 12, 10); // Position it at (20, 8, 11)
    textPlane1.rotation = new Vector3(0, 1.1, 0); // Rotate it slightly around the y-axis

    textPlane2.position = new Vector3(20, 10, 9); // Position it at (20, 8, 11)
    textPlane2.rotation = new Vector3(0, 1.1, 0); // Rotate it slightly around the y-axis

    // Create a larger dynamic texture to fit the text on one line
    const dynamicTexture1 = new DynamicTexture("dynamicTexture", { width: 1050, height: 512, depth: 10 }, scene, false);
    dynamicTexture1.hasAlpha = true;

    const dynamicTexture2 = new DynamicTexture("dynamicTexture", { width: 1050, height: 512, depth: 10 }, scene, false);
    dynamicTexture2.hasAlpha = true;

    // Apply the dynamic texture to the plane's material
    const material1 = new StandardMaterial("textPlaneMaterial", scene);
    const material2 = new StandardMaterial("textPlaneMaterial", scene);

    material1.diffuseTexture = dynamicTexture1;
    material1.opacityTexture = dynamicTexture1;
    material1.emissiveColor = new Color3(1, 0, 0); // Red glow for the first text
    textPlane1.material = material1;

    material2.diffuseTexture = dynamicTexture2;
    material2.opacityTexture = dynamicTexture2;
    material2.emissiveColor = new Color3(1, 0, 0); // Red glow for the second text
    textPlane2.material = material2;

    // Draw the text on the dynamic textures
    dynamicTexture1.drawText(
        text1,
        10, // X position to start drawing
        null, // Automatically center vertically
        `bold ${fontSize}px Arial`,
        "red", // Text color
        "transparent",
        true,
        true // Enable background transparency
    );
    dynamicTexture2.drawText(
        text2,
        10, // X position to start drawing
        null, // Automatically center vertically
        `bold ${fontSize}px Arial`,
        "red", // Text color
        "transparent",
        true,
        true // Enable background transparency
    );


    // // Add a glow layer to the scene for an extra glow effect
    //  const glowLayer = new GlowLayer("glowLayer", scene);
    //  glowLayer.intensity = 1.5; // Adjust intensity as needed

    // Create snow
    const snowParticleSystem = new ParticleSystem("snowParticles", 2000, scene);
    snowParticleSystem.particleTexture = new Texture("textures/image.png", scene);

    // Set the emitter position
    snowParticleSystem.emitter = new Vector3(0, 25, 0); // Emitter position

    // Define the starting and ending boxes for particle emission
    snowParticleSystem.minEmitBox = new Vector3(-28, 0, -28); // Starting box
    snowParticleSystem.maxEmitBox = new Vector3(28, 0, 28); // Ending box

    // Set particle colors using Color4
    snowParticleSystem.color1 = new Color4(1, 1, 1, 1); // White color with full opacity
    snowParticleSystem.color2 = new Color4(1, 1, 1, 1); // White color with full opacity
    snowParticleSystem.colorDead = new Color4(1, 1, 1, 0); // Transparent when dead

    // Set particle size
    snowParticleSystem.minSize = 0.05; // Minimum size
    snowParticleSystem.maxSize = 0.05; // Maximum size

    // Set particle lifetime
    snowParticleSystem.minLifeTime = 5; // Minimum lifetime
    snowParticleSystem.maxLifeTime = 7; // Maximum lifetime

    // Set emission rate and gravity
    snowParticleSystem.emitRate = 500; // Particles per second
    snowParticleSystem.gravity = new Vector3(0, -1, 0); // Downward gravity

    // Set particle direction
    snowParticleSystem.direction1 = new Vector3(-1, -1, 0); // Direction for particles
    snowParticleSystem.direction2 = new Vector3(1, -1, 0); // Direction for particles

    // Disable texture to use a simple color representation
    // snowParticleSystem.particleTexture = null; // No texture

    // Start the particle system
    snowParticleSystem.start();

    // Add a glow layer to the scene to enhance the glow effect on the text
    const glowLayer = new GlowLayer("glowLayer", scene);
    glowLayer.intensity = 0.8; // Adjust intensity to make the glow effect stronger


    // Inside the createScene function
    return scene;

};

const text = localStorage.getItem('userInput');
const GetImage = localStorage.getItem('images');


if (!text || !GetImage) {
    //Call the areate scene function
    const scene = createScene();

    //Render the Scene
    engine.runRenderLoop(() => {
        scene.render();
    });

    //Resize the engine on window resize
    window.addEventListener('resize', () => {
        engine.resize();
    });
} else {
    //Call the areate scene function
    const scene = createScene1();

    //Render the Scene
    engine.runRenderLoop(() => {
        scene.render();
    });

    //Resize the engine on window resize
    window.addEventListener('resize', () => {
        engine.resize();
    });
}
