import React from "react";
import styled from "styled-components";
import About from "./About";
import { motion } from "framer-motion";

const Home = () => {
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Main>
        <ScrollDownButton
          whileHover={{ scale: 1. }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollDown}
          initial={{ rotate: 1800 , scale: 1.3}}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Scroll Down
        </ScrollDownButton>
      </Main>
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

const ScrollDownButton = styled(motion.button)`
  position: absolute;
  bottom: 50px;
  left: 45%;
  background-color: #ff6f61;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  outline: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
