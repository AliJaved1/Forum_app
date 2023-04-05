import {CustomFigure1D} from "./CustomFigure1D";

export interface CustomFigure{
  fid: string;
  data: number[][] // 5 * 5
}

export function to2dFigure(figure1D: CustomFigure1D){
  function to2dArray(array1D: number[]){
    let array2D = [];
    for (let i = 0; i < 5; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        row.push(array1D[i * 5 + j]);
      }
      array2D.push(row);
    }
    return array2D;
  }
  let figure2D: CustomFigure = {
    fid: figure1D.fid,
    data: to2dArray(figure1D.data)
  }
  return figure2D;
}

export function to1dFigure(figure2D: CustomFigure){
  function to1dArray(array2D: number[][]){
    let array1D = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        array1D.push(array2D[i][j]);
      }
    }
    return array1D;
  }
  let figure1D: CustomFigure1D = {
    fid: figure2D.fid,
    data: to1dArray(figure2D.data)
  }
  return figure1D;
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
