import { Pagination } from "@/app/components";
import prisma from "@/prisma/client";
import { Grid } from "@radix-ui/themes";
import NoteCard from "./NoteCard";
interface Props {
  searchParams: NoteQuery;
}
export interface NoteQuery {
  page: string;
}

const NoteCards = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;

  const where: {} = { scope: "PUBLIC" };
  const notes = await prisma.page.findMany({
    where,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: {
      author: true,
    },
  });
  const notesCount = await prisma.page.count({ where });

  return (
    <>
      <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="5" mb="4">
        {notes.map((note) => (
          <NoteCard
            note={note}
            key={note.id}
            avatarUrl={note.author.image || ""}
          />
        ))}
      </Grid>
      <Pagination
        pageSize={PAGE_SIZE}
        currentPage={page}
        itemCount={notesCount}
      />
    </>
  );
};
export default NoteCards;

const PAGE_SIZE = 12;
