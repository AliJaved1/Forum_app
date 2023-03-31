import { Injectable } from '@angular/core';
import {dummyUser, User} from "./models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  self: User = dummyUser();
  constructor() { }
}
