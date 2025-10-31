import { motion } from "framer-motion";

interface BeatColorLoaderDotsProps {
  color?: string;
  size?: number;
  gap?: number;
  count?: number;
  duration?: number;
}

export const BeatColorLoaderDots = ({
  color = "#B6B9CA",
  size = 10,
  gap = 8,
  count = 8,
  duration = 1.2,
}: BeatColorLoaderDotsProps) => {
  const dots = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="mb-5 flex items-center justify-center" style={{ gap }}>
      {dots.map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.3, scale: 0.9 }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay: (i * duration) / count,
            ease: "easeInOut",
          }}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};
