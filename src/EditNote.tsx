import { NoteData, Tag } from "./App";
import NoteForm from "./NoteForm";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
     onSubmit: (id: string, data: NoteData) => void;
     onAddTag: (tag: Tag) => void;
     availableTags: Tag[];
};
export default function EditNote({
     onSubmit,
     onAddTag,
     availableTags,
}: EditNoteProps) {
     const note = useNote();
     return (
          <>
               <div className="mb-4">Edit Note</div>
               <NoteForm
                    title={note.title}
                    markdown={note.markdown}
                    tags={note.tags}
                    onSubmit={(data) => onSubmit(note.id, data)}
                    onAddTag={onAddTag}
                    availableTags={availableTags}
               ></NoteForm>
          </>
     );
}
