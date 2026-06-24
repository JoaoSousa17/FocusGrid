import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Distance from the relevant screen edge (in px) within which a swipe gesture
// must start to be recognized as page-navigation, instead of normal content
// scrolling/dragging (e.g. horizontal day columns, card drag-and-drop, etc).
const EDGE_ZONE = 60;
// Minimum drag distance (in px) to count as a swipe once armed.
const SWIPE_THRESHOLD = 60;

// directions: { left, right, up, down } -> route to navigate to.
// "left" = swipe moving leftward (finger goes right -> left), must start near the RIGHT edge.
// "right" = swipe moving rightward (finger goes left -> right), must start near the LEFT edge.
// "up" = swipe moving upward, must start near the BOTTOM edge.
// "down" = swipe moving downward, must start near the TOP edge.
//
// edgeGated: most pages fill the whole screen and have no competing internal
// horizontal/vertical gesture, so swipes are recognized starting anywhere.
// Pass `true` (or an object like { left: true }) to require the gesture to
// start near the matching edge — only needed when the page has its own
// scroll/drag-and-drop content that would otherwise conflict (e.g. TaskBoard).
export function useEdgeSwipeNav(directions = {}, { ignoreTarget, edgeGated } = {}) {
  const navigate = useNavigate();
  const touchStart = useRef({ x: 0, y: 0 });
  const armed = useRef({ left: false, right: false, up: false, down: false });
  const ignoring = useRef(false);
  const [dragStyle, setDragStyle] = useState({});

  const isEdgeGated = (direction) => edgeGated === true || !!edgeGated?.[direction];

  const handlePointerStart = useCallback((x, y, target) => {
    if (ignoreTarget && target && ignoreTarget(target)) {
      ignoring.current = true;
      return;
    }
    ignoring.current = false;
    touchStart.current = { x, y };
    setDragStyle({});
    const w = window.innerWidth;
    const h = window.innerHeight;
    armed.current = {
      left: !!directions.left && (!isEdgeGated("left") || x > w - EDGE_ZONE),
      right: !!directions.right && (!isEdgeGated("right") || x < EDGE_ZONE),
      up: !!directions.up && (!isEdgeGated("up") || y > h - EDGE_ZONE),
      down: !!directions.down && (!isEdgeGated("down") || y < EDGE_ZONE)
    };
  }, [directions.left, directions.right, directions.up, directions.down, ignoreTarget, edgeGated]);

  const handlePointerMove = useCallback((x, y) => {
    if (ignoring.current) return;
    const dx = x - touchStart.current.x;
    const dy = y - touchStart.current.y;
    const horizontalArmed = (dx < 0 && armed.current.left) || (dx > 0 && armed.current.right);
    const verticalArmed = (dy < 0 && armed.current.up) || (dy > 0 && armed.current.down);

    if (Math.abs(dx) > Math.abs(dy)) {
      if (!horizontalArmed) return;
      setDragStyle({ transform: `translateX(${dx}px)`, transition: "none" });
    } else {
      if (!verticalArmed) return;
      setDragStyle({ transform: `translateY(${dy}px)`, transition: "none" });
    }
  }, []);

  const handlePointerEnd = useCallback((x, y) => {
    if (ignoring.current) { ignoring.current = false; return; }
    setDragStyle({ transform: "translate(0, 0)", transition: "transform 0.3s ease-out" });
    const dx = x - touchStart.current.x;
    const dy = y - touchStart.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (absDx < SWIPE_THRESHOLD && absDy < SWIPE_THRESHOLD) return;

    if (absDx > absDy) {
      if (dx < 0 && armed.current.left && directions.left) navigate(directions.left);
      else if (dx > 0 && armed.current.right && directions.right) navigate(directions.right);
    } else {
      if (dy < 0 && armed.current.up && directions.up) navigate(directions.up);
      else if (dy > 0 && armed.current.down && directions.down) navigate(directions.down);
    }
  }, [navigate, directions.left, directions.right, directions.up, directions.down]);

  const swipeHandlers = {
    onTouchStart: (e) => handlePointerStart(e.touches[0].clientX, e.touches[0].clientY, e.target),
    onTouchMove: (e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY),
    onTouchEnd: (e) => handlePointerEnd(e.changedTouches[0]?.clientX ?? touchStart.current.x, e.changedTouches[0]?.clientY ?? touchStart.current.y),
    onMouseDown: (e) => handlePointerStart(e.clientX, e.clientY, e.target),
    onMouseMove: (e) => { if (e.buttons === 1) handlePointerMove(e.clientX, e.clientY); },
    onMouseUp: (e) => handlePointerEnd(e.clientX, e.clientY)
  };

  return { swipeHandlers, dragStyle };
}
