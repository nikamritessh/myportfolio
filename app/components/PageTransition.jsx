'use client';

import {
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    useSyncExternalStore,
} from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const PageTransitionContext = createContext({ entering: false });

const EASE = [0.16, 1, 0.3, 1];

function useIsMobile() {
    return useSyncExternalStore(
        (onStoreChange) => {
            const mq = window.matchMedia('(max-width: 900px)');
            mq.addEventListener('change', onStoreChange);
            return () => mq.removeEventListener('change', onStoreChange);
        },
        () => window.matchMedia('(max-width: 900px)').matches,
        () => false,
    );
}

export function usePageEntering() {
    return useContext(PageTransitionContext).entering;
}

export default function PageTransition({ children }) {
    const pathname = usePathname();
    const reduceMotion = useReducedMotion();
    const isMobile = useIsMobile();
    const visited = useRef(new Set());
    const [entering, setEntering] = useState(false);

    const isRevisit = visited.current.has(pathname);
    const shouldAnimate = !reduceMotion && !isRevisit;
    const duration = isMobile ? 1 : 1.15;
    const offsetY = isMobile ? 18 : 28;
    const enterMs = Math.round(duration * 1000) + 120;

    useLayoutEffect(() => {
        setEntering(shouldAnimate);
    }, [pathname, shouldAnimate]);

    useEffect(() => {
        visited.current.add(pathname);

        if (!shouldAnimate) {
            return undefined;
        }

        const timer = window.setTimeout(() => setEntering(false), enterMs);
        return () => window.clearTimeout(timer);
    }, [pathname, enterMs, shouldAnimate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const page = reduceMotion ? (
        <main id="main-content">{children}</main>
    ) : (
        <motion.main
            id="main-content"
            key={pathname}
            initial={shouldAnimate ? { opacity: 0, y: offsetY } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldAnimate ? duration : 0, ease: EASE }}
        >
            {children}
        </motion.main>
    );

    return (
        <PageTransitionContext.Provider value={{ entering }}>
            {page}
        </PageTransitionContext.Provider>
    );
}
