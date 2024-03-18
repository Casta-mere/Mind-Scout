import prisma from "@/prisma/client";
import { Grid } from "@radix-ui/themes";
import NoteCard from "./NoteCard";

const NoteCards = async () => {
  const notes = await prisma.page.findMany({
    where: {
      scope: "PUBLIC",
    },
    include: {
      author: true,
    },
  });

  return (
    <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="5">
      {notes.map((note) => (
        <NoteCard
          note={note}
          key={note.id}
          avatarUrl={note.author.image || ""}
        />
      ))}
    </Grid>
  );
};
export default NoteCards;
