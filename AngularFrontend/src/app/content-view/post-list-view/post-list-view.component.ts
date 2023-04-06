import {Component, HostListener} from '@angular/core';
import {MainService} from "../../data/main.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-post-list-view',
  templateUrl: './post-list-view.component.html',
  styleUrls: ['./post-list-view.component.css']
})
export class PostListViewComponent {
  postIDs: string[] = [];
  wideMode = false;
  loaded = false;

  constructor(private mainService: MainService) {
    mainService.getRecommendPostsCids().subscribe((postIDs: string[]) => {
      this.postIDs = postIDs;
      this.loaded = true;
      console.log(this.postIDs)
    });
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
