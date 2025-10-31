import {useEffect, useState} from "react";

import { loadItmes } from "@/mob/view/constants/loadItem.ts";
import { motion } from "framer-motion";

export const LoadContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % loadItmes.length);
    }, 3000); // 3초마다 변경

    return () => clearInterval(interval);
  }, []);

  const activeColor = "#016DFF";
  const inactiveColor = "#9FA3B7";

  return (
    <div className="flex flex-col items-center gap-6">
      {loadItmes.map((item, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={item.title}
            className="w-[180px] flex items-center justify-start gap-[11px]"
          >
            <motion.div
              animate={{color: isActive ? activeColor : inactiveColor}}
              transition={{duration: 0.5}}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-[100px]"
            >
              <item.icon className="w-5 h-5 fill-current"/>
            </motion.div>

            <motion.p
              animate={{color: isActive ? "#191E3C" : inactiveColor}}
              transition={{duration: 0.5}}
              className="flex items-center tracking-[-.32px]"
            >
              {item.title}
            </motion.p>
          </div>
        );
      })}
    </div>
  )
}