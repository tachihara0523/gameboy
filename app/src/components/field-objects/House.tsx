import React from "react";
import { DotObject } from "../DotObject";

type Props = {
  tileY: number;
  tileX: number;
  fieldTileDotPx: number;
  addDotObjectCordinates: (y: number, x: number) => void;
}

export const House: React.FC<Props> = ({ fieldTileDotPx }) => {
  return <DotObject
    row={10}
    column={10}
    baseColor="#228B22"
    dotSizeW={`${fieldTileDotPx}px`}
    dotSizeH={`${fieldTileDotPx}px`}
    fills={{
      "#8B4513": [ // Brown color for the door
        [18, 9], [18, 10], [19, 9], [19, 10]
      ],
      "#000000": [ // Black color for the windows
        [6, 14], [6, 15], [7, 14], [7, 15]
      ],
      "#708090": [ // Slate Gray for the roof
        [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [2, 11], [2, 12], [2, 13],
        [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10], [3, 11], [3, 12], [3, 13], [3, 14]
      ],
      "#FFFFFF": [ // White for the walls
        // First floor
        [14, 4], [14, 5], [14, 6], [14, 7], [14, 8], [14, 9], [14, 10], [14, 11], [14, 12], [14, 13],
        [15, 4], [15, 5], [15, 6], [15, 7], [15, 8], [15, 9], [15, 10], [15, 11], [15, 12], [15, 13],
        [16, 4], [16, 5], [16, 6], [16, 7], [16, 8], [16, 9], [16, 10], [16, 11], [16, 12], [16, 13],
        [17, 4], [17, 5], [17, 6], [17, 7], [17, 8], [17, 9], [17, 10], [17, 11], [17, 12], [17, 13],
        // Second floor
        [10, 4], [10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [10, 10], [10, 11], [10, 12], [10, 13],
        [11, 4], [11, 5], [11, 6], [11, 7], [11, 8], [11, 9], [11, 10], [11, 11], [11, 12], [11, 13],
        [12, 4], [12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [12, 10], [12, 11], [12, 12], [12, 13],
        [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12], [13, 13]
      ]
    }}
  />
}