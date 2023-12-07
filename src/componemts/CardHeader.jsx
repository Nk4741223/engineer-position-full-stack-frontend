import React from "react";

export const CardHeader = (props) => {
  const {onClickAdd} = props;
  return (
    <div id="card-Header" className="headers">
      <input type="text" id="serch" placeholder="serch" />
      <button onClick={onClickAdd}>＋</button>
    </div>
  );
};
