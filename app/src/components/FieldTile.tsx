import React from "react";

type FieldTypeProps = {
  width: number;
  height: number;
}

export const FieldTile: React.FC<FieldTypeProps> = ({ width, height }) => {
  return <div style={{ backgroundColor: '#ddd', width, height }}></div>
}