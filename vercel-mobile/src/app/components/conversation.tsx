'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AudioWaveform } from 'lucide-react';

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create animated mesh
    const geometry = new THREE.PlaneGeometry(10, 10, 50, 50);
    const material = new THREE.MeshBasicMaterial({
      color: 0x3366ff,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    let frame: number;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      
      // Animate mesh
      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.002;
      
      // Update vertices
      const positions = geometry.attributes.position.array;
      const time = Date.now() * 0.001;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] = Math.sin(positions[i] * 0.5 + time) * 0.5;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frame);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen"
      style={{ zIndex: -1 }}
      data-engine="three.js r160"
    />
  );
};

export function Conversation() {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: 't8oRb5fMcATNT0Zv6i0Z',
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const isConnected = conversation.status === 'connected';

  return (
    <>
      <Background />
      <div className="min-h-screen w-full flex flex-col items-center justify-start pt-16">
        <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto p-4">
          <div className="relative w-full h-20 rounded-2xl overflow-hidden">
            {/* Button overlay */}
            <div className="absolute inset-0 flex justify-center items-center gap-2">
              <button
                onClick={isConnected ? stopConversation : startConversation}
                disabled={conversation.status === 'connecting'}
                className="relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-ring disabled:pointer-events-auto border border-subtle text-foreground w-36 z-[1] group backdrop-blur-md bg-background/80 p-1.5 h-auto border-none shadow-lg rounded-full hover:bg-background/70 active:bg-background/70 disabled:opacity-100 disabled:text-primary disabled:bg-background/80 transition-color duration-300"
              >
                <span className={`
                  me-1.5 w-8 h-8 rounded-full flex items-center justify-center
                  transition-colors duration-300
                  ${isConnected ? 'bg-red-500' : 'bg-foreground'} 
                  text-background group-disabled:bg-gray-400
                  ${conversation.isSpeaking ? 'animate-pulse' : ''}
                `}>
                  <AudioWaveform className="w-4 h-4" />
                </span>
                <span className="pe-2.5 mx-auto">
                  {isConnected ? 'Stop' : 'Call RoadMate'}
                </span>
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Status: <span className="capitalize">{conversation.status}</span>
              {conversation.isSpeaking && ' (Speaking)'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}