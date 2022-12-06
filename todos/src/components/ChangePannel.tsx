import { useEffect, useState } from "react";
import { ACTIONS } from "./Reduce";

interface IChangePannel {
  id: number;
  content: string;
  setChange: React.DispatchWithoutAction;
  dispatch: React.Dispatch<any>;
  tags: string;
}

interface ITargetValue {
  target: { value: string };
}

const ChangePannel = ({
  id,
  content,
  setChange,
  dispatch,
  tags,
}: IChangePannel) => {
  const [inputValue, setInputValue] = useState(content || "");

  const changeContent = ({ target: { value } }: ITargetValue) => {
    setInputValue(value);
  };

  const changeToDoContentHandler = () => {
    const array = inputValue.match(/#\S\w*/g);
    if (array?.length) {
      const textWithoutHash = array?.map((tag) => tag.replace(/#/g, ""));
      dispatch({
        type: ACTIONS.ADD_TAG,
        payload: [id, Array.from(new Set(textWithoutHash)).join(",")],
      });

      dispatch({ type: ACTIONS.CHANGE_TAGS, payload: new Set(textWithoutHash) });
    }
    
    dispatch({ type: ACTIONS.EDIT_TODO, payload: [id, inputValue.replaceAll('#', '')] });
    setChange();
  };

  return (
    <div>
      <textarea
        style={{ width: "95%" }}
        value={inputValue}
        onChange={changeContent}
        onBlur={changeToDoContentHandler}
      />
    </div>
  );
};

export default ChangePannel;
