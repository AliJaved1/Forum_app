import {Attachment, dummyAttachment} from "./Attachment";

export interface Post{
  cid: string;
  title: string;
  authorVid: string;
  authorName: string;
  engagement: number;
  perception: number;
  attachments: Attachment[];
}

export function dummyPost(): Post {
  return {
    cid: "123",
    title: "Dummy Post",
    authorVid: "123",
    authorName: "Dummy Author",
    engagement: 123,
    perception: 123,
    attachments: [dummyAttachment()]
  };
}
