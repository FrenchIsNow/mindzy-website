'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X } from 'lucide-react';

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface SphericalPosition {
  theta: number;
  phi: number;
  radius: number;
}

export interface WorldPosition extends Position3D {
  scale: number;
  zIndex: number;
  isVisible: boolean;
  fadeOpacity: number;
  originalIndex: number;
}

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface SphereImageGridProps {
  images?: ImageData[];
  containerSize?: number;
  sphereRadius?: number;
  dragSensitivity?: number;
  momentumDecay?: number;
  maxRotationSpeed?: number;
  baseImageScale?: number;
  hoverScale?: number;
  perspective?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
}

interface RotationState { x: number; y: number; z: number; }
interface VelocityState { x: number; y: number; }
interface MousePosition { x: number; y: number; }

const SPHERE_MATH = {
  degreesToRadians: (d: number) => d * (Math.PI / 180),
  normalizeAngle: (a: number) => { while (a > 180) a -= 360; while (a < -180) a += 360; return a; }
};

// Seeded PRNG so random bubble connections stay stable across re-renders
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function () {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const SphereImageGrid: React.FC<SphereImageGridProps> = ({
  images = [],
  containerSize = 400,
  sphereRadius = 200,
  dragSensitivity = 0.5,
  momentumDecay = 0.95,
  maxRotationSpeed = 5,
  baseImageScale = 0.12,
  hoverScale = 1.2,
  perspective = 1000,
  autoRotate = false,
  autoRotateSpeed = 0.3,
  className = ''
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [rotation, setRotation] = useState<RotationState>({ x: 15, y: 15, z: 0 });
  const [velocity, setVelocity] = useState<VelocityState>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [imagePositions, setImagePositions] = useState<SphericalPosition[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  const actualSphereRadius = sphereRadius || containerSize * 0.5;
  const baseImageSize = containerSize * baseImageScale;

  const generateSpherePositions = useCallback((): SphericalPosition[] => {
    const positions: SphericalPosition[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = 2 * Math.PI / goldenRatio;

    for (let i = 0; i < images.length; i++) {
      const t = i / images.length;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;
      let phi = inclination * (180 / Math.PI);
      let theta = (azimuth * (180 / Math.PI)) % 360;

      const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35;
      phi = phi < 90 ? Math.max(5, phi - poleBonus) : Math.min(175, phi + poleBonus);
      phi = 15 + (phi / 180) * 150;

      theta = (theta + (Math.random() - 0.5) * 20) % 360;
      phi = Math.max(0, Math.min(180, phi + (Math.random() - 0.5) * 10));

      positions.push({ theta, phi, radius: actualSphereRadius });
    }
    return positions;
  }, [images.length, actualSphereRadius]);

  const calculateWorldPositions = useCallback((): WorldPosition[] => {
    const positions = imagePositions.map((pos, index) => {
      const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
      const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
      const rotXRad = SPHERE_MATH.degreesToRadians(rotation.x);
      const rotYRad = SPHERE_MATH.degreesToRadians(rotation.y);

      let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
      let y = pos.radius * Math.cos(phiRad);
      let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

      const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
      const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      x = x1; z = z1;

      const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
      const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
      y = y2; z = z2;

      const fadeZoneStart = -10;
      const fadeZoneEnd = -30;
      const isVisible = z > fadeZoneEnd;
      const fadeOpacity = z <= fadeZoneStart
        ? Math.max(0, (z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd))
        : 1;

      const isPoleImage = pos.phi < 30 || pos.phi > 150;
      const distFromCenter = Math.sqrt(x * x + y * y);
      const distRatio = Math.min(distFromCenter / actualSphereRadius, 1);
      const distancePenalty = isPoleImage ? 0.4 : 0.7;
      const centerScale = Math.max(0.3, 1 - distRatio * distancePenalty);
      const depthScale = (z + actualSphereRadius) / (2 * actualSphereRadius);
      const scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3);

      return { x, y, z, scale, zIndex: Math.round(1000 + z), isVisible, fadeOpacity, originalIndex: index };
    });

    const adjusted = [...positions];
    for (let i = 0; i < adjusted.length; i++) {
      if (!adjusted[i].isVisible) continue;
      let s = adjusted[i].scale;
      const sz = baseImageSize * s;
      for (let j = 0; j < adjusted.length; j++) {
        if (i === j || !adjusted[j].isVisible) continue;
        const ox = adjusted[i].x - adjusted[j].x;
        const oy = adjusted[i].y - adjusted[j].y;
        const dist = Math.sqrt(ox * ox + oy * oy);
        const minDist = (sz + baseImageSize * adjusted[j].scale) / 2 + 25;
        if (dist < minDist && dist > 0) {
          const overlap = minDist - dist;
          s = Math.min(s, s * Math.max(0.4, 1 - (overlap / minDist) * 0.6));
        }
      }
      adjusted[i] = { ...adjusted[i], scale: Math.max(0.25, s) };
    }
    return adjusted;
  }, [imagePositions, rotation, actualSphereRadius, baseImageSize]);

  const clamp = useCallback((v: number) => Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, v)), [maxRotationSpeed]);

  const updateMomentum = useCallback(() => {
    if (isDragging) return;
    setVelocity(prev => {
      const nv = { x: prev.x * momentumDecay, y: prev.y * momentumDecay };
      if (!autoRotate && Math.abs(nv.x) < 0.01 && Math.abs(nv.y) < 0.01) return { x: 0, y: 0 };
      return nv;
    });
    setRotation(prev => ({
      x: SPHERE_MATH.normalizeAngle(prev.x + clamp(velocity.x)),
      y: SPHERE_MATH.normalizeAngle(prev.y + (autoRotate ? autoRotateSpeed : 0) + clamp(velocity.y)),
      z: prev.z
    }));
  }, [isDragging, momentumDecay, velocity, clamp, autoRotate, autoRotateSpeed]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    const delta = { x: -dy * dragSensitivity, y: dx * dragSensitivity };
    setRotation(prev => ({
      x: SPHERE_MATH.normalizeAngle(prev.x + clamp(delta.x)),
      y: SPHERE_MATH.normalizeAngle(prev.y + clamp(delta.y)),
      z: prev.z
    }));
    setVelocity({ x: clamp(delta.x), y: clamp(delta.y) });
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, [isDragging, dragSensitivity, clamp]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const t = e.touches[0];
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: t.clientX, y: t.clientY };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const t = e.touches[0];
    const dx = t.clientX - lastMousePos.current.x;
    const dy = t.clientY - lastMousePos.current.y;
    const delta = { x: -dy * dragSensitivity, y: dx * dragSensitivity };
    setRotation(prev => ({
      x: SPHERE_MATH.normalizeAngle(prev.x + clamp(delta.x)),
      y: SPHERE_MATH.normalizeAngle(prev.y + clamp(delta.y)),
      z: prev.z
    }));
    setVelocity({ x: clamp(delta.x), y: clamp(delta.y) });
    lastMousePos.current = { x: t.clientX, y: t.clientY };
  }, [isDragging, dragSensitivity, clamp]);

  const handleTouchEnd = useCallback(() => setIsDragging(false), []);

  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => { setImagePositions(generateSpherePositions()); }, [generateSpherePositions]);

  useEffect(() => {
    if (!isMounted) return;
    const animate = () => { updateMomentum(); animationFrame.current = requestAnimationFrame(animate); };
    animationFrame.current = requestAnimationFrame(animate);
    return () => { if (animationFrame.current) cancelAnimationFrame(animationFrame.current); };
  }, [isMounted, updateMomentum]);

  useEffect(() => {
    if (!isMounted) return;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMounted, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const worldPositions = calculateWorldPositions();

  // Random bubble-to-bubble connection pairs (stable across renders)
  const connectionPairs = useMemo(() => {
    const rand = mulberry32(7);
    const seen = new Set<string>();
    const pairs: Array<[number, number]> = [];
    const target = Math.min(18, Math.floor(images.length * 0.6));
    let safety = 0;
    while (pairs.length < target && safety < 400) {
      safety++;
      const i = Math.floor(rand() * images.length);
      let j = Math.floor(rand() * images.length);
      if (i === j) continue;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      pairs.push([i, j]);
    }
    return pairs;
  }, [images.length]);

  const renderImageNode = useCallback((image: ImageData, index: number) => {
    const pos = worldPositions[index];
    if (!pos || !pos.isVisible) return null;
    const size = baseImageSize * pos.scale;
    const isHovered = hoveredIndex === index;
    const finalScale = isHovered ? Math.min(hoverScale, hoverScale / pos.scale) : 1;
    // Bubble visually hovers above its dot anchor
    const hoverOffset = size * 0.55 + 4;

    return (
      <div
        key={image.id}
        className="absolute cursor-pointer select-none transition-transform duration-200 ease-out"
        style={{
          width: `${size}px`, height: `${size}px`,
          left: `${containerSize / 2 + pos.x}px`, top: `${containerSize / 2 + pos.y - hoverOffset}px`,
          opacity: pos.fadeOpacity,
          transform: `translate(-50%, -50%) scale(${finalScale})`,
          zIndex: pos.zIndex
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => setSelectedImage(image)}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-2 border-white/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} className="w-full h-full object-cover" draggable={false} loading={index < 3 ? 'eager' : 'lazy'} />
        </div>
      </div>
    );
  }, [worldPositions, baseImageSize, containerSize, hoveredIndex, hoverScale]);

  if (!isMounted) {
    return (
      <div className="bg-gray-100 rounded-lg animate-pulse flex items-center justify-center" style={{ width: containerSize, height: containerSize }}>
        <div className="text-gray-400">Loading…</div>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center" style={{ width: containerSize, height: containerSize }}>
        <div className="text-gray-400 text-center"><p>No images provided</p></div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>

      <div
        ref={containerRef}
        className={`relative select-none cursor-grab active:cursor-grabbing ${className}`}
        style={{ width: containerSize, height: containerSize, perspective: `${perspective}px` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* SVG layer: random curved dashed connections + per-bubble anchor dots */}
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: containerSize, height: containerSize, zIndex: 5 }}
        >
          {/* Random curved dashed connections between bubbles — no straight, no solid */}
          {connectionPairs.map(([i, j], idx) => {
            const a = worldPositions[i]
            const b = worldPositions[j]
            if (!a || !b || !a.isVisible || !b.isVisible) return null
            const x1 = containerSize / 2 + a.x
            const y1 = containerSize / 2 + a.y
            const x2 = containerSize / 2 + b.x
            const y2 = containerSize / 2 + b.y
            const dx = x2 - x1
            const dy = y2 - y1
            const len = Math.sqrt(dx * dx + dy * dy) || 1
            // Perpendicular bulge — alternates direction for variety
            const perpScale = (idx % 2 === 0 ? 0.22 : -0.28) + ((idx * 37) % 13) / 80
            const cx = (x1 + x2) / 2 + (-dy / len) * len * perpScale
            const cy = (y1 + y2) / 2 + (dx / len) * len * perpScale
            const opacity = Math.min(a.fadeOpacity, b.fadeOpacity) * 0.35
            return (
              <path
                key={`conn-${idx}`}
                d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                stroke="#a78bfa"
                strokeWidth={0.9}
                fill="none"
                strokeOpacity={opacity}
                strokeDasharray={`${3 + (idx % 3)} ${2 + (idx % 2)}`}
                strokeLinecap="round"
              />
            )
          })}
          {/* Per-bubble anchor dots — the bubble image hovers above each */}
          {worldPositions.map((pos, index) => {
            if (!pos.isVisible) return null
            const r = 1.6 + pos.scale * 2.2
            return (
              <g key={`dot-${index}`}>
                <circle
                  cx={containerSize / 2 + pos.x}
                  cy={containerSize / 2 + pos.y}
                  r={r * 2.4}
                  fill="#7c3aed"
                  opacity={pos.fadeOpacity * 0.18}
                />
                <circle
                  cx={containerSize / 2 + pos.x}
                  cy={containerSize / 2 + pos.y}
                  r={r}
                  fill="#c4b5fd"
                  opacity={pos.fadeOpacity * 0.95}
                />
              </g>
            )
          })}
        </svg>

        <div className="relative w-full h-full" style={{ zIndex: 10 }}>
          {images.map((image, index) => renderImageNode(image, index))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
          onClick={() => setSelectedImage(null)}
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <div
            className="bg-white rounded-xl max-w-md w-full overflow-hidden"
            onClick={e => e.stopPropagation()}
            style={{ animation: 'scaleIn 0.3s ease-out' }}
          >
            <div className="relative aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedImage.src} alt={selectedImage.alt} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full text-white flex items-center justify-center hover:bg-black/70 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            {(selectedImage.title || selectedImage.description) && (
              <div className="p-6">
                {selectedImage.title && <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>}
                {selectedImage.description && <p className="text-gray-600">{selectedImage.description}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SphereImageGrid;
