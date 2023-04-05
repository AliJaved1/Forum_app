import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MainService} from "../../../data/main.service";
import {User} from "../../../data/models/User";

@Component({
  selector: 'app-mod-profile-view',
  templateUrl: './mod-profile-view.component.html',
  styleUrls: ['./mod-profile-view.component.css']
})
export class ModProfileViewComponent {
  newName: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public user: User, private main:MainService) { }

  submit() {
    this.user.name = this.newName;
    this.main.updateUser(this.user.vid, this.user);
  }

}
