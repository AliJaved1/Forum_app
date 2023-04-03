import {randomWord} from "./helpers";

export interface Attachment {
  attid: string;
  type: string; // "image" or "link" or "video" or "text"
  content: string;
}

export function dummyAttachment(): Attachment {

  let randNum = Math.floor(Math.random() * 4);
  if (randNum == 0) {
    return {
      attid: "attid",
      type: "image",
      content: "https://images.squarespace-cdn.com/content/v1/51b3dc8ee4b051b96ceb10de/1475509751770-BKYM9HQKJ5UGDI57488I/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/image-asset.jpeg"
    };
  }
  if (randNum == 1) {
    return {
      attid: "attid",
      type: "link",
      content: "https://www.apple.com"
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
    content += randomWord() + " ";
  }

  return {
    attid: "attid",
    type: "text",
    content: content
  };
}

export function dummyAttachments(n: number): Attachment[] {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(dummyAttachment())
  }
  return result;
}
