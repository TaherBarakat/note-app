import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./NewNote";
import useLocalStorage from "./useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
export type Note = {
     id: string;
} & NoteData;

export type RowNote = {
     id: string;
} & RowNoteData;

export type RowNoteData = {
     title: string;
     markdown: string;
     tagIds: string[];
};
export type NoteData = {
     title: string;
     markdown: string;
     tags: Tag[];
};
export type Tag = {
     id: string;
     label: string;
};

export default function App() {
     const [notes, setNotes] = useLocalStorage<RowNote[]>("NOTES", []);
     const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

     const notesWithTags = useMemo(() => {
          return notes.map((note) => {
               return {
                    ...note,
                    tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
               };
          });
     }, [notes, tags]);

     function onCreateNote({ tags, ...data }: NoteData) {
          setNotes((prevNotes) => [
               ...prevNotes,
               { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
          ]);
     }
     function addTag(tag: Tag) {
          setTags((prev) => [...prev, tag]);
     }
     return (
          <Container className="my-4">
               <Routes>
                    <Route path="/" element={<h1>home</h1>}></Route>
                    <Route
                         path="/new"
                         element={
                              <NewNote
                                   onSubmit={onCreateNote}
                                   onAddTag={addTag}
                                   availableTags={tags}
                              />
                         }
                    ></Route>
                    <Route path="/:id">
                         <Route index element={<h1>show</h1>}></Route>
                         <Route path="edit" element={<h1>edit</h1>}></Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/" />}></Route>
               </Routes>
          </Container>
     );
}
