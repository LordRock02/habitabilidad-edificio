import { useEffect, useRef } from "react"
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/Addons.js"
import { useEdificio } from "../utils/global.context"
import Edificio from "../models/edificio"
import Espacio from "../models/espacio"



const Scene = () => {
    const edificio = useEdificio()
    const mountRef = useRef(null)

    function createTubeBetweenPoints(startPoint, endPoint, radius, color) {
        const path = new THREE.LineCurve3(startPoint, endPoint);
        const tubeGeometry = new THREE.TubeGeometry(path, 64, radius, 8, false);
        const edgeMaterial = new THREE.MeshBasicMaterial({ color: color });
        const tubeMesh = new THREE.Mesh(tubeGeometry, edgeMaterial);
        return tubeMesh;
    }
    useEffect(() => {
        const currentMount = mountRef.current
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(25, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000)
        const group = new THREE.Group()
        camera.position.set(0, 0, 20)
        scene.add(camera)
        scene.add(group)
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
        currentMount.appendChild(renderer.domElement)

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true

        //RESIZE
        const resize = () => {
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight
            camera.updateProjectionMatrix()
        }
        window.addEventListener('resize', resize)

        // PARAMETROS DE LA ESFERA

        const geometry = new THREE.SphereGeometry(0.2, 32, 32)
        const material = new THREE.MeshNormalMaterial({ flatShading: true })

        const aristas = []
        const nodos = {}

        if (edificio instanceof Edificio) {
            for (let piso in edificio.espacios) {
                for (let espacio of edificio.espacios[piso]) {
                    if (espacio instanceof Espacio) {
                        const nodo = new THREE.Mesh(geometry, material)
                        nodo.position.set(espacio.x, espacio.y, espacio.z)
                        nodos[espacio.id] = nodo
                        group.add(nodo)
                        for (let vecino of espacio.vecinos) {
                            const arista = [espacio.id, vecino]
                            if (!aristas.some(arista => arista[0] === vecino && arista[1] === espacio.id)) {
                                aristas.push(arista)
                            }
                        }
                    }
                }
            }
        }

        // PARAMETROS DE LA ARISTA

        const radius = 0.025; // Grosor del tubo
        const color = 0x00ff00;

        console.log(aristas)
        aristas.forEach(arista => {
            const nodo1 = nodos[arista[0]]
            const nodo2 = nodos[arista[1]]
            if (nodo1 && nodo2) {
                const edgeTube = createTubeBetweenPoints(nodo1.position, nodo2.position, radius, color);
                group.add(edgeTube)
            }
        });

        group.position.y= -3.5
        const animate = () => {
            controls.update()
            // group.rotation.x += 0.01
            group.rotation.y += 0.001
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()
        renderer.render(scene, camera)

        return () => {
            currentMount.removeChild(renderer.domElement)
        }
    }, [edificio])
    return (
        <div className="contenedor3D" style={{ width: '100%', height: '100vh' }} ref={mountRef}>
        </div>
    )
}

export default Scene