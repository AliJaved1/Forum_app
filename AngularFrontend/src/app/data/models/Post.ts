import {Attachment, dummyAttachment} from "./Attachment";
import {dummyUser} from "./User";
import {randomWord} from "./helpers";

export interface Post {
  cid: string;
  title: string;
  authorVid: string;
  authorName: string;
  postTime: string;
  engagement: number; // 0-1 floating point (for now)
  perception: number; // 0-1 floating point, basically like/(like+dislike)
  attachments: Attachment[];
}

export function dummyPost(): Post {

  let numberOfAttachments = Math.ceil(Math.random() * 10) + 4;
  let attachments: Attachment[] = [];
  for (let i = 0; i < numberOfAttachments; i++) {
    attachments.push(dummyAttachment());
  }

  return {
    cid: "123",
    title: randomWord() + " " + randomWord() + " " + randomWord(),
    authorVid: Math.round(Math.random() * 100) + "",
    authorName: dummyUser().name,
    postTime: "2019-01-01T00:00:00.000Z",
    engagement: Math.random(),
    perception: Math.random(),
    attachments: attachments
  };
}
