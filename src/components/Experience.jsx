import { useFrame, useThree } from "react-three-fiber";
import { useRef } from "react";
import * as THREE from "three";
import { AccumulativeShadows, MeshReflectorMaterial, SoftShadows, BakeShadows, useHelper, Float, Text, Html, TransformControls, OrbitControls, PivotControls } from "@react-three/drei";
import { button, useControls } from "leva";
import { Perf } from "r3f-perf";

const Experience = () => {

    const directionalLight = useRef();
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const sphere = useRef();
    const cube = useRef();
    const groupRef = useRef();

    const {perfVisible} = useControls({
        perfVisible: false
    })

    const {position, color, visible } = useControls('sphere', {
        position: {
            value: { x: -2, y: 0,},
            step: 0.01
        },
        color: '#ff0000',
        visible: true,
        clickMe: button(() => { console.log('clicked') }),
    })

    useFrame((state, delta) => {
        // sphere.current.rotation.y += 0.01;
        cube.current.rotation.y += delta * 0.2;
        // groupRef.current.rotation.y += 0.01;
    })

    return (
        <>

            {/* <BakeShadows /> */}
            {/* <SoftShadows frustum={3.75} size={50} near={9.5} samples={17} rings={11} /> */}

            {perfVisible && <Perf position='top-left'/>}
            <OrbitControls makeDefault enableDamping={true} />

            <AccumulativeShadows 
                position={[0, -0.99, 0]}
                scale = {10}
            >
                <directionalLight />
            </AccumulativeShadows>

            <directionalLight 
                castShadow 
                ref={directionalLight} 
                position={[1,2,3]} 
                intensity={2}
                shadow-mapSize={[1024, 1024]}
                shadow-camera-near={1}
                shadow-camera-far={10}
                shadow-camera-top={5}
                shadow-camera-right={5}
                shadow-camera-bottom={ -5}
                shadow-camera-left={-5}
            />
            <ambientLight intensity={0.5} />

            <color attach="background" args={["#171720"]} />

            <group ref={groupRef}>

                {/* <PivotControls 
                    anchor={[0,0,0]} 
                    depthTest={false}
                    fixed={true}
                    scale={100}
                    > */}
                <mesh visible={visible} castShadow ref={sphere} position={[ position.x, position.y, 0 ]}>
                    <sphereGeometry />
                    <meshStandardMaterial args={[{ color: color }]} />
                    {/* <Html 
                        wrapperClass="label" 
                        position={[1,1,0]}
                        center
                        distanceError={6}
                        occlude={[sphere, cube]}
                    >
                        This is a sphere
                    </Html> */}
                </mesh>
                {/* </PivotControls> */}

                <mesh ref={cube} castShadow position={[2, 0, 0]} scale={1.5}>
                        <boxGeometry scale={1.5} />
                        <meshStandardMaterial args={[{ color: "mediumpurple" }]} />
                </mesh>
                {/* <TransformControls object={cube} mode="translate"></TransformControls> */}

            </group>

            <mesh position={[0, -1, 0]} rotation-x={Math.PI * -0.5} scale={10}>
                <planeGeometry />
                {/* <MeshReflectorMaterial
                    color={"greenyellow"}
                    resolution={512}
                    blur={[1000, 1000]}
                    mixBlur={1}
                    mirror={.75}
                /> */}

                <meshStandardMaterial side={THREE.DoubleSide} args={[{ color: "greenyellow" }]} />
            </mesh>

            <Float 
                speed={5}
                floatIntensity={2}
                >
                <Text
                    font='./bangers-v20-latin-regular.woff'
                    fontSize={1}
                    color='white'
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
