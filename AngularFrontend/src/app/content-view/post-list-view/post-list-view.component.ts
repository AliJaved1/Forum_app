import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-post-list-view',
  templateUrl: './post-list-view.component.html',
  styleUrls: ['./post-list-view.component.css']
})
export class PostListViewComponent {
  postIDs: string[] = ["123", "456", "789", "78", "12", "45", "23", "63", "4362", "4532", "7644", "6453"];
  wideMode = false;

  constructor() {
    this.onResize(null);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let viewportWidth = window.innerWidth;
    this.wideMode = viewportWidth > 450;
  }

  oddIndexPostIDs(){
    return this.postIDs.filter((id, index) => index % 2 === 0);
  };

  evenIndexPostIDs(){
    return this.postIDs.filter((id, index) => index % 2 !== 0);
  }
}
