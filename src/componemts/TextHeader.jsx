import React from "react";

export const TextHeader = (props) => {
  const {onClickDelete, savedFlag} = props;
  return (
    <div className="headers">
      <button onClick={onClickDelete}>✕</button>
      <div>{savedFlag && "saved"}</div>
    </div>
  );
};
