import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
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
    updateUser(state, action) {
      const { name, score } = action.payload;
      const userToUpdate = state.find((user) => user.name === name);
      if (userToUpdate) {
        userToUpdate.score += score; // Update score
      }
    },
    setLeaderboard(state, action) {
      return action.payload; // Set leaderboard data
    },
  },
});

export const { addUser, updateUser, setLeaderboard } = usersSlice.actions;

export const sendUserData = (userData) => async (dispatch) => {
  try {
    await axios.post("http://localhost:8080/addUser", userData);
    console.log("User data sent successfully.");
    dispatch(addUser(userData)); // Add user to store
  } catch (error) {
    console.error("Error sending user data:", error);
  }
};

export const fetchLeaderboardData = createAsyncThunk(
  "usersDetails/fetchLeaderboardData",
  async () => {
    try {
      const response = await axios.get("http://localhost:8080/leaderboard");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});

export default store;
