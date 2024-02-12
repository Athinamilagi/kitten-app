import React from "react";
import styled from "styled-components";
import About from "./About";

const Home = () => {
  return (
    <>
      <Main />
      <About />
    </>
  );
};

export default Home;

const Main = styled.main`
  min-height: calc(100vh - 70px);
  margin-top: 70px;
  background: url("/images/background1.png") center center / cover no-repeat
    fixed;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
`;
