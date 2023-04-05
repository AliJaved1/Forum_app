import {Component} from '@angular/core';
import {AuthService} from "../data/auth.service";

@Component({
  selector: 'app-user-info-view',
  templateUrl: './user-info-view.component.html',
  styleUrls: ['./user-info-view.component.css']
})
export class UserInfoViewComponent {
  constructor(public authService: AuthService) {
  }

}
