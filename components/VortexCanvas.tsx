
import React, { useRef, useEffect } from 'react';
import { VortexPosition, POSITION_MAP } from '../types';

interface VortexCanvasProps {
  selectedPosition: VortexPosition;
  isPlaying: boolean;
}

const VortexCanvas: React.FC<VortexCanvasProps> = ({ selectedPosition, isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const angleRef = useRef(0);
  const discAngleRef = useRef(0);
  const particlesRef = useRef<{x: number, y: number, r: number, angle: number, speed: number}[]>([]);

  // Initialize particles
  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 400; i++) {
      particles.push({
        x: 0,
        y: 0,
        r: Math.random() * 400,
        angle: Math.random() * Math.PI * 2,
        speed: 0
      });
    }
    particlesRef.current = particles;
  }, []);

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fluid Dynamics Constants
    const VORTEX_RADIUS = 150; // Transition from inner to outer flow
    const BASE_OMEGA = 0.02; // Rotation speed for solid body core

    // Handle play state
    if (isPlaying) {
      const config = POSITION_MAP[selectedPosition];
      
      // Calculate bulk rotation (angular velocity of the orbit)
      let orbitalOmega = 0;
      if (config.radius <= VORTEX_RADIUS) {
        orbitalOmega = BASE_OMEGA;
      } else {
        const k = BASE_OMEGA * Math.pow(VORTEX_RADIUS, 2);
        orbitalOmega = k / Math.pow(config.radius, 2);
      }

      angleRef.current += orbitalOmega;

      // Calculate local rotation (the spin of the disc itself)
      if (config.isRotational) {
        discAngleRef.current += orbitalOmega;
      }
    }

    // Clear Canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 1. Draw Background Flow (Vortex visualization)
    particlesRef.current.forEach((p) => {
      let pOmega = 0;
      if (p.r < VORTEX_RADIUS) {
        pOmega = BASE_OMEGA;
      } else {
        const k = BASE_OMEGA * Math.pow(VORTEX_RADIUS, 2);
        pOmega = k / Math.pow(p.r, 2);
      }
      
      if (isPlaying) {
        p.angle += pOmega;
      }

      const px = centerX + Math.cos(p.angle) * p.r;
      const py = centerY + Math.sin(p.angle) * p.r;

      const alpha = 0.1 + (1 - p.r / 500) * 0.4;
      ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
      ctx.beginPath();
      ctx.arc(px, py, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Core Boundary
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, VORTEX_RADIUS, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Draw the Test Disc
    const currentRadius = POSITION_MAP[selectedPosition].radius;
    const discX = centerX + Math.cos(angleRef.current) * currentRadius;
    const discY = centerY + Math.sin(angleRef.current) * currentRadius;

    // Disc Shadow
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';

    // Disc Body
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(discX, discY, 24, 0, Math.PI * 2);
    ctx.fill();
    
    // Highlight
    const gradient = ctx.createRadialGradient(discX - 5, discY - 5, 2, discX, discY, 24);
    gradient.addColorStop(0, '#fb923c');
    gradient.addColorStop(1, '#f97316');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Disc Indicator Line
    ctx.save();
    ctx.translate(discX, discY);
    ctx.rotate(discAngleRef.current);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -18);
    ctx.stroke();
    ctx.restore();

    // 3. Center Crosshair
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX - 10, centerY);
    ctx.lineTo(centerX + 10, centerY);
    ctx.moveTo(centerX, centerY - 10);
    ctx.lineTo(centerX, centerY + 10);
    ctx.stroke();

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [selectedPosition, isPlaying]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full cursor-crosshair"
    />
  );
};

export default VortexCanvas;
