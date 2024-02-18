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
  const defaultFieldPosition = {
    y: ((fieldMaxY / 2) - (windowHeight / 2)) * -1,
    x: ((fieldMaxX / 2) - (windowWidth / 2)) * -1,
  }

  const [fieldPosition, setFieldPosition] = useState({
    y: 0,
    x: 0,
  })

  const [playerPosition, setPlayerPosition] = useState({
    y: 0,
    x: 0,
  })

  useEffect(() => {
    if (!keydownEvent) { return }

    setFieldPosition(currentPosition => {
      const moveStep = 5;
      let newY = currentPosition.y;
      let newX = currentPosition.x;

      switch (keydownEvent.key) {
        case 'ArrowUp':
          newY = newY + moveStep;
          break;
        case 'ArrowDown':
          newY = newY - moveStep;
          break;
        case 'ArrowLeft':
          newX = newX + moveStep;
          break;
        case 'ArrowRight':
          newX = newX - moveStep;
          break;
      }

      const fieldHalfYRejectWindowSize = (fieldMaxY - windowHeight) / 2;
      const fieldHalfXRejectWindowSize = (fieldMaxX - windowWidth) / 2;
      const minY = fieldHalfYRejectWindowSize * -1;
      const maxY = fieldHalfYRejectWindowSize;
      const minX = fieldHalfXRejectWindowSize * -1;
      const maxX = fieldHalfXRejectWindowSize;

      setPlayerPosition(currentPlayerPosition => {
        let newPlayerY = currentPlayerPosition.y;
        let newPlayerX = currentPlayerPosition.x;

        if (newPlayerY !== 0 || (newY > maxY || newY < minY)) {
          switch (keydownEvent.key) {
            case 'ArrowUp':
              newPlayerY = newPlayerY + moveStep;
              break;
            case 'ArrowDown':
              newPlayerY = newPlayerY - moveStep;
              break;
          }
        }

        if (newPlayerX !== 0 || (newX > maxX || newX < minX)) {
          switch (keydownEvent.key) {
            case 'ArrowLeft':
              newPlayerX = newPlayerX + moveStep;
              break;
            case 'ArrowRight':
              newPlayerX = newPlayerX - moveStep;
              break;
          }
        }

        return {
          y: newPlayerY,
          x: newPlayerX,
        }
      })

      newY = Math.min(maxY, Math.max(newY, minY));
      newX = Math.min(maxX, Math.max(newX, minX));

      return {
        y: newY,
        x: newX
      }
    });
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
    <Field tileY={tileY} tileX={tileX} fieldTileSize={fieldTileSize} fieldPosition={{
      y: defaultFieldPosition.y + fieldPosition.y,
      x: defaultFieldPosition.x + fieldPosition.x
    }} />
    <Player style={{ position: 'relative', zIndex: 5 }} keydownEvent={keydownEvent} keyupEvent={keyupEvent} playerPosition={playerPosition} />
  </div>
}