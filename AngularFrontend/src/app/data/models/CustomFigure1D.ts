export interface CustomFigure1D{
  fid: string;
  data: number[] // 25 int from 0-9
}

export function dummyCustomFigure1D(): CustomFigure1D {
  let numberOfColors = 10;
  let dummyData = [];

  for (let i = 0; i < 25; i++) {
    dummyData.push(Math.floor(Math.random() * numberOfColors));
  }
  return {
    fid: "fid",
    data: dummyData
  };
}
