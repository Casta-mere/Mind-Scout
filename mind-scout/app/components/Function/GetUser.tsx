import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/AuthOptions";

async function GetUser() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const email = session.user?.email!;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
export default GetUser;
