import { useEffect, useRef } from "react"
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/Addons.js"


const Scene = () => {
    const mountRef = useRef(null)
    useEffect(() => {
        const currentMount = mountRef.current
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(25, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000)
        camera.position.z = 4
        scene.add(camera)
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
        currentMount.appendChild(renderer.domElement)

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true

        const geometry = new THREE.SphereGeometry(0.2, 32, 32)
        const material = new THREE.MeshNormalMaterial({ flatShading: true })


        const node1 = new THREE.Mesh(geometry, material);
        const node2 = new THREE.Mesh(geometry, material);
        const node3 = new THREE.Mesh(geometry, material);
        const node4 = new THREE.Mesh(geometry, material);


        node1.position.set(-1, 1, 0);
        node2.position.set(1, 1, 0);
        node3.position.set(-1, -1, 0);
        node4.position.set(1, -1, 0);
        scene.add(node1);
        scene.add(node2);
        scene.add(node3);
        scene.add(node4);
        // Crear aristas
        const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });

        // Arista entre nodo1 y nodo2
        const edge1Geometry = new THREE.BufferGeometry().setFromPoints([node1.position, node2.position]);
        const edge1 = new THREE.Line(edge1Geometry, edgeMaterial);
        scene.add(edge1);

        // Arista entre nodo2 y nodo4
        const edge2Geometry = new THREE.BufferGeometry().setFromPoints([node2.position, node4.position]);
        const edge2 = new THREE.Line(edge2Geometry, edgeMaterial);
        scene.add(edge2);

        // Arista entre nodo4 y nodo3
        const edge3Geometry = new THREE.BufferGeometry().setFromPoints([node4.position, node3.position]);
        const edge3 = new THREE.Line(edge3Geometry, edgeMaterial);
        scene.add(edge3);

        // Arista entre nodo3 y nodo1
        const edge4Geometry = new THREE.BufferGeometry().setFromPoints([node3.position, node1.position]);
        const edge4 = new THREE.Line(edge4Geometry, edgeMaterial);
        scene.add(edge4);
        const animate = () => {
            controls.update()
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()
        renderer.render(scene, camera)

        return () => {
            currentMount.removeChild(renderer.domElement)
        }
    }, [])
    return (
        <div className="contenedor3D" style={{ width: '100%', height: '100vh' }} ref={mountRef}>
        </div>
    )
}

export default Scene