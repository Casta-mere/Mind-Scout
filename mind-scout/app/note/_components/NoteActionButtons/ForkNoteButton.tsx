"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { LuCopy } from "react-icons/lu";
import { Page } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const ForkNoteButton = ({ note }: { note: Page }) => {
  const router = useRouter();
  const onFork = async (note: Page) => {
    const data = {
      title: note.title,
      description: note.description,
      content: note.content,
    };
    const newNote = await axios.post("/api/note", data);
    router.push("/note/" + newNote.data.id);
    router.refresh();
  };
  return (
    <Button color="indigo" onClick={() => onFork(note)}>
      <LuCopy />
      <Link href="">Fork This</Link>
    </Button>
  );
};
export default ForkNoteButton;
