import {CustomFigure1D} from "./CustomFigure1D";

export interface CustomFigure{
  fid: string;
  data: number[][] // 5 * 5
}

export function to2Dfigure(figure1D: CustomFigure1D){
  return dummyCustomFigure()
}

export function dummyCustomFigure(): CustomFigure {
  let numberOfColors = 10;
  let dummyData = [];

  for (let i = 0; i < 5; i++) {
    let row = [];
    for (let j = 0; j < 5; j++) {
      row.push(Math.floor(Math.random() * numberOfColors));
    }
    dummyData.push(row);
  }
  return {
    fid: "fid",
    data: dummyData
  };
}
