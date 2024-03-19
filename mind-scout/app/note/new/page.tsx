import { Metadata } from "next";
import dynamic from "next/dynamic";

const NoteForm = dynamic(() => import("@/app/note/_components/NoteForm"), {
  ssr: false,
});

const page = () => {
  return <NoteForm />;
};
export default page;

export const metadata: Metadata = {
  title: "Mind-Scout - New Note",
  description: "Create New Note",
};
