import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/map";

const initialState = {
  maps: [],
  isError: false,
  isSuccess: false,
  message: "",
};

const getMessage = (error) => {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  );
};

export const getMaps = createAsyncThunk("maps/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token;
    return await api.getMaps(token);
  } catch (error) {
    // send error message as payload
    return thunkAPI.rejectWithValue(getMessage(error));
  }
});

export const deleteMap = createAsyncThunk(
  "maps/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await api.deleteMap(id, token);
    } catch (error) {
      // send error message as payload
      return thunkAPI.rejectWithValue(getMessage(error));
    }
  }
);

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMaps.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.maps = action.payload;
      })
      .addCase(getMaps.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMap.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.maps = state.maps.filter((map) => map._id !== action.payload.id);
      })
      .addCase(deleteMap.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetState } = mapSlice.actions;
export default mapSlice.reducer;