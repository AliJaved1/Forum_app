import {Component, Input} from '@angular/core';
import {dummyPost, Post} from "../../data/models/Post";
import {MatDialog} from "@angular/material/dialog";
import {PostPopUpViewComponent} from "./post-pop-up-view/post-pop-up-view.component";
import {CommonModule} from "@angular/common";
import {MainService} from "../../data/main.service";

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent {
  @Input() postID: string = "123";
  post: Post = dummyPost()

  constructor(private dialog: MatDialog, mainService: MainService) {
    mainService.getPost(this.postID).subscribe(
      post => {
        this.post = post;
      },
      error => {
        console.error(error)
      });
  }

  showPopupView() {
    this.dialog.open(PostPopUpViewComponent, {
      data: this.post
    });
  }
}
