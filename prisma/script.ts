import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "admin",
        password: "admin",
      },
      {
        name: "user",
        password: "user",
      },
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

  console.log("Initial data set properly");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
