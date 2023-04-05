import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {NewPostViewComponent} from "../parts/post-view/new-post-view/new-post-view.component";
import {AuthService} from "../data/auth.service";

@Component({
  selector: 'app-user-action-view',
  templateUrl: './user-action-view.component.html',
  styleUrls: ['./user-action-view.component.css']
})
export class UserActionViewComponent {
  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(NewPostViewComponent);
  }
}
