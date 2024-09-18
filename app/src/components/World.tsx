// WorldComponent
//   キー入力からマップとキャラの移動を管理

import React, { useState, useEffect, useMemo, ReactNode } from 'react';
import { KeyEventTypes } from '../App';
import { Player } from './Player';
import { House } from './field-objects/House';
import { Tree } from './field-objects/Tree';

type WorldProps = {
  windowWidth: number;
  windowHeight: number;
  keydownEvent?: KeyEventTypes | null;
  keyupEvent?: KeyEventTypes | null;
}

export const World: React.FC<WorldProps> = ({
  windowWidth,
  windowHeight,
  keydownEvent,
  keyupEvent,
}) => {
  type MovementRangeObj = {
    min: number;
    max: number;
  };
  type movementRange = {
    [key in 'y' | 'x']: MovementRangeObj
  };

  const tileY = 10;
  const tileX = 10;
  const fieldTileDotPx = 5;
  const fieldTileDotNumberPerSide = 20;
  const fieldMaxY = tileY * (fieldTileDotPx * fieldTileDotNumberPerSide);
  const fieldMaxX = tileX * (fieldTileDotPx * fieldTileDotNumberPerSide);
  const moveStep = 10;
  const fieldHalfYRejectWindowSize = (fieldMaxY - windowHeight) / 2;
  const fieldHalfXRejectWindowSize = (fieldMaxX - windowWidth) / 2;
  const fieldMovementRange: movementRange = {
    y: { min: 0, max: fieldMaxY },
    x: { min: 0, max: fieldMaxX }
  }
  const playerMovementRange: movementRange = {
    y: { min: fieldHalfYRejectWindowSize * -1, max: fieldMaxY + fieldHalfYRejectWindowSize },
    x: { min: fieldHalfYRejectWindowSize * -1, max: fieldMaxX + fieldHalfXRejectWindowSize }
  }

  let movementAxis: 'y' | 'x';
  let movementAmount: number;

  switch (keydownEvent?.key) {
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
  // const fieldCenterPosition = {
  //   y: ((fieldMaxY / 2) - (windowHeight / 2)) * -1,
  //   x: ((fieldMaxX / 2) - (windowWidth / 2)) * -1,
  // }

  const fieldMap = useMemo(() => {
    const xy: ReactNode[][] = Array.from({ length: tileX }).map(() => Array.from({ length: tileY }, () => <Tree fieldTileDotPx={fieldTileDotPx} width={fieldTileDotPx * fieldTileDotNumberPerSide} height={fieldTileDotPx * fieldTileDotNumberPerSide} />))

    // xy[0][0] = <House fieldTileDotPx={fieldTileDotPx} />;

    return xy;
  }, [tileY, tileX])

  const fieldCenterPosition = useMemo(() => ({
    y: (fieldMaxY / 2),
    x: (fieldMaxX / 2),
  }), [fieldMaxY, fieldMaxX]);

  const [fieldMovement, setFieldMovement] = useState({
    y: 0,
    x: 0,
  })

  const [playerMovement, setPlayerMovement] = useState({
    y: 0,
    x: 0,
  })

  console.log("world rerendering")

  useEffect(() => {
    if (!keydownEvent) { return }

    setPlayerMovement(currentPlayerMovement => {
      const newPlayerMovement = {
        ...currentPlayerMovement,
        [movementAxis]: currentPlayerMovement[movementAxis] + movementAmount,
      };
      const newPlayerPosition = {
        ...fieldCenterPosition,
        [movementAxis]: fieldCenterPosition[movementAxis] + newPlayerMovement[movementAxis]
      };

      return (
        newPlayerPosition[movementAxis] < playerMovementRange[movementAxis].min ||
        newPlayerPosition[movementAxis] > playerMovementRange[movementAxis].max
      ) ? currentPlayerMovement : newPlayerMovement;
    });
  }, [keydownEvent]);

  useEffect(() => {
    if (!movementAxis) return;

    setFieldMovement(currentFieldMovement => {
      const newFieldMovement = {
        ...currentFieldMovement,
        [movementAxis]: currentFieldMovement[movementAxis] + movementAmount,
      };
      const newFieldPosition = {
        ...fieldCenterPosition,
        [movementAxis]: fieldCenterPosition[movementAxis] + newFieldMovement[movementAxis]
      };

      console.log("playerMovement:" + JSON.stringify(playerMovement))
      console.log("fieldMovementRange:" + JSON.stringify(fieldMovementRange))
      console.log("movementAxis:" + JSON.stringify(movementAxis))

      return (
        newFieldPosition[movementAxis] < fieldMovementRange[movementAxis].min ||
        newFieldPosition[movementAxis] > fieldMovementRange[movementAxis].max ||
        newFieldMovement[movementAxis] != playerMovement[movementAxis]
      ) ? currentFieldMovement : newFieldMovement;
    })
  }, [playerMovement]);

  return <div style={{
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    marginRight: fieldMovement.x,
    marginTop: fieldMovement.y,
  }}>
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    }}>
      <Player
        keydownEvent={keydownEvent}
        keyupEvent={keyupEvent}
        playerMovement={playerMovement}
      />
    </div>

    {fieldMap.map((colTiles, i) => {
      return <div style={{ display: 'flex' }} key={i}>{colTiles}</div>
    })}
  </div>

  // TODO
  // 2次元配列でフィールドを表現する（オブジェクトの有無）
  // 2次元配列をもとにFieldTileコンポーネントを描画
  // Playerを描画
  // setPlayerMovement内でPlayerの移動する位置にオブジェクトが存在するか判定
  // Filed.tsx がいらなくなるはず
}