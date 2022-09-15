import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 200px;
  width: 400px;
  height: 200px;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: rgba(255, 255, 255, 1);
  font-size: 40px;
`;

const box = {
  entry: (isBack: boolean) => ({
    x: isBack ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: (isBack: boolean) => ({
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  }),
  exit: (isBack: boolean) => ({
    x: isBack ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.5,
    },
  }),
};

export default function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlz = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prevPlz = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  return (
    <Wrapper>
      <AnimatePresence custom={back}>
        <Box custom={back} variants={box} initial="entry" animate="center" exit="exit" key={visible}>
          {visible}
        </Box>
      </AnimatePresence>
      <div>
        <button onClick={prevPlz}>prev</button>
        <button onClick={nextPlz}>next</button>
      </div>
    </Wrapper>
  );
}
