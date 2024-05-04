import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const setupThreeScene = (canvas, objectURL, fileType) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

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

  const disposables = [];

  let loader;
  if (fileType === "stl") {
    loader = new STLLoader();
  } else if (fileType === "ply") {
    loader = new PLYLoader();
  } else {
    throw new Error(`Unsupported file type`);
  }

  loader.load(objectURL, function (geometry) {
    const materialOptions = {
      specular: 0xffffff,
      shininess: 100,
      flatShading: true,
    };

    if (fileType === "ply") {
      geometry.computeVertexNormals();
      materialOptions.vertexColors = true;
    }

    const material = new THREE.MeshPhongMaterial(materialOptions);

    const mesh = new THREE.Mesh(geometry, material);

    // TODO: refactor this edge code
    // Create a thick edge around the border of the model for easier viewing

    // only show edges with 15 degrees or more angle between faces
    const thresholdAngle = 15;
    const outlineEdgeGeometry = new THREE.EdgesGeometry(
      geometry,
      thresholdAngle
    );
    // NOTE: linewidth doesn't seem to change anything on firefox
    const outlineEdgeMaterial = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 1.5,
    });
    const outlineEdgeMesh = new THREE.LineSegments(
      outlineEdgeGeometry,
      outlineEdgeMaterial
    );
    scene.add(outlineEdgeMesh);

    disposables.push(outlineEdgeGeometry, outlineEdgeMaterial, outlineEdgeMesh);

    geometry.center();
    outlineEdgeGeometry.center();

    scene.add(mesh);

    // Adjusting the scale based on the model's bounding sphere
    geometry.computeBoundingSphere();
    const scaleFactor = 1 / geometry.boundingSphere.radius;

    mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
    outlineEdgeMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

    camera.position.z = 2;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", () => renderer.render(scene, camera));

    disposables.push(geometry, material, mesh, controls);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  });

  return () => {
    // Dispose of all disposables
    disposables.forEach((disposable) => {
      if (disposable.dispose) {
        disposable.dispose();
      } else if (disposable instanceof THREE.Mesh) {
        // Remove from scene and dispose geometry and material
        scene.remove(disposable);
        if (disposable.geometry) disposable.geometry.dispose();
        if (disposable.material) {
          if (disposable.material instanceof Array) {
            disposable.material.forEach((material) => material.dispose());
          } else {
            disposable.material.dispose();
          }
        }
      }
    });

    renderer.dispose();

    scene.clear();
  };
};

export default setupThreeScene;
