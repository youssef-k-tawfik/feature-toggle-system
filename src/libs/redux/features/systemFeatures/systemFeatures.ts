import { FeatureType } from "@/types/featureType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuditLogType } from "@/types/auditLogType";
import axios from "axios";

interface SystemFeaturesState {
  features: FeatureType[];
  auditLogs: AuditLogType[];
  isLoading?: boolean;
  isError?: string;
}

// using dummy data for preview
const initialState: SystemFeaturesState = {
  features: [],
  auditLogs: [],
};

export const fetchFeatures = createAsyncThunk(
  "systemFeatures/fetchFeatures",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/feature");
      // console.log("Fetched features successfully!");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createFeature = createAsyncThunk(
  "systemFeatures/createFeature",
  async (
    newFeature: { name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/feature", newFeature);
      const error = response.data.error;
      if (error) {
        return rejectWithValue(error);
      }
      // console.log(`Created ${newFeature.name} successfully!`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateFeature = createAsyncThunk(
  "systemFeatures/updateFeature",
  async (
    updatedFeature: { id: string; name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put("/api/feature", updatedFeature);
      const error = response.data.error;
      if (error) {
        return rejectWithValue(error);
      }
      // console.log(`Updated ${updatedFeature.name} successfully!`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteFeature = createAsyncThunk(
  "systemFeatures/deleteFeature",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/api/feature", { data: { id } });
      const error = response.data.error;
      if (error) {
        return rejectWithValue(error);
      }
      // console.log(`Deleted feature with ID: ${id} successfully!`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const toggleFeature = createAsyncThunk(
  "systemFeatures/toggleFeature",
  async (
    toggledFeature: { id: string; enabled: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch("/api/feature", toggledFeature);
      const error = response.data.error;
      if (error) {
        return rejectWithValue(error);
      }
      // console.log(
      //   `Toggled feature with ID: ${toggledFeature.id} successfully!`
      // );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAuditLogs = createAsyncThunk(
  "systemFeatures/fetchAuditLogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/auditLogs");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const recordAuditLog = createAsyncThunk(
  "systemFeatures/recordAuditLog",
  async (newAuditLog: AuditLogType, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auditLogs", newAuditLog);
      const error = response.data.error;
      if (error) {
        return rejectWithValue(error);
      }
      return newAuditLog;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const systemFeaturesSlice = createSlice({
  name: "systemFeatures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // !Fetching cases
      .addCase(fetchFeatures.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(fetchFeatures.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = "";
        state.features = payload;
      })
      .addCase(fetchFeatures.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload as string;
      })

      // !Creating cases
      .addCase(createFeature.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(createFeature.fulfilled, (state, { payload: newFeature }) => {
        state.isLoading = false;
        state.isError = "";
        state.features.push(newFeature);
      })
      .addCase(createFeature.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload as string;
      })

      // !Updating cases
      .addCase(updateFeature.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(
        updateFeature.fulfilled,
        (state, { payload: updatedFeature }) => {
          state.isLoading = false;
          state.isError = "";
          const index = state.features.findIndex(
            (feature) => feature.id === updatedFeature.id
          );
          state.features[index] = updatedFeature;
        }
      )
      .addCase(updateFeature.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload as string;
      })

      // !Deleting cases
      .addCase(deleteFeature.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(deleteFeature.fulfilled, (state, { payload: deletedID }) => {
        state.isLoading = false;
        state.isError = "";
        state.features = state.features.filter(
          (feature) => feature.id !== deletedID
        );
      })
      .addCase(deleteFeature.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload as string;
      })

      // !Toggling cases
      .addCase(toggleFeature.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(
        toggleFeature.fulfilled,
        (state, { payload }: { payload: { id: string; enabled: boolean } }) => {
          state.isLoading = false;
          state.isError = "";
          const index = state.features.findIndex(
            (feature) => feature.id === payload.id
          );
          state.features[index].enabled = payload.enabled;
        }
      )
      .addCase(toggleFeature.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload as string;
      })

      // !Fetching audit logs cases
      .addCase(fetchAuditLogs.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(fetchAuditLogs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = "";
        state.auditLogs = payload;
      })
      .addCase(fetchAuditLogs.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload as string;
      })

      // !Recording audit log cases
      .addCase(recordAuditLog.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(recordAuditLog.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = "";
        state.auditLogs.push(payload);
      })
      .addCase(recordAuditLog.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload as string;
      });
  },
});

export const {} = systemFeaturesSlice.actions;

export default systemFeaturesSlice.reducer;
