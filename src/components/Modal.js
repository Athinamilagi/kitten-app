import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addUser } from "../store/store";

const Modal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser({ name: name })); 
    onClose();
  };

  return (
    <Backdrop isOpen={isOpen} onClick={onClose}>
      <ModalContent
        initial={{ y: "-100vh" }}
        animate={{ y: isOpen ? "0" : "-100vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Enter your name:</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <SubmitButton type="submit">Add</SubmitButton>
        </form>
      </ModalContent>
    </Backdrop>
  );
};

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
`;

const ModalContent = styled(motion.div)`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  cursor: default;
  pointer-events: auto;
  user-select: none;
`;
const SubmitButton = styled.button`
  background-color: #f7559a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e64780;
  }
`;

export default Modal;
