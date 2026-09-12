import { motion } from "framer-motion";

const FloatingIcon = ({
  icon: Icon,
  size = 80,
  top,
  left,
  color = "text-indigo-300",
  delay = 0,
  duration = 8,
}) => {
  return (
    <motion.div
      className={`absolute ${color} opacity-20`}
      style={{ top, left }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -25, 20, 0],
        rotate: [-3, 3, -2, 0],
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    >
      <Icon size={size} strokeWidth={1} />
    </motion.div>
  );
};

export default FloatingIcon;