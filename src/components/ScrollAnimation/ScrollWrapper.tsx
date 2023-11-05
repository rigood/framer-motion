import { ReactNode } from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import fadeInVariants from "../../animations/fadeInAnimation";

interface ScrollWrapperProps {
  children: ReactNode;
}
const ScrollWrapper = ({ children }: ScrollWrapperProps) => {
  const { ref, animation } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      variants={fadeInVariants}
      initial="hidden"
      animate={animation}
    >
      {children}
    </motion.div>
  );
};

export default ScrollWrapper;
