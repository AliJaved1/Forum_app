import {Component, Input} from '@angular/core';
import {dummyComment} from "../../../../data/models/Comment";
import {Comment} from "../../../../data/models/Comment";

@Component({
  selector: 'app-single-comment-view',
  templateUrl: './single-comment-view.component.html',
  styleUrls: ['./single-comment-view.component.css']
})
export class SingleCommentViewComponent {
  @Input() comment: Comment = dummyComment();
}
