import { useFrame, useThree } from "react-three-fiber";
import { useRef } from "react";
import * as THREE from "three";
import { MeshReflectorMaterial, Float, Text, Html, TransformControls, OrbitControls, PivotControls } from "@react-three/drei";

const Experience = () => {

    const sphere = useRef();
    const cube = useRef();
    const groupRef = useRef();


    useFrame((state, delta) => {
        // cube.current.rotation.y += delta;
        // groupRef.current.rotation.y += delta;

        // const angle = state.clock.getElapsedTime();
        // camera.position.x = Math.sin(angle) *8 ;
        // camera.position.z = Math.cos(angle) *8 ;
        // camera.lookAt(0,0,0);
    });
    

    return (
        <>

            <OrbitControls makeDefault enableDamping={true} />
            <directionalLight position={[1,2,3]} intensity={2}/>
            <ambientLight intensity={0.5} />

            <group ref={groupRef}>

                <PivotControls 
                    anchor={[0,0,0]} 
                    depthTest={false}
                    fixed={true}
                    scale={100}
                    >
                <mesh ref={sphere} position={[-2, 0, 0]}>
                    <sphereGeometry />
                    <meshStandardMaterial args={[{ color: "darkorange" }]} />
                    <Html 
                        wrapperClass="label" 
                        position={[1,1,0]}
                        center
                        distanceError={6}
                        occlude={[sphere, cube]}
                    >
                        This is a sphere
                    </Html>
                </mesh>
                </PivotControls>

                <mesh ref={cube} position={[2, 0, 0]} scale={1.5}>
                        <boxGeometry scale={1.5} />
                        <meshStandardMaterial args={[{ color: "mediumpurple" }]} />
                </mesh>
                <TransformControls object={cube} mode="translate"></TransformControls>

            </group>

            <mesh position={[0, -1, 0]} rotation-x={Math.PI * -0.5} scale={10}>
                <planeGeometry />
                <MeshReflectorMaterial
                    color={"greenyellow"}
                    resolution={512}
                    blur={[1000, 1000]}
                    mixBlur={1}
                    mirror={.75}
                />

                {/* <meshStandardMaterial side={THREE.DoubleSide} args={[{ color: "greenyellow" }]} /> */}
            </mesh>

            <Float 
                speed={5}
                floatIntensity={2}
                >
                <Text
                    font='./bangers-v20-latin-regular.woff'
                    fontSize={1}
                    color='black'
                    position-y={2}
                    maxWidth={2}
                    textAlign='center'
                >
                    I love R3F
                </Text>
            </Float>
        </>
    );
};

export default Experience;
