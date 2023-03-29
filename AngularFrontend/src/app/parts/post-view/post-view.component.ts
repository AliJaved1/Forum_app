import {Component, Input} from '@angular/core';
import {dummyPost, Post} from "../../data/models/Post";
import {MatDialog} from "@angular/material/dialog";
import {PostPopUpViewComponent} from "./post-pop-up-view/post-pop-up-view.component";

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent {
  @Input() postID: string = "123";
  post: Post = dummyPost();

  constructor(private dialog: MatDialog) {

  }

  showMessageView() {
    this.dialog.open(PostPopUpViewComponent, {
      data: this.post
    });
  }
}
