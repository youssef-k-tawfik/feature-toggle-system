import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Delete all data from AuditLog, Feature, and User tables
      await prisma.auditLog.deleteMany({});
      await prisma.feature.deleteMany({});
      await prisma.user.deleteMany({});

      // Add new data
      await prisma.user.createMany({
        data: [
          { name: "admin", password: "admin" },
          { name: "user", password: "user" },
        ],
      });

      await prisma.feature.createMany({
        data: [
          {
            name: "comment",
            description: "Allow users to comment on posts",
            enabled: true,
          },
          {
            name: "like",
            description: "Allow users to like posts",
            enabled: true,
          },
          {
            name: "share",
            description: "Allow users to share posts",
            enabled: true,
          },
        ],
      });

      res.status(200).send("Data reset successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error resetting data");
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
