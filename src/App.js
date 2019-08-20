import React from "react";
import "./App.css";
import Header from "./components/Header";
import NoteList from "./components/NoteList";
import TodoProvider from "./Providers/TodoProvider";

export default function App() {
  return (
    <div className="App">
      <TodoProvider>
        {/* <Header /> */}
        <NoteList />
      </TodoProvider>
    </div>
  );
}
