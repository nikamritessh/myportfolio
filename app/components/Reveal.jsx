'use client';

import { motion } from 'framer-motion';

const variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

export default function Reveal({ children, delay = 0, className, as = 'div' }) {
    const MotionTag = motion[as] || motion.div;
    return (
        <MotionTag
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={variants}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1], delay }}
        >
            {children}
        </MotionTag>
    );
}
