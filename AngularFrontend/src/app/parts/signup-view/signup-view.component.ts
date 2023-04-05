import {Component} from '@angular/core';
import {MainService} from "../../data/main.service";
import {AuthService} from "../../data/auth.service";
import {dummyUser, User} from "../../data/models/User";

@Component({
  selector: 'app-signup-view',
  templateUrl: './signup-view.component.html',
  styleUrls: ['./signup-view.component.css']
})
export class SignupViewComponent {
  name: string = '';
  email: string = '';
  selfUser: User = dummyUser();
  password: string = '';

  constructor(private main: MainService, private auth: AuthService) {
    this.main.getUser(this.auth.selfVid).subscribe(
      (user) => {
        this.selfUser = user;
        this.name = user.name;
      });
  }



  signup() {
    let newUser: User = {
      vid: this.auth.selfVid,
      isMember: true,
      name: this.name,
      experience: 0,
      email: this.email,
      about: "",
      thumbnailID: this.selfUser.thumbnailID
    }
    this.main.signup(newUser,this.password).subscribe(
      (vid) => {
        alert("signup successful \nplease make a screen shot of this window\nid: " + vid+"\npassword: " + this.password);
      },
      (error) => {
        alert("signup failed");
      }
    );
  }

}
