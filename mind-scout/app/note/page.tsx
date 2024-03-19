import { GetUser, Pagination } from "@/app/components";
import prisma from "@/prisma/client";
import { pageStatus } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import NoteActions from "./NoteActions";
import NoteTable, { NoteQuery } from "./NoteTable";
interface Props {
  searchParams: NoteQuery;
}

const NotesPage = async ({ searchParams }: Props) => {
  const status = Object.values(pageStatus).includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const user = await GetUser();
  const where = { authorId: user?.id, status };
  const notes = await prisma.page.findMany({
    where,
    orderBy: {
      updatedAt: "desc",
    },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const notesCount = await prisma.page.count({ where });

  return (
    <Flex direction="column" gap="4">
      <NoteActions />
      <NoteTable notes={notes} searchParams={searchParams} />
      <Pagination
        pageSize={PAGE_SIZE}
        currentPage={page}
        itemCount={notesCount}
      />
    </Flex>
  );
};
export default NotesPage;

const PAGE_SIZE = 10;
