import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";

const NoteActions = () => {
  return (
    <Flex>
      <Button>
        <Link href="">New Page</Link>
      </Button>
    </Flex>
  );
};
export default NoteActions;
