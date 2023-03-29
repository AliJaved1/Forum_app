import { Component } from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-new-post-view',
  templateUrl: './new-post-view.component.html',
  styleUrls: ['./new-post-view.component.css']
})
export class NewPostViewComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<NewPostViewComponent>) {}

  closeSelf(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
