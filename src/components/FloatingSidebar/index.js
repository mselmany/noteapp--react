import React, { useCallback } from "react";
import "./styles.css";
import Button from "components/_atoms/Button";
import { useTodo } from "Providers/TodoProvider";

export default function FloatingSidebar({ label }) {
  const { add } = useTodo();

  const _add = useCallback(() => {
    add({ content: "" });
  }, [add]);

  return (
    <div className="FloatingSidebar">
      <div className="FloatingSidebar__Container Layout--Vertical">
        <div className="FloatingSidebar__Button">
          <Button type="icon" action={_add}>
            Ekle
          </Button>
        </div>
      </div>
    </div>
  );
}
