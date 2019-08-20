import React, { createContext, useReducer, useMemo, useContext, useCallback } from "react";
import { uuid, error } from "commons/utils";
import * as localStore from "commons/localStore";

let list = localStore.state("note@").asArray.map(({ key, value }) => {
  return {
    ...value,
    id: key
  };
});

if (!list.length) {
  list = [
    {
      id: uuid("note"),
      date: new Date().getTime(),
      content: "",
      archived: false
    }
  ];
}

let initialState = { list };

const TodoContext = createContext(null);

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const note = {
        id: uuid("note"),
        date: new Date().getTime(),
        content: action.content,
        archived: action.archived || false
      };
      let list = [note, ...state.list];
      localStore.add(note.id, note);
      return { ...state, list };
    }
    case "UPDATE": {
      const { id, content, archived } = action;
      let list = state.list.map(item => {
        if (item.id === id) {
          const data = { ...item, id, ...(content instanceof String && { content }), ...(archived instanceof Boolean && { archived }) };
          localStore.update(data.id, data);
          return data;
        }
        return item;
      });
      return { ...state, list };
    }
    case "REMOVE": {
      let list = state.list.filter(({ id }) => {
        if (id === action.id) {
          localStore.remove(id);
          return false;
        }
        return true;
      });
      if (!list.length) {
        const note = {
          id: uuid("note"),
          date: new Date().getTime(),
          content: "",
          archived: false
        };
        list = [note];
        localStore.add(note.id, note);
      }
      return { ...state, list };
    }
    case "REMOVE_ALL": {
      localStore.removeByGroup("note@");
      return { ...state, list: [] };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

export default function TodoProvider(props) {
  const [state, dispatch] = useReducer(todoReducer, { ...initialState });
  const value = useMemo(() => {
    return [state, dispatch];
  }, [state]);

  return <TodoContext.Provider value={value} {...props} />;
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(`useTodo must be used within a TodoProvider`);
  }

  const [state, dispatch] = context;

  const add = useCallback(
    ({ content = error("'content' is missing!"), ...rest }) => {
      dispatch({ type: "ADD", content, ...rest });
    },
    [dispatch]
  );

  const update = useCallback(
    ({ id = error("'id' is missing!"), ...rest }) => {
      dispatch({ type: "UPDATE", id, ...rest });
    },
    [dispatch]
  );

  const remove = useCallback(
    ({ id = error("'id' is missing!") }) => {
      dispatch({ type: "REMOVE", id });
    },
    [dispatch]
  );

  const removeAll = useCallback(() => {
    dispatch({ type: "REMOVE_ALL" });
  }, [dispatch]);

  return {
    state,
    add,
    update,
    remove,
    removeAll
  };
}
