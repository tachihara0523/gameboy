import React, { useRef } from 'react';
import { FieldTile } from './FieldTile';
import { House } from './field-objects/House';
import { Tree } from './field-objects/Tree';

type FieldPositionType = {
  y: number;
  x: number;
}

type FieldProps = {
  tileY: number;
  tileX: number;
  fieldTileSize: number;
  fieldPosition: FieldPositionType;
}

export const Field: React.FC<FieldProps> = ({ tileY, tileX, fieldTileSize, fieldPosition }) => {
  const randomObject = () => {
    const fieldObjects = [...Array(10), <House />, <Tree />];

    return fieldObjects[Math.floor(Math.random() * fieldObjects.length)];
  }

  const tiles = useRef([...Array(tileY)].map((_, y) => {
    return [...Array(tileX)].map((__, x) => {
      return <FieldTile width={fieldTileSize} height={fieldTileSize} key={`${y}_${x}`}>
        {randomObject()}
      </FieldTile>
    })
  }));

return <div style={{
  position: 'absolute',
  top: fieldPosition.y,
  left: fieldPosition.x,
  display: 'flex',
  flexDirection: 'column'
}}>
  {tiles.current.map((rowTiles, i) => {
    return <div style={{ display: 'flex' }} key={i}>{rowTiles}</div>
  })}
</div>
}