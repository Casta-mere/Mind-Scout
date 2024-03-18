import { GetUser } from "@/app/components";
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import NoteActions from "./NoteActions";
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

  return (
    <Flex direction="column" gap="4">
      <NoteActions />
      <NoteTable notes={notes} />
    </Flex>
  );
};
export default NotesPage;
