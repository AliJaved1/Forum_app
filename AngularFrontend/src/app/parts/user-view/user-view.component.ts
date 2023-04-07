import {Component, Input, OnInit} from '@angular/core';
import {dummyUser, User} from "../../data/models/User";
import {MainService} from "../../data/main.service";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit{
  @Input() vID: string = "9932";
  user: User = dummyUser();
  loadFigure = false;

  constructor(private mainService: MainService) {

  }

  ngOnInit(): void {
    this.mainService.getUser(this.vID).subscribe(user => {
      console.log(user)
      this.user = user;
      setTimeout(() => {
        this.loadFigure = true;
      }, 400);
    });
  }
}
