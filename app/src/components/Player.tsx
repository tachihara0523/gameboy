import React, { useEffect, useState, useRef } from 'react'
import '../styles/player.scss'
import { DotObject } from './DotObject'
import { KeyEventTypes } from '../App';

type PlayerPosition = {
  y: number;
  x: number;
}

type PlayerProps = {
  style?: React.CSSProperties;
  keydownEvent?: KeyEventTypes | null;
  keyupEvent?: KeyEventTypes | null;
  playerPosition: PlayerPosition;
}

export const Player: React.FC<PlayerProps> = ({ style, keydownEvent, keyupEvent, playerPosition }) => {
  const [legUps, setLegUps] = useState({ left: false, right: false });
  const walkIntervalId = useRef<number | null>(null);
  const walk = () => {
    if (walkIntervalId.current) { return }

    walkIntervalId.current = (setInterval(() => {
      setLegUps(currentLegUps => {
        const leftUp = !currentLegUps.left;

        return { left: leftUp, right: !leftUp }
      })
    }, 100))
  }

  const stopWalk = () => {
    if (!walkIntervalId.current) { return }

    setLegUps({ left: false, right: false });
    clearInterval(walkIntervalId.current);
    walkIntervalId.current = null;
  }

  const positionStyle = () => {
    const style: React.CSSProperties = {};

    playerPosition.y > 0 ? style.marginTop = playerPosition.y * -1 : style.marginBottom = playerPosition.y; 
    playerPosition.x > 0 ? style.marginLeft = playerPosition.x : style.marginRight = playerPosition.x * -1; 

    return style;
  }

  const legWalkStyle = (legType: 'left' | 'right') => {
    return (legUps[legType]) ? {
      transform: 'translateY(-5px)'
    } : {}
  }

  useEffect(() => {
    const event = keydownEvent || keyupEvent;

    if(!event || ![
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight'
    ].includes(event.key)) { return }

    switch(event) {
      case keydownEvent:
        walk();
        break;
      case keyupEvent:
        stopWalk();
        break;
      default:
        break;
    }
  }, [keydownEvent, keyupEvent]);

  return (
    <div style={{ ...style, ...positionStyle() }}>
      <div className="core" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <DotObject row={5} column={5} baseColor='#696969' fills={{
          '#deb887': [
            [3, 0], [4, 0],
            [3, 4], [4, 4],
            [4, 1], [4, 2], [4, 3],
          ]
        }} />
        <div style={{ display: 'flex' }}>
          <DotObject row={6} column={2} baseColor='#deb887' dotSizeW='3px' fills={{
            '#5f9ea0': [
              [0, 0], [0, 1],
              [1, 0], [1, 1],
            ]
          }} />
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <DotObject row={6} column={6} baseColor='#5f9ea0' style={{ position: 'relative', zIndex: 1 }}
              fills={{
                '#708090': [
                  [0, 1], [0, 4],
                  [1, 1], [1, 2], [1, 3], [1, 4],
                  [2, 1], [2, 2], [2, 3], [2, 4],
                  [3, 1], [3, 2], [3, 3], [3, 4],
                  [4, 1], [4, 2], [4, 3], [4, 4],
                ]
              }} />
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', ...legWalkStyle('left') }}>
                <DotObject row={4} column={2} baseColor='#b0c4de' dotSizeW='6px' />
                <DotObject row={4} column={1} baseColor='#696969' dotSizeW='2px' />
              </div>
              <DotObject row={4} column={2} baseColor='#b0c4de' dotSizeW='6px' style={legWalkStyle('right')} />
            </div>
          </div>
          <DotObject row={6} column={2} baseColor='#deb887' dotSizeW='3px' fills={{
            '#5f9ea0': [
              [0, 0], [0, 1],
              [1, 0], [1, 1],
            ]
          }} />
        </div>
      </div>
    </div>
  )
}