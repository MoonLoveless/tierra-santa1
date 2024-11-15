'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  useGLTF,
  Stars,
  Sky,
  Html,
  Text3D,
  Cloud,
} from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const CameraAnimation = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useFrame(({ clock, camera }) => {
    if (!animationComplete) {
      const t = Math.min(1, clock.getElapsedTime() * 0.5);
      const newPosition = new THREE.Vector3(0, 30, 250).lerp(new THREE.Vector3(0, 30, 70), t);
      camera.position.copy(newPosition);

      if (t === 1) {
        setAnimationComplete(true);
      }
    }
  });

  return <OrbitControls enableZoom={true} maxDistance={300} minDistance={50} />;
};

const Home = () => {
  const [showDescription, setShowDescription] = useState(false);
  const textContainerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.style.opacity = 0;
      setTimeout(() => {
        textContainerRef.current.style.transition = 'opacity 2s ease-in-out';
        textContainerRef.current.style.opacity = 1;
      }, 2000);
    }
  }, []);

  const handleTitleClick = () => {
    setShowDescription(!showDescription);
  };

  const handleButtonClick = () => {
    navigate('/deforestation');
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Navbar />
      <Canvas
        shadows
        camera={{ position: [0, 30, 250], fov: 70 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          opacity: 0.8,
        }}
      >
        <Suspense
          fallback={
            <Html center>
              <div>Cargando...</div>
            </Html>
          }
        >
          <TierraSantaModel />
          <TierraSantaTitle initial onClick={handleTitleClick} />
          <Sky
            distance={450000}
            sunPosition={[0, -1, -1]}
            inclination={0}
            azimuth={0.1}
            mieCoefficient={0.01}
            mieDirectionalG={0.7}
            rayleigh={1}
            turbidity={10}
          />
          <Stars
            radius={300}
            depth={60}
            count={7000}
            factor={10}
            saturation={0}
            fade
            speed={0}
          />
          <CloudGroup />
        </Suspense>

        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 20, 5]} intensity={0.5} castShadow />
        <pointLight position={[-20, 20, 10]} intensity={1} />
        <CameraAnimation />
      </Canvas>

      {showDescription && (
        <div
          ref={textContainerRef}
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '10%',
            padding: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            textAlign: 'center',
            borderRadius: '10px',
            zIndex: 2,
            opacity: 1,
          }}
        >
          Tierra Santa es una aplicación web informativa<br />
          sobre el medio ambiente mediante<br />
          modelos y objetos en 3D. <br /> <br />
          Nuestra misión es brindar el conocimiento adecuado y <br />
          necesario para cuidar y proteger nuestro<br />
          medioambiente, haciendo que nuestro<br />
          planeta siga siendo esa TIERRA maravillosa.
        </div>
      )}

      <button
        onClick={handleButtonClick}
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '15px 40px',
          backgroundColor: '#FFFFFF',
          color: '#4CAF50',
          border: '2px solid #4CAF50',
          borderRadius: '30px',
          fontSize: '20px',
          fontWeight: 'bold',
          cursor: 'pointer',
          zIndex: 3,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
          boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
          textShadow: '0px 0px 10px rgba(76, 175, 80, 0.8)',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateX(-50%) scale(1.1)';
          e.target.style.boxShadow = '0 12px 20px rgba(76, 175, 80, 0.5)';
          e.target.style.backgroundColor = '#F0F0F0';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateX(-50%) scale(1)';
          e.target.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
          e.target.style.backgroundColor = '#FFFFFF';
        }}
      >
        Comienza la Aventura
      </button>
    </div>
  );
};

const TierraSantaModel = () => {
  const { scene } = useGLTF('/models/scene3D.glb', true);
  scene.position.set(0, -30, 0);
  scene.scale.set(15, 15, 15);

  return <primitive object={scene} />;
};

const TierraSantaTitle = ({ initial, onClick }) => {
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.material.color.set(hovered ? '#FFFF00' : '#4CAF50');
      textRef.current.material.emissive = new THREE.Color(hovered ? '#FFFF00' : '#000000');
    }
  }, [hovered]);

  return (
    <Text3D
      ref={textRef}
      font="/fonts/bebas-neue-regular.json"
      size={10}
      height={2}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.5}
      bevelSize={0.3}
      bevelOffset={0}
      bevelSegments={5}
      position={[-50, 20, -10]}
      onPointerOver={() => setHovered(true)} // Detecta cuando el mouse está encima
      onPointerOut={() => setHovered(false)} // Detecta cuando el mouse se mueve fuera
      onClick={onClick}
    >
      TIERRA SANTA
      <meshPhongMaterial color="#4CAF50" emissive="#000000" emissiveIntensity={0.5} />
    </Text3D>
  );
};

const CloudGroup = () => {
  return (
    <group>
      <Cloud position={[-40, 60, -100]} speed={0.2} opacity={0.5} />
      <Cloud position={[40, 70, -80]} speed={0.1} opacity={0.7} />
      <Cloud position={[0, 80, -90]} speed={0.3} opacity={0.6} />
    </group>
  );
};

export default Home;
