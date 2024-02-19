import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./NewNote";
export type Note = {
     id: string;
} & NoteData;

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
     return (
          <Container className="my-4">
               <Routes>
                    <Route path="/" element={<h1>home</h1>}></Route>
                    <Route path="/new" element={<NewNote />}></Route>
                    <Route path="/:id">
                         <Route index element={<h1>show</h1>}></Route>
                         <Route path="edit" element={<h1>edit</h1>}></Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/" />}></Route>
               </Routes>
          </Container>
     );
}
