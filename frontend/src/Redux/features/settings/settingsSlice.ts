import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Setting, SettingsState } from "../../../types/Types";

const initialState: SettingsState = {
  settings: [],
  status: "idle",
  error: null,
};
// Thunks for async actions
export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/v1/setting");
      console.log("Fetched Settings Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching settings:", error);
      throw error;
    }
  }
);

export const addSetting = createAsyncThunk(
  "settings/addSetting",
  async (setting: Omit<Setting, "_id">) => {
    const response = await axios.post(
      "http://localhost:8800/api/v1/setting",
      setting
    );
    console.log("Added Setting Response:", response.data);
    return response.data;
  }
);

export const updateSetting = createAsyncThunk(
  "settings/updateSetting",
  async (setting: Setting) => {
    const response = await axios.patch(
      `http://localhost:8800/api/v1/setting/${setting._id}`,
      setting
    );
    console.log("Updated Setting Response:", response.data); // Log the API response
    return response.data;
  }
);

export const deleteSetting = createAsyncThunk(
  "settings/deleteSetting",
  async (id: string) => {
    await axios.delete(`http://localhost:8800/api/v1/setting/${id}`);
    console.log(`Deleted Setting with ID: ${id}`);
    return id;
  }
);

// Slice definition
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch settings
      .addCase(fetchSettings.pending, (state) => {
        console.log("Fetching settings...");
        state.status = "loading";
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        console.log("Settings fetch succeeded:", action.payload);
        state.status = "succeeded";
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        console.log("Settings fetch failed:", action.error.message);
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch settings";
      })

      // Add setting
      .addCase(addSetting.fulfilled, (state, action) => {
        console.log("Setting added:", action.payload);
        state.settings.push(action.payload);
      })

      // Update setting
      .addCase(updateSetting.fulfilled, (state, action) => {
        const index = state.settings.findIndex(
          (setting) => setting._id === action.payload._id
        );
        if (index !== -1) {
          console.log("Setting updated:", action.payload);
          state.settings[index] = action.payload;
        }
      })

      // Delete setting
      .addCase(deleteSetting.fulfilled, (state, action) => {
        console.log("Setting deleted:", action.payload);
        state.settings = state.settings.filter(
          (setting) => setting._id !== action.payload
        );
      });
  },
});

export default settingsSlice.reducer;
