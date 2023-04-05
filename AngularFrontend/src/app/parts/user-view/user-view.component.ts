import {Component, Input} from '@angular/core';
import {dummyUser, User} from "../../data/models/User";
import {MainService} from "../../data/main.service";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {
  @Input() vID: string = "123";
  user: User = dummyUser();
  loadFigure = false;

  constructor(mainService: MainService) {
    mainService.getUser(this.vID).subscribe(user => {
      console.log(user)
      this.user = user;
      setTimeout(() => {
        this.loadFigure = true;
      }, 400);
    });
  }
}
