import prisma from "@/libs/prisma/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("logging in");
    const { name, password } = req.body;

    try {
      const user = await prisma.user.findFirst({
        where: {
          name,
          password,
        },
      });

      if (!user) {
        console.error("user not found");
        res.status(404).json({ error: "User not found" });
        return;
      }

      console.log("user found");

      const token = jwt.sign(
        { userId: user.id },
        (process.env.JWT_SECRET as string) || "secretKey",
        {
          expiresIn: "1w",
        }
      );

      console.log("generated a token");

      if (!token) {
        console.error("Failed to generate token");
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      res.setHeader("Set-Cookie", [
        serialize("userToken", token, {
          // httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
          path: "/",
        }),
        serialize("userName", name, {
          // httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
          path: "/",
        }),
      ]);

      console.log("serialized the token");

      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error:" + error });
    }
  } else {
    res.status(405).end();
  }
}
