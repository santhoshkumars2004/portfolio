import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  // Generate random positions for SVG blobs
  const blobs = [
    { cx: '20%', cy: '30%', r: 180, color: 'rgba(59,130,246,0.18)' },
    { cx: '80%', cy: '60%', r: 140, color: 'rgba(168,85,247,0.15)' },
    { cx: '50%', cy: '80%', r: 120, color: 'rgba(236,72,153,0.13)' },
  ];

  // Floating particles
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 2 + Math.random() * 3,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      color: `rgba(59,130,246,${0.1 + Math.random() * 0.2})`
    }));
    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > window.innerWidth) p.dx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.dy *= -1;
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <>
      {/* SVG Blobs */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        {blobs.map((blob, i) => (
          <circle
            key={i}
            cx={blob.cx}
            cy={blob.cy}
            r={blob.r}
            fill={blob.color}
          >
            <animate
              attributeName="r"
              values={`${blob.r};${blob.r * 1.2};${blob.r}`}
              dur="12s"
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
      {/* Canvas Particles */}
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
      />
    </>
  );
};

export default AnimatedBackground; 