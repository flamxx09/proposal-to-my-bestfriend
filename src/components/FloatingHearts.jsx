import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

export default function FloatingHearts() {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const generated = [...Array(10)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: Math.random() * 2,
            duration: 4 + Math.random() * 2,
            size: Math.random() * (20 - 12) + 12, // 12px - 20px
        }));
        setHearts(generated);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {hearts.map((h, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{ left: h.left, top: h.top }}
                    animate={{
                        y: [-20, -40, -20],
                        x: [-10, 10, -10],
                        rotate: [0, 5, -5, 0],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: h.duration,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: h.delay,
                    }}
                >
                    <Heart
                        className="text-pink-400/40 fill-current drop-shadow-[0_0_6px_rgba(236,72,153,0.6)]"
                        style={{ width: h.size, height: h.size }}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
}
