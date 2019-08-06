let fcamera, fscene, frenderer;
let froot;
let fpivot;

footerInit();
footerAnimate();


function footerInit() {
    const canvas = document.querySelector('#footer');
    frenderer = new THREE.WebGLRenderer({canvas, antialias: true});
    frenderer.setSize( canvas.clientWidth, canvas.clientHeight );

    fcamera = new THREE.PerspectiveCamera( 45, canvas.clientWidth / canvas.clientHeight, 1, 2000 );
    //camera.position.z = 1150;
    //fcamera.position.z = 200;
    fcamera.position.z = 150;
    fcamera.position.y = 5;
    fcamera.position.x = -10;

    // scene

    fscene = new THREE.Scene();
    fscene.background = new THREE.Color('#F8EDC0');

    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.3 );

     fscene.add( ambientLight );

     var pointLight = new THREE.PointLight( 0xffffff, 0.4 );
     fcamera.add( pointLight );
     fscene.add( fcamera );


    //hemisphere lighting
    {
        const skyColor = 0x5282FF;  // light blue
        const groundColor = 0x0047FF;
        const intensity = .3;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        fscene.add(light);
    }

    //directional lighting
    {
        const color = 0xF9C950;
        const intensity = 0;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(70, 50, 10);
        fscene.add(light);
        //scene.add(light.target);
    }

        // model

    var onProgress = function ( xhr ) { };

    var onError = function () { };

    fpivot = new THREE.Object3D();
    fpivot.position.set(0,0,0);

    let gltfLoader;
    for (let i=-2; i<3; i++) {
        for (let j=-2; j<3; j++) {
            gltfLoader = new THREE.GLTFLoader();
            gltfLoader.load('./images/footer_obj/scene.gltf', (gltf) => {
                froot = gltf.scene;
                froot.rotation.x = 4.6*i*j;
                froot.rotation.z = .1*i*j;

                froot.position.y = 30*j;
                if (j === -1 || j===1) {
                    froot.position.x = 40*i - 20;
                } else {
                    froot.position.x = 40*i;
                }

                fpivot.add(froot);
                //fpivot.position.x += 70;
                //fpivot.position.y += -35;
                //root.position.x = 4.5;
            }, onProgress, onError );
        }
    }

    //window.addEventListener( 'resize', onWindowResize, false );
}

function footerAnimate() {
    if(footer) {
        for (let i=0; i<fpivot.children.length; i++) {
            fpivot.children[i].rotation.y += .07;
        }

    }
    requestAnimationFrame( footerAnimate );
    footerRender();
}

function footerRender() {
    //fcamera.position.x += ( mouseX - fcamera.position.x ) * .03;
    //fcamera.position.y += ( - mouseY - fcamera.position.y ) * .03;
    //fcamera.lookAt( fscene.position );
    frenderer.render( fscene, fcamera );
}

