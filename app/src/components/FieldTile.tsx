import React from "react";

type FieldTypeProps = {
  width: number;
  height: number;
  children: React.ReactNode;
}

export const FieldTile: React.FC<FieldTypeProps> = ({ width, height, children }) => {
  return <div style={{ backgroundColor: '#e9e9e9', width, height }}>
    { children }
  </div>
}