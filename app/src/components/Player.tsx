import '../styles/player.scss'
import { DotObject } from './DotObject'

export const Player = () => {
  return (
    <div>
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
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <DotObject row={6} column={6} baseColor='#5f9ea0' fills={{
              '#708090': [
                [0, 1], [0, 4],
                [1, 1], [1, 2], [1, 3], [1, 4],
                [2, 1], [2, 2], [2, 3], [2, 4],
                [3, 1], [3, 2], [3, 3], [3, 4],
                [4, 1], [4, 2], [4, 3], [4, 4],
              ]
            }} />
            <div style={{ display: 'flex' }}>
              <div style={{display: 'flex'}}>
                <DotObject row={4} column={2} baseColor='#b0c4de' dotSizeW='6px' />
                <DotObject row={4} column={1} baseColor='#696969' dotSizeW='2px' />
              </div>
              <DotObject row={4} column={2} baseColor='#b0c4de' dotSizeW='6px' />
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