import { AuthorCheck, GetUser } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import NoteDetails from "../NoteDetails";
import {
  DeleteNoteButton,
  EditNoteButton,
  ForkNoteButton,
  PublishButton,
  StatusSelectButton,
} from "../_components";
interface Props {
  params: { id: string };
}
const NoteDetailPAge = async ({ params }: Props) => {
  const note = await prisma.page.findUnique({
    where: {
      id: params.id,
    },
    include: {
      author: true,
    },
  });

  const authorCheck = await AuthorCheck(note!);
  const loginCheck = await GetUser();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <NoteDetails note={note!} avatarUrl={note?.author.image!} />
      </Box>
      {authorCheck && (
        <Box>
          <Flex direction="column" gap="3">
            <StatusSelectButton note={note!} />
            {note?.status === "IN_PROGRESS" && (
              <>
                <EditNoteButton noteid={note?.id!} />
                <DeleteNoteButton noteid={note?.id!} />
              </>
            )}
            {note?.status === "ARCHIEVED" && note?.scope !== "PUBLIC" && (
              <PublishButton noteid={note?.id!} />
            )}
          </Flex>
        </Box>
      )}
      {!authorCheck && loginCheck && <ForkNoteButton note={note!} />}
    </Grid>
  );
};
export default NoteDetailPAge;

export async function generateMetadata({ params }: Props) {
  const note = await prisma.page.findUnique({ where: { id: params.id } });
  return {
    title: note?.title || "Note " + note?.id,
    description: "Detail of Note " + note?.id,
  };
}
