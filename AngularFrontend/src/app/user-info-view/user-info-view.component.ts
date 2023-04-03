import {Component} from '@angular/core';
import {AuthService} from "../data/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {MainService} from "../data/main.service";
import { AuthViewComponent } from '../parts/auth-view/auth-view.component';

@Component({
  selector: 'app-user-info-view',
  templateUrl: './user-info-view.component.html',
  styleUrls: ['./user-info-view.component.css']
})
export class UserInfoViewComponent {
  constructor(public authService: AuthService, private dialog: MatDialog) {
  }

  showAuthView() {
    this.dialog.open(AuthViewComponent, {});
  }

}
