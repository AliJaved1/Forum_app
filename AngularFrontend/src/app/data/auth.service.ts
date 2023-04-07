import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {MainService} from "./main.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  selfVid: string = "";

  constructor(private cookieService: CookieService, private mainService: MainService) {
    let savedVid = this.cookieService.get("vID");
    if (savedVid != "") {
      // login
      let savedPassword = this.cookieService.get("password");
      this.mainService.login(savedVid, savedPassword).subscribe(
        (vID) => {
          console.log("login successful, vid:")
          console.log(vID)
          this.selfVid = vID;
        },
        (error) => {
          alert("login failed: " + error);
          this.mainService.makeGuest().subscribe(
            (vID) => {
              this.selfVid = vID;
              console.log("login failed, new user vid:")
              console.log(vID)
            },
            (error) => alert("login as guest also failed: " + error)
          );
        }
      );
    } else {
      // signup
      this.mainService.makeGuest().subscribe(
        (vID) => {
          console.log("new user vid:")
          console.log(vID)
          this.selfVid = vID;
        },
        (error) => alert("login as guest failed: " + error)
      );
    }
  }


  login(vID: string, password: string) {
    this.mainService.login(vID, password).subscribe(
      (vID) => {
        this.selfVid = vID;
        this.cookieService.set("vID", this.selfVid);
        this.cookieService.set("password", password);
      },
      (error) => {
        alert("login failed: " + error);
      }
    );
  }
}
