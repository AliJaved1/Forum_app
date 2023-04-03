import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {dummyPost, Post} from "../../../data/models/Post";
import {AuthService} from "../../../data/auth.service";
import {MainService} from "../../../data/main.service";

@Component({
  selector: 'app-post-pop-up-view',
  templateUrl: './post-pop-up-view.component.html',
  styleUrls: ['./post-pop-up-view.component.css']
})
export class PostPopUpViewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public post: Post, public auth: AuthService, public mainService: MainService) {
    this.mainService.viewPost(this.post.cid, this.auth.selfVid);
  }

  editPost() {

  }

  deletePost() {

  }
}
