import {Attachment} from "./Attachment";

export interface Comment {
  cid: string; // needs to be changed to coid, same name as the userContent id
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
    authorVid: Math.round(Math.random()*100)+"",
    authorName: Math.random().toString(36).substring(2) + " ",
    postTime: "2019-01-01T00:00:00.000Z",
    engagement: Math.random(),
    perception: Math.random(),
    content: Math.random().toString(36).substring(2) + " "
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
