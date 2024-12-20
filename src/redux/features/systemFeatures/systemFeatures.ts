import { FeatureType } from "@/types/featureType";
import { createSlice } from "@reduxjs/toolkit";
import { auditLogs, features as mockFeatures } from "../../mockStore";
import { AuditLogType } from "@/types/auditLogType";

interface SystemFeaturesState {
  features: FeatureType[];
  auditLogs: AuditLogType[];
}

// using dummy data for preview
const initialState: SystemFeaturesState = {
  features: mockFeatures,
  auditLogs: auditLogs,
};

const systemFeaturesSlice = createSlice({
  name: "systemFeatures",
  initialState,
  reducers: {
    focusInputComment() {
      document.getElementById("newCommentInput")?.focus();
    },
    toggleFeature(state, { payload }: { payload: { id: string } }) {
      const feature = state.features.find(
        (feature) => feature.id === payload.id
      );

      if (feature) {
        feature.enabled = !feature.enabled;

        const userToken = localStorage.getItem("userToken") || "Unknown";
        const now = new Date();
        const newAuditLog: AuditLogType = {
          id: crypto.randomUUID(),
          featureName: feature.name,
          previousState: !feature.enabled,
          newState: feature.enabled,
          changedBy: userToken,
          timestamp: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDate()}/${
            now.getMonth() + 1
          }/${now.getFullYear()}`,
        };
        state.auditLogs.push(newAuditLog);
      } else {
        console.error("Feature id not found:" + payload.id);
      }
    },
    recordAuditLog(state, action: { payload: AuditLogType }) {
      state.auditLogs.push(action.payload);
    },
    addNewFeature(state, { payload: newFeature }: { payload: FeatureType }) {
      state.features.push(newFeature);
    },
    deleteFeatures(state, { payload }: { payload: { IDs: string[] } }) {
      payload.IDs.forEach((id) => {
        const index = state.features.findIndex((feature) => feature.id === id);
        if (index !== -1) {
          state.features.splice(index, 1);
        } else {
          console.error("Feature id not found:" + id);
        }
      });
    },
    editFeature(
      state,
      { payload }: { payload: { id: string; newEditedFeature: FeatureType } }
    ) {
      const indexOfEditingFeature = state.features.findIndex(
        (feature) => feature.id === payload.id
      );
      if (indexOfEditingFeature !== -1) {
        state.features[indexOfEditingFeature] = payload.newEditedFeature;
      } else {
        console.error("Feature id not found:" + payload.id);
      }
    },
  },
  //   extraReducers: (builder) => {
  //     api call reducers
  //   },
});

export const {
  focusInputComment,
  toggleFeature,
  recordAuditLog,
  addNewFeature,
  deleteFeatures,
  editFeature,
} = systemFeaturesSlice.actions;

export default systemFeaturesSlice.reducer;
