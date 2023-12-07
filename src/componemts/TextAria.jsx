import React from "react";

export const TextAria = (props) => {
  const {workspace, onChangeText} = props;
  return (
    <div id="text-aria">
      <input
        type="text"
        id="workspace-title"
        value={workspace.title}
        onChange={(e) => onChangeText(e.target.value, "title")}
        data-testid="workspaceTitle"
      />
      <textarea
        id="workspace-content"
        value={workspace.content}
        onChange={(e) => onChangeText(e.target.value, "content")}
        data-testid="workspaceContent"
      />
    </div>
  );
};
