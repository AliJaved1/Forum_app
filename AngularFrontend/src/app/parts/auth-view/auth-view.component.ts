import {Component, Inject} from '@angular/core';
import {AuthService} from "../../data/auth.service";

@Component({
  selector: 'app-auth-view',
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.css']
})
export class AuthViewComponent {
  id: string = '';
  password: string = '';

  success: boolean = false;
  constructor(private auth: AuthService) {
  }

  login() {
    this.auth.login(this.id, this.password)
  }
}
