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
  const fieldTileSize = 100;
  const fieldMaxY = tileY * fieldTileSize;
  const fieldMaxX = tileX * fieldTileSize;
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

  useEffect(() => {
    if (!keydownEvent) { return }

    const moveStep = 5;
    const fieldHalfYRejectWindowSize = (fieldMaxY - windowHeight) / 2;
    const fieldHalfXRejectWindowSize = (fieldMaxX - windowWidth) / 2;
    const fieldMovementRange = {
      y: { min: fieldHalfYRejectWindowSize * -1, max: fieldHalfYRejectWindowSize },
      x: { min: fieldHalfXRejectWindowSize * -1, max: fieldHalfXRejectWindowSize }
    }
    let movementAxis: 'y' | 'x' | undefined;
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

    if (movementAxis === undefined) { return }

    setFieldMovement(currentFieldMovement => {
      const newFieldMovement = {...currentFieldMovement};
      newFieldMovement[movementAxis] = currentFieldMovement[movementAxis] + movementAmount;
      newFieldMovement.y = Math.min(fieldMovementRange.y.max, Math.max(newFieldMovement.y, fieldMovementRange.y.min));
      newFieldMovement.x = Math.min(fieldMovementRange.x.max, Math.max(newFieldMovement.x, fieldMovementRange.x.min));

      setPlayerPosition(currentPlayerPosition => {
        const newPlayerPosition = {...currentPlayerPosition};
        if(currentPlayerPosition[movementAxis] !== 0 || Object.keys(fieldMovementRange[movementAxis]).some(limitType => fieldMovementRange[movementAxis][limitType] === currentFieldMovement[movementAxis])) {
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
    <Field tileY={tileY} tileX={tileX} fieldTileSize={fieldTileSize} fieldCenterPosition={fieldCenterPosition} fieldMovement={fieldMovement} />
    <Player style={{ position: 'relative', zIndex: 5 }} keydownEvent={keydownEvent} keyupEvent={keyupEvent} playerPosition={playerPosition} />
  </div>
}