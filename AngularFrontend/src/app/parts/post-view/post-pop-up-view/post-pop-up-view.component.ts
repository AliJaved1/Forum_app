import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {dummyPost, Post} from "../../../data/models/Post";
import {AuthService} from "../../../data/auth.service";
import {MainService} from "../../../data/main.service";
import {SignupViewComponent} from "../../signup-view/signup-view.component";
import {PostEditViewComponent} from "../post-edit-view/post-edit-view.component";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-post-pop-up-view',
  templateUrl: './post-pop-up-view.component.html',
  styleUrls: ['./post-pop-up-view.component.css']
})
export class PostPopUpViewComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public post: Post,  public auth: AuthService, public mainService: MainService, public dialog: MatDialog) {
    //this.mainService.viewPost(this.post.cid, this.auth.selfVid); ngoninit
  }

  editPost() {
    // this._bottomSheetRef.dismiss();
    this.dialog.open(PostEditViewComponent, {data: this.post});
  }

  deletePost() {
    this.mainService.deletePost(this.post.cid);
  }
}
