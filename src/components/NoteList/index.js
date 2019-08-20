import React from "react";
import "./styles.css";
import FloatingSidebar from "components/FloatingSidebar";
import NoteItem from "components/NoteItem";
import { useTodo } from "Providers/TodoProvider";

export default function NoteList() {
  const {
    state: { list }
  } = useTodo();

  return (
    <div className="NoteList">
      <div className="NoteList__Container Layout--horizontal">
        <FloatingSidebar label="Not ekle" />
        {list.map(note => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
