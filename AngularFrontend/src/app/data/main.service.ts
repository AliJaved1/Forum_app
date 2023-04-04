import {Injectable} from '@angular/core';
import {dummyUser, User} from "./models/User";
import {HttpClient} from "@angular/common/http";
import {delay, map, Observable, of} from "rxjs";
import {dummyPost, Post} from "./models/Post";
import {Attachment, dummyAttachment} from "./models/Attachment";
import {AuthService} from "./auth.service";
import {CustomFigure, dummyCustomFigure, to2Dfigure} from "./models/CustomFigure";
import {CustomFigure1D, dummyCustomFigure1D} from "./models/CustomFigure1D";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private testMode = true;
  private url = "http://localhost:8080/";
  public recommendMode = "0";
  constructor(private http: HttpClient) { }


  login(vID:string, password:string): Observable<string> {
    if (this.testMode) {
      return of(vID).pipe(delay(600));
    }
    return this.http.get<string>(this.url + "auth/" + vID + "/" + password);
  }

  signup(): Observable<string>  {
    if (this.testMode) {
      return of("123").pipe(delay(600));
    }
    return this.http.get<string>(this.url + "auth/new");
  }


  getUser(vid:string): Observable<User> {
    if (this.testMode) {
      return of(dummyUser()).pipe(delay(600));
    }
    return this.http.get<User>(this.url + "user/" + vid);
  }

  getRecommendPostsCids(): Observable<string[]> {
    if (this.testMode) {
      return of(["123", "456", "789", "78", "12", "45", "23", "63", "4362", "4532", "7644", "6453"]).pipe(delay(600));
    }
    return this.http.get<string[]>(this.url + "posts/recom/" + this.recommendMode);
  }

  getUserPostsCids(vid:string): Observable<string[]> {
    if (this.testMode) {
      return of(["123", "456", "789", "78", "12", "45", "23", "63"]).pipe(delay(600));
    }
    return this.http.get<string[]>(this.url + "posts/user/" + vid);
  }

  getPost(cid:string): Observable<Post> {
    if (this.testMode) {
      return of(dummyPost()).pipe(delay(600));
    }
    return this.http.get<Post>(this.url + "post/" + cid);
  }

  postPost(post:Post) {
    if (this.testMode) {
      return;
    }
    this.http.post<Post>(this.url + "post", post);
  }

  viewPost(cid:string,vid:string) {
    if (this.testMode) {
      return;
    }
    this.http.get(this.url + "post/view/" + cid + "/" + vid);
  }

  likeContent(cid:string, vid:string) {
    if (this.testMode) {
      return;
    }
    this.http.get(this.url + "perception/like/" + cid + "/" + vid);
  }

  dislikeContent(cid:string, vid:string) {
    if (this.testMode) {
      return;
    }
    this.http.get(this.url + "perception/dislike/" + cid);
  }

  getAttachment(attid:string): Observable<Attachment> {
    if (this.testMode) {
      return of(dummyAttachment()).pipe(delay(600));
    }
    return this.http.get<Attachment>(this.url + "attachment/" + attid);
  }

  getCustomFigure(fid:string): Observable<CustomFigure1D> {
    if (this.testMode) {
      return of(dummyCustomFigure1D()).pipe(delay(600));
    }
    return this.http.get<CustomFigure1D>(this.url + "cf/" + fid)
  }
}
