import {UserContent} from "./UserContent";
import {Attachment, dummyAttachment} from "./Attachment";

export interface Post extends UserContent {
  title: string;
  authorVid: string;
  attachments: Attachment[];
}

export function dummyPost(): Post {
  return {
    cid: "123",
    title: "Dummy Post",
    authorVid: "123",
    attachments: [dummyAttachment()]
  };
}
