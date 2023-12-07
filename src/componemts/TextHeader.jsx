import React from "react";

export const TextHeader = (props) => {
  const {onClickDelete, savedFlag} = props;
  return (
    <div id="text-header" className="headers">
      <button onClick={onClickDelete}>x</button>
      <div>{savedFlag && "saved"}</div>
    </div>
  );
};
