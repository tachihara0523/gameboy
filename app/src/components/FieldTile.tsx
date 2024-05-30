import React from "react";

type FieldTypeProps = {
  fieldTileDotPx: number;
  fieldTileDotNumberPerSide: number;
  children: React.ReactNode;
}

export const FieldTile: React.FC<FieldTypeProps> = ({ fieldTileDotPx, fieldTileDotNumberPerSide, children }) => {
  const lengthPerSide = fieldTileDotPx * fieldTileDotNumberPerSide;
  const width = lengthPerSide;
  const height = lengthPerSide;

  return <div style={{ backgroundColor: '#e9e9e9', width, height }}>
    { children }
  </div>
}