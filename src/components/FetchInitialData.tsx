"use client";
import {
  fetchAuditLogs,
  fetchFeatures,
} from "@/libs/redux/features/systemFeatures/systemFeatures";
import { AppDispatch } from "@/libs/redux/store";
import React from "react";
import { useDispatch } from "react-redux";

export default function FetchInitialData() {
  const dispatch: AppDispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchFeatures());
    dispatch(fetchAuditLogs());
  }, [dispatch]);
  return null;
}
