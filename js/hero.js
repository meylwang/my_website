'use strict';

/* global THREE */

var container;

var camera, scene, renderer;
var root, pivot;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var mouseX = 0, mouseY = 0;

init();
animate();

function init() {
    //console.log('hero init called');

    const canvas = document.querySelector('#hero');
    renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    renderer.setSize( canvas.clientWidth, canvas.clientHeight );

    camera = new THREE.PerspectiveCamera( 45, canvas.clientWidth / canvas.clientHeight, 1, 2000 );
    //camera.position.z = 1150;
    camera.position.z = 200;

    // scene

    scene = new THREE.Scene();
    scene.background = new THREE.Color('#F8EDC0');

    /**var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );

    scene.add( ambientLight );

    var pointLight = new THREE.PointLight( 0xffffff, 0.5 );
    camera.add( pointLight );
    scene.add( camera );
     **/
    //hemisphere lighting
    {
        const skyColor = 0xDDE0F7;  // light blue
        const groundColor = 0x3164E7;
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
    }

    //directional lighting
    {
        const color = 0xF9C950;
        const intensity = 0;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(70, 50, 10);
        scene.add(light);
        //scene.add(light.target);
    }

    // Orbit Controls
    /**const controls = new THREE.OrbitControls(camera, canvas);
    controls.enablePan = false;
    controls.enableZoom=false;
    controls.update();
**/

    // model

    var onProgress = function ( xhr ) {

        if ( xhr.lengthComputable ) {

            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round( percentComplete) + '% downloaded' );

        }

    };

    var onError = function () { };

    pivot = new THREE.Object3D();
    pivot.position.set(0,0,0);

    var gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load('./images/melinda_obj/melinda2.gltf', (gltf) => {
        root = gltf.scene;
        root.rotation.x = 4.6;
        root.rotation.y = .1;
        root.position.y += -10;
        root.position.x += 30;
        root.position.z += -45;

        pivot.add(root);
        pivot.position.x += 70;
        pivot.position.y += -35;
        scene.add(pivot);
        //root.position.x = 4.5;
    }, onProgress, onError );

    /**
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( './images/melinda_obj/' );
    mtlLoader.load( 'melinda_A_silverwhite.mtl', function ( materials ) {

            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('./images/melinda_obj/');
            objLoader.load( 'melinda_A_silverwhite.obj', function ( object ) {
            //objLoader.load( 'melinda2.obj', function ( object ) {
                object.traverse(function(child) {
                    if(child instanceof THREE.Mesh)
                    {
                        child.material.shading = THREE.SmoothShading;
                    }
                });
                object.position.y = -200;
                object.position.x = 150;
                scene.add( object );

            }, onProgress, onError );

        } );
        **/

    window.addEventListener( 'resize', onWindowResize, false );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}

function onWindowResize() {
    console.log("onWindowResize called");
    const canvas = document.querySelector('#hero');
    windowHalfX = canvas.clientWidth / 2;
    windowHalfY = canvas.clientHeight / 2;

    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( canvas.clientWidth, canvas.clientHeight );

}

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
}

function animate() {
    if (root) {
        pivot.rotation.y += .01;

        //console.log(root.rotation.y);
    }
    if(hero) {
        requestAnimationFrame( animate );
        render();
    }
}

function render() {
    camera.position.x += ( mouseX - camera.position.x ) * .03;
    camera.position.y += ( - mouseY - camera.position.y ) * .03;
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}
