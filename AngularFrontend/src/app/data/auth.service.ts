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
          this.selfVid = vID;
        },
        (error) => {
          // alert("login failed: " + error);
          this.mainService.signup().subscribe(
            (vID) => {
              this.selfVid = vID;
            }
          );
        }
      );
    }else{
      // signup
      this.mainService.signup().subscribe(
        (vID) => {
          this.selfVid = vID;
        }
      );
    }
  }


  login(vID: string, password: string) {
    this.mainService.login(vID, password).subscribe(
      (vID) => {
        this.selfVid = vID;
        this.cookieService.set("vID", this.selfVid);
        this.cookieService.set("password", password);
      }
    );
  }
}
