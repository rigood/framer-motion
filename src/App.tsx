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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 50px;
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 250px;
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
`;

const Circle = styled(motion.div)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
`;

const Button = styled(motion.button)`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  color: #228be6;
  cursor: pointer;
`;

const Overlay = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export default function App() {
  const [switched, setSwitched] = useState(false);
  const [id, setId] = useState<null | string>();
  const toggleBtn = () => setSwitched((prev) => !prev);
  return (
    <Wrapper>
      <Grid>
        <Box onClick={() => setId("1")} layoutId={"1"} whileHover={{ scale: 1.1, originX: "400px", originY: "250px" }} />
        <Box>{switched ? null : <Circle layoutId="switch" />}</Box>
        <Box>{switched ? <Circle layoutId="switch" /> : null}</Box>
        <Box onClick={() => setId("4")} layoutId={"4"} whileHover={{ scale: 1.1, originX: "0", originY: "0" }} />
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay onClick={() => setId(null)} initial={{ backgroundColor: "rgba(0,0,0,0)" }} animate={{ backgroundColor: "rgba(0,0,0,0.5)" }} exit={{ backgroundColor: "rgba(0,0,0,0)" }}>
            <Box layoutId={id} style={{ backgroundColor: "rgb(255,255,255)" }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Button
        whileHover={{
          scale: 1.2,
          color: "rgb(245, 159, 0)",
          transition: { duration: 0.5 },
        }}
        onClick={toggleBtn}
      >
        Switch
      </Button>
    </Wrapper>
  );
}
