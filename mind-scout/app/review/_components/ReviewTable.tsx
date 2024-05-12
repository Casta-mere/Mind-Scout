import { Page, pageStatus } from "@prisma/client";
import { Grid } from "@radix-ui/themes";
import ReviewCard from "./ReviewCard";

interface Props {
  notes: Page[];
}

const ReviewTable = ({ notes }: Props) => {
  return (
    <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="5" my="4">
      {notes.map((note, index) => (
        <ReviewCard note={note} key={index} />
      ))}
    </Grid>
  );
};
export default ReviewTable;
