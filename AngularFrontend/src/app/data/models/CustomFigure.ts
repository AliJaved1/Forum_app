export interface CustomFigure{
  fid: string;
  data: number[][]
}

export function dummyCustomFigure(w:number,h:number): CustomFigure {
  let numberOfColors = 10;
  let dummyData = [];
  for (let i = 0; i < w; i++) {
    let row = [];
    for (let j = 0; j < h; j++) {
      row.push(Math.floor(Math.random() * numberOfColors));
    }
    dummyData.push(row);
  }
  return {
    fid: "fid " + w + " " + h,
    data: dummyData
  };
}
