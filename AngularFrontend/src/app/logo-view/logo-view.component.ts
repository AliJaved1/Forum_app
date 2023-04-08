import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LetterViewComponent} from "./letter-view/letter-view.component";

@Component({
  selector: 'app-logo-view',
  templateUrl: './logo-view.component.html',
  styleUrls: ['./logo-view.component.css']
})
export class LogoViewComponent {
  constructor(public dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(LetterViewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
