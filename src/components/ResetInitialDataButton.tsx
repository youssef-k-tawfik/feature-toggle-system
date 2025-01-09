"use client";
import {
  fetchAuditLogs,
  fetchFeatures,
} from "@/libs/redux/features/systemFeatures/systemFeatures";
import { AppDispatch } from "@/libs/redux/store";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ResetInitialDataButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleResetData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/resetInitialData");

      if (response.status === 200) {
        alert("Data reset successfully");
        dispatch(fetchFeatures());
        dispatch(fetchAuditLogs());
      } else {
        alert("Error resetting data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error resetting data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleResetData}
      className="absolute top-0 left-0 m-4 p-2 bg-red-500 text-white rounded-lg"
    >
      {isLoading ? "Loading..." : "Reset Initial Data"}
    </button>
  );
};

export default ResetInitialDataButton;
