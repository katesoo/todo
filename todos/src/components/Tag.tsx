import React, { useState, useRef } from "react";
import { ACTIONS } from "./Reduce";

interface ITagProps {
  tagsArray: string[];
  dispatch: React.Dispatch<any>;
  id: number;
}

const Tag = ({ tagsArray, dispatch, id }: ITagProps) => {
  const [change, setChange] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const deleteTag = (tag: string) => {
    dispatch({
      type: ACTIONS.DELETE_TAG,
      payload: [id, tagsArray.filter((tagIn) => tagIn !== tag).join(",")],
    });
    dispatch({ type: ACTIONS.CHANGE_TAGS });
  };

  const editTag = () => {
    if (change) {
      dispatch({
        type: ACTIONS.EDIT_TAG,
        payload: [id, inputRef.current!.value],
      });
    }
    setChange((prev) => !prev);
  };

  return (
    <div>
      <div className="tags">
        {tagsArray.map((tag,i) => (
          <div key={i} style={{display: 'flex'}}>
            <span className="tag-pannel">
              {tag}
            </span>
            <div key={i} className="close" onClick={() => deleteTag(tag)}></div>
          </div>
        ))}

        <div
          className={`edit-tag ${change && "save"}`}
          onClick={() => editTag()}
        ></div>
        <input
          ref={inputRef}
          type="text"
          className="tag-changer"
          defaultValue={tagsArray.join(',')}
          style={{ display: change ? "block" : "none" }}
        />
      </div>
    </div>
  );
};

export default Tag;
