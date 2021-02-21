var box;
clock = new THREE.Clock();
clock.start();

function init() {
    var scene = new THREE.Scene();

    //Variable
    //Speed of the ball
    ballSpeed = 0.5;
    currentTime = 0;
    oldTime = 0;

    //Create the elements (Use "var" to make it private, and use nothing to make it accessible everywhere)
    player = getBox(1, 4.5, 1);
    enemy = getBox(1, 4.5, 1);
    ball = getSphere(0.2);
    var plane = getPlane(20);
    var directionalLight = getDirectionalLight(1);
    var helper = new THREE.CameraHelper(directionalLight.shadow.camera);

    //Give name to my name to access it outside init()
    plane.name = 'plane-1';

    //Position of the elements
    player.position.x = 13;
    player.position.y = 2;
    enemy.position.x = -13;
    enemy.position.y = 2;

    ball.position.x = 0;
    ball.position.y = 2;
    plane.position.z = -10;

    directionalLight.position.y = 30;
    directionalLight.position.z = 35;
    directionalLight.intensity = 1.3;

    //Add elements to the scene
    scene.add(player);
    scene.add(enemy);
    scene.add(ball);
    scene.add(plane);
    scene.add(directionalLight);
    scene.add(helper);

    //Settings of the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 2;
    camera.position.z = 10;

    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(120, 120, 120)');
    document.getElementById("webgl").appendChild(renderer.domElement);

    update(renderer, scene, camera);

    return scene;
}


//Movement (By Jaber)
var keyState = {};

var upPressed = false;
var downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    //Hotkey to go up is "d"
    if (e.key == "d") {
        upPressed = true;
    }

    //Hotkey to go down is "q"
    else if (e.key == "q") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    //Hotkey to go up is "d"
    if (e.key == "d") {
        upPressed = false;
    }
    //Hotkey to go down is "q"
    else if (e.key == "q") {
        downPressed = false;
    }
}

//To create a box
function getBox(w, h, d) {
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshPhongMaterial({
        color: 'rgb(250, 250, 250)'
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.castShadow = true;

    return mesh;
}

//To create a sphere
function getSphere(size) {
    var geometry = new THREE.SphereGeometry(size, 24, 24);
    var material = new THREE.MeshBasicMaterial({
        color: 'rgb(250, 250, 250)'
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh;
}

//To create a plane
function getPlane(size) {
    var geometry = new THREE.PlaneGeometry(/*width*/size,/*depth*/ size);
    var material = new THREE.MeshPhongMaterial({
        color: 'rgb(120, 120, 120)',
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.receiveShadow = true;

    return mesh;
}

//To create a PointLight
function getPointLight(intensity) {
    var light = new THREE.PointLight(0xffffff, intensity);
    light.castShadow = true;

    return light;
}

//To create a SpotLight
function getSpotLight(intensity) {
    var light = new THREE.SpotLight(0xffffff, intensity);
    light.castShadow = true;

    light.shadowBias = 0.001; // Pour corriger le glitch de shadow, a modifier en fonction de la taille de la scene
    light.shadow.mapSize.width = 2048; //Avoir shadow de meilleur qualité, mais consomme performance
    light.shadow.mapSize.height = 2048;//Avoir shadow de meilleur qualité, mais consomme performance
    return light;
}

//To create a Directional Light
function getDirectionalLight(intensity) {
    var light = new THREE.DirectionalLight(0xffffff, intensity);
    light.castShadow = true;

    return light;
}

//Update function that runs every frame
function update(myRenderer, myScene, myCamera) {
    myRenderer.render(
        myScene,
        myCamera,
    );

    //Delta (used for collision)
    currentTime = clock.getElapsedTime();

    //Ball movement
    ball.position.x += ballSpeed;
    console.log("actual speed: " + ballSpeed);

    //Get plane to use it
    var plane = myScene.getObjectByName('plane-1');

    //Collision
    var collidableMeshList = [player, enemy];
    var originPoint = ball.position.clone();

    for (var vertexIndex = 0; vertexIndex < ball.geometry.vertices.length; vertexIndex++) {
        var localVertex = ball.geometry.vertices[vertexIndex].clone();
        var rotation_matrixc = new THREE.Matrix4();
        var globalVertex = localVertex.applyMatrix4(ball.matrix);
        var directionVector = globalVertex.sub(ball.position);

        var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
        var collisionResults = ray.intersectObjects(collidableMeshList);


        deltaTimeCol = currentTime - oldTime;

        //For Debug Purposes:
        //console.log("Time: " + clock.getElapsedTime());
        //console.log("Delta Time: " + deltaTimeCol);

        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() && deltaTimeCol > 1 ) {
            // Collision detected:
            oldTime = currentTime;

            ballSpeed = ballSpeed * (-1);

            //console.log(ballSpeed);
            //console.log("Hit Collision = ");
        }
    }

    //Movement direction when clicked (by Jaber)
    speed = 0.4;
    if (upPressed) {
        enemy.position.y += speed;
    }
    else if (downPressed) {
        enemy.position.y -= speed;
    }

    requestAnimationFrame(function () {
        update(myRenderer, myScene, myCamera);
    })
}
var myScene = init();
