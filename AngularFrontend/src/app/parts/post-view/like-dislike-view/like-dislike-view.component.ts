import {Component, Input} from '@angular/core';
import {AuthService} from "../../../data/auth.service";
import {MainService} from "../../../data/main.service";

@Component({
  selector: 'app-like-dislike-view',
  templateUrl: './like-dislike-view.component.html',
  styleUrls: ['./like-dislike-view.component.css']
})
export class LikeDislikeViewComponent {
  @Input() cid: string = "123";
  vid: string = "123";
  voted = false;
  liked = false;

  constructor(authService: AuthService, private mainService: MainService) {
    this.vid = authService.selfVid;
  }

  like() {
    this.mainService.likeContent(this.cid, this.vid);
  }

  dislike() {
    this.mainService.dislikeContent(this.cid, this.vid);
  }
}
