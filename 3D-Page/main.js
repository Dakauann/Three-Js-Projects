import '../node_modules/three/examples/js/controls/OrbitControls.js';

/* Creating scene and renderer engine */
let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.background')
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio = window.devicePixelRatio;

/* Texture Loader */
let TextureLoader = new THREE.TextureLoader();

/* Setting up ambient light */
// let ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
// scene.add(ambientLight);

//0.001

scene.background = TextureLoader.load('./Textures/Estrelas.jpg');
/* Creating camera */
let Camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
Camera.position.set(0, 0, 30);

const MarsGeometry = new THREE.SphereGeometry(3, 32, 32);
const MarsMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: TextureLoader.load('./Textures/Marte.jpg'),
    bumpMap: TextureLoader.load('./Textures/Marte_NM.jpg'),
});
const Mars = new THREE.Mesh(MarsGeometry, MarsMaterial);
Mars.position.set(0, 0, -5);
scene.add(Mars);

const EarthGeometry = new THREE.SphereGeometry(3, 32, 32);
const EarthMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: TextureLoader.load('./Textures/Terra.jpg'),
    bumpMap: TextureLoader.load('./Textures/Terra_NM.png'),
});
const Earth = new THREE.Mesh(EarthGeometry, EarthMaterial);
Earth.position.set(0, 0, 0);
scene.add(Earth);

const Moon = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: TextureLoader.load('./Textures/Lua.jpg'),
    bumpMap: TextureLoader.load('./Textures/Lua.jpg'),
}));
Moon.position.set(Earth.position.x, Earth.position.y, Earth.position.z);
scene.add(Moon);

const Sun = new THREE.Mesh(new THREE.SphereGeometry(5, 32, 32), new THREE.MeshStandardMaterial({
    color: 'yellow',
    map: TextureLoader.load('./Textures/Sol.jpg'),
    // bumpMap: TextureLoader.load('./Textures/Sol.jpg'),
    fog: false
}));
Sun.position.set(0, 0, 0);
scene.add(Sun);

const Venus = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: TextureLoader.load('./Textures/Venus.jpg'),
    aoMap: TextureLoader.load('./Textures/Venus_NM.jpg'),
}));
Venus.position.set(0, 0, 0);
scene.add(Venus);

const Jupiter = new THREE.Mesh(new THREE.SphereGeometry(5, 32, 32), new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: TextureLoader.load('./Textures/Jupiter.jpg'),
    aoMap: TextureLoader.load('./Textures/Jupiter.jpg'),
}));
Jupiter.position.set(0, 0, 0);
scene.add(Jupiter);

const spotLight = new THREE.SpotLight( 0xffffff, 5, 300, 300, 0, 1 );
spotLight.position.set( 0, 100, 0 );

scene.add( spotLight );

// let SpotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(SpotLightHelper);

// let controls = new THREE.OrbitControls(Camera, renderer.domElement);
let TweenMax = new TimelineMax().delay(.1);

const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, Camera);

    Earth.position.x = Math.sin(Date.now() * 0.00007) * -40;
    Earth.position.z = Math.cos(Date.now() * 0.00007) * -40;
    Earth.rotation.y += -0.002;
    
    Mars.position.x = Math.sin(Date.now() * 0.00005) * -90;
    Mars.position.z = Math.cos(Date.now() * 0.00005) * -90;
    Mars.rotation.y += -0.01;

    Venus.position.x = Math.sin(Date.now() * 0.0001) * -20;
    Venus.position.z = Math.cos(Date.now() * 0.0001) * -20;
    Venus.rotation.y += -0.01;

    Jupiter.position.x = Math.sin(Date.now() * 0.00004) * -70;
    Jupiter.position.z = Math.cos(Date.now() * 0.00004) * -70;
    Jupiter.rotation.y += -0.003;

    Moon.position.x = Earth.position.x + Math.sin(Date.now() * 0.001) * 7.2;
    Moon.position.z = Earth.position.z + Math.cos(Date.now() * 0.001) * 7.2;
    Moon.rotation.y += -0.01;

    Camera.position.x = Sun.position.x + Math.sin(Date.now() * 0.0002) * -160;
    Camera.position.z = Sun.position.z + Math.cos(Date.now() * 0.0002) * -160;
    Camera.position.y = Sun.position.y + Math.sin(Date.now() * 0.0002) * -160;
    Camera.lookAt(Sun.position);
    // Camera.position.set(Moon.position.x + 10, Moon.position.y + 10, Moon.position.z + 10);
}

render()

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio = window.devicePixelRatio;
    Camera.aspect = window.innerWidth / window.innerHeight;
    Camera.updateProjectionMatrix();
});

