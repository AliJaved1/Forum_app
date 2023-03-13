import {Component, Input} from '@angular/core';
import {dummyPost, Post} from "../../data/models/Post";

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent {
  @Input() postID: string = "123";
  post: Post = dummyPost();
}
