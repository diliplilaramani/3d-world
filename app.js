function main() {

    //scene, camera, renderer - 3 musts!
    
    // 1 - start
    const canvas = document.querySelector('#c');
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    //Camera
    const fov = 50;
    const aspect = width/height;
    const near = 0.1;
    const far = 2000;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 1;

    //Renderer
    const renderer = new THREE.WebGLRenderer({canvas});

    new THREE.OrbitControls(camera, canvas);
    
    //Scene
    const scene = new THREE.Scene()
    const loader = new THREE.TextureLoader()
    const texture = loader.load(
        "https://threejs.org/manual/examples/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg",
        () => {
            const rt = new THREE.WebGLCubeRenderTarget(height);
            rt.fromEquirectangularTexture(renderer, texture);
            scene.background = rt.texture;
            // scene.background = texture;
        }
    );

    function render() {
        
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix()
        renderer.setSize(width, height, false);

        // render frames per second based on browser
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();