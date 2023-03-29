export interface Attachment {
  attid: string;
  type: string
; // "image" or "link" or "video" or "text"
  content: string;
}

export function dummyAttachment(): Attachment {

  let randNum = Math.floor(Math.random() * 4);
  if (randNum == 0) {
    return {
      attid: "attid",
      type: "image",
      content: "https://picsum.photos/200/300"
    };
  }
  if (randNum == 1) {
    return {
      attid: "attid",
      type: "link",
      content: "https://www.google.com"
    };
  }
  if (randNum == 2) {
    return {
      attid: "attid",
      type: "video",
      content: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    };
  }


  let content: string = "";
  for (let i = 0; i < 50; i++) {
    content += Math.random().toString(36).substring(2) + " ";
  }

  return {
    attid: "attid",
    type: "text",
    content: content
  };
}
