"use client";
import { toggleFeature } from "@/redux/features/systemFeatures/systemFeatures";
import { FeatureType } from "@/types/featureType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LoginForm from "../LoginForm/LoginForm";
import { useState } from "react";

export default function FeaturesList() {
  const { userToken } = useSelector((state: RootState) => state.user);
  const { features } = useSelector((state: RootState) => state.systemFeatures);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("")
  const filteredFeatures = features?.filter((feature) => feature.name.includes(searchQuery));

  const handleFeatureToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleFeature({ id: e.target.id }));
  };

  return (
    <div className="bg-[#1b1f23] p-4 rounded-t-lg">
      <h3 className="font-semibold mb-2 text-center">Features</h3>

      {userToken ? (
        <>
          <input
            type="text"
            placeholder="Search features..."
            className="mb-4 p-2 w-full rounded-lg border border-gray-500 bg-inherit"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {filteredFeatures?.map((feature: FeatureType) => (
            <label
              key={feature.id}
              className="capitalize block mb-3 cursor-pointer border border-gray-500 rounded-lg"
              htmlFor={feature.id.toString()}
            >
              <div className="select-none flex items-center justify-between  py-1 px-2  min-w-max">
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
                    onChange={handleFeatureToggle}
                  />
                </div>
              </div>
              <p className="ml-2 text-sm">{feature.description}</p>
            </label>
          ))}
        </>
      ) : (
        <div className="min-w-max text-center">
          <h4 className="mb-2 ">Login to toggle features</h4>
          <LoginForm />
        </div>
      )}
    </div>
  );
}
