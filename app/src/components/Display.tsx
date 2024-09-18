import { useState, useEffect } from 'react';
import { KeyEventTypes } from '../App';
import { World } from './World';

type DisplayTypes = {
  keydownEvent?: KeyEventTypes | null;
  keyupEvent?: KeyEventTypes | null;
}

export const Display: React.FC<DisplayTypes> = ({ keydownEvent, keyupEvent }) => {
  const windowWidth = 400;
  const windowHeight = 300;
  // const tileY = 10;
  // const tileX = 10;
  // const fieldTileDotPx = 5;
  // const fieldTileDotNumberPerSide = 20;
  // // const fieldTileSize = 100;
  // const fieldMaxY = tileY * (fieldTileDotPx * fieldTileDotNumberPerSide);
  // const fieldMaxX = tileX * (fieldTileDotPx * fieldTileDotNumberPerSide);
  // const fieldCenterPosition = {
  //   y: ((fieldMaxY / 2) - (windowHeight / 2)) * -1,
  //   x: ((fieldMaxX / 2) - (windowWidth / 2)) * -1,
  // }

  // const [fieldMovement, setFieldMovement] = useState({
  //   y: 0,
  //   x: 0,
  // })

  // const [playerMovement, setPlayerMovement] = useState({
  //   y: 0,
  //   x: 0,
  // })

  // const defaultPlayerPosition = {
  //   y: fieldMaxY / 2,
  //   x: fieldMaxX / 2,
  // }

  // type ObstacleObjectMapX = boolean[];
  // type ObstacleObjectMapY = ObstacleObjectMapX[];

  // const [obstacleObjectMap, setObstacleOBjectMap] = useState<ObstacleObjectMapY>([])
  // const addObstacleObject = (y: number, x: number) => {
    
  // }

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

  // useEffect(() => {
  //   type MovementRangeObj = {
  //     min: number;
  //     max: number;
  //   };
  //   type FieldMovementRange = {
  //     [key in 'y' | 'x']: MovementRangeObj
  //   }

  //   if (!keydownEvent) { return }

  //   const moveStep = 10;
  //   const fieldHalfYRejectWindowSize = (fieldMaxY - windowHeight) / 2;
  //   const fieldHalfXRejectWindowSize = (fieldMaxX - windowWidth) / 2;
  //   const fieldMovementRange: FieldMovementRange = {
  //     y: { min: fieldHalfYRejectWindowSize * -1, max: fieldHalfYRejectWindowSize },
  //     x: { min: fieldHalfXRejectWindowSize * -1, max: fieldHalfXRejectWindowSize }
  //   }
  //   let movementAxis: 'y' | 'x';
  //   let movementAmount: number;

  //   switch (keydownEvent.key) {
  //     case 'ArrowUp':
  //       movementAxis = 'y';
  //       movementAmount = moveStep;
  //       break;
  //     case 'ArrowDown':
  //       movementAxis = 'y';
  //       movementAmount = moveStep * -1;
  //       break;
  //     case 'ArrowLeft':
  //       movementAxis = 'x';
  //       movementAmount = moveStep * -1;
  //       break;
  //     case 'ArrowRight':
  //       movementAxis = 'x';
  //       movementAmount = moveStep;
  //       break;
  //   }

  //   setFieldMovement(currentFieldMovement => {
  //     const newFieldMovement = { ...currentFieldMovement };
  //     newFieldMovement[movementAxis] = currentFieldMovement[movementAxis] + movementAmount;
  //     newFieldMovement.y = Math.min(fieldMovementRange.y.max, Math.max(newFieldMovement.y, fieldMovementRange.y.min));
  //     newFieldMovement.x = Math.min(fieldMovementRange.x.max, Math.max(newFieldMovement.x, fieldMovementRange.x.min));

  //     setPlayerMovement(currentPlayerMovement => {
  //       const newPlayerMovement = { ...currentPlayerMovement }

  //       const v = defaultPlayerPosition[movementAxis] + (newPlayerMovement[movementAxis] + movementAmount);

  //       if (fieldMovementRange[movementAxis].min > v || fieldMovementRange[movementAxis].max < v) {
  //         return newPlayerMovement;
  //       }

  //       newPlayerMovement[movementAxis] = v;

  //       return newPlayerMovement;
  //     })

  //     // setPlayerMovement(currentPlayerMovement => {
  //     //   const newPlayerMovement = { ...currentPlayerMovement };
  //     //   const limitTypes = Object.keys(fieldMovementRange[movementAxis]) as Array<keyof MovementRangeObj>
  //     //   // 入力した方向（XorY）の現在位置が0じゃない又は現在のフィールド表示位置が画面端と一致する場合、キャラクタを移動させる
  //     //   if (currentPlayerMovement[movementAxis] !== 0 || limitTypes.some(limitType => fieldMovementRange[movementAxis][limitType] === currentFieldMovement[movementAxis])) {
  //     //     newPlayerMovement[movementAxis] = currentPlayerMovement[movementAxis] + movementAmount;
  //     //   }

  //     //   // キャラクタが移動する場合はフィールドは動かさない
  //     //   if (newPlayerMovement[movementAxis] !== 0) {
  //     //     newFieldMovement[movementAxis] = currentFieldMovement[movementAxis];
  //     //   }

  //     //   return newPlayerMovement;
  //     // })

  //     return newFieldMovement;
  //   })
  // }, [keydownEvent, fieldMaxX, fieldMaxY])

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
    <World windowWidth={windowWidth} windowHeight={windowHeight} keydownEvent={keydownEvent} keyupEvent={keyupEvent} />
    {/* <Field tileY={tileY} tileX={tileX}
      fieldTileDotPx={fieldTileDotPx}
      fieldTileDotNumberPerSide={fieldTileDotNumberPerSide}
      fieldCenterPosition={fieldCenterPosition} 
      fieldMovement={fieldMovement}
      playerPosition={ { y: defaultPlayerPosition.y + playerMovement.y, x: defaultPlayerPosition.x + playerMovement.x } }
      keydownEvent={keydownEvent}
      keyupEvent={keyupEvent}
      addDotObjectCordinates={addDotObjectCordinates}
    /> */}
  </div>
}