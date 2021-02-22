

var box;
var topBorder = 38;
var botBorder = -34;
var direction = new THREE.Vector3();
clock = new THREE.Clock();
clock.start();

function init() {
    var scene = new THREE.Scene();

    //create the starting direction  https://threejs.org/editor/
    RandomBallDirection();

    //Variable
    //Speed of the ball
    blockInvicible = false;
    menuGone = false;

    states = ["Menu", "Level01", "Level02", "Level03", "Level04"];
    currentState = states[0];

    scoreWin = 3;
    gameFinished = false;
    ballReset = true;
    ballSpeed = 1.6;

    currentTime = 0;
    oldTime = 0;
    playerScore = 0;
    enemyScore = 0;

    //Create the elements (Use "var" to make it private, and use nothing to make it accessible everywhere)
    player = getBox(1, 4.5, 2);
    enemy = getBox(1, 4.5, 2);
    block = getBox(1, 20, 2);

    powerup1 = getBox(3, 2, 1);
    powerup2 = getBox(3, 2, 1);
    powerup3 = getBox(3, 2, 1);
    powerup4 = getBox(3, 2, 1);

    ball = getSphere(0.6);
    var directionalLight = getDirectionalLight(1);
    var directionalLight2 = getDirectionalLight(1);

    //Planes to make the line in the middle of the screen
    var plane = getPlane(0.35, 2);
    var plane2 = getPlane(0.35, 2);
    var plane3 = getPlane(0.35, 2);
    var plane4 = getPlane(0.35, 2);
    var plane5 = getPlane(0.35, 2);
    var plane6 = getPlane(0.35, 2);
    var plane7 = getPlane(0.35, 2);
    var plane8 = getPlane(0.35, 2);
    var plane9 = getPlane(0.35, 2);
    var plane10 = getPlane(0.35, 2);
    var plane11 = getPlane(0.35, 2);
    var plane12 = getPlane(0.35, 2);
    var plane13 = getPlane(0.35, 2);
    var plane14 = getPlane(0.35, 2);
    var plane15 = getPlane(0.35, 2);
    var plane16 = getPlane(0.35, 2);
    var plane17 = getPlane(0.35, 2);
    var plane18 = getPlane(0.35, 2);
    var plane19 = getPlane(0.35, 2);
    var plane20 = getPlane(0.35, 2);
    var plane21 = getPlane(0.35, 2);

    //Give name to my name to access it outside init()
    plane.name = 'plane-1';

    //Position of the elements
    player.scale.y = 1.1;
    player.position.x = 40;
    player.position.y = 2;
    player.position.z = 0;

    enemy.scale.y = 1.1;
    enemy.position.x = -40;
    enemy.position.y = 2;
    enemy.position.z = 0;

    block.position.x = 0;
    block.position.y = 6;
    block.position.z = 0;

    ball.position.x = 0;
    ball.position.y = 2;
    ball.position.z = 0;

    //Power Ups

    powerup1.material.color.setHex(0xff0000);
    powerup2.material.color.setHex(0xff0000);
    powerup3.material.color.setHex(0xff0000);
    powerup4.material.color.setHex(0xff0000);

    powerup1.position.x = 20;
    powerup1.position.y = 15;

    powerup2.position.x = -20;
    powerup2.position.y = 15;

    powerup3.position.x = 20;
    powerup3.position.y = -15;

    powerup4.position.x = -20;
    powerup4.position.y = -15;

    //Planes to make the line in the middle of the screen
    plane.position.y = 0;
    plane2.position.y = 4;
    plane3.position.y = 8;
    plane4.position.y = 12;
    plane5.position.y = 16;
    plane6.position.y = 20;
    plane7.position.y = 24;
    plane8.position.y = 28;
    plane9.position.y = 32;
    plane10.position.y = 36;
    plane21.position.y = 40;

    plane11.position.y = -4;
    plane12.position.y = -8;
    plane13.position.y = -12;
    plane14.position.y = -16;
    plane15.position.y = -20;
    plane16.position.y = -24;
    plane17.position.y = -28;
    plane18.position.y = -32;
    plane19.position.y = -36;
    plane20.position.y = -40;

    directionalLight.position.y = 30;
    directionalLight.position.z = 35;
    directionalLight.position.x = 35;
    directionalLight.intensity = 1.3;

    directionalLight2.position.y = 30;
    directionalLight2.position.z = 35;
    directionalLight2.position.x = -35;
    directionalLight2.intensity = 1.3;

    //Add elements to the scene
    scene.add(player);
    scene.add(enemy);
    scene.add(block);
    scene.add(ball);
    scene.add(directionalLight);
    scene.add(directionalLight2);

    //Power Ups
    scene.add(powerup1);
    scene.add(powerup2);
    scene.add(powerup3);
    scene.add(powerup4);

    //Planes to make the line in the middle of the screen
    scene.add(plane);
    scene.add(plane2);
    scene.add(plane3);
    scene.add(plane4);
    scene.add(plane5);
    scene.add(plane6);
    scene.add(plane7);
    scene.add(plane8);
    scene.add(plane9);
    scene.add(plane10);
    scene.add(plane11);
    scene.add(plane12);
    scene.add(plane13);
    scene.add(plane14);
    scene.add(plane15);
    scene.add(plane16);
    scene.add(plane17);
    scene.add(plane18);
    scene.add(plane19);
    scene.add(plane20);
    scene.add(plane21);

    //Settings of the camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 2;
    camera.position.z = 90;

    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(0, 0, 0)');
    document.getElementById("webgl").appendChild(renderer.domElement);



    //Very basic conditional to play the sound when 'A' is pressed, just to test it was working
    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 65) {
            sound = new Audio("bim.ogg");
            sound.play();
            console.log("Played.");
        }
    });

    update(renderer, scene, camera);

    return scene;
}

