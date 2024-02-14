import React from 'react';
import { FieldTile } from './FieldTile';

type FieldPositionType = {
  y: number;
  x: number;
}

type FieldProps = {
  tileY: number;
  tileX: number;
  fieldTileSize: number;
  fieldPosition: FieldPositionType;
  // windowSize: [height: number, width: number];
  // playerMove: [y: number, x: number];
}

export const Field: React.FC<FieldProps> = ({ tileY, tileX, fieldTileSize, fieldPosition }) => {


  const tiles = [...Array(tileY)].map((_, y) => {
    return [...Array(tileX)].map((__, x) => {
      return <FieldTile width={fieldTileSize} height={fieldTileSize} key={`${y}_${x}`} />
    })
  })

  return <div style={{
    position: 'absolute',
    top: fieldPosition.y,
    left: fieldPosition.x,
    display: 'flex',
    flexDirection: 'column'
  }}>
    {tiles.map((rowTiles, i) => {
      return <div style={{ display: 'flex' }} key={i}>{rowTiles}</div>
    })}
  </div>
}