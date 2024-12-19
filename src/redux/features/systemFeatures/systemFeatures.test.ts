import { describe } from "node:test";
import systemFeaturesReducer, { toggleFeature } from "./systemFeatures";
import { features as mockFeatures } from "@/redux/mockStore";

const initialState = { features: mockFeatures };

describe("Redux: systemFeaturesReducer", () => {
  it("should return the initial state", () => {
    const action = { type: "" };
    const newState = systemFeaturesReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it("should handle increment", () => {
    const id = 1;
    const action = toggleFeature({ id });
    const newState = systemFeaturesReducer(initialState, action);
    expect(newState.features[id].enabled).toBe(false);
  });
});
