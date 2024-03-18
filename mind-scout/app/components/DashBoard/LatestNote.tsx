import { Page } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { Link, NoteStatusBadge } from "@/app/components";
interface Props {
  note: Page;
}

const LatestNote = ({ note }: Props) => {
  return (
    <Card className="h-full w-full">
      <Flex direction="column" align="start" gap="3" m="3">
        <ReactMarkdown className="line-clamp-3 prose">
          {"## 继续编辑..."}
        </ReactMarkdown>
        <Heading as="h1" className="line-clamp-1">
          <Link href={"/note/" + note.id}>{note.title!}</Link>
        </Heading>
        <NoteStatusBadge status={note.status} />
        <ReactMarkdown className="line-clamp-3 prose">
          {note.content}
        </ReactMarkdown>
      </Flex>
    </Card>
  );
};
export default LatestNote;
