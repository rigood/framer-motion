# 🎢 Framer Motion 애니메이션 연습

- React, TypeScript, Framer-motion
- [DEMO 바로가기](https://rigood.github.io/framer-motion/)

<br/>

## 1. Box와 Modal을 자연스럽게 연결하기

- `layoutId`를 이용하여 Box와 Modal을 자연스럽게 연결할 수 있습니다.
- `whileHover`를 통해 hover 시 스타일을 지정할 수 있습니다.

<img src="public/assets/readme/box.gif" />

```js
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
```

</br>

## 2. 반응형 모달

- useRef를 통해 얻은 Box의 offsetWidth 값을 styled-components의 props로 전달하여 창 크기에 따라 모달의 width를 설정합니다.

|                Full Screen                 |                    Responsive                     |
| :----------------------------------------: | :-----------------------------------------------: |
| <img src="public/assets/readme/box.gif" /> | <img src="public/assets/readme/responsive.gif" /> |

```js
const boxRef = useRef < HTMLDivElement > null;
const getBoxWidth = () => {
  if (boxRef.current) {
    return boxRef.current.offsetWidth;
  }
};
```

```css
const Modal = styled(motion.div)<{ $boxWidth: number }>`
  width: ${({ $boxWidth }) => $boxWidth + "px"};
  // ...
`;
```

</br>

## 3. 공 옮기기

- `layoutId`를 이용하여 Circle을 자연스럽게 switch 할 수 있습니다.

<img src="public/assets/readme/circle.gif" />

```js
const [circleSwitched, setCircleSwitched] = useState(false);
const switchCircle = () => setCircleSwitched((prev) => !prev);

<Box>{!circleSwitched && <Circle layoutId="switch" />}</Box>
<Box>{circleSwitched && <Circle layoutId="switch" />}</Box>
```

</br>

## 4. 스크롤 애니메이션

- framer-motion의 `useAnimation` 훅과 react-intersection-observer의 `useInView` 훅을 사용하여 스크롤 시 `FadeIn` 되는 애니메이션 구현하였습니다.

<img src="public/assets/readme/scrollAnimation.gif" />

```ts
// 커스텀 훅
const useScrollAnimation = () => {
  const animation = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      // 엘리먼트가 뷰포트 내에 들어오면 visible 애니메이션 실행
      animation.start("visible");
    } else {
      // 엘리먼트가 뷰포트에서 벗어나면 hidden 애니메이션 실행
      animation.start("hidden");
    }
  }, [animation, inView]);

  return { ref, animation };
};

// 커스텀 훅이 적용된 Wrapper 컴포넌트
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

// 애니메이션 적용
<ScrollWrapper>
  <ExampleComponent />
</ScrollWrapper>;
```

<br>
