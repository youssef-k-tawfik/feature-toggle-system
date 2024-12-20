"use client";
import { FeatureType } from "@/types/featureType";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../LoginForm/LoginForm";
import { useState } from "react";
import { AppDispatch, RootState } from "@/libs/redux/store";
import {
  recordAuditLog,
  toggleFeature,
} from "@/libs/redux/features/systemFeatures/systemFeatures";
import { parse } from "cookie";

export default function FeaturesList() {
  const { userToken } = useSelector((state: RootState) => state.user);
  const { features } = useSelector((state: RootState) => state.systemFeatures);
  const dispatch: AppDispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const filteredFeatures = features?.filter((feature) =>
    feature.name.includes(searchQuery)
  );

  const handleFeatureToggle = (feature: FeatureType) => {
    dispatch(toggleFeature({ id: feature.id, enabled: !feature.enabled }));
    const now = new Date();
    dispatch(
      recordAuditLog({
        featureName: feature.name,
        previousState: feature.enabled,
        newState: !feature.enabled,
        changedBy: parse(document.cookie).userName as string,
        timestamp: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDate()}/${
          now.getMonth() + 1
        }/${now.getFullYear()}`,
      })
    );
  };

  return (
    <div className="bg-[#1b1f23] p-4 rounded-t-lg">
      <h3 className="font-semibold mb-2 text-center">Features</h3>

      {userToken ? (
        <div className="min-w-72">
          <input
            type="text"
            placeholder="Search features..."
            className="mb-4 p-2 w-full rounded-lg border border-gray-500 bg-inherit"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="max-h-72 overflow-auto">
            {filteredFeatures?.map((feature: FeatureType) => (
              <label
                key={feature.id}
                className="capitalize block mb-3 cursor-pointer border border-gray-500 rounded-lg"
                htmlFor={feature.id.toString()}
              >
                <div className="border-b select-none flex items-center justify-between  pt-1 px-2  min-w-max">
                  <p className="me-4 font-semibold">{feature.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-500">
                      {feature.enabled ? "On" : "Off"}
                    </p>
                    <input
                      id={feature.id}
                      type="checkbox"
                      name={feature.name}
                      checked={feature.enabled}
                      onChange={() => handleFeatureToggle(feature)}
                    />
                  </div>
                </div>
                <p className="p-2 text-sm">{feature.description}</p>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <div className="min-w-max text-center">
          <h4 className="mb-2 ">Login to toggle features</h4>
          <LoginForm />
        </div>
      )}
    </div>
  );
}
