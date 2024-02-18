import React from "react";
import { DotObject } from "../DotObject";

export const House: React.FC = () => {
  return <DotObject
    row={18}
    column={9}
    baseColor="#e6e6fa"
    dotSizeW="10px"
    dotSizeH="4px"
    fills={{
      'transparent': [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 5], [0, 6], [0, 7], [0, 8],
        [1, 0], [1, 1], [1, 2], [1, 6], [1, 7], [1, 8],
        [2, 0], [2, 1], [2, 7], [2, 8],
        [3, 0], [3, 8],
        [4, 0], [4, 8],
      ],
      '#2f4f4f': [
        [0, 4],
        [1, 4],
        [1, 3], [1, 5],
        [2, 3], [2, 5],
        [2, 2], [2, 6],
        [3, 2], [3, 6],
        [3, 1], [3, 7],
        [4, 1], [4, 7],
        [4, 0], [4, 8],
        [5, 0], [5, 8],
        [11, 5], [11, 6],
        [12, 5], [12, 6],
        [13, 5], [13, 6],
        [14, 5], [14, 6],
        [15, 5], [15, 6],
        [16, 5], [16, 6],
        [17, 5], [17, 6],
      ],
    }}
  />
}