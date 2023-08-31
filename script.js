import * as THREE from "three";

const container = document.querySelector(".rugCont");

const scene = new THREE.Scene();
scene.background = new THREE.Color ( 0xffffff )
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Kreiranje objekta
const geometry = new THREE.PlaneGeometry(5, 3, 100, 60);
const loader = new THREE.TextureLoader();

loader.load(
	// Load Texture Locally
	"/carpet.png",

	// onLoad callback
	function (texture) {
		const material = new THREE.MeshBasicMaterial({
			map: texture
		});

		const rug = new THREE.Mesh(geometry, material);

		rug.rotation.set(-0.8, 0, Math.PI);

		camera.position.z = 5;
		//camera.position.set(0, 2, 8);

		//Vertices
		let pos = rug.geometry.attributes.position;

		const clock = new THREE.Clock();
		let v = new THREE.Vector3();

		function animate() {
			const t = clock.getElapsedTime();

			for (let i = 0; i < pos.count; i++) {
				v.fromBufferAttribute(pos, i);
				const wavex1 = 0.5 * Math.sin(v.x * 1 + t);
				const wavex2 = 0.25 * Math.sin(v.x * 2 + t * 2);
				const wavex3 = 0.5 * Math.sin(v.y + t);

				pos.setZ(i, wavex1 + wavex2 + wavex3);
			}
			pos.needsUpdate = true;

			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		}
		animate();

		scene.add(rug);
	},
	undefined,

	function (err) {
		console.error("An error happened.");
	}
);
