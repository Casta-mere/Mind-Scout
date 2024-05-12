"use client";
import { NoteStatusBadge } from "@/app/components";
import { Page } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const StatusSelectButton = ({ note }: { note: Page }) => {
  const router = useRouter();
  const changeStatus = async (status: string) => {
    await axios
      .patch("/api/note/" + note.id, {
        status: status,
      })
      .then(() => router.refresh())
      .catch(() => toast.error("Change not saved !"));
    if (status === "ARCHIEVED" && !note.reviews) {
      toast.success("Generating Reviews !");
      await axios
        .get("/proxy/gpt/" + note.id)
        .then(() => {
          router.refresh();
          toast.success("Start Reviewing !");
        })
        .catch(() => toast.error("Something went wrong !"));
    }
  };
  return (
    <>
      <Select.Root defaultValue={note.status} onValueChange={changeStatus}>
        <Select.Trigger placeholder="Status" />
        <Select.Content variant="soft">
          <Select.Group>
            <Select.Label>Options</Select.Label>
            <Select.Item value={"IN_PROGRESS"}>
              <NoteStatusBadge status="IN_PROGRESS" />
            </Select.Item>
            <Select.Item value={"ARCHIEVED"}>
              <NoteStatusBadge status="ARCHIEVED" />
            </Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};
export default StatusSelectButton;
