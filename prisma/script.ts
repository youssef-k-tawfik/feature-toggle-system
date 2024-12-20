import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
//   const newUser = await prisma.feature.createMany({
//     data: [
//       {
//         name: "comment",
//         description: "Allow users to comment on posts",
//       },
//       {
//         name: "like",
//         description: "Allow users to like posts",
//       },
//       {
//         name: "share",
//         description: "Allow users to share posts",
//       },
//     ],
//   });
//   console.log("New usersss created:", newUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
