import { useState, useEffect } from 'react';
import { KeyEventTypes } from '../App';
import { Player } from './Player'
import { Field } from './Field';

type DisplayTypes = {
  keydownEvent?: KeyEventTypes | null;
  keyupEvent?: KeyEventTypes | null;
}

export const Display: React.FC<DisplayTypes> = ({ keydownEvent, keyupEvent }) => {
  const windowWidth = 400;
  const windowHeight = 300;
  const tileY = 10;
  const tileX = 10;
  const fieldTileDotPx = 5;
  const fieldTileDotNumberPerSide = 20;
  // const fieldTileSize = 100;
  const fieldMaxY = tileY * (fieldTileDotPx * fieldTileDotNumberPerSide);
  const fieldMaxX = tileX * (fieldTileDotPx * fieldTileDotNumberPerSide);
  const fieldCenterPosition = {
    y: ((fieldMaxY / 2) - (windowHeight / 2)) * -1,
    x: ((fieldMaxX / 2) - (windowWidth / 2)) * -1,
  }

  const [fieldMovement, setFieldMovement] = useState({
    y: 0,
    x: 0,
  })

  const [playerPosition, setPlayerPosition] = useState({
    y: 0,
    x: 0,
  })

  type ObstacleObjectMapX = boolean[];
  type ObstacleObjectMapY = ObstacleObjectMapX[];

  const [obstacleObjectMap, setObstacleOBjectMap] = useState<ObstacleObjectMapY>([])
  const addObstacleObject = (y: number, x: number) => {
    
  }

  // type CordinatesX = boolean[];
  // type CordinatesY = CordinatesX[];

  // const [dotObjectCordinates, setDotObjectCordinates] = useState<CordinatesY>([]);
  // const addDotObjectCordinates = (y: number, x: number) => {
  //   setDotObjectCordinates(current => {
  //     current[y] ??= [];
  //     current[y][x] = true;

  //     return current;
  //   })
  // }

  useEffect(() => {
    type MovementRangeObj = {
      min: number;
      max: number;
    };
    type FieldMovementRange = {
      [key in 'y' | 'x']: MovementRangeObj
    }

    if (!keydownEvent) { return }

    const moveStep = 10;
    const fieldHalfYRejectWindowSize = (fieldMaxY - windowHeight) / 2;
    const fieldHalfXRejectWindowSize = (fieldMaxX - windowWidth) / 2;
    const fieldMovementRange: FieldMovementRange = {
      y: { min: fieldHalfYRejectWindowSize * -1, max: fieldHalfYRejectWindowSize },
      x: { min: fieldHalfXRejectWindowSize * -1, max: fieldHalfXRejectWindowSize }
    }
    let movementAxis: 'y' | 'x';
    let movementAmount: number;

    switch (keydownEvent.key) {
      case 'ArrowUp':
        movementAxis = 'y';
        movementAmount = moveStep;
        break;
      case 'ArrowDown':
        movementAxis = 'y';
        movementAmount = moveStep * -1;
        break;
      case 'ArrowLeft':
        movementAxis = 'x';
        movementAmount = moveStep * -1;
        break;
      case 'ArrowRight':
        movementAxis = 'x';
        movementAmount = moveStep;
        break;
    }

    setFieldMovement(currentFieldMovement => {
      const newFieldMovement = { ...currentFieldMovement };
      newFieldMovement[movementAxis] = currentFieldMovement[movementAxis] + movementAmount;
      newFieldMovement.y = Math.min(fieldMovementRange.y.max, Math.max(newFieldMovement.y, fieldMovementRange.y.min));
      newFieldMovement.x = Math.min(fieldMovementRange.x.max, Math.max(newFieldMovement.x, fieldMovementRange.x.min));

      setPlayerPosition(currentPlayerPosition => {
        const newPlayerPosition = { ...currentPlayerPosition };
        const limitTypes = Object.keys(fieldMovementRange[movementAxis]) as Array<keyof MovementRangeObj>
        if (currentPlayerPosition[movementAxis] !== 0 || limitTypes.some(limitType => fieldMovementRange[movementAxis][limitType] === currentFieldMovement[movementAxis])) {
          newPlayerPosition[movementAxis] = currentPlayerPosition[movementAxis] + movementAmount;
        }

        if (newPlayerPosition[movementAxis] !== 0) {
          newFieldMovement[movementAxis] = currentFieldMovement[movementAxis];
        }

        return newPlayerPosition;
      })

      return newFieldMovement;
    })
  }, [keydownEvent, fieldMaxX, fieldMaxY])

  return <div style={{
    position: 'relative',
    width: windowWidth,
    height: windowHeight,
    border: '1px solid #000',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <Field tileY={tileY} tileX={tileX}
      fieldTileDotPx={fieldTileDotPx}
      fieldTileDotNumberPerSide={fieldTileDotNumberPerSide}
      fieldCenterPosition={fieldCenterPosition} 
      fieldMovement={fieldMovement} 
      addDotObjectCordinates={addDotObjectCordinates}
    />
    <Player style={{ position: 'relative', zIndex: 5 }} keydownEvent={keydownEvent} keyupEvent={keyupEvent} playerPosition={playerPosition} />
  </div>
}