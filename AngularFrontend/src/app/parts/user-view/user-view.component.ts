import {Component, Input} from '@angular/core';
import {dummyUser, User} from "../../data/models/User";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {
  @Input() vID: string = "123";
  user: User = dummyUser();
}
