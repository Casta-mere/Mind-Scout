import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/AuthOptions";
import { Page } from "@prisma/client";

async function AuthorCheck(note: Page) {
  const session = await getServerSession(authOptions);
  if (!session) return false;
  const email = session.user?.email!;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return note.authorId === user?.id;
}
export default AuthorCheck;
