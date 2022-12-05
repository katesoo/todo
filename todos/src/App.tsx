import { memo, useState, useReducer } from "react";
import "./App.scss";
import Filter from "./components/Filter";
import NewTodo from "./components/NewTodo";
import Todo from "./components/Todo";
import { ACTIONS, initialState, reducer } from "./Reduce";

const App = memo(() => {
  const [{tasks, tags, activeTag}, dispatch] = useReducer(reducer, initialState);

  const deleteTask = (deletedId: number) => () => {
    dispatch({type: ACTIONS.DELETE_TODO, payload: deletedId});
    dispatch({type: ACTIONS.CHANGE_TAGS});
  };
  
  return (
      <div className="container">
        <Filter tags={tags} dispatch={dispatch}/>
        <div className="todos">
        <NewTodo dispatch={dispatch}/>
        <div className="todo-items">
          <h2 className="title">Tasks:</h2>
          {tasks.filter((task) => !!activeTag ? task.tags.includes(activeTag) : task).map(({id, done, task, content, tags}) => (
            <Todo
              key={id}
              tags={tags}
              dispatch={dispatch}
              done={done}
              task={task}
              content={content}
              id={id}
              deleteTask={deleteTask}
            />
          ))}
        </div>
        </div>
      </div>
  );
})

export default App;
