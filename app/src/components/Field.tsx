import React, { useRef } from 'react';
import { FieldTile } from './FieldTile';
import { House } from './field-objects/House';
import { Tree } from './field-objects/Tree';

type fieldCenterPosition = {
  y: number;
  x: number;
}

type fieldMovement = {
  y: number;
  x: number;
}

type FieldProps = {
  tileY: number;
  tileX: number;
  fieldTileDotPx: number;
  fieldTileDotNumberPerSide: number;
  fieldCenterPosition: fieldCenterPosition;
  fieldMovement: fieldMovement;
  addDotObjectCordinates: (y: number, x: number) => void;
}

export const Field: React.FC<FieldProps> = ({
  tileY,
  tileX,
  fieldCenterPosition,
  fieldMovement,
  fieldTileDotPx,
  fieldTileDotNumberPerSide,
  addDotObjectCordinates
}) => {
  const randomObject = () => {
    const fieldObjects = [...Array(10), <House fieldTileDotPx={fieldTileDotPx} addDotObjectCordinates={addDotObjectCordinates} />, <Tree fieldTileDotPx={fieldTileDotPx} />];

    return fieldObjects[Math.floor(Math.random() * fieldObjects.length)];
  }

  const tiles = useRef([...Array(tileY)].map((_, y) => {
    return [...Array(tileX)].map((__, x) => {
      return <FieldTile fieldTileDotPx={fieldTileDotPx} fieldTileDotNumberPerSide={fieldTileDotNumberPerSide} key={`${y}_${x}`}>
        {randomObject()}
      </FieldTile>
    })
  }));

  return <div style={{
    position: 'absolute',
    top: fieldCenterPosition.y + fieldMovement.y,
    left: fieldCenterPosition.x + fieldMovement.x * -1,
    display: 'flex',
    flexDirection: 'column'
  }}>
    {tiles.current.map((rowTiles, i) => {
      return <div style={{ display: 'flex' }} key={i}>{rowTiles}</div>
    })}
  </div>
}