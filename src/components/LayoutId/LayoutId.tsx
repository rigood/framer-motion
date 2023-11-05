import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function LayoutId() {
  const [boxId, setBoxId] = useState<null | string>();

  const [circleSwitched, setCircleSwitched] = useState(false);
  const switchCircle = () => setCircleSwitched((prev) => !prev);

  const boxRef = useRef<HTMLDivElement>(null);
  const getBoxWidth = () => {
    if (boxRef.current) {
      return boxRef.current.offsetWidth;
    }
  };

  return (
    <Wrapper>
      <BoxGrid>
        <Box
          onClick={() => setBoxId("first")}
          layoutId={"first"}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.3 },
          }}
          ref={boxRef}
        >
          Hover me! <br /> Click me!
        </Box>
        <Box>{!circleSwitched && <Circle layoutId="switch" />}</Box>
        <Box>{circleSwitched && <Circle layoutId="switch" />}</Box>
        <Box
          onClick={() => setBoxId("last")}
          layoutId={"last"}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.3 },
          }}
        >
          Hover me! <br /> Click me!
        </Box>
      </BoxGrid>

      {boxId && (
        <Overlay
          onClick={() => setBoxId(null)}
          initial={{ backgroundColor: "rgba(0,0,0,0)" }}
          animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          exit={{ backgroundColor: "rgba(0,0,0,0)" }}
        >
          <Modal layoutId={boxId} $boxWidth={getBoxWidth()!}>
            Thank you 🥰
          </Modal>
        </Overlay>
      )}

      <Button
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.3 },
        }}
        onClick={switchCircle}
      >
        공 옮기기
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e09, #d0e);
  font-family: "Pretendard-Regular";
`;

const BoxGrid = styled.div`
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
  }

  &:last-child {
    transform-origin: top left !important;
  }

  // transform-origin 관련
  // 1. 값을 px 단위로 지정하면 모달 크기를 반응형으로 만들 수 없으므로 string으로 지정해야함
  // 2. whileHover에 직접 originX, originY를 지정하면 'bottom', 'right'는 animatble value가 아니므로 style 속성을 통해 값을 지정하라는 경고가 뜨고,
  // 모달이 닫힐 때 애니메이션 효과가 적용되지 않음
  // 3. inline style로 originX, originY를 지정하면 모달이 닫힐 때 애니메이션 효과가 적용되지 않음
  // 4. !important 키워드를 사용해야 모달을 띄운 후 transform-origin이 기본값으로 초기화되지 않고 애니메이션이 적용됨
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

const Modal = styled(motion.div)<{ $boxWidth: number }>`
  width: ${({ $boxWidth }) => $boxWidth + "px"};
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
