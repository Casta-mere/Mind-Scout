import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditNoteButton = ({ noteid }: { noteid: string }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/note/${noteid}/edit`}>Edit Note</Link>
    </Button>
  );
};
export default EditNoteButton;
