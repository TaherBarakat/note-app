import { FormEvent, useRef } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData } from "./App";

type NoteFormProps = {
     onSubmit: (data: NoteData) => void;
};

export default function NoteForm({ onSubmit }: NoteFormProps) {
     const titleRef = useRef<HTMLInputElement>(null);
     const markdownRef = useRef<HTMLTextAreaElement>(null);
     function handleSubmit(e: FormEvent) {
          e.preventDefault();

          onSubmit({
               title: titleRef.current!.value,
               markdown: markdownRef.current!.value,
               tags: [],
          });
     }
     return (
          <Form onSubmit={handleSubmit}>
               <Stack>
                    <Row>
                         <Col>
                              <Form.Group controlId="title">
                                   <Form.Label>Title</Form.Label>
                                   <Form.Control
                                        ref={titleRef}
                                        required
                                   ></Form.Control>
                              </Form.Group>
                         </Col>
                         <Col>
                              <Form.Group controlId="tags">
                                   <Form.Label>Tags</Form.Label>
                                   <CreatableReactSelect isMulti />
                              </Form.Group>
                         </Col>
                    </Row>
                    <Row>
                         <Form.Group controlId="markdown">
                              <Form.Label>Title</Form.Label>
                              <Form.Control
                                   ref={markdownRef}
                                   required
                                   as="textarea"
                                   rows={15}
                              ></Form.Control>
                         </Form.Group>
                    </Row>
                    <Stack direction="horizontal" gap={2}>
                         <Button type="submit" variant="primary">
                              Save
                         </Button>
                         <Link to="..">
                              <Button type="submit" variant="outline-secondary">
                                   Cancel
                              </Button>
                         </Link>
                    </Stack>
               </Stack>
          </Form>
     );
}
