import React, { ChangeEvent, useReducer, useRef, useState } from "react";
import { ACTIONS, IAction } from "../Reduce";
import "../style/Todo.scss";
import ChangePannel from "./ChangePannel";
import Tag from "./Tag";

export interface todo {
  id: number;
  done: boolean;
  task: string;
  content: string;
  tags: string;
}

interface ITodoComponent extends todo {
  deleteTask: (id: number) => () => void;
  dispatch: React.Dispatch<IAction>;
}

const not = (state: boolean) => !state;

const Todo = ({
  task,
  done,
  content,
  id,
  tags,
  deleteTask,
  dispatch,
}: ITodoComponent) => {
  const [Done, setDone] = useReducer(not, done);
  const [Task, setTask] = useState<string>(task);
  const [change, setChange] = useReducer(not, false);

  const inputRef = useRef<HTMLInputElement>(null);

  const tagsArray = tags.toString().split(',');  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
    if (!e.target.value) {
      e.target.classList.add("done");
    }
  };
  
  return (
    <div className="todo-item">
      <div className="item-name">
        <input type="checkbox" checked={Done} onChange={setDone} />
        <input
          ref={inputRef}
          value={Task}
          onChange={handleChange}
          className={`text-name ${Done && "done"}`}
        ></input>
        <div className="edit" onClick={setChange}></div>
        <div className="delete" onClick={deleteTask(id)}></div>
      </div>
      <div className={Done ? "done" : ""}>{content}</div>
      {change && (
        <ChangePannel
          tags={tags}
          id={id}
          content={content}
          setChange={setChange}
          dispatch={dispatch}
        />
      )}
      {tags ? (
        <Tag tagsArray={tagsArray} dispatch={dispatch} id={id}/>
      ) : null}
      {}
    </div>
  );
};

export default Todo;
