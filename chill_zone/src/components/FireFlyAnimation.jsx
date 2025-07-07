import { useEffect, useRef, useState } from "react";

const createFireflies = (firefliesRef, canvas) => {
  if (firefliesRef.current.length === 0) {
    const numFireflies = 8;

    for (let i = 0; i < numFireflies; i++) {
      firefliesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        size: Math.random() * 0.01,
        opacity: Math.random() * 0.4 + 0.6,
        glowPhase: Math.random() * Math.PI * 2,
        glowSpeed: Math.random() * 0.03 + 0.01,
      });
    }
  }
};

const startAnimation = (ctx, canvas, firefliesRef, animationRef) => {
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    firefliesRef.current.forEach((firefly) => {
      firefly.x += firefly.vx;
      firefly.y += firefly.vy;

      if (firefly.x < 0 || firefly.x > canvas.width) firefly.vx *= -1;
      if (firefly.y < 0 || firefly.y > canvas.height) firefly.vy *= -1;

      firefly.x = Math.max(0, Math.min(canvas.width, firefly.x));
      firefly.y = Math.max(0, Math.min(canvas.height, firefly.y));

      firefly.glowPhase += firefly.glowSpeed;
      const glowIntensity = (Math.sin(firefly.glowPhase) + 1) * 0.5;

      const glowSize = glowIntensity * 5;
      const gradient = ctx.createRadialGradient(
        firefly.x,
        firefly.y,
        0,
        firefly.x,
        firefly.y,
        glowSize,
      );
      gradient.addColorStop(0, `rgba(255, 255, 150, ${0.9 * glowIntensity})`);
      gradient.addColorStop(0.2, `rgba(255, 240, 120, ${0.6 * glowIntensity})`);
      gradient.addColorStop(0.5, `rgba(255, 220, 100, ${0.3 * glowIntensity})`);
      gradient.addColorStop(1, "rgba(255, 200, 80, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(
        firefly.x - glowSize,
        firefly.y - glowSize,
        glowSize * 2,
        glowSize * 2,
      );
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  animate();
};

export function FireFlyAnimation({ className }) {
  const canvasRef = useRef(null);
  const firefliesRef = useRef([]);
  const animationRef = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    createFireflies(firefliesRef, canvas);
    startAnimation(canvas.getContext("2d"), canvas, firefliesRef, animationRef);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleClick = (e) => {
      if (!mouseDown) return;

      const rect = canvas.getBoundingClientRect();

      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      firefliesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        size: Math.random() * 0.01,
        opacity: 1,
        glowPhase: Math.random() * Math.PI * 2,
        glowSpeed: Math.random() * 0.03 + 0.01,
      });
    };

    const handleMouseDown = () => {
      setMouseDown(true);
    };

    const handleMouseUp = () => {
      setMouseDown(false);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleClick);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleClick);
    };
  }, [mouseDown]);

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />;
}
