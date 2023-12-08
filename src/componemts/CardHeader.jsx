import React from "react";

export const CardHeader = (props) => {
  const {onClickAdd, onChangeSerch, serchInput} = props;
  return (
    <div className="headers">
      <input
        value={serchInput}
        type="text"
        id="serch"
        placeholder="serch"
        onChange={(e) => onChangeSerch(e.target.value)}
      />
      <button onClick={onClickAdd}>＋</button>
    </div>
  );
};
