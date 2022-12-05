import React from "react";
import '../style/Filter.scss'
import { ACTIONS } from "../Reduce";

interface TTags {
  tags: string[],
  dispatch: React.Dispatch<any>
}

const Filter = ({ tags, dispatch }: TTags) => {
  
  const filterByTags = (tag: string) => {  
    dispatch({type: ACTIONS.FILTER_BY_TAG, payload: tag})
  }

  return (
    <div className="filter-part">
      <h2>Tags:</h2>
      <ul>
        <li onClick={() => filterByTags('')}>All</li>
        {tags.map((tag, i) => {
          if (tag) {
            return <li key={i} onClick={() => filterByTags(tag)}>{tag}</li>;
          }
        })}
      </ul>
    </div>
  );
};

export default Filter;
