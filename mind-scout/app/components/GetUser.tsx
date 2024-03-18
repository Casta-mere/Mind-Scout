import prisma from "@/prisma/client";

async function GetUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
export default GetUser;
