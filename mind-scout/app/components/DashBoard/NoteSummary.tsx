import { pageStatus } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  inProgress: number;
  archieved: number;
}

const NoteSummary = ({ inProgress, archieved }: Props) => {
  const containers: { label: string; value: number; status: pageStatus }[] = [
    { label: "In Progress Notes", value: inProgress, status: "IN_PROGRESS" },
    { label: "Archieved Notes", value: archieved, status: "ARCHIEVED" },
  ];
  return (
    <Flex gap="4" justify="between" className="w-full">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/note/?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};
export default NoteSummary;
