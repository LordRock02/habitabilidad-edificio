import { useEffect, useRef, useState } from "react"
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/Addons.js"
import { useEdificio } from "../../utils/global.context"
import Edificio from "../../models/edificio"
import Espacio from "../../models/espacio"
import './Scene.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faSun } from "@fortawesome/free-solid-svg-icons"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { faShuffle } from "@fortawesome/free-solid-svg-icons"
import ModalActividad from "../ModalActividad/ModalActividad"
import ModalAmbiente from "../ModalAmbiente/ModalAmbiente"
import ModalRecomendaciones from "../ModalRecomendaciones/ModalRecomendaciones"
import generarActividadesAleatorias from "../../../main"

const HABITABLE = 1
const SEMIHABITABLE = 2
const NO_HABITABLE = 3


const Scene = () => {
    const edificio = useEdificio()
    const mountRef = useRef(null)
    const [showModalActividad, setShowModalActividad] = useState(false)
    const [showModalAmbiente, setShowModalAmbiente] = useState(false)
    const [showModalRecomendaciones, setShowModalRecomendaciones] = useState(false)
    const [reload, setReload] = useState(false)

    const createTubeBetweenPoints = (startPoint, endPoint, radius, color) => {
        const path = new THREE.LineCurve3(startPoint, endPoint);
        const tubeGeometry = new THREE.TubeGeometry(path, 64, radius, 8, false);
        const edgeMaterial = new THREE.MeshBasicMaterial({ color: color });
        const tubeMesh = new THREE.Mesh(tubeGeometry, edgeMaterial);
        return tubeMesh;
    }

    const getColorNodo = (tipo) => {
        switch (tipo) {
            case 'PASILLO':
                return 0x808080
            case 'ASCENSOR':
                return 0xFFFFFF
            case HABITABLE:
                return 0x00ff00
            case SEMIHABITABLE:
                return 0xFF7F0D
            case NO_HABITABLE:
                return 0xFF4214
            default:
                return 0x896F69
        }
    }

    useEffect(() => {
        setReload(false)
        console.log(`reload ${reload}`)
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

        const aristas = []
        const nodos = {}

        if (edificio instanceof Edificio) {
            for (let piso in edificio.espacios) {
                for (let espacio of edificio.espacios[piso]) {
                    if (espacio instanceof Espacio) {
                        let material
                        if (espacio.tipo != 'LOCAL') {
                            material = new THREE.MeshBasicMaterial({ color: getColorNodo(espacio.tipo) })
                        } else {
                            material = new THREE.MeshBasicMaterial({ color: getColorNodo(espacio.habitabilidad) })
                        }
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
        //(0, 4, 15)
        //(0, 15, 0)
        //(0, 4, -15)
        const sol = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xFFF822 }))
        
        if (edificio instanceof Edificio) {
            sol.position.set(edificio.sol.x, edificio.sol.y, edificio.sol.z)
            console.log(`SOL : ${JSON.stringify(edificio.sol)}`)
        }
        group.add(sol)

        // PARAMETROS DE LA ARISTA

        const radius = 0.025; // Grosor del tubo
        const color = 0x7453FD;

        console.log(aristas)
        aristas.forEach(arista => {
            const nodo1 = nodos[arista[0]]
            const nodo2 = nodos[arista[1]]
            if (nodo1 && nodo2) {
                const edgeTube = createTubeBetweenPoints(nodo1.position, nodo2.position, radius, color);
                group.add(edgeTube)
            }
        });

        group.position.y = -3.5
        const animate = () => {
            controls.update()
            // group.rotation.x += 0.01
            //group.rotation.y += 0.001
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()
        renderer.render(scene, camera)

        return () => {
            currentMount.removeChild(renderer.domElement)
        }
    }, [edificio, reload])
    return (
        <>
            {showModalActividad && <ModalActividad setShowModalActividad={setShowModalActividad} setReload={setReload}  />}
            {showModalAmbiente && <ModalAmbiente setShowModalAmbiente={setShowModalAmbiente} setReload={setReload}/>}
            {showModalRecomendaciones && <ModalRecomendaciones setShowModalRecomendaciones={setShowModalRecomendaciones} />}
            <div className="contenedor3D" style={{ width: '100%', height: '100vh' }} ref={mountRef}>
                <div className="toolsContainer">
                    <a className="option" onClick={() => { setShowModalActividad(true) }}><FontAwesomeIcon icon={faPlus} /></a>
                    <a className="option" onClick={() => { setShowModalAmbiente(true) }}><FontAwesomeIcon icon={faSun} /></a>
                    <a className="option" onClick={() => { setShowModalRecomendaciones(true) }}><FontAwesomeIcon icon={faCircleExclamation} /></a>
                    <a className="option" onClick={() => { generarActividadesAleatorias(edificio); setReload(true) }}><FontAwesomeIcon icon={faShuffle} /></a>
                </div>
            </div>
        </>
    )
}

export default Scene