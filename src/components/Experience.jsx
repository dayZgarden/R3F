import React from "react";
import { extend, useFrame, useThree } from "react-three-fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CustomObject from "./CustomObject";
import * as THREE from "three";

extend({ OrbitControls });
const Experience = () => {

    const sphere = useRef();
    const cube = useRef();
    const groupRef = useRef();

    const { camera, gl } = useThree();

    useFrame((state, delta) => {
        cube.current.rotation.y += delta;
        // groupRef.current.rotation.y += delta;

        // const angle = state.clock.getElapsedTime();
        // camera.position.x = Math.sin(angle) *8 ;
        // camera.position.z = Math.cos(angle) *8 ;
        // camera.lookAt(0,0,0);
    });
    

    return (
        <>

            <orbitControls args={[camera, gl.domElement]} />

            <directionalLight position={[1,2,3]} intensity={2}/>
            <ambientLight intensity={0.5} />

            <group ref={groupRef}>

                <mesh ref={sphere} position={[-2, 0, 0]}>
                    <sphereGeometry />
                    <meshStandardMaterial args={[{ color: "darkorange" }]} />
                </mesh>

                <mesh ref={cube} rotation-y={Math.PI * 0.25} position={[2, 0, 0]} scale={1.5}>
                    <boxGeometry scale={1.5} />
                    <meshStandardMaterial args={[{ color: "mediumpurple" }]} />
                </mesh>

            </group>

            <CustomObject />

            <mesh position={[0, -1, 0]} rotation-x={Math.PI * -0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial side={THREE.DoubleSide} args={[{ color: "greenyellow" }]} />
            </mesh>

        </>
    );
};

export default Experience;
