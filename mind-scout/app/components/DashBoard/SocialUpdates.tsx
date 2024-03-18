import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import NoteStatusBadge from "../Badge/NoteStatusBadge";

const SocilaUpdates = async () => {
  const notes = await prisma.page.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      author: true,
    },
  });
  return (
    <Card className="max-w-full h-full">
      <Heading size="4" mb="4">
        Home
      </Heading>
      <Table.Root>
        <Table.Body>
          {notes.map((note) => (
            <Table.Row key={note.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/note/${note.id}`}>{note.title}</Link>
                    <NoteStatusBadge status={note.status}></NoteStatusBadge>
                  </Flex>
                  <Flex align="center">
                    <Avatar
                      src={note.author.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  </Flex>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};
export default SocilaUpdates;
