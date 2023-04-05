import {Component, Input} from '@angular/core';
import {dummyUser, User} from "../../../data/models/User";
import {MainService} from "../../../data/main.service";
import {Post} from "../../../data/models/Post";
import {AuthService} from "../../../data/auth.service";

@Component({
  selector: 'app-user-main-view',
  templateUrl: './user-main-view.component.html',
  styleUrls: ['./user-main-view.component.css']
})
export class UserMainViewComponent {
 @Input() user: User = dummyUser();
 postCids: string[] = [];
 constructor(public mainService: MainService, public authService: AuthService) {
   mainService.getUserPostsCids(this.user.vid).subscribe(posts => {
      this.postCids = posts;
   })
 }
}
