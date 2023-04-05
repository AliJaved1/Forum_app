import {randomWord} from "./helpers";

export interface User {
  vid: string;
  isMember: boolean;
  isAdministrator: boolean;
  name: string;
  experience: number;
  thumbnailID: string;
  email: string;
  about: string;
}

export function dummyUser(): User {
  let vid = Math.floor(Math.random() * 99999).toString();
  let isMember = Math.random() > 0.5;
  return {
    vid: vid,
    isMember: isMember,
    isAdministrator: false,
    name: randomWord() + " " + randomWord(),
    experience: Math.floor(Math.random() * 100),
    thumbnailID: "123",
    email: "",
    about: "nah"
  };
}

export function dummyUserWithVid(vid:string): User {
  let isMember = Math.random() > 0.5;
  return {
    vid: vid,
    isMember: isMember,
    isAdministrator: false,
    name: randomWord() + " " + randomWord(),
    experience: Math.floor(Math.random() * 100),
    thumbnailID: "123",
    email: "",
    about: "nah"
  };
}
