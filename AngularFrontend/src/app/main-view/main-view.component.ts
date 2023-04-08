import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LetterViewComponent} from "../logo-view/letter-view/letter-view.component";
import {SpecialViewComponent} from "./special-view/special-view.component";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent {
  constructor(public dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(SpecialViewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
