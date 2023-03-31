import {Component, Input} from '@angular/core';
import {dummyComments} from "../../../data/models/Comment";
import {Comment} from "../../../data/models/Comment";

@Component({
  selector: 'app-comments-view',
  templateUrl: './comments-view.component.html',
  styleUrls: ['./comments-view.component.css']
})
export class CommentsViewComponent {
  @Input() cid: string = '';
  comments: Comment[] = dummyComments();
  isMakingNewComment: boolean = false;
  newComment: string = '';

  clickOnComment() {
    if (!this.isMakingNewComment) {
      this.isMakingNewComment = true;
    } else {

    }
  }
}
