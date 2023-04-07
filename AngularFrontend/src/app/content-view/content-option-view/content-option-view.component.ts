import {Component, OnInit} from '@angular/core';
import {MainService} from "../../data/main.service";

@Component({
  selector: 'app-content-option-view',
  templateUrl: './content-option-view.component.html',
  styleUrls: ['./content-option-view.component.css']
})
export class ContentOptionViewComponent implements OnInit{

  // mode:string = ""

  constructor(private main:MainService) {
  }

  ngOnInit(): void {
    // this.mode = this.main.recommendMode;
  }


  changeMode(mode:string){
    this.main.recommendMode = mode;
    this.main.getRecommendPostsCids().subscribe((postIDs: string[]) => {
      this.main.recommendPosts = [...postIDs];
      console.log(this.main.recommendPosts)
    });
  }

}
