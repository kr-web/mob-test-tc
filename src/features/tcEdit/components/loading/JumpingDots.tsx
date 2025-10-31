import { motion } from "framer-motion";

export const JumpingDots = () => {
  return (
    <div className="flex h-16 items-center">
      <div className="flex gap-1.5">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="h-1 w-1 rounded-full bg-secondary-gray2"
            animate={{
              y: [0, -6, 0], // 위로 점프했다가 다시 내려옴
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1, // 각 점마다 순차 지연
            }}
          />
        ))}
      </div>
    </div>
  );
};
