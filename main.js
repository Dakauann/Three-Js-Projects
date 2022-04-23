const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

/* Setting the renderer and the camera position */
camera.position.z = 10;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('#ffffff');
document.body.appendChild(renderer.domElement);

/* Resizing the canvas based on the windows size while resizing the window */
window.addEventListener('resize', e => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/* Creating and adding a cube to the scene */
for (var i = 0; i < 500; i++) {
let cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
let cubeMaterial = new THREE.MeshLambertMaterial({ color: getRandomColor() });
let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = Math.floor(Math.random() * 20) - 10;
cube.position.y = Math.floor(Math.random() * 15) - 5;
cube.position.z = Math.floor(Math.random() * 10) - 5;
cube.rotation.set(0, -2, -1);
cube.scale.set(2, 2, 2);

scene.add(cube)
}

/* Setting the scene light */
let light = new THREE.PointLight('white', 1.2, 25);
light.position.set(0, 0, 10);
scene.add(light);

/* Updating the scene */
let render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render()

window.addEventListener('mousemove', e => {
    e.preventDefault()
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children);
    // intersects.object.material.color.set('#ff0000');
    for (let i = 0; i < intersects.length; i++) {
        if (intersects[0].object) {
            intersects[0].object.material.color.set(getRandomColor());
            this.tl = new TimelineMax().delay(.1)
            this.tl.to(intersects[0].object.position, 1, { x: window.innerWidth / 100, ease: Power2.easeInOut });
            this.tl.to(intersects[0].object.position, 1, { x: -window.innerWidth / 100, ease: Power2.easeInOut });
            this.tl.to(intersects[0].object.position, 1, { x: 0, ease: Power2.easeInOut });
            this.tl.to(intersects[0].object.position, 1, { y: window.innerHeight / 100, ease: Power2.easeInOut });
            this.tl.to(intersects[0].object.position, 1, { y: -window.innerHeight / 100, ease: Power2.easeInOut });
            this.tl.to(intersects[0].object.position, 1, { y: 0, ease: Power2.easeInOut });
        }
    }
})

