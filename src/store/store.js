import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const usersSlice = createSlice({
  name: "usersDetails",
  initialState: [],
  reducers: {
    addUser(state, action) {
      state.push({
        name: action.payload.name,
        score: action.payload.score || 0,
      });
    },
    deleteUser(state, action) {
      const userIdToDelete = action.payload.name;
      return state.filter((user) => user.name !== userIdToDelete);
    },
    updateUser(state, action) {
      const { name, score } = action.payload;
      const userToUpdate = state.find((user) => user.name === name);
      if (userToUpdate) {
        Object.assign(userToUpdate, { name, score });
      }
    },
  },
});

export const { addUser, deleteUser, updateUser } = usersSlice.actions;

export const sendUserData = (userData) => async (dispatch) => {
  try {
    await axios.post("http://localhost:8080/addUser", userData);
    console.log("User data sent successfully.");
    dispatch(addUser(userData));
  } catch (error) {
    console.error("Error sending user data:", error);
  }
};

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});

export default store;
