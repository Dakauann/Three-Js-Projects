import '/node_modules/three/examples/js/controls/OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.background')
});
const textureLoader = new THREE.TextureLoader();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 10;

const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

for (var i = 0; i < 10; i++) {
    const geometry = new THREE.SphereGeometry(.5, 40, 40);
    const material = new THREE.MeshBasicMaterial({
        color: 'red'
    });
    const Proton = new THREE.Mesh(geometry, material);
    Proton.name = 'Proton'
    scene.add(Proton);

    const NeutronGeometry = new THREE.SphereGeometry(.5, 40, 40);
    const NeutronMaterial = new THREE.MeshBasicMaterial({
        color: 'blue'
    });
    const Neutron = new THREE.Mesh(NeutronGeometry, NeutronMaterial);
    Neutron.name = 'Neutron'
    scene.add(Neutron);
}

const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update()

const VerticalRing = new THREE.RingGeometry(2.97, 3, 100);
const VerticalRingMaterial = new THREE.MeshBasicMaterial({
    color: 'white',
    side: THREE.DoubleSide
});
const VerticalRingMesh = new THREE.Mesh(VerticalRing, VerticalRingMaterial);
// scene.add(VerticalRingMesh);

const SemiVerticalLeftRing = VerticalRingMesh.clone();
SemiVerticalLeftRing.rotation.set(Math.PI / 2, 0, 0);
// scene.add(SemiVerticalLeftRing);

const SemiVerticalRightRing = VerticalRingMesh.clone();
SemiVerticalRightRing.rotation.set(1.5, -2.3, 0)
// scene.add(SemiVerticalRightRing);

const SpherePositionIndicator = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10), new THREE.MeshBasicMaterial({
    color: 'white'
}));
// scene.add(SpherePositionIndicator);

let Eletrons = []

for (var i = 0; i < 20; i++) {
Eletrons.push(new THREE.Mesh(new THREE.SphereGeometry(.2, 40, 40), new THREE.MeshBasicMaterial({
    color: 'white'
})));
Eletrons.map(eletron => {eletron.name = 'Eletron' + Math.round(Math.random() * (0 - 7) + 0)})
}
Eletrons.map(eletron => scene.add(eletron))

function render() {
    requestAnimationFrame(render);

    // Eletron.position.x = Math.sin(Date.now() / 1000) * 3;
    // Eletron.position.y = Math.cos(Date.now() / 1000) * 3;


    scene.traverse(function (object) {
        // console.log(object.name)
        const randonInt = (min, max) => {
            return Math.random() * (max - min) + min
        }
        if (object.name === 'Eletron-1') {
            object.position.x = Math.sin(Date.now() / 500) * 3;
            object.position.y = Math.sin(Date.now() / 500) * 3;
            object.position.z = Math.cos(Date.now() / 500) * 3;
        } 
        if (object.name === 'Eletron0') {
            object.position.x = Math.sin(Date.now() / 500) * -3;
            object.position.y = Math.sin(Date.now() / 500) * -3;
            object.position.z = Math.cos(Date.now() / 500) * -3;
        }
        if (object.name === 'Eletron-2') {
            object.position.x = Math.sin(Date.now() / 500) * -3;
            object.position.y = Math.sin(Date.now() / 500) * 3;
            object.position.z = Math.cos(Date.now() / 500) * 3;
        }
        if (object.name === 'Eletron-3') {
            object.position.x = Math.sin(Date.now() / 500) * 3;
            object.position.y = Math.sin(Date.now() / 500) * -3;
            object.position.z = Math.cos(Date.now() / 500) * -3;
        }
        if (object.name === 'Eletron-4') {
            object.position.x = Math.sin(Date.now() / 500) * -3;
            object.position.y = Math.cos(Date.now() / 500) * 3;
        }
        if (object.name === 'Eletron-5') {
            object.position.x = Math.sin(Date.now() / 500) * -3;
            // object.position.y = Math.cos(Date.now() / 500) * 3;
            object.position.z = Math.cos(Date.now() / 500) * -3;
        }
        if (object.name === 'Eletron-6') {
            object.position.x = Math.sin(Date.now() / 500) * 3;
            // object.position.y = Math.cos(Date.now() / 500) * 3;
            object.position.z = Math.cos(Date.now() / 500) * -3;
        }
        if (object.name === 'Eletron-7') {
            object.position.x = Math.sin(Date.now() / 500) * -3;
            // object.position.y = Math.cos(Date.now() / 500) * 3;
            object.position.z = Math.cos(Date.now() / 500) * 3;
        }
        if (object.name == 'Proton') {
            object.position.x = Math.random() * 0.5 - 0.2;
            object.position.y = Math.random() * 0.5 - 0.2;
            object.position.z = Math.random() * 0.5 - 0.2;
        }
        if (object.name == 'Neutron') {
            object.position.x = Math.random() * 0.5 - 0.2;
            object.position.y = Math.random() * 0.5 - 0.2;
            object.position.z = Math.random() * 0.5 - 0.2;
        }
    });

    // camera.position.x = Math.sin(Date.now() * 0.001) * 10;
    // camera.position.y = Math.cos(Date.now() * 0.001) * 10;
    // camera.position.z = Math.cos(Date.now() * 0.001) * 5;
    // camera.lookAt(scene.position);  
    renderer.render(scene, camera);
}

render()

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})