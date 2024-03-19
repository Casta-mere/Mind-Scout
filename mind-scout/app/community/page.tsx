import NoteCards, { NoteQuery } from "./NoteCards";
interface Props {
  searchParams: NoteQuery;
}

const NotesPage = ({ searchParams }: Props) => {
  return <NoteCards searchParams={searchParams} />;
};

export const dynamic = "force-dynamic";

export default NotesPage;
