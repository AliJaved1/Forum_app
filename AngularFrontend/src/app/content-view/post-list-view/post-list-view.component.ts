import {Component, HostListener, OnInit} from '@angular/core';
import {MainService} from "../../data/main.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-post-list-view',
  templateUrl: './post-list-view.component.html',
  styleUrls: ['./post-list-view.component.css']
})
export class PostListViewComponent implements OnInit{
  wideMode = false;
  loaded = false;

  constructor(public mainService: MainService) {}
  ngOnInit(): void {
    this.mainService.getRecommendPostsCids().subscribe((postIDs: string[]) => {
      this.mainService.recommendPosts = postIDs;
      this.loaded = true;
      console.log("recommendPosts:")
      console.log(this.mainService.recommendPosts)
    });
    this.onResize(null);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let viewportWidth = window.innerWidth;
    this.wideMode = viewportWidth > 450;
  }

  oddIndexPostIDs(){
    return this.mainService.recommendPosts.filter((id, index) => index % 2 === 0);
  };

  evenIndexPostIDs(){
    return this.mainService.recommendPosts.filter((id, index) => index % 2 !== 0);
  }
}
