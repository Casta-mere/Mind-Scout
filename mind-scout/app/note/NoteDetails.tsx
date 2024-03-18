import { NoteStatusBadge } from "@/app/components";
import { Page } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const NoteDetails = ({ note }: { note: Page }) => {
  return (
    <>
      <Heading as="h1">{note.title}</Heading>
      <Flex gap="3" my="5">
        <NoteStatusBadge status={note.status}></NoteStatusBadge>
        <Text>{note.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full">
        <Text>{note.description}</Text>
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </Card>
    </>
  );
};
export default NoteDetails;
