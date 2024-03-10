import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router-dom";
import Modal from "./Modal";

const Header = () => {
  const locat = useLocation();
  const [headerBgColor, setHeaderBgColor] = useState("#001d72");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (locat.pathname === "/") {
      setHeaderBgColor("#001d72");
    } else if (locat.pathname === "/game") {
      setHeaderBgColor("#5000bb");
    } else if (locat.pathname === "/leaderboard") {
      setHeaderBgColor("#1a1a1a");
    } else {
      setHeaderBgColor("#fff");
    }
  }, [locat]);

  const handleLogin = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLoginSubmit = (name) => {
    // Handle login submission here
    console.log("User's name:", name);
    setIsModalOpen(false);
  };

  return (
    <>
      <Container style={{ backgroundColor: headerBgColor }}>
        <Logo to="/">
          <img src="/images/Logo.png" alt="App_logo" />
          <h1 style={{ color: "#f7559a", textDecoration: "none" }}>
            Kitten Kaboom
          </h1>
        </Logo>
        <Menu>
          <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <Link to="/" style={{ color: "#f7559a", textDecoration: "none" }}>
              About
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <Link
              to="/game"
              style={{ color: "#f7559a", textDecoration: "none" }}
            >
              Play
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <Link
              to="/leaderboard"
              style={{ color: "#f7559a", textDecoration: "none" }}
            >
              LeaderBoard
            </Link>
          </motion.li>
        </Menu>
        <Login whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <button onClick={handleLogin}>Login</button>
        </Login>
        <ScrollProgressBar style={{ scaleX }} />
      </Container>
      <Outlet />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleLoginSubmit}
      />
    </>
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
const Logo = styled(Link)`
  h1 {
    font-weight: 900;
    font-size: 32px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    border-radius: 50%;
    width: 80px;
    height: 80px;
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

const Login = styled(motion.div)`
  margin-right: 10px;
  button {
    background-color: #f7559a;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    // animation: jump 1s ease-in-out infinite;
  }

  // button:hover {
  //   animation: none;
  //   transform: translateY(-10px);
  //   background-color: #e64780;
  // }

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
