import { NoteScopeBadge, NoteStatusBadge } from "@/app/components";
import { Page } from "@prisma/client";
import { Avatar, Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const NoteDetails = ({
  note,
  avatarUrl,
}: {
  note: Page;
  avatarUrl: string;
}) => {
  return (
    <>
      <Flex direction="column">
        <Flex direction="row" justify="start" gap="4" align="center">
          <Heading as="h1">{note.title}</Heading>
          <Avatar src={avatarUrl} fallback={"?"} radius="full" size="3" />
        </Flex>
        <Flex gap="3" my="5" align="center">
          <NoteStatusBadge status={note.status} />
          {note.scope === "PUBLIC" && <NoteScopeBadge scope={note.scope} />}
          <Text>{note.createdAt.toDateString()}</Text>
        </Flex>
      </Flex>
      <Card className="prose max-w-full">
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </Card>
    </>
  );
};
export default NoteDetails;
