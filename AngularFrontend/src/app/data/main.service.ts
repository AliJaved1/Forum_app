import {Injectable} from '@angular/core';
import {dummyUser, dummyUserWithVid, User} from "./models/User";
import {HttpClient} from "@angular/common/http";
import {catchError, delay, map, Observable, of} from "rxjs";
import {dummyPost, Post} from "./models/Post";
import {Attachment, dummyAttachment} from "./models/Attachment";
import {AuthService} from "./auth.service";
import {CustomFigure, dummyCustomFigure, to1dFigure, to2dFigure} from "./models/CustomFigure";
import {CustomFigure1D, dummyCustomFigure1D} from "./models/CustomFigure1D";
import {dummyComment} from "./models/Comment";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private testMode = true;
  private url = "http://localhost:8089/";
  public recommendMode = "0";
  constructor(private http: HttpClient) { }


  login(vID:string, password:string): Observable<string> {
    if (this.testMode) {
      return of(vID).pipe(delay(600));
    }
    return this.http.get<string>(this.url + "auth/" + vID + "/" + password);
  }

  makeGuest(): Observable<string>  {
    if (this.testMode) {
      return of("123").pipe(delay(600));
    }
    return this.http.get<string>(this.url + "auth/new");
  }

  signup(newUser: User, password:string): Observable<string> {
    if (this.testMode) {
      return of("123").pipe(delay(600));
    }
    return this.http.post<string>(this.url + "auth/signup/" + password, newUser);
    // returned the vid of the new user
  }


  getUser(vid:string): Observable<User> {
    if (this.testMode) {
      return of(dummyUserWithVid(vid)).pipe(delay(600));
    }
    return this.http.get<User>(this.url + "user/" + vid).pipe(catchError (err => {
      alert("failed to fetch user data");
      return of(dummyUserWithVid(vid));
    }));
  }

  updateUser(vid:string, user:User) {
    if (this.testMode) {
      return;
    }
    return this.http.put<User>(this.url + "user/" + vid, user).pipe(catchError (err => {
      alert("failed to update user");
      return of();
    }));
  }

  getRecommendPostsCids(): Observable<string[]> {
    if (this.testMode) {
      return of(["123", "456", "789", "78", "12", "45", "23", "63", "4362", "4532", "7644", "6453"]).pipe(delay(600));
    }
    return this.http.get<string[]>(this.url + "posts/recom/" + this.recommendMode).pipe(catchError (err => {
      alert("failed to fetch recommended posts");
      return of([]);
    }));
  }

  getUserPostsCids(vid:string): Observable<string[]> {
    if (this.testMode) {
      return of(["123", "456", "789", "78", "12", "45", "23", "63"]).pipe(delay(600));
    }
    return this.http.get<string[]>(this.url + "posts/user/" + vid).pipe(catchError (err => {
      alert("failed to fetch user posts");
      return of([]);
    }));
  }

  getPost(cid:string): Observable<Post> {
    if (this.testMode) {
      return of(dummyPost()).pipe(delay(600));
    }
    return this.http.get<Post>(this.url + "post/" + cid).pipe(catchError (err => {
      alert("failed to fetch post: " + cid);
      return of(dummyPost());
    }));
  }

  postPost(post:Post) {
    if (this.testMode) {
      return;
    }
    this.http.post<Post>(this.url + "post", post).pipe(catchError (err => {
      alert("failed to post post");
      return of();
    }));
  }

  deletePost(cid:string) {
    if (this.testMode) {
      return;
    }
    this.http.delete(this.url + "post/" + cid).pipe(catchError (err => {
      alert("failed to delete post");
      return of();
    }));
  }

  updatePost(post:Post) {
    if (this.testMode) {
      return;
    }
    this.http.put<Post>(this.url + "post", post).pipe(catchError (err => {
      alert("failed to update post");
      return of();
    }));
  }



  likeContent(cid:string, vid:string) {
    if (this.testMode) {
      return;
    }
    this.http.get(this.url + "perception/like/" + cid + "/" + vid).pipe(catchError (err => {
      alert("failed to like content");
      return of();
    }));
  }

  dislikeContent(cid:string, vid:string) {
    if (this.testMode) {
      return;
    }
    this.http.get(this.url + "perception/dislike/" + cid).pipe(catchError (err => {
      alert("failed to dislike content");
      return of();
    }));
  }

  getAttachment(attid:string): Observable<Attachment> {
    if (this.testMode) {
      return of(dummyAttachment()).pipe(delay(600));
    }
    return this.http.get<Attachment>(this.url + "attachment/" + attid).pipe(catchError (err => {
      alert("failed to fetch attachment");
      return of(dummyAttachment());
    }));
  }

  getCustomFigure(fid:string): Observable<CustomFigure1D> {
    // if (this.testMode) {
    //   return of(dummyCustomFigure1D()).pipe(delay(600));
    // }
    // return this.http.get<CustomFigure1D>(this.url + "cf/" + fid).pipe(catchError (err => {
    //   alert("failed to fetch custom figure");
    //   return of(dummyCustomFigure1D());
    // }));
    return of(dummyCustomFigure1D()).pipe(delay(600));
  }

  postCustomFigure(figure2d:CustomFigure) {
    // if (this.testMode) {
    //   return;
    // }
    // let figure1d = to1dFigure(figure2d);
    // this.http.post<CustomFigure>(this.url + "cf", figure1d).pipe(catchError (err => {
    //   alert("failed to post custom figure");
    //   return of();
    // }));
    return
  }

  updateCustomFigure(figure2d:CustomFigure) {
    // if (this.testMode) {
    //   return;
    // }
    // let figure1d = to1dFigure(figure2d);
    // this.http.put<CustomFigure>(this.url + "cf", figure1d).pipe(catchError (err => {
    //   alert("failed to update custom figure");
    //   return of();
    // }));
    return
  }

  // viewPost(cid:string,vid:string) {
  //   if (this.testMode) {
  //     return;
  //   }
  //   this.http.get(this.url + "post/view/" + cid + "/" + vid);
  // }
  // postComment(comment: Comment){
  //   if (this.testMode) {
  //     return;
  //   }
  //   this.http.post(this.url + "comment", comment);
  // }

  // getComments(cid: string): Observable<Comment[]>{
  //     if (this.testMode) {
  //       return of([dummyComment()
  //     }
  // }
}
