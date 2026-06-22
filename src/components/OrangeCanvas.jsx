import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const ORANGE_IMG = "https://media.base44.com/images/public/6a36e44c52b5b1b814763abc/54c028201_2026-06-21s021603.png";
const GRAVITY = 0.6;
const GROUND_Y = 85; // % from top where oranges land
const BUTTON_TOP = 68; // % from top where button starts

export default function OrangeCanvas({ oranges, buttonRef, onAllLanded }) {
  const [items, setItems] = useState([]);
  const [landed, setLanded] = useState([]);
  const animFrame = useRef();
  const orangeId = useRef(0);

  useEffect(() => {
    if (oranges <= 0) return;
    setItems([]);
    setLanded([]);
    orangeId.current = 0;

    const spawnInterval = setInterval(() => {
      const id = orangeId.current++;
      if (id >= oranges) {
        clearInterval(spawnInterval);
        return;
      }
      const x = 15 + Math.random() * 70;
      setItems((prev) => [...prev, {
        id,
        x,
        y: -10,
        vy: 0,
        rotation: Math.random() * 360,
        size: 28 + Math.random() * 14,
        landed: false
      }]);
    }, 400);

    return () => clearInterval(spawnInterval);
  }, [oranges]);

  useEffect(() => {
    if (items.length === 0) return;

    const animate = () => {
      setItems((prev) => {
        let allDone = true;
        const updated = prev.map((item) => {
          if (item.landed) return item;
          allDone = false;

          let newY = item.y + item.vy;
          let newVy = item.vy + GRAVITY;

          // Get button rect for collision
          const btnEl = buttonRef?.current;
          let btnBounds = null;
          if (btnEl) {
            const rect = btnEl.getBoundingClientRect();
            btnBounds = {
              left: rect.left / window.innerWidth * 100,
              right: rect.right / window.innerWidth * 100,
              top: rect.top / window.innerHeight * 100
            };
          }

          // Check button collision
          if (btnBounds) {
            const orangeLeft = item.x - item.size * 0.4;
            const orangeRight = item.x + item.size * 0.4;
            const orangeBottom = newY + item.size * 0.5;

            if (
            orangeRight > btnBounds.left - 2 &&
            orangeLeft < btnBounds.right + 2 &&
            orangeBottom > btnBounds.top - 5)
            {
              newY = btnBounds.top - item.size * 0.5 - 2;
              newVy = 0;
              return { ...item, y: newY, vy: newVy, landed: true };
            }
          }

          // Ground collision
          if (newY >= GROUND_Y) {
            newY = GROUND_Y;
            newVy = 0;
            return { ...item, y: newY, vy: newVy, landed: true };
          }

          return { ...item, y: newY, vy: newVy };
        });

        if (allDone && updated.length > 0) {
          setLanded(updated);
          if (onAllLanded) onAllLanded();
          return prev; // stop animating
        }
        return updated;
      });

      animFrame.current = requestAnimationFrame(animate);
    };

    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, [items.length]);

  const display = landed.length > 0 ? landed : items;

  return (
    <div data-source-location="components/OrangeCanvas:112:4" data-dynamic-content="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {display.map((item) =>
      <motion.div data-source-location="components/OrangeCanvas:114:8" data-dynamic-content="true"
      key={item.id}
      className="absolute"
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        width: item.size,
        height: item.size,
        transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`
      }} data-collection-item-id={item?.id}>
        
          <img data-source-location="components/OrangeCanvas:125:10" data-dynamic-content="true"
        src={ORANGE_IMG}
        alt="laranja"
        className="w-full h-full object-contain"
        style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }} />
        
        </motion.div>
      )}
    </div>);

}