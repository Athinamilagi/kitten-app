import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
  };

  return (
    <Container>
      <Title style={{ fontWeight: 900, fontFamily: "Nunito, sans-serif" }}>
        About Kitten Kaboom
      </Title>
      <Content>
        Kitten Kaboom is an exciting online single-player card game where you
        embark on a journey to defuse exploding kittens while collecting
        adorable cat cards. Be prepared to strategize and use your defuse cards
        wisely to win the game and climb the leaderboard!
      </Content>
      <ImageContainer>
        <motion.img
          src="/images/kitten_kaboom_logo.png"
          alt="Kitten Kaboom Logo"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
        />
      </ImageContainer>
      <Link to="/game">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          style={{
            background: "#ff6f61",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            outline: "none",
            cursor: "pointer",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            marginTop: "30px",
          }}
        >
          <motion.span variants={textVariants}>Let's Play!</motion.span>
        </motion.button>
      </Link>
    </Container>
  );
};

export default About;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: calc(100vh - 70px);
  margin-top: 70px;
  background: url("/images/background2.png") center center / cover no-repeat
    fixed;
  position: absolute;
  top: 100%;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 900;
  color: #333;
  margin-bottom: 20px;
`;

const Content = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #000000;
  font-weight: 600;
  font-family: "Nunito", sans-serif;

  text-align: center;
  max-width: 600px;
  margin-bottom: 30px;
`;

const ImageContainer = styled.div`
  margin-top: 30px;

  img {
    width: 200px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
  }
`;
