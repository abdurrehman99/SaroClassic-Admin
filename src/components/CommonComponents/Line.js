import React from "react";

const Line = ({ color, style }) => {
  return (
    <div
      style={{
        borderStyle: style ? style : "solid",
        borderTopColor: color ? color : "#cbd0d8",
        borderTopWidth: 1,
        width: "100%",
        borderBottomWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        marginTop: 16.5,
        marginBottom: 16.8,
      }}
    ></div>
  );
};

export default Line;
