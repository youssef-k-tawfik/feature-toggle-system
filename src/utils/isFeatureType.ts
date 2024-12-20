import { FeatureType } from "@/types/featureType";

export default function isFeatureType(
  variable: unknown
): variable is FeatureType {
  return (
    typeof variable === "object" &&
    variable !== null &&
    typeof variable.id === "number" &&
    typeof variable.name === "string"
  );
}
