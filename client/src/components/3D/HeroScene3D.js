import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Sparkles } from '@react-three/drei';

// Floating geometric shapes
const FloatingShape = ({ position, color, speed = 1, rotationAxis = [0, 1, 0] }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.002 * speed;
            meshRef.current.rotation.y += 0.003 * speed;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position}>
                <octahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.8}
                    roughness={0.2}
                    emissive={color}
                    emissiveIntensity={0.2}
                />
            </mesh>
        </Float>
    );
};

// Floating torus
const FloatingTorus = ({ position, color, speed = 1 }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.2 * speed;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <mesh ref={meshRef} position={position}>
                <torusGeometry args={[0.6, 0.2, 16, 32]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.9}
                    roughness={0.1}
                    emissive={color}
                    emissiveIntensity={0.3}
                />
            </mesh>
        </Float>
    );
};

// Floating sphere
const FloatingSphere = ({ position, color, scale = 1 }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial
                color={color}
                metalness={0.7}
                roughness={0.3}
                emissive={color}
                emissiveIntensity={0.1}
                transparent
                opacity={0.8}
            />
        </mesh>
    );
};

// Particle field
const ParticleField = () => {
    const count = 200;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return pos;
    }, [count]);

    const pointsRef = useRef();

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
            pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#60a5fa"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
};

// Main 3D Scene
const Scene = () => {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
            <spotLight position={[0, 10, 0]} intensity={0.8} color="#fff" />

            {/* Floating Shapes */}
            <FloatingShape position={[-3, 2, -2]} color="#3b82f6" speed={0.8} />
            <FloatingShape position={[3, -1, -3]} color="#8b5cf6" speed={1.2} />
            <FloatingShape position={[-2, -2, -4]} color="#06b6d4" speed={0.6} />

            <FloatingTorus position={[4, 1, -2]} color="#3b82f6" speed={0.7} />
            <FloatingTorus position={[-4, 0, -3]} color="#a855f7" speed={0.9} />

            <FloatingSphere position={[2, 2, -5]} color="#60a5fa" scale={1.5} />
            <FloatingSphere position={[-3, -1, -4]} color="#c084fc" scale={1.2} />

            {/* Sparkles */}
            <Sparkles
                count={100}
                scale={15}
                size={2}
                speed={0.3}
                color="#60a5fa"
            />

            {/* Particle Field */}
            <ParticleField />

            {/* Environment for reflections */}
            <Environment preset="night" />
        </>
    );
};

const HeroScene3D = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <Scene />
            </Canvas>
        </div>
    );
};

export default HeroScene3D;
