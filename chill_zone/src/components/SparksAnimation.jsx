import { useEffect, useRef } from "react";

function resetSpark(particle) {
  const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
  const speed = Math.random() * 1.2 + 1;
  particle.x = particle.ogx + (Math.random() - 0.5) * 30;
  particle.y = particle.ogy;
  particle.vx = Math.cos(angle) * speed * 2;
  particle.vy = Math.sin(angle) * speed * 0.1;
  particle.opacity = Math.random() * 0.8 + 0.2;
  particle.size = Math.random() * 4;
  particle.life = 2;
  particle.decay = Math.random() * 0.01 + 0.00003;

  const colorType = Math.random();
  if (colorType < 0.3) {
    // Deep red embers
    particle.color = {
      r: Math.random() * 50 + 150, // Deep reds
      g: Math.random() * 30 + 10, // Minimal green
      b: Math.random() * 20 + 5, // Minimal blue
    };
  } else if (colorType < 0.7) {
    // Bright orange embers
    particle.color = {
      r: Math.random() * 55 + 200, // Bright oranges
      g: Math.random() * 80 + 60, // Orange tones
      b: Math.random() * 30 + 5, // Minimal blue
    };
  } else {
    // Golden embers
    particle.color = {
      r: Math.random() * 40 + 215, // Golden yellows
      g: Math.random() * 60 + 150, // Golden tones
      b: Math.random() * 40 + 10, // Minimal blue
    };
  }

  particle.gravity = Math.random() * 0.03;
  particle.drift = (Math.random() - 0.5) * 0.003;
  particle.shape = 0;
  particle.rotation = Math.random() * Math.PI * 2;
  particle.rotationSpeed = (Math.random() - 0.5) * 0.04;
  particle.brightnessVariation = Math.random() * 0.3 + 0.7;
}

const spawnSparks = (sparksRef, x = null, y = null) => {
  const spawnX = x;
  const spawnY = y;
  for (let i = 0; i < 4; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
    const speed = Math.random() * 1.2 + 0.4;
    const colorType = Math.random();
    let color;
    if (colorType < 0.3) {
      color = {
        r: Math.random() * 50 + 150,
        g: Math.random() * 30 + 10,
        b: Math.random() * 20 + 5,
      };
    } else if (colorType < 0.7) {
      color = {
        r: Math.random() * 55 + 200,
        g: Math.random() * 80 + 60,
        b: Math.random() * 30 + 5,
      };
    } else {
      color = {
        r: Math.random() * 40 + 215,
        g: Math.random() * 60 + 150,
        b: Math.random() * 40 + 10,
      };
    }

    sparksRef.current.push({
      ogx: spawnX,
      ogy: spawnY,
      x: spawnX + (Math.random() - 0.5) * 30,
      y: spawnY,
      vx: Math.cos(angle) * speed * 0.01,
      vy: Math.sin(angle) * speed * 0.1,
      opacity: Math.random() * 0.8 + 0.2,
      size: Math.random() * 3 + 1,
      life: 1,
      decay: Math.random() * 0.01 + 0.003,
      color: color,
      gravity: Math.random() * 0.001,
      drift: (Math.random() - 0.5) * 0.003,
      shape: 0,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
      brightnessVariation: Math.random() * 0.3 + 0.7,
    });
  }
};

const drawShape = (ctx, x, y, size, shape, rotation) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  const shearX = Math.cos(Date.now() * 0.003 + Math.random());
  const shearY = Math.cos(Date.now() * 0.003);
  ctx.transform(1, shearY, shearX, 1, 0, 0);
  ctx.beginPath();
  ctx.rect(-size, -size, size * 2, size * 2);

  ctx.restore();
};

const beginAnimateSpark = (ctx, canvas, sparksRef, animationRef) => {
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const particles = sparksRef.current;
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy -= p.gravity;
      p.vx += p.drift;
      p.vx *= 0.95;
      p.rotation += p.rotationSpeed;
      p.life -= p.decay;

      p.opacity =
        Math.max(0, p.life) *
        p.brightnessVariation *
        (Math.random() < 0.0001 ? 0 : 1);

      p.x += Math.sin(Date.now() * 0.003 + p.x * 0.02);
      p.y += Math.cos(Date.now() * 0.003);
    });

    sparksRef.current = particles.map((p) => {
      if (p.life <= 0) {
        resetSpark(p);
      }
      return p;
    });

    particles.forEach((p) => {
      if (p.opacity < 0.01) return;
      const glowGradient = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.size * 5,
      );
      glowGradient.addColorStop(
        0,
        `rgba(${p.color.r}, ${Math.floor(p.color.g * 0.6)}, ${Math.floor(p.color.b * 0.3)}, ${p.opacity * 0.6})`,
      );
      glowGradient.addColorStop(
        0.3,
        `rgba(${p.color.r}, ${Math.floor(p.color.g * 0.8)}, ${Math.floor(p.color.b * 0.5)}, ${p.opacity * 0.3})`,
      );
      glowGradient.addColorStop(
        1,
        `rgba(${Math.floor(p.color.r * 0.8)}, ${Math.floor(p.color.g * 0.4)}, ${Math.floor(p.color.b * 0.2)}, 0)`,
      );

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
      ctx.fill();
      const brightR = Math.min(255, p.color.r + 40);
      const brightG = Math.min(255, p.color.g + 20);
      const brightB = Math.min(255, p.color.b + 10);
      const hotness = p.opacity * p.brightnessVariation;
      const whiteHot = hotness > 0.8 ? (hotness - 0.8) * 2 : 0;
      ctx.fillStyle = `rgba(${Math.min(255, brightR + whiteHot * 50)}, ${Math.min(255, brightG + whiteHot * 50)}, ${Math.min(255, brightB + whiteHot * 50)}, ${p.opacity * 1.2})`;
      drawShape(ctx, p.x, p.y, p.size, p.shape, p.rotation);
      ctx.fill();
    });

    animationRef.current = requestAnimationFrame(animate);
  };
  animate();
};

export function SparkAnimation({ className = "" }) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    beginAnimateSpark(ctx, canvas, sparksRef, animationRef);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleClick = (e) => {
      try {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        spawnSparks(sparksRef, x, y);
      } catch (error) {
        console.error("Error handling click:", error);
      }
    };

    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />;
}
