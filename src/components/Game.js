import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../store/store";

const getRandomNumber = () => Math.floor(Math.random() * 3);

const catImage = `/images/Cat/${getRandomNumber()} - This card features a playful and mischievous-l.png`;
const defuseImage = `/images/DefuseCat/${getRandomNumber()} - The defuse card could show a confident cat her.png`;
const shuffleImage = `/images/ShuffleCat/${getRandomNumber()} - For the shuffle card the cat could be depicted.png`;
const bombImage = `/images/ExplodingCat/${getRandomNumber()} - Exploding Kitten Card This card would have a d.png`;

const initialDeck = [
  { id: 1, type: "cat", image: catImage },
  { id: 2, type: "defuse", image: defuseImage },
  { id: 3, type: "shuffle", image: shuffleImage },
  { id: 4, type: "bomb", image: bombImage },
  { id: 5, type: "cat", image: catImage },
];

const Game = () => {
  const [deck, setDeck] = useState(initialDeck);
  const [revealedCards, setRevealedCards] = useState([]);
  const [lifeLine, setLifeLine] = useState(0);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [showNameForm, setShowNameForm] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    setDeck(shuffleArray(initialDeck));
    const welcomeTimer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 3000);

    return () => clearTimeout(welcomeTimer);
  }, []);

  const handleCardClick = (id) => {
    const clickedCard = deck.find((card) => card.id === id);

    if (!revealedCards.includes(id)) {
      setRevealedCards([...revealedCards, id]);

      if (clickedCard.type === "defuse") {
        setLifeLine((prevLifeLine) => prevLifeLine + 1);
        showMessagePopup("You defused a bomb!");
      } else if (clickedCard.type === "bomb") {
        if (lifeLine > 0) {
          setLifeLine((prevLifeLine) => prevLifeLine - 1);
          showMessagePopup("You survived the bomb!");
        } else {
          showMessagePopup("Sorry, game ended. You lost!");
          setTimeout(() => handleRestartGame(), 3000);
        }
      } else if (clickedCard.type === "shuffle") {
        const shuffledDeck = shuffleArray(deck);
        setDeck(shuffledDeck);
        showMessagePopup("Game shuffled!");
        handleRestartGame();
      }

      if (revealedCards.length === initialDeck.length - 2) {
        showMessagePopup("Congratulations! You won!");
        setShowNameForm(true);

        // Dispatch action to add/update user's score
        const existingUser = users.find((user) => user.name === playerName);
        if (existingUser) {
          dispatch(
            updateUser({ name: playerName, score: existingUser.score + 1 })
          );
        } else {
          dispatch(addUser({ name: playerName, score: 1 }));
        }
      }
    }
  };

  const handleRestartGame = () => {
    setDeck(initialDeck);
    setRevealedCards([]);
    setLifeLine(0);
    setShowMessage(false);
    setMessageContent("");
    setShowNameForm(false);
  };

  const showMessagePopup = (message) => {
    setShowMessage(true);
    setMessageContent(message);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim() !== "") {
      const existingUser = users.find((user) => user.name === playerName);
      if (existingUser) {
        dispatch(
          updateUser({ name: playerName, score: existingUser.score + 1 })
        );
      } else {
        dispatch(addUser({ name: playerName, score: 1 }));
      }
      setShowNameForm(false);
      setPlayerName("");
    }
  };

  return (
    <Main>
      {showWelcomeMessage && (
        <Message
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Welcome! Let's Play!
        </Message>
      )}
      <LifeLineContainer>
        <LifeLine>LifeLine: 💗{lifeLine}</LifeLine>
      </LifeLineContainer>
      <CardContainer>
        {deck.map((card) => (
          <Card
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            revealed={revealedCards.includes(card.id)}
            type={card.type}
          >
            {revealedCards.includes(card.id) && (
              <motion.img
                src={card.image}
                alt={card.type}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </Card>
        ))}
      </CardContainer>
      {showMessage && (
        <PopUpMessage
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
        >
          {messageContent}
        </PopUpMessage>
      )}
      {showNameForm && (
        <Modal>
          <Form onSubmit={handleSubmit}>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
            />
            <button type="submit">Submit</button>
          </Form>
        </Modal>
      )}
    </Main>
  );
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Main = styled.main`
  min-height: calc(100vh - 10px);
  background: url("/images/gamebackground.png") center center / cover no-repeat
    fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
`;

const Message = styled(motion.p)`
  font-size: 24px;
  color: #2d9be9;
  font-weight: 600;
  font-family: "Nunto", sans-serif;
  letter-spacing: 1.7;
  position: fixed;
  top: 110px;
  left: 45%;
  transform: translateX(-50%);
`;

const CardContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Card = styled.div`
  position: relative;
  width: 250px;
  height: 350px;
  border-radius: 8px;
  margin: 0 10px;
  background-color: ${(props) => (props.revealed ? "#ffffff" : "#333333")};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
  }
`;

const LifeLineContainer = styled.div`
  position: absolute;
  top: 110px;
  right: 30px;
`;

const LifeLine = styled.span`
  font-size: 24px;
  color: #2d9be9;
  font-weight: 600;
  font-family: "Nunto", sans-serif;
`;

const PopUpMessage = styled(motion.p)`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #2d9be9;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  button {
    padding: 8px 16px;
    background-color: #2d9be9;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #2576b7;
    }
  }
`;

export default Game;
