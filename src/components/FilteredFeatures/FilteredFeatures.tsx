"use client";
import { RootState } from "@/libs/redux/store";
import { FeatureType } from "@/types/featureType";
import { useSelector } from "react-redux";

export default function FilteredFeatures({ enabled }: { enabled: boolean }) {
  const { features } = useSelector((state: RootState) => state.systemFeatures);

  const FilteredFeatures: FeatureType[] = features.filter(
    (feature) => feature.enabled == enabled
  );

  return (
    <div className="bg-[#1b1f23] text-center rounded-lg border border-gray-500 p-2 mb-4">
      <h3 className="font-bold border-b-2">
        {enabled ? "Enabled" : "Disabled"} Features
      </h3>
      <ul className="px-2 pt-2 ">
        {FilteredFeatures.map((feature) => (
          <li
            key={feature.id}
            className="p-2 border-b border-gray-500 last:border-b-0"
          >
            {feature.name}
          </li>
        ))}
        {FilteredFeatures.length === 0 && <li className="p-2">None</li>}
      </ul>
    </div>
  );
}
