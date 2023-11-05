import styled from "styled-components";
import ScrollWrapper from "./ScrollWrapper";
import data from "../../data/overview";

const ScrollAnimation = () => {
  return (
    <Wrapper>
      <ScrollWrapper>
        <Poster src="https://img.imbc.com/adams/Program/20237/133336262124493935.jpg" />
      </ScrollWrapper>
      <OverviewWrapper>
        {data.map((overview) => (
          <ScrollWrapper key={overview}>
            <Overview>{overview}</Overview>
          </ScrollWrapper>
        ))}
      </OverviewWrapper>
    </Wrapper>
  );
};

export default ScrollAnimation;

const Wrapper = styled.div`
  background: linear-gradient(to bottom, #dcd9d4, #c8dde6);
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  padding: 300px 20px 100px;
`;

const Poster = styled.img`
  width: 100%;
  display: block;
  object-fit: cover;
  margin-bottom: 100px;
`;

const OverviewWrapper = styled.div``;

const Overview = styled.p`
  margin-bottom: 50px;
  font-family: "Shilla_CultureB-Bold";
  font-size: 1.5rem;
  color: #575755;
  line-height: 1.8;
  white-space: pre;

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`;
