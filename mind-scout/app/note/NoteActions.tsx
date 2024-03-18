import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import NoteStatusFilter from "./NoteStatusFilter";

const NoteActions = () => {
  return (
    <Flex justify="between">
      <NoteStatusFilter />
      <Button variant="soft">
        <Link href="/note/new">New Page</Link>
      </Button>
    </Flex>
  );
};
export default NoteActions;
