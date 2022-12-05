import { useState } from "react";
import { ACTIONS } from "../Reduce";
import "../style/Todo.scss";
import { todo } from "./Todo";

interface INewTodo {
  dispatch: React.Dispatch<any>;
}

const NewTodo = ({ dispatch }: INewTodo) => {
  const [newName, setNewName] = useState("");
  const [newContent, setNewContent] = useState("");

  const addNewTags = (str: string) => {  
    const array = str.match(/#\S\w*/g);
    const tagsWithoutHash = array?.map(tag => tag.substring(1));
    dispatch({type: ACTIONS.CHANGE_TAGS, payload: new Set(tagsWithoutHash)})
    return tagsWithoutHash?.join(',') || '';
  };

  const createNewTodo = (): todo => ({
    id: Date.now(),
    task: newName.replace(/#/g, ''),
    content: newContent.replace(/#/g, ''),
    done: false,
    tags: addNewTags(newName.concat(newContent)),
  });

  const resetInputs = () => {
    setNewContent("");
    setNewName("");
  };

  const addNewTodo = () => {
    dispatch({ type: ACTIONS.ADD_NEW_TODO, payload: createNewTodo() });
    dispatch({type: ACTIONS.CHANGE_TAGS})
    resetInputs();
  };

  return (
    <div>
      <h2 className="title">Add Task:</h2>
      <div className="todo-item new-item">
        <div style={{ width: "100%" }}>
          <div className="new-item-content">
            <h4>Name:</h4>
            <input
              type="text"
              className="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="new-item-content">
            <h4>Description:</h4>
            <input
              type="text"
              className="description"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </div>
        </div>
        <button className="add-button" onClick={addNewTodo}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default NewTodo;

