export interface Attachment {
  attid: string;
  type: string; // "image" or "link" or "video" or "text"
  content: string;
}

export function dummyAttachment(): Attachment {
  return {
    attid: "attid",
    type: "text",
    content: "content"
  };
}
