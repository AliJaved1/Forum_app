import {Attachment} from "./Attachment";
import {randomWord} from "./helpers";

export interface Comment {
  cid: string;
  authorVid: string;
  authorName: string;
  postTime: string;
  engagement: number; // 0-1 floating point (for now)
  perception: number; // 0-1 floating point, basically like/(like+dislike)
  content: string;
}

export function dummyComment(): Comment {
  return {
    cid: "123",
    authorVid: randomWord(),
    authorName: randomWord()+" "+randomWord(),
    postTime: "",
    engagement: Math.random(),
    perception: Math.random(),
    content: randomWord()+" "+randomWord()+" "+randomWord()
  };
}

export function dummyComments(): Comment[] {
  let numberOfComments = Math.ceil(Math.random() * 5);
  let comments: Comment[] = [];
  for (let i = 0; i < numberOfComments; i++) {
    comments.push(dummyComment());
  }
  return comments;
}
