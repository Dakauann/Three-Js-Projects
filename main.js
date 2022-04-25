// import '/node_modules/three/build/three.module.js'
import '/node_modules/three/examples/js/controls/OrbitControls.js'

function sendPageContent() {
    /* Setting up scene renderer and camera */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('.multiDimensionBackground')
    });
    /* Setting up renderer configurations */
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    /* Setting up camera position */
    camera.position.z = window.innerwidth > 300 ? 6.5 : 8;
    
    const light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 5, 0);
    light.rotation.set(0, 0, 0);
    scene.add(light);
    
    const light2 = light.clone();
    scene.add(light2)

    const TetrahedronGeometry = new THREE.TetrahedronGeometry(3, 9);
    const TetrahedronMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
    })

    const Tetrahedron = new THREE.Mesh(TetrahedronGeometry, TetrahedronMaterial);
    scene.add(Tetrahedron);

    const sphereGeometry = new THREE.SphereGeometry(2, 42, 32);
    const sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        wireframe: true
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 0, 0);
    scene.add(sphere);

    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
    const lightHelper = new THREE.PointLightHelper(light, 1);
    // scene.add(lightHelper);

    // const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.update();

    const TweenMax = new TimelineMax().delay(.3)
    // TweenMax.to(Tetrahedron.rotation, 100, {y: 200})

    for (var i = 0; i < 1000; i++) {
        // set random stars on the scene
        const starGeometry = new THREE.SphereGeometry(0.05, 32, 32);
        const starMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true
        });
        const starMesh = new THREE.Mesh(starGeometry, starMaterial);
        starMesh.position.set(
            Math.random() * (-60 - 50) + 50,
            Math.random() * (-60 - 50) + 50,
            Math.random() * (-60 - 50) + 50
        );
        starMesh.side = THREE.FrontSide;
        scene.add(starMesh);
    }

    function animate() {
        Tetrahedron.rotation.x += 0.01;
        Tetrahedron.rotation.y += -0.01;
        
        light.position.x = Math.sin(Tetrahedron.rotation.x) * 5;
        light.position.y = Math.cos(Tetrahedron.rotation.y) * 5;
        light.position.z = Math.cos(Tetrahedron.position.z) * 5;
        
        light2.position.x = -Math.sin(Tetrahedron.rotation.x) * 5;
        light2.position.y = -Math.cos(Tetrahedron.rotation.y) * 5;
        light2.position.z = -Math.cos(Tetrahedron.position.z) * 5;
        
        // camera.position.set(Math.sin(Tetrahedron.rotation.x) * 4, Math.cos(Tetrahedron.rotation.y) * 4, Math.cos(Tetrahedron.position.z) * 3)
        // camera.lookAt(Tetrahedron.position)

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
    
    /* Setting up event listener for window resize */
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    })


    document.addEventListener('scroll', e => {
        let top = document.body.getBoundingClientRect().top;
        top = Math.floor(top / 6)
        // camera.position.z = 10 - (top / 2 / 2);
        // console.log(10 - (top / 2 / 2))
    })
}

document.onload = sendPageContent()