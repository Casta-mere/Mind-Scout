import { Page } from "@prisma/client";
import { Avatar, Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { NoteStatusBadge } from "../components";
import Link from "next/link";

const NoteCard = ({ note, avatarUrl }: { note: Page; avatarUrl: string }) => {
  return (
    <Link href={`/note/${note.id}`}>
      <Card size="1">
        <Flex direction="row" justify="between" align="center" mb="2">
          <Flex direction="column" justify="between" align="start" gap="2">
            <Heading as="h1" className="line-clamp-1">
              {note.title}
            </Heading>
            <NoteStatusBadge status={note.status} />
          </Flex>
          <Avatar src={avatarUrl} fallback={"?"} />
        </Flex>
        <ReactMarkdown className="line-clamp-3">{note.content}</ReactMarkdown>
      </Card>
    </Link>
  );
};
export default NoteCard;
