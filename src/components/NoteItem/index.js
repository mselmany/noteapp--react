import React, { useCallback } from "react";
import "./styles.css";
import dayjs from "dayjs";
import NoteHeader from "components/NoteHeader";
import ContentEditable from "components/_atoms/ContentEditable";
import Button from "components/_atoms/Button";
import { useTodo } from "Providers/TodoProvider";
import * as localStore from "commons/localStore";

export default function NoteItem({ note }) {
  const { update, remove } = useTodo();
  let date = `${dayjs(note.date).format("D MMMM YYYY, dddd")}`;

  const updateContent = useCallback(
    value => {
      note.content = value;
      localStore.update(note.id, note);
    },
    [note]
  );

  const _update = useCallback(() => {
    update({ id: note.id, content: "Yeni" });
  }, [note.id, update]);

  const _remove = useCallback(() => {
    remove({ id: note.id, content: note.content, date });
  }, [date, note.content, note.id, remove]);

  return (
    <div className="NoteItem">
      <div className="NoteItem__Container Layout--vertical">
        <div className="NoteItem__Head">
          <NoteHeader title={`#${note.id} ･ ${date} tarihinde oluşturuldu`} />
        </div>
        <div className="NoteItem__Content">
          <ContentEditable input={note.content} onUpdate={updateContent} />
        </div>
        <div className="NoteItem__ButtonContainer">
          <div className="NoteItem__Button">
            <Button action={_update}>Güncelle</Button>
          </div>
          <div className="NoteItem__Button NoteItem__Button--right">
            <Button action={_remove}>Sil</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
