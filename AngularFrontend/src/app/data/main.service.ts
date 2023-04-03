import {Injectable} from '@angular/core';
import {dummyUser, User} from "./models/User";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {dummyPost, Post} from "./models/Post";
import {Attachment, dummyAttachment} from "./models/Attachment";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private testMode = true;
  private url = "http://localhost:8080/";
  public recommendMode = 0;
  constructor(private http: HttpClient) {
  }

  getUser(vid:string): Observable<User> {
    if (this.testMode) {
      return of(dummyUser());
    }
    return this.http.get<User>(this.url + "user/" + vid);
  }

  getRecommendPostsCids(): Observable<string[]> {
    if (this.testMode) {
      return of(["123", "456", "789", "78", "12", "45", "23", "63", "4362", "4532", "7644", "6453"]);
    }
    return this.http.get<string[]>(this.url + "posts/recom/" + this.recommendMode.toString());
  }

  getPost(cid:string): Observable<Post> {
    if (this.testMode) {
      return of(dummyPost());
    }
    return this.http.get<Post>(this.url + "post/" + cid);
  }

  postPost(post:Post) {
    if (this.testMode) {
      return;
    }
    this.http.post<Post>(this.url + "post", post);
  }

  getAttachment(attid:string): Observable<Attachment> {
    if (this.testMode) {
      return of(dummyAttachment());
    }
    return this.http.get<Attachment>(this.url + "attachment/" + attid);
  }
}
