import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { sendUserData } from "../store/store";
import { motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative; /* Ensure relative positioning for absolute elements */
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 0.2rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 2px 1px #007bff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  font-size: 1.2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    background-color: #0062cc;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Modal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      dispatch(sendUserData({ name: username, score: password }));
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <Container>
          <Form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: "-50%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-50%" }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={handleClose}>X</CloseButton>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Button type="submit">Log in</Button>
          </Form>
        </Container>
      )}
    </>
  );
};

export default Modal;
