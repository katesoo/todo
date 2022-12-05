import { todo } from "./components/Todo";

const tasks: todo[] = require("./todo.json");

export const ACTIONS = {
  DELETE_TODO: "DELETE_TODO",
  EDIT_TODO: "EDIT_TODO",
  ADD_NEW_TODO: "ADD_NEW_TODO",
  CHANGE_TAGS: "CHANGE_TAGS",
  FILTER_BY_TAG: "FILTER_BY_TAG",
  DELETE_TAG: "DELETE_TAG",
  ADD_TAG: "ADD_TAG",
  EDIT_TAG: "EDIT_TAG"
};

export interface IAction {
  type: string;
  payload?: any;
}

export interface IinitialState {
  tasks: todo[];
  tags: string[];
  activeTag: string;
}

export const initialState: IinitialState = {
  tasks: tasks,
  tags: Array.from(new Set(tasks.map((task) => task.tags.split(",")).flat())),
  activeTag: "",
};

export const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case ACTIONS.EDIT_TODO:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload[0]) {
            return { ...task, content: action.payload[1] };
          }
          return task;
        }),
      };
    case ACTIONS.ADD_NEW_TODO:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case ACTIONS.CHANGE_TAGS:
      return {
        ...state,
        tags: Array.from(new Set(state.tasks.map((task) => task.tags.split(",")).flat())),
      };
    case ACTIONS.FILTER_BY_TAG:
      return {
        ...state,
        activeTag: action.payload,
      };
    case ACTIONS.DELETE_TAG:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload[0]) {
            task.tags = action.payload[1];
          }
          return task;
        }),
      };
    case ACTIONS.ADD_TAG: return {
      ...state,
      tasks: state.tasks.map((task) => {
          if (task.id === action.payload[0]) {            
            task.tags = task.tags ? task.tags + ',' + action.payload[1] : action.payload[1]
          }
          return task;
        }),
    };
    case ACTIONS.EDIT_TAG: return {
      ...state,
      tasks: state.tasks.map((task) => {
        if (task.id === action.payload[0]) {            
          task.tags = action.payload[1]
        }
        return task;
      }),
      tags: Array.from(new Set(state.tasks.map((task) => task.tags.split(",")).flat())),
    }
    default:
      return state;
  }
};
