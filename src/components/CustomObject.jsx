import React from 'react';
import * as THREE from 'three';
import { useMemo, useRef, useEffect } from 'react';

const CustomObject = () => {

    const verticiesCount = 10 * 3;
        
    const bufferRef = useRef();

    useEffect(() => {
        bufferRef.current.computeVertexNormals()
    }, [])

    const positions = useMemo(() => {
        
        const positions = new Float32Array(verticiesCount * 3);

        for (let i = 0; i < verticiesCount * 3; i++){
            positions[i] = (Math.random() - 0.5) * 3;
        }

        return positions;
    }, []);

    return (
        <>
            <mesh>
                <bufferGeometry ref={bufferRef} >
                    <bufferAttribute 
                    attach="attributes-position" 
                    count={verticiesCount }
                    itemSize={3}
                    array={positions}
                    />
                </bufferGeometry>
                <meshStandardMaterial side={THREE.DoubleSide} color="red" />
            </mesh>
        </>
    );
}

export default CustomObject;
