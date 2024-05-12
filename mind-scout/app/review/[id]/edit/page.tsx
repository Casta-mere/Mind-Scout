import dynamic from "next/dynamic";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { cache } from "react";
const ReviewForm = dynamic(
  () => import("@/app/review/[id]/_components/ReviewForm"),
  {
    ssr: false,
  }
);
interface Props {
  params: { id: string };
}

const fetchNote = cache((noteid: string) =>
  prisma.page.findUnique({
    where: {
      id: noteid,
    },
    include: {
      author: true,
    },
  })
);

const EditReviewPage = async ({ params }: Props) => {
  const note = await fetchNote(params.id);

  if (!note) notFound();

  return <ReviewForm note={note} avataUrl={note.author.image!} />;
};
export default EditReviewPage;

export async function generateMetadata({ params }: Props) {
  const note = await prisma.page.findUnique({ where: { id: params.id } });
  return {
    title: "Editing: " + note?.title || note?.id,
    description: "Edit Note " + note?.id,
  };
}
