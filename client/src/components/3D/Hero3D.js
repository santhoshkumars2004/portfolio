import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedSphere = () => {
    const mesh = useRef(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        mesh.current.distort = 0.4 + Math.sin(t) * 0.2;
    });

    return (
        <Sphere args={[1, 100, 200]} scale={2.5} ref={mesh}>
            <MeshDistortMaterial
                color="#8352FD"
                attach="material"
                distort={0.4}
                speed={1.5}
                roughness={0}
            />
        </Sphere>
    );
};

const Hero3D = () => {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 5, 2]} />
            <AnimatedSphere />
        </Canvas>
    );
};

export default Hero3D;
