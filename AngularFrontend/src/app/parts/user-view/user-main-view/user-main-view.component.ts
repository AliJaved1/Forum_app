import {Component, Input, OnInit} from '@angular/core';
import {dummyUser, User} from "../../../data/models/User";
import {MainService} from "../../../data/main.service";
import {AuthService} from "../../../data/auth.service";
import {AuthViewComponent} from "../../auth-view/auth-view.component";
import {MatDialog} from "@angular/material/dialog";
import {FigEditViewComponent} from "../../figure-view/fig-edit-view/fig-edit-view.component";
import {SignupViewComponent} from "../../signup-view/signup-view.component";
import {ModProfileViewComponent} from "../mod-profile-view/mod-profile-view.component";

@Component({
  selector: 'app-user-main-view',
  templateUrl: './user-main-view.component.html',
  styleUrls: ['./user-main-view.component.css']
})
export class UserMainViewComponent implements OnInit{
  @Input() user: User = dummyUser();
  postCids: string[] = [];

  constructor(public mainService: MainService, public authService: AuthService, private dialog: MatDialog) {

  }

  showAuthView() {
    this.dialog.open(AuthViewComponent, {});
  }

  showFigEditView() {
    this.dialog.open(FigEditViewComponent, {});
  }

  showSignUpView() {
    this.dialog.open(SignupViewComponent, {});
  }

  modProfile() {
    this.dialog.open(ModProfileViewComponent, {data: this.user});
  }

  ngOnInit(): void {

    console.log(">>>>>>>>>>>>>>")
    console.log(this.user.vid)
    this.mainService.getUserPostsCids(this.user.vid).subscribe(posts => {
      console.log("<<<<<<<<<<<<<<<")
      console.log(posts)
      this.postCids = posts;
    })
  }
}
