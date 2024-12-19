"use client";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaGear } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { toggleFeature } from "@/redux/features/systemFeatures/systemFeatures";
import Feature from "@/types/featureType";

export default function SettingsButton() {
  const { features } = useSelector((state: RootState) => state.systemFeatures);
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="bg-[#1b1f23] text-white p-3 rounded-full"
        data-testid="settings-button"
      >
        <FaGear />
      </button>
      <div className="absolute bottom-full end-0">
        {showMenu && (
          <div className="bg-[#1b1f23] p-4 rounded-lg">
            <IoIosClose
              className="absolute top-2 start-2 text-red-500 hover:text-gray-200 hover:bg-red-500 cursor-pointer rounded-lg"
              onClick={() => setShowMenu(false)}
            />
            <h3 className="font-semibold mb-2 text-center">Features</h3>

            {features.map((feature: Feature) => (
              <label
                key={feature.id}
                className="capitalize block mb-3 cursor-pointer"
                htmlFor={feature.id.toString()}
              >
                <div className="select-none flex items-center justify-between border border-gray-500 py-1 px-2 rounded-lg min-w-max">
                  <p className="me-4">{feature.name}</p>
                  <input
                    id={feature.id.toString()}
                    type="checkbox"
                    name={feature.name}
                    checked={feature.enabled}
                    onChange={() => dispatch(toggleFeature({ id: feature.id }))}
                  />
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
