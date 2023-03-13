import {Component} from '@angular/core';

@Component({
  selector: 'app-post-list-view',
  templateUrl: './post-list-view.component.html',
  styleUrls: ['./post-list-view.component.css']
})
export class PostListViewComponent {
  postIDs: string[] = ["123", "456", "789", "78", "12", "45", "23", "63", "4362", "4532", "7644", "6453"];
}
