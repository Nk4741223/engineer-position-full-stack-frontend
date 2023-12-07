import React from "react";

export const TextAria = (props) => {
  const {workspace, onChangeText} = props;
  return (
    <div id="text-aria">
      <input
        type="text"
        id="text-title"
        value={workspace.title}
        onChange={(e) => onChangeText(e.target.value, "title")}
      />
      <textarea
        id="text-content"
        value={workspace.content}
        onChange={(e) => onChangeText(e.target.value, "content")}
      />
    </div>
  );
};
