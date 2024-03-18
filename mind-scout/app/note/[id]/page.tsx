import { AuthorCheck } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import NoteDetails from "../NoteDetails";
import DeleteNoteButton from "./DeleteNoteButton";
import EditNoteButton from "./EditNoteButton";
interface Props {
  params: { id: string };
}
const NoteDetailPAge = async ({ params }: Props) => {
  const note = await prisma.page.findUnique({
    where: {
      id: params.id,
    },
  });

  const authorCheck = await AuthorCheck(note!);

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <NoteDetails note={note!} />
      </Box>
      {authorCheck && (
        <Box>
          <Flex direction="column" gap="3">
            {note?.status === "IN_PROGRESS" && (
              <Flex direction="column" gap="3">
                <EditNoteButton noteid={note?.id!} />
                <DeleteNoteButton noteid={note?.id} />
              </Flex>
            )}
          </Flex>
        </Box>
      )}
    </Grid>
  );
};
export default NoteDetailPAge;
