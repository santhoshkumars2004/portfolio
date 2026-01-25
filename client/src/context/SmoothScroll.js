import React, { useEffect, useRef, createContext, useContext, useState } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScrollContext = createContext({
    lenis: null,
    scrollProgress: 0,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider = ({ children }) => {
    const lenisRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        lenis.on('scroll', ({ progress }) => {
            setScrollProgress(progress);
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollProgress }}>
            {children}
        </SmoothScrollContext.Provider>
    );
};

export default SmoothScrollProvider;
