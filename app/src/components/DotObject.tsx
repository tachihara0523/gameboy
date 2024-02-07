import React from 'react';

type FillsType = {
  [key: string]: [number, number][];
};

type ObjectProps = {
  row: number;
  column: number;
  baseColor: string;
  fills?: FillsType;
  style?: React.CSSProperties;
  dotSizeW?: string;
  dotSizeH?: string;
}

export const DotObject: React.FC<ObjectProps> = ({row, column, baseColor, fills = {}, style={}, dotSizeW='5px', dotSizeH='5px'}) => {
  type FillCellsType = {
    [y: number]: {
      [x: number]: string;
    };
  };
  const fillCells = Object.keys(fills).reduce<FillCellsType>((accumulator, fillColor) => {
    fills[fillColor].forEach((position) => {
      const [y, x] = position;
      if(!accumulator[y]) {
        accumulator[y] = {}
      }

      accumulator[y][x] = fillColor;
    })

    return accumulator;
  }, {})

  const colorStyle = (y: number, x: number) => {
    let color = baseColor;
    if(fillCells[y] && fillCells[y][x]) {
      color = fillCells[y][x];
    }

    return {
      backgroundColor: color,
    };
  }

  const defaultBlockStyle = {
    width: dotSizeW,
    height: dotSizeH
  }

  return <div style={style}>
    {[...Array(row)].map((_, i) => {
      return <div key={i} style={{display: 'flex'}}>
        {[...Array(column)].map((__, ii) => {
          return <div key={`${i}_${ii}`}style={{...defaultBlockStyle, ...colorStyle(i, ii)}}></div>
        })}
      </div>
    })}
  </div>
}