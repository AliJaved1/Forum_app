import {UserContent} from "./UserContent";
import {Attachment, dummyAttachment} from "./Attachment";

export interface Post extends UserContent {
  title: string;
  authorVid: string;
  authorName: string;
  attachments: Attachment[];
}

export function dummyPost(): Post {
  return {
    cid: "123",
    title: "Dummy Post",
    authorVid: "123",
    authorName: "Dummy Author",
    attachments: [dummyAttachment()]
  };
}
