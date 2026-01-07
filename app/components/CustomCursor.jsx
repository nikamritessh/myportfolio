'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const cursorX = useSpring(0, { stiffness: 1000, damping: 40 });
    const cursorY = useSpring(0, { stiffness: 1000, damping: 40 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseDown = () => setIsPressed(true);
        const handleMouseUp = () => setIsPressed(false);

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('.luxury-card') ||
                target.closest('.nav-item') ||
                target.closest('.creative-project-card') ||
                target.closest('.mag-icon')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [cursorX, cursorY]);

    return (
        <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 99999 }}>
            {/* The Precision Dot */}
            <motion.div
                className="cursor-dot"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isHovering ? 1.5 : (isPressed ? 0.8 : 1),
                }}
            />
        </div>
    );
}
