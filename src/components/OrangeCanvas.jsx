import { useEffect, useRef } from "react";

const GRAVITY = 0.45;
const BOUNCE_BTN = 0.55;   // elasticity off button
const BOUNCE_FLOOR = 0.35; // elasticity off floor/other oranges
const FRICTION = 0.82;
const SPIN_DECAY = 0.94;
const ORANGE_RADIUS = 22;  // px

function drawOrange(ctx, x, y, r, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Shadow
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.beginPath();
  ctx.ellipse(0, r * 0.9, r * 0.85, r * 0.28, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.restore();

  // Body gradient
  const grd = ctx.createRadialGradient(-r * 0.28, -r * 0.32, r * 0.06, 0, 0, r);
  grd.addColorStop(0, "#FFD580");
  grd.addColorStop(0.4, "#FF8C00");
  grd.addColorStop(1, "#C45000");
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();

  // Texture lines
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = "#8B3A00";
  ctx.lineWidth = 1.2;
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.quadraticCurveTo(Math.cos(a) * r * 0.7, Math.sin(a) * r * 0.1, 0, r);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Highlight
  ctx.save();
  ctx.globalAlpha = 0.32;
  const hl = ctx.createRadialGradient(-r * 0.3, -r * 0.35, 0, -r * 0.15, -r * 0.2, r * 0.5);
  hl.addColorStop(0, "#fff");
  hl.addColorStop(1, "transparent");
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = hl;
  ctx.fill();
  ctx.restore();

  // Stem
  ctx.strokeStyle = "#4a7c2f";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.quadraticCurveTo(r * 0.22, -r * 1.22, r * 0.38, -r * 1.1);
  ctx.stroke();

  // Leaf
  ctx.fillStyle = "#4a7c2f";
  ctx.beginPath();
  ctx.moveTo(r * 0.12, -r * 1.08);
  ctx.quadraticCurveTo(r * 0.55, -r * 1.45, r * 0.7, -r * 0.95);
  ctx.quadraticCurveTo(r * 0.38, -r * 1.05, r * 0.12, -r * 1.08);
  ctx.fill();

  ctx.restore();
}

let nextId = 1;

export default function OrangeCanvas({ oranges, buttonRef, onAllLanded }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ items: [], spawnQueue: 0, spawnTimer: 0, lastOranges: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    if (oranges <= 0) return;
    if (oranges === stateRef.current.lastOranges) return;
    const toSpawn = oranges - stateRef.current.lastOranges;
    stateRef.current.lastOranges = oranges;
    stateRef.current.spawnQueue += toSpawn;
  }, [oranges]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let lastTime = 0;

    const tick = (ts) => {
      rafRef.current = requestAnimationFrame(tick);
      const dt = Math.min((ts - lastTime) / 16.67, 3); // normalize to ~60fps
      lastTime = ts;

      const state = stateRef.current;
      const W = canvas.width;
      const H = canvas.height;

      // Spawn
      state.spawnTimer -= dt;
      if (state.spawnQueue > 0 && state.spawnTimer <= 0) {
        state.spawnQueue--;
        state.spawnTimer = 18; // frames between spawns
        const x = W * 0.2 + Math.random() * W * 0.6;
        state.items.push({
          id: nextId++,
          x,
          y: -ORANGE_RADIUS,
          vx: (Math.random() - 0.5) * 2,
          vy: 1,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.2,
          r: ORANGE_RADIUS * (0.85 + Math.random() * 0.3),
          landed: false,
          bounces: 0,
        });
      }

      // Get button bounds in canvas-local coords
      let btn = null;
      const btnEl = buttonRef?.current;
      if (btnEl) {
        const cr = canvas.getBoundingClientRect();
        const br = btnEl.getBoundingClientRect();
        btn = {
          left: br.left - cr.left,
          right: br.right - cr.left,
          top: br.top - cr.top,
          bottom: br.bottom - cr.top,
          cx: (br.left + br.right) / 2 - cr.left,
          cy: (br.top + br.bottom) / 2 - cr.top,
          w: br.width,
          h: br.height,
        };
      }

      const FLOOR = H - 12;
      let anyMoving = false;

      for (const o of state.items) {
        if (o.landed) continue;
        anyMoving = true;

        o.vy += GRAVITY * dt;
        o.x += o.vx * dt;
        o.y += o.vy * dt;
        o.angle += o.spin * dt;
        o.spin *= Math.pow(SPIN_DECAY, dt);

        // Wall bounce
        if (o.x - o.r < 0) { o.x = o.r; o.vx = Math.abs(o.vx) * BOUNCE_FLOOR; }
        if (o.x + o.r > W) { o.x = W - o.r; o.vx = -Math.abs(o.vx) * BOUNCE_FLOOR; }

        // Button collision (rounded rect approximation)
        if (btn) {
          const padX = o.r;
          const padY = o.r;
          if (
            o.x + padX > btn.left &&
            o.x - padX < btn.right &&
            o.y + padY > btn.top &&
            o.y - padY < btn.bottom
          ) {
            // Determine which face was hit
            const fromTop = o.y - o.vy * dt < btn.top - o.r + 4;
            if (fromTop) {
              o.y = btn.top - o.r;
              // Bounce upward with elasticity; deflect horizontally based on x offset
              const dx = (o.x - btn.cx) / (btn.w / 2 + 1);
              o.vy = -Math.abs(o.vy) * BOUNCE_BTN;
              o.vx = o.vx * FRICTION + dx * 3.5;
              o.spin = (Math.random() - 0.5) * 0.35;
              o.bounces = (o.bounces || 0) + 1;
            } else {
              // Side hit
              if (o.x < btn.cx) { o.x = btn.left - o.r; o.vx = -Math.abs(o.vx) * BOUNCE_BTN; }
              else { o.x = btn.right + o.r; o.vx = Math.abs(o.vx) * BOUNCE_BTN; }
              o.spin = (Math.random() - 0.5) * 0.25;
            }
          }
        }

        // Orange-vs-orange collision (simple circle)
        for (const other of state.items) {
          if (other === o) continue;
          const dx = o.x - other.x;
          const dy = o.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = o.r + other.r - 1;
          if (dist < minDist && dist > 0.1) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;
            // Push apart
            if (!other.landed) {
              o.x += nx * overlap * 0.5;
              o.y += ny * overlap * 0.5;
              other.x -= nx * overlap * 0.5;
              other.y -= ny * overlap * 0.5;
            } else {
              o.x += nx * overlap;
              o.y += ny * overlap;
            }
            // Velocity exchange
            const relVx = o.vx - other.vx;
            const relVy = o.vy - other.vy;
            const dot = relVx * nx + relVy * ny;
            if (dot < 0) {
              const impulse = dot * BOUNCE_FLOOR;
              o.vx -= impulse * nx;
              o.vy -= impulse * ny;
              if (!other.landed) {
                other.vx += impulse * nx;
                other.vy += impulse * ny;
              }
              o.spin = (Math.random() - 0.5) * 0.2;
            }
          }
        }

        // Floor
        if (o.y + o.r >= FLOOR) {
          o.y = FLOOR - o.r;
          o.vy = -Math.abs(o.vy) * BOUNCE_FLOOR;
          o.vx *= FRICTION;
          o.spin *= 0.7;
          if (Math.abs(o.vy) < 0.8 && Math.abs(o.vx) < 0.5) {
            o.vy = 0; o.vx = 0; o.spin = 0;
            o.landed = true;
          }
        }
      }

      // Draw
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, W, H);
      for (const o of state.items) {
        drawOrange(ctx, o.x, o.y, o.r, o.angle);
      }

      if (!anyMoving && state.items.length > 0 && state.spawnQueue === 0) {
        if (onAllLanded) onAllLanded();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}
