import { useEffect, useRef } from "react";

const spawnSmoke = (smokeRef, canvas, x = null, y = null) => {
  const spawnX = x ?? canvas.width / 2;
  const spawnY = y ?? canvas.height;

  smokeRef.current.push({
    ogx: spawnX,
    ogy: spawnY,
    x: spawnX + (Math.random() - 0.5) * 30,
    y: spawnY,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -Math.random() * 0.5 - 0.5,
    opacity: 1,
    size: Math.random() * 20 + 10,
    growth: Math.random() * 0.2 + 0.05,
    fade: Math.random() * 0.005 + 0.002,
  });
};

const beginAnimateSmoke = (ctx, canvas, smokeRef, animationRef) => {
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = smokeRef.current;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.size += p.growth;
      p.opacity -= p.fade;
    });

    smokeRef.current = particles.map((p) => {
      if (p.opacity <= 0) {
        p.opacity = 1;
        p.x = p.ogx;
        p.y = p.ogy;
        (p.vx = (Math.random() - 0.5) * 0.3),
          (p.vy = -Math.random() * 0.5 - 0.5),
          (p.opacity = 1);
        p.size = Math.random() * 20 + 10;
        p.growth = Math.random() * 0.2 + 0.05;
        p.fade = Math.random() * 0.005 + 0.002;
      }
      return p;
    });

    particles.forEach((p) => {
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      gradient.addColorStop(0, `rgba(200, 200, 200, ${p.opacity})`);
      gradient.addColorStop(0.5, `rgba(160, 160, 160, ${p.opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(120, 120, 120, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  animate();
};

export function SmokeAnimation({ className }) {
  const canvasRef = useRef(null);
  const smokeRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    beginAnimateSmoke(ctx, canvas, smokeRef, animationRef);
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleClick = (e) => {
      try {
        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        console.log(x, " ", y);
        for (let i = 0; i < 3; i++) spawnSmoke(smokeRef, canvas, x, y);
      } catch (e) {
        console.log(e);
      }
    };
    canvas.addEventListener("click", handleClick);
    return () => canvas.removeEventListener("click", handleClick);
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />;
}
