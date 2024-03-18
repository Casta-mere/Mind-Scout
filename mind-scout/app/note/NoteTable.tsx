import { Page } from "@prisma/client";
import { Table, TableColumnHeaderCell } from "@radix-ui/themes";
import { Link, NoteStatusBadge } from "@/app/components";

interface Props {
  notes: Page[];
}

const NoteTable = ({ notes }: Props) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <TableColumnHeaderCell>Title</TableColumnHeaderCell>
          <TableColumnHeaderCell>Description</TableColumnHeaderCell>
          <TableColumnHeaderCell>Page Status</TableColumnHeaderCell>
          <TableColumnHeaderCell>Last Edit</TableColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {notes.map((note) => (
          <Table.Row key={note.id}>
            <Table.Cell>
              <Link href={`/note/${note.id}`}>{note.title || ""}</Link>
              <div className="block md:hidden">
                <NoteStatusBadge status={note.status} />
              </div>
            </Table.Cell>

            <Table.Cell className="hidden md:table-cell max-w-4">
              <div className="line-clamp-1 ">{note.description}</div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <NoteStatusBadge status={note.status} />
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
