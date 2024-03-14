import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import PropTypes from "prop-types";

//TODO: Add loading spinner if a file is taking a second to load

const ModelViewer = ({ fileFor3dModel }) => {
  const canvasRef = useRef(null);
  const [objectURL, setObjectURL] = useState(null);

  useEffect(() => {
    if (fileFor3dModel) {
      const url = URL.createObjectURL(fileFor3dModel);
      setObjectURL(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [fileFor3dModel]);

  useEffect(() => {
    if (!objectURL) return;

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
    renderer.setPixelRatio(window.devicePixelRatio);

    scene.add(new THREE.AmbientLight(0x404040));
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(-1, 1, 1);
    scene.add(light);

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
  }, [objectURL]);

  return (
    <canvas
      ref={canvasRef}
      style={{ backgroundColor: "gray", width: "50%", height: "50%" }}
    />
  );
};

ModelViewer.propTypes = {
  fileFor3dModel: PropTypes.object,
};

export default ModelViewer;
