import React from 'react';
import { motion } from 'framer-motion';

// Magnetic Button Component
const MagneticButton = ({ children, className, href, ...props }) => {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const ref = React.useRef(null);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setPosition({ x: x * 0.3, y: y * 0.3 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const Component = href ? motion.a : motion.button;

    return (
        <Component
            ref={ref}
            href={href}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            {...props}
        >
            {children}
        </Component>
    );
};

// Tilt Card Component
const TiltCard = ({ children, className }) => {
    const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
    const ref = React.useRef(null);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setRotation({ x: y * 20, y: x * -20 });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: rotation.x,
                rotateY: rotation.y,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        >
            {children}
        </motion.div>
    );
};

// Reveal Text Component
const RevealText = ({ children, className, delay = 0 }) => {
    return (
        <div className="overflow-hidden">
            <motion.div
                className={className}
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.8,
                    delay,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

// Parallax Image Component
const ParallaxImage = ({ src, alt, className, speed = 0.5 }) => {
    const [offset, setOffset] = React.useState(0);
    const ref = React.useRef(null);

    React.useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            setOffset((scrollProgress - 0.5) * 100 * speed);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                style={{ y: offset }}
            />
        </div>
    );
};

// Cursor Follower Component  
const CursorFollower = () => {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = React.useState(false);

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Main cursor */}
            <motion.div
                className="fixed w-4 h-4 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: position.x - 8,
                    y: position.y - 8,
                    scale: isHovering ? 2 : 1,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            />
            {/* Trailing cursor */}
            <motion.div
                className="fixed w-10 h-10 border border-blue-500/50 rounded-full pointer-events-none z-[9998]"
                animate={{
                    x: position.x - 20,
                    y: position.y - 20,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            />
        </>
    );
};

export { MagneticButton, TiltCard, RevealText, ParallaxImage, CursorFollower };
