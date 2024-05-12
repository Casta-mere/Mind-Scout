import { AuthorCheck, GetUser } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { cache } from "react";
import NoteDetails from "../NoteDetails";
import {
  DeleteNoteButton,
  EditNoteButton,
  ForkNoteButton,
  PublishButton,
  ReviewNoteButton,
  StatusSelectButton,
} from "../_components";
interface Props {
  params: { id: string };
}

const fetchNote = cache((noteid: string) =>
  prisma.page.findUnique({
    where: {
      id: noteid,
    },
    include: {
      author: true,
    },
  })
);

const NoteDetailPAge = async ({ params }: Props) => {
  const note = await fetchNote(params.id);

  const authorCheck = await AuthorCheck(note!);
  const loginCheck = await GetUser();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <NoteDetails note={note!} avatarUrl={note?.author.image!} />
      </Box>
      <Box>
        {authorCheck && (
          <Flex direction="column" gap="3">
            <StatusSelectButton note={note!} />
            {note?.status === "IN_PROGRESS" && (
              <>
                <EditNoteButton noteid={note?.id!} />
                <DeleteNoteButton noteid={note?.id!} />
              </>
            )}
            {note?.status === "ARCHIEVED" && note.reviews && (
              <ReviewNoteButton noteid={note?.id} />
            )}
            {note?.status === "ARCHIEVED" && note?.scope !== "PUBLIC" && (
              <PublishButton noteid={note?.id!} />
            )}
          </Flex>
        )}
        {!authorCheck && loginCheck && <ForkNoteButton note={note!} />}
      </Box>
    </Grid>
  );
};

export default NoteDetailPAge;

export async function generateMetadata({ params }: Props) {
  const note = await fetchNote(params.id);
  return {
    title: note?.title || "Note " + note?.id,
    description: "Detail of Note " + note?.id,
  };
}
