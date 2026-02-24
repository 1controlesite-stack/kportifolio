import { useRef, useEffect } from "react";

const COLORS = [
  "hsla(262, 83%, 66%,",  // purple
  "hsla(217, 91%, 60%,",  // blue
  "hsla(187, 94%, 43%,",  // cyan
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorIdx: number;
}

// Zodiac constellations — normalized coordinates (0-1) for each star
const CONSTELLATIONS: { name: string; stars: [number, number][] }[] = [
  { name: "Aries", stars: [[0.5,0.2],[0.4,0.4],[0.35,0.6],[0.6,0.4],[0.65,0.6]] },
  { name: "Taurus", stars: [[0.3,0.3],[0.4,0.4],[0.5,0.5],[0.6,0.4],[0.7,0.3],[0.45,0.65],[0.55,0.65]] },
  { name: "Gemini", stars: [[0.3,0.2],[0.3,0.5],[0.3,0.8],[0.7,0.2],[0.7,0.5],[0.7,0.8]] },
  { name: "Cancer", stars: [[0.5,0.2],[0.35,0.45],[0.65,0.45],[0.4,0.7],[0.6,0.7]] },
  { name: "Leo", stars: [[0.3,0.3],[0.4,0.2],[0.5,0.3],[0.55,0.45],[0.5,0.6],[0.6,0.7],[0.7,0.6],[0.75,0.75]] },
  { name: "Virgo", stars: [[0.2,0.3],[0.35,0.25],[0.5,0.35],[0.6,0.5],[0.5,0.65],[0.7,0.7],[0.4,0.8]] },
  { name: "Libra", stars: [[0.5,0.2],[0.3,0.5],[0.7,0.5],[0.35,0.75],[0.65,0.75]] },
  { name: "Scorpio", stars: [[0.15,0.4],[0.25,0.35],[0.35,0.4],[0.45,0.5],[0.55,0.6],[0.65,0.7],[0.75,0.65],[0.8,0.55]] },
  { name: "Sagittarius", stars: [[0.3,0.7],[0.4,0.55],[0.5,0.4],[0.6,0.3],[0.55,0.55],[0.65,0.65],[0.7,0.5]] },
  { name: "Capricorn", stars: [[0.3,0.3],[0.45,0.25],[0.6,0.35],[0.7,0.5],[0.55,0.65],[0.4,0.7]] },
  { name: "Aquarius", stars: [[0.2,0.4],[0.35,0.3],[0.5,0.45],[0.6,0.35],[0.75,0.5],[0.85,0.4]] },
  { name: "Pisces", stars: [[0.3,0.3],[0.4,0.45],[0.5,0.55],[0.6,0.45],[0.7,0.3],[0.5,0.7]] },
];

const NetworkParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      const isMobile = rect.width < 768;
      const activeConstellations = isMobile
        ? CONSTELLATIONS.filter((_, i) => i % 2 === 0) // 6 on mobile
        : CONSTELLATIONS;

      const cols = isMobile ? 3 : 4;
      const rows = Math.ceil(activeConstellations.length / cols);
      const cellW = rect.width / cols;
      const cellH = rect.height / rows;
      const scale = Math.min(cellW, cellH) * 0.6;

      const particles: Particle[] = [];

      activeConstellations.forEach((constellation, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const cx = cellW * (col + 0.5);
        const cy = cellH * (row + 0.5);

        constellation.stars.forEach(([sx, sy]) => {
          particles.push({
            x: cx + (sx - 0.5) * scale + (Math.random() - 0.5) * 4,
            y: cy + (sy - 0.5) * scale + (Math.random() - 0.5) * 4,
            vx: 0,
            vy: 0,
            radius: 1.5 + Math.random(),
            colorIdx: Math.floor(Math.random() * 3),
          });
        });
      });

      particlesRef.current = particles;
    };

    resize();
    initParticles();

    const onResize = () => { resize(); initParticles(); };
    window.addEventListener("resize", onResize);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouse);

    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mouseleave", onLeave);

    const MAX_DIST = 150;
    const MOUSE_RADIUS = 200;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const inRadius = dist < MOUSE_RADIUS && dist > 3;

        if (inRadius) {
          const force = 2.0 / dist;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
          p.vx *= 0.98;
          p.vy *= 0.98;
        } else {
          p.vx *= 0.92;
          p.vy *= 0.92;
        }

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 4.0) {
          p.vx = (p.vx / speed) * 4.0;
          p.vy = (p.vy / speed) * 4.0;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > w) { p.x = w; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > h) { p.y = h; p.vy *= -1; }
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = COLORS[a.colorIdx] + `${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles with glow
      ctx.shadowBlur = 10;
      for (const p of particles) {
        const glowColor = COLORS[p.colorIdx] + "0.6)";
        ctx.shadowColor = glowColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = COLORS[p.colorIdx] + "0.7)";
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      aria-hidden="true"
    />
  );
};

export default NetworkParticles;
