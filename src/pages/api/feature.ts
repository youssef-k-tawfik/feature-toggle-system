import prisma from "@/libs/prisma/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get all features
    if (req.method === "GET") {
      console.log("Fetching all features");
      const features = await prisma.feature.findMany();
      console.log("Features fetched successfully");
      res.status(200).json(features);
    }
    // Create a new feature
    else if (req.method === "POST") {
      const { name, description } = req.body;

      if (!name || !description) {
        console.error("Name and description are required");
        return res
          .status(400)
          .json({ error: "Name and description are required" });
      }

      console.log("Creating a new feature");

      const newFeature = await prisma.feature.create({
        data: {
          name,
          description,
        },
      });

      console.log("Feature created successfully");

      res.status(201).json(newFeature);
    }
    // Update a feature
    else if (req.method === "PUT") {
      const { id, name, description } = req.body;

      if (!id || !name || !description) {
        console.error("ID, name, and description are required");
        return res
          .status(400)
          .json({ error: "ID, name, and description are required" });
      }

      console.log(`Updating feature with ID: ${id}`);

      const updatedFeature = await prisma.feature.update({
        where: { id },
        data: {
          name,
          description,
        },
      });

      console.log("Feature updated successfully");

      res.status(200).json(updatedFeature);
    }
    // Toggle enabled property of a feature
    else if (req.method === "PATCH") {
      const { id, enabled } = req.body;

      if (!id || typeof enabled !== "boolean") {
        console.error("ID and enabled property are required");
        return res
          .status(400)
          .json({ error: "ID and enabled property are required" });
      }

      console.log(`Toggling enabled property for feature with ID: ${id}`);

      await prisma.feature.update({
        where: { id },
        data: {
          enabled,
          lastModified: new Date(),
        },
      });

      console.log("Feature enabled property toggled successfully");

      res.status(200).json({ id, enabled });
    }
    // Delete a feature
    else if (req.method === "DELETE") {
      const { id } = req.body;

      if (!id) {
        console.error("ID is required");
        return res.status(400).json({ error: "ID is required" });
      }

      console.log(`Deleting feature with ID: ${id}`);

      const feature = await prisma.feature.findUnique({
        where: { id },
      });

      if (!feature) {
        console.error("Feature not found");
        return res.status(404).json({ error: "Feature not found" });
      }

      await prisma.auditLog.deleteMany({
        where: { featureName: feature.name },
      });

      await prisma.feature.delete({
        where: { id },
      });

      console.log("Feature deleted successfully");

      res.status(200).json({ id });
    } else {
      console.error("Method not allowed");
      res.status(405).end();
    }
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" + error });
  }
}
