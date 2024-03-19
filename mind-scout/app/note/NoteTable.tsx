import { Page, pageStatus } from "@prisma/client";
import { Flex, Table, TableColumnHeaderCell } from "@radix-ui/themes";
import { Link, NoteScopeBadge, NoteStatusBadge } from "@/app/components";

interface Props {
  searchParams: NoteQuery;
  notes: Page[];
}
export interface NoteQuery {
  status: pageStatus;
  orderBy: keyof Page;
  page: string;
}

const NoteTable = ({ searchParams, notes }: Props) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <TableColumnHeaderCell>Title</TableColumnHeaderCell>
          <TableColumnHeaderCell className="hidden md:table-cell">
            Description
          </TableColumnHeaderCell>
          <TableColumnHeaderCell className="hidden md:table-cell">
            Page Status
          </TableColumnHeaderCell>
          <TableColumnHeaderCell className="hidden md:table-cell">
            Last Edit
          </TableColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {notes.map((note) => (
          <Table.Row key={note.id}>
            <Table.Cell>
              <Link href={`/note/${note.id}`}>{note.title || ""}</Link>
              <div className="block md:hidden">
                <Flex gap="3">
                  <NoteStatusBadge status={note.status} />
                  {note.scope === "PUBLIC" && (
                    <NoteScopeBadge scope={note.scope} />
                  )}
                </Flex>
              </div>
            </Table.Cell>

            <Table.Cell className="hidden md:table-cell max-w-60">
              <div className="line-clamp-1 ">{note.description}</div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Flex gap="3">
                <NoteStatusBadge status={note.status} />
                {note.scope === "PUBLIC" && (
                  <NoteScopeBadge scope={note.scope} />
                )}
              </Flex>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {note.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
export default NoteTable;
