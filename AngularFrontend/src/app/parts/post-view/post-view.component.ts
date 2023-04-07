import {Component, Input, OnInit} from '@angular/core';
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
export class PostViewComponent implements OnInit {
  @Input() postID: string = "9932";
  @Input() id: number = 0;
  post: Post = dummyPost()


  constructor(private dialog: MatDialog, private mainService: MainService) {

  }

  ngOnInit(): void {
    console.log(this.id)
    this.mainService.getPost(this.postID)
      .subscribe(
      post => {
        this.post = post;
        console.log("-----------")
        console.log(this.post)
        this.mainService.isFetching = false
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
