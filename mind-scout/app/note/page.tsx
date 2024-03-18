import prisma from "@/prisma/client";
import { GetUser } from "@/app/components";
import NoteTable from "./NoteTable";

const NotesPage = async () => {
  const user = await GetUser();
  const notes = await prisma.page.findMany({
    where: {
      authorId: user?.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  console.log(notes.map((page) => page.id));

  return <NoteTable notes={notes} />;
};
export default NotesPage;
