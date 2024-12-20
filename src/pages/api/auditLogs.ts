import prisma from "@/libs/prisma/prismaClient";
import { AuditLogType } from "@/types/auditLogType";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get all audit logs
    if (req.method === "GET") {
      const { featureName } = req.query;

      if (featureName) {
        console.log(`Fetching audit logs for feature: ${featureName}`);
        const auditLogs = await prisma.auditLog.findMany({
          where: { featureName: featureName as string },
        });
        console.log("Fetched audit logs successfully!");
        res.status(200).json(auditLogs);
      } else {
        console.log("Fetching all audit logs...");
        const auditLogs = await prisma.auditLog.findMany();
        console.log("Fetched audit logs successfully!");
        res.status(200).json(auditLogs);
      }
    }
    // Create a new audit log
    else if (req.method === "POST") {
      console.log("Creating a new audit log...");
      const newAuditLog: AuditLogType = req.body;

      const { featureName, previousState, newState, changedBy, timestamp } =
        newAuditLog;

      if (!featureName) {
        console.error("Feature name is required");
        return res.status(400).json({
          error: "Feature name is required",
        });
      }

      if (previousState === undefined) {
        console.error("Previous state is required");
        return res.status(400).json({
          error: "Previous state is required",
        });
      }

      if (newState === undefined) {
        console.error("New state is required");
        return res.status(400).json({
          error: "New state is required",
        });
      }

      if (!changedBy) {
        console.error("Changed by is required");
        return res.status(400).json({
          error: "Changed by is required",
        });
      }

      if (!timestamp) {
        console.error("Timestamp is required");
        return res.status(400).json({
          error: "Timestamp is required",
        });
      }

      console.log("valid data sent");

      await prisma.auditLog.create({
        data: {
          featureName: newAuditLog.featureName,
          previousState: newAuditLog.previousState,
          newState: newAuditLog.newState,
          changedBy: newAuditLog.changedBy,
          timestamp: newAuditLog.timestamp,
        },
      });
      console.log("Created new audit log successfully!");
      res.status(201).json(newAuditLog);
    } else {
      console.error("Invalid HTTP method");
      res.status(405).end();
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
