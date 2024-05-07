import { FaLightbulb } from "react-icons/fa";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditNoteButton = ({ noteid }: { noteid: string }) => {
  return (
    <Button color="blue">
      <FaLightbulb />
      <Link href={`/review/${noteid}`}>Review Note</Link>
    </Button>
  );
};
export default EditNoteButton;