//Movement (By Jaber)
var keyState = {};

var upPressedMenu = false;
var upPressed = false;
var downPressed = false;
var upPressed2 = false;
var downPressed2 = false;

document.addEventListener("keydown", keyDownHandlerMenu, false);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler2, false);
document.addEventListener("keyup", keyUpHandler2, false);

function keyDownHandlerMenu(e) {
    //Hotkey to start game is "Enter"
    if (e.keyCode == "32") {
        upPressedMenu = true;
    }
}

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

function keyDownHandler2(e) {
    //Hotkey to go up is "d"
    if (e.keyCode == "38") {
        upPressed2 = true;
    }

    //Hotkey to go down is "q"
    else if (e.keyCode == "40") {
        downPressed2 = true;
    }
}

function keyUpHandler2(e) {
    //Hotkey to go up is "d"
    if (e.keyCode == "38") {
        upPressed2 = false;
    }
    //Hotkey to go down is "q"
    else if (e.keyCode == "40") {
        downPressed2 = false;
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
    var geometry = new THREE.SphereGeometry(size, 12, 12);
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
function getPlane(width, depth) {
    var geometry = new THREE.PlaneGeometry(/*width*/width,/*depth*/ depth);
    var material = new THREE.MeshPhongMaterial({
        color: 'rgb(250, 250, 250)',
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

    //Respawn the ball
    if (ball.position.x < -75 && ballReset) {
        enemyScore++;
        document.getElementById("enemyScore").innerHTML = enemyScore;
        ballReset = false;
        if (enemyScore < scoreWin)
        {
            sound = new Audio("Sounds/dead.mp3");
            sound.play();

            setTimeout(function () {
                ball.position.x = 0;
                ball.position.y = 0;
                RandomBallDirection();
                ballSpeed = ballSpeed * (-1);
                ballReset = true;
                blockInvicible = true;
                
                setTimeout(function () {
                    blockInvicible = false;
                }, 300);
            }, 1500);
        }
        else {
            sound = new Audio("Sounds/lose.mp3");
            sound.play();
        }
    }
    else if (ball.position.x > 75 && ballReset) {
        
        playerScore++;
        document.getElementById("playerScore").innerHTML = playerScore;
        ballReset = false;
        if (playerScore < scoreWin) {
            sound = new Audio("Sounds/dead.mp3");
            sound.play();

            setTimeout(function () {
                ball.position.x = 0;
                ball.position.y = 0;
                RandomBallDirection();
                ballSpeed = ballSpeed * (-1);
                ballReset = true;
            }, 1500);
        }
        else {
            sound = new Audio("Sounds/win.mp3");
            sound.play();
        }
    }

    if (enemyScore >= scoreWin) {
        gameFinished = true;
        document.getElementById("messageGame").innerHTML = "You Lose!";
        ballSpeed = 0;
        ball.position.y = 100;
    }
    else if (playerScore >= scoreWin) {
        gameFinished = true;
        document.getElementById("messageGame").innerHTML = "You Win!";
        ballSpeed = 0;
        ball.position.y = 100;
    }
    //Delta (used for collision)
    currentTime = clock.getElapsedTime();


    //Finite State Machine
    console.log(currentState);

    switch (currentState) {
        case "Menu":
            StartGame();
            break;
        case "Level01":
            PlayerMovement();
            //EnemyMovement();
            BlockMovement();
            AIMovement();
            BallMovement(); //Ball movement  https://threejs.org/editor/
            break;
        case "Level02":
            PlayerMovement();
            //EnemyMovement();
            AIMovement();
            BallMovement(); //Ball movement  https://threejs.org/editor/
            break;
    }


    //Get plane to use it
    var plane = myScene.getObjectByName('plane-1');

    //Collision
    if (blockInvicible == false) {
        var collidableMeshList = [player, enemy, block];
    }
    else {
        var collidableMeshList = [player, enemy];
    }
    var collidablePowerUp = [powerup1, powerup2, powerup3, powerup4];
    var originPoint = ball.position.clone();

    for (var vertexIndex = 0; vertexIndex < ball.geometry.vertices.length; vertexIndex++) {
        var localVertex = ball.geometry.vertices[vertexIndex].clone();
        var rotation_matrixc = new THREE.Matrix4();
        var globalVertex = localVertex.applyMatrix4(ball.matrix);
        var directionVector = globalVertex.sub(ball.position);

        var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
        var collisionResults = ray.intersectObjects(collidableMeshList);
        var collisionResultsPowerUp = ray.intersectObjects(collidablePowerUp);

        deltaTimeCol = currentTime - oldTime;

        //For Debug Purposes:
        //console.log("Time: " + clock.getElapsedTime());
        //console.log("Delta Time: " + deltaTimeCol);

        if (collisionResults.length > 0 && collisionResults[0].distance <= directionVector.length() && deltaTimeCol > 0.5) {
            // Collision detected:
            oldTime = currentTime;

            ballSpeed = ballSpeed * (-1);
            RandomBallDirection();
            //console.log(ballSpeed);
            //console.log("Hit Collision = ");
        }

        if (collisionResultsPowerUp.length > 0 && collisionResultsPowerUp[0].distance <= directionVector.length() ) {
            // Collision detected with a powerup:
            if (ballSpeed > 0) {
                player.scale.y = 0.5;
                player.material.color.setHex(0x00ff00);

                powerup1.material.color.setHex(0x00ff00);
                powerup2.material.color.setHex(0x00ff00);
                powerup3.material.color.setHex(0x00ff00);
                powerup4.material.color.setHex(0x00ff00);
                setTimeout(function () {
                    powerup1.material.color.setHex(0xff0000);
                    powerup2.material.color.setHex(0xff0000);
                    powerup3.material.color.setHex(0xff0000);
                    powerup4.material.color.setHex(0xff0000);
                    player.material.color.setHex(0xffffff);
                }, 350);

                setTimeout(function () {
                    player.scale.y = 1.1;
                }, 12000);
            }
            else if (ballSpeed < 0) {
                enemy.scale.y = 0.5;
                enemy.material.color.setHex(0x00ff00);

                powerup1.material.color.setHex(0x00ff00);
                powerup2.material.color.setHex(0x00ff00);
                powerup3.material.color.setHex(0x00ff00);
                powerup4.material.color.setHex(0x00ff00);
                setTimeout(function () {
                    powerup1.material.color.setHex(0xff0000);
                    powerup2.material.color.setHex(0xff0000);
                    powerup3.material.color.setHex(0xff0000);
                    powerup4.material.color.setHex(0xff0000);
                    enemy.material.color.setHex(0xffffff);
                }, 350);

                setTimeout(function () {
                    enemy.scale.y = 1.1;
                }, 12000);
            }
        }
    }

    requestAnimationFrame(function () {
        update(myRenderer, myScene, myCamera);
    })
}

//Click Enter to Start Game
function StartGame()
{
    if (upPressedMenu)
    {
        if (menuGone == false) {
            menuGone = true;

            document.getElementById("menuImage").style.display = "none";
            sound = new Audio("Sounds/enterGame.mp3");
            sound.play();

            setTimeout(function () {
                currentState = states[1];
            }, 1500);
        }
    }
}


//Movement direction when clicked (by Jaber)
speed = 2;

//Vs AI Movement
function AIMovement() {
    AISpeed = 0.8;
    if ((ball.position.y - player.position.y) > 0.5 && ball.position.y < 38) {
        player.position.y += AISpeed;
    }
    else if ((player.position.y - ball.position.y) > 0.5 && ball.position.y > -34) {
        player.position.y -= AISpeed;
    }
    else if (ball.position.y > 38 || ball.position.y < -34) {}
    else
    {
        player.position.y = ball.position.y;  //It's a perfect AI 
    }
}

//Block Movement
function BlockMovement() {
    BlockSpeed = 0.2;
    if ((ball.position.y - block.position.y) > 0.5 && ball.position.y < 38) {
        block.position.y += BlockSpeed;
    }
    else if ((block.position.y - ball.position.y) > 0.5 && ball.position.y > -34) {
        block.position.y -= BlockSpeed;
    }
    else if (ball.position.y > 38 || ball.position.y < -34) { }
    else {
        block.position.y = ball.position.y;  //It's a perfect AI 
    }
}


//2 players
function PlayerMovement() {
    if (upPressed && enemy.position.y < topBorder) {
        enemy.position.y += speed;
    }
    else if (downPressed && enemy.position.y > botBorder) {
        enemy.position.y -= speed;
    }
}

function EnemyMovement() {
    if (upPressed2 && player.position.y < topBorder) {
        player.position.y += speed;
    }
    else if (downPressed2 && player.position.y > botBorder) {
        player.position.y -= speed;
    }
}

function BallMovement() {
    if (ball.position.y < botBorder || ball.position.y > topBorder && gameFinished == false)
    {
        direction.y = - direction.y;
        sound = new Audio("Sounds/touchWall.mp3");
        sound.play();
    }
    ball.translateX(direction.x * ballSpeed);
    ball.translateY(direction.y * ballSpeed);
    
}

function RandomBallDirection() {
    direction.x = Math.random() + 0.5;
    direction.y = Math.random();
    direction.normalize();
    sound = new Audio("Sounds/collision.mp3");
    sound.play();
}

var myScene = init();
