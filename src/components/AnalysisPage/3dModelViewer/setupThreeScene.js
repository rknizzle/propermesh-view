import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const setupThreeScene = (canvasRef, objectURL) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xadd8e6);
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.current,
    antialias: true,
  });
  renderer.setPixelRatio(3);

  const light = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.set(-1, 1, 1);
  scene.add(light);

  // Ambient light - overall illumination with no direction, simulates scattered light
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  // Directional lights to simulate sunlight from different angles
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.7);
  directionalLight1.position.set(1, 1, 1); // Position it to light from the top-right
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.7);
  directionalLight2.position.set(-1, 1, -1); // Position it to light from the back-left
  scene.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.7);
  directionalLight3.position.set(0, -1, 0); // Position it to light from the bottom
  scene.add(directionalLight3);

  // Point light - emits light in all directions from a single point, like a lightbulb
  const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
  pointLight.position.set(2, 3, -3);
  scene.add(pointLight);

  const loader = new STLLoader();
  loader.load(objectURL, function (geometry) {
    // const material = new THREE.MeshNormalMaterial();
    const material = new THREE.MeshPhongMaterial({
      // wireframe: true,
      specular: 0xffffff,
      shininess: 100,
    });
    geometry.scale(1, 1, 1);
    const mesh = new THREE.Mesh(geometry, material);

    geometry.computeBoundingBox();
    geometry.center();

    scene.add(mesh);

    // Adjusting the scale based on the model's bounding sphere
    geometry.computeBoundingSphere();
    const scaleFactor = 1 / geometry.boundingSphere.radius;
    mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // Adjusting the camera's position based on the model's size
    // camera.position.z = radius * 1 * scaleFactor + 1;
    camera.position.z = 2;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", () => renderer.render(scene, camera));

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  });

  return () => {
    scene.clear();
  };
};

export default setupThreeScene;
