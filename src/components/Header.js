import React from "react";
import styled from "styled-components";
import { motion, useScroll, useSpring } from "framer-motion";

const Header = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);
  return (
    <Container>
      <Logo>
        <img src="/images/logo.png" alt="App_logo" />
        <h1>Kitten Kaboom</h1>
      </Logo>
      <Menu>
        <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} >
          About
        </motion.li>
        <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          Play
        </motion.li>
        <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          LeaderBoard
        </motion.li>
      </Menu>
      <Login>
        <button>Login</button>
      </Login>
      <ScrollProgressBar style={{ scaleX }} />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  font-family: "Nunito", sans-serif;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #f7559a;
  position: fixed;
  right: 0;
  left: 0;
  min-height: 70px;
  background: #001d72;
`;
const Logo = styled.div`
  h1 {
    font-weight: 900;
    font-size: 32px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
`;

const Menu = styled.ul`
  display: flex;
  width: -webkit-fill-available;
  align-items: center;
  justify-content: space-around;
  font-size: 18px;
  li {
    font-weight: 600;
  }
`;

const Login = styled.div`
  margin-right: 10px;
  button {
    background-color: #f7559a;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    animation: jump 1s ease-in-out infinite;
  }

  button:hover {
    animation: none;
    transform: translateY(-10px);
    background-color: #e64780;
  }

  @keyframes jump {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const ScrollProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background-color: #f7559a;
  z-index: 999;
`;
