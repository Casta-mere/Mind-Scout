import { pageStatus } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  pageStatus,
  { label: string; color: "green" | "violet" | "red" }
> = {
  IN_PROGRESS: { label: "In Progress", color: "green" },
  ARCHIEVED: { label: "Archieved", color: "violet" },
};

const NoteStatusBadge = ({ status }: { status: pageStatus }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};
export default NoteStatusBadge;
