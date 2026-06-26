'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePageEntering } from './PageTransition';

const variants = {
    hidden: { opacity: 1, y: 14 },
    show: { opacity: 1, y: 0 },
};

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
}

export default function Reveal({ children, delay = 0, className, as = 'div' }) {
    const MotionTag = motion[as] || motion.div;
    const reduceMotion = useReducedMotion();
    const entering = usePageEntering();
    const ref = useRef(null);
    const [skipMotion, setSkipMotion] = useState(false);

    useLayoutEffect(() => {
        if (entering || reduceMotion) {
            setSkipMotion(false);
            return;
        }

        const el = ref.current;
        if (el && isInViewport(el)) {
            setSkipMotion(true);
        }
    }, [entering, reduceMotion]);

    const Tag = as;

    if (reduceMotion || entering || skipMotion) {
        return (
            <Tag ref={ref} className={className}>
                {children}
            </Tag>
        );
    }

    return (
        <MotionTag
            ref={ref}
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -8% 0px', amount: 0.2 }}
            variants={variants}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
        >
            {children}
        </MotionTag>
    );
}
