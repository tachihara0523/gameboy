import React from "react";
import { DotObject } from "../DotObject";

type Props = {
  fieldTileDotPx: number;
}

export const Tree: React.FC<Props> = ({ fieldTileDotPx }) => {
  return   <DotObject 
  row={12} // 行数
  column={8} // 列数
  baseColor="transparent" // 背景色
  dotSizeW={`${fieldTileDotPx}px`}
  dotSizeH={`${fieldTileDotPx}px`}
  fills={ {
    'brown': [ // 幹
      [9, 4], [10, 4], [11, 4]
    ],
    'green': [ // 葉
      [0, 3], [0, 4], [0, 5],
      [1, 3], [1, 4], [1, 5],
      [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
      [3, 2], [3, 3], [3, 4], [3, 5], [3, 6],
      [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7],
      [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7],
      [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7],
      [7, 2], [7, 3], [7, 4], [7, 5], [7, 6],
      [8, 3], [8, 4], [8, 5]
    ]
  }}
/>

}