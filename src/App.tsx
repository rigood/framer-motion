import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function App() {
  const [id, setId] = useState<null | string>();

  const [switched, setSwitched] = useState(false);
  const toggleBtn = () => setSwitched((prev) => !prev);

  const boxRef = useRef<HTMLDivElement>(null);
  const getBoxWidth = () => {
    if (!boxRef) return;

    return boxRef.current?.offsetWidth;
  };

  return (
    <Wrapper>
      <Grid>
        <Box
          onClick={() => setId("first")}
          layoutId={"first"}
          whileHover={{ scale: 1.1 }}
          ref={boxRef}
        >
          Hover me! <br /> Click me!
        </Box>
        <Box>{switched ? null : <Circle layoutId="switch" />}</Box>
        <Box>{switched ? <Circle layoutId="switch" /> : null}</Box>
        <Box
          onClick={() => setId("last")}
          layoutId={"last"}
          whileHover={{ scale: 1.1 }}
        >
          Hover me! <br /> Click me!
        </Box>
      </Grid>

      {id ? (
        <Overlay
          onClick={() => setId(null)}
          initial={{ backgroundColor: "rgba(0,0,0,0)" }}
          animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          exit={{ backgroundColor: "rgba(0,0,0,0)" }}
        >
          <Modal layoutId={id} width={getBoxWidth()!}>
            Thank you 🥰
          </Modal>
        </Overlay>
      ) : null}

      <Button
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.3 },
        }}
        onClick={toggleBtn}
      >
        공 옮기기
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 400px));
  gap: 20px;
  margin: 20px 10% 60px;
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 250px;
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: rgba(255, 255, 255, 0.5);
  font-weight: bold;

  &:first-child,
  &:last-child {
    cursor: pointer;
    background-color: rgba(216, 159, 202, 0.5);
  }

  &:first-child {
    transform-origin: bottom right !important;
    // whileHover에 originX: "400px", originY: "250px" -> 클릭하고 난 뒤에 origin값이 초기화됨
    // !important 키워드를 사용하지 않으면 Modal 띄운 후 transform-origin이 기본값으로 초기화됨
  }

  &:last-child {
    transform-origin: top left !important;
    // whileHover에 originX: 0, originY: 0 지정하면 클릭하고 난 뒤에 origin값이 초기화됨
    // !important 키워드를 사용하지 않으면 Modal 띄운 후 transform-origin이 기본값으로 초기화됨
  }
`;

const Modal = styled(motion.div)<{ width: number }>`
  width: ${({ width }) => width + "px"};
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: white;
  font-weight: bold;
  cursor: pointer;
`;

const Circle = styled(motion.div)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
