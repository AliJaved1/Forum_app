import {Component, Input} from '@angular/core';
import {dummyCustomFigure} from "../../data/models/CustomFigure";

@Component({
  selector: 'app-figure-view',
  templateUrl: './figure-view.component.html',
  styleUrls: ['./figure-view.component.css']
})
export class FigureViewComponent {
  @Input() fid: string = "fid";
  @Input() width: number = 100;
  @Input() height: number = 100;
  data: number[][] = dummyCustomFigure(this.width, this.height).data;

  color_map = ["red","blue","grey","yellow","white","black","pink","orange", "lime", "green"]

  widthInPixels(): string {
    return this.width + "px";
  }

  heightInPixels(): string {
    return this.height + "px";
  }

  colorForCell(colorCode: number): string {
    return this.color_map[colorCode];
  }
}
