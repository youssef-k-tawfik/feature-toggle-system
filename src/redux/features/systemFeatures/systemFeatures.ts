import Feature from "@/types/featureType";
import { createSlice } from "@reduxjs/toolkit";
import { features as mockFeatures } from "../../mockStore";

interface SystemFeaturesState {
  features: Feature[];
}

// using dummy data for preview
const initialState: SystemFeaturesState = {
  features: mockFeatures,
};

const systemFeaturesSlice = createSlice({
  name: "systemFeatures",
  initialState,
  reducers: {
    focusInputComment() {
      document.getElementById("newCommentInput")?.focus();
    },
    toggleFeature(state, action: { payload: { id: number } }) {
      const feature = state.features.find(
        (feature) => feature.id === action.payload.id
      );
      if (feature) {
        feature.enabled = !feature.enabled;
      } else {
        console.error("Feature id not found:" + action.payload.id);
      }
    },
  },
  //   extraReducers: (builder) => {
  //     api call reducers
  //   },
});

export const { focusInputComment, toggleFeature } = systemFeaturesSlice.actions;

export default systemFeaturesSlice.reducer;
