"use client";
import { pageStatus } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: pageStatus }[] = [
  { label: "All" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Archieved", value: "ARCHIEVED" },
];

const NoteStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setStatusFilter = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.get("status")) params.delete("status");
    if (status) params.append("status", status === "All" ? "All" : status);
    const query = params.size ? "?" + params.toString() : "";
    router.push("/note" + query);
  };
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "All"}
      onValueChange={setStatusFilter}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            key={status.value || "All"}
            value={status.value || "All"}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
export default NoteStatusFilter;
