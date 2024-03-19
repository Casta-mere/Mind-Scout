import dynamic from "next/dynamic";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
const NoteForm = dynamic(() => import("@/app/note/_components/NoteForm"), {
  ssr: false,
});

interface Props {
  params: { id: string };
}

const EditPage = async ({ params }: Props) => {
  const note = await prisma.page.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!note) notFound();

  return <NoteForm note={note} />;
};
export default EditPage;

export async function generateMetadata({ params }: Props) {
  const note = await prisma.page.findUnique({ where: { id: params.id } });
  return {
    title: "Editing: " + note?.title || note?.id,
    description: "Edit Note " + note?.id,
  };
}
