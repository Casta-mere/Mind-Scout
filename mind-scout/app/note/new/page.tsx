import dynamic from "next/dynamic";

const NoteForm = dynamic(() => import("@/app/note/_components/NoteForm"), {
  ssr: false,
});

const page = () => {
  return <NoteForm />;
};
export default page;
