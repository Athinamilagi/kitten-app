import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Container>
      <Title>About Kitten Kaboom</Title>
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
          whileHover={{ scale: 1.4 }}
          transition={{ duration: 0.3 }}
        />
      </ImageContainer>
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
  color: #555;
  font-weight: 600;
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
