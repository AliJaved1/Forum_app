import {Component, Input, OnInit} from '@angular/core';
import {dummyCustomFigure, to2dFigure} from "../../data/models/CustomFigure";
import {MainService} from "../../data/main.service";

@Component({
  selector: 'app-figure-view',
  templateUrl: './figure-view.component.html',
  styleUrls: ['./figure-view.component.css']
})
export class FigureViewComponent implements OnInit {
  @Input() fid: string = "fid";
  data: number[][] = dummyCustomFigure().data;

  constructor(private mainService: MainService) {

  }

  ngOnInit(): void {
    this.mainService.getCustomFigure(this.fid).subscribe(figure => {
      let fig2D = to2dFigure(figure);
      this.data = fig2D.data;
    });
  }

  color_map = ["red", "blue", "grey", "yellow", "white", "black", "pink", "orange", "lime", "green"]

  colorForCell(colorCode: number): string {
    return this.color_map[colorCode];
  }
}
