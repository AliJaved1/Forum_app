export interface User {
  vid: string;
  isMember: boolean;
  isAdministrator: boolean;
  name: string;
  experience: number;
  thumbnailID: string;
}

export function dummyUser(): User {
  return {
    vid: "123",
    isMember: true,
    isAdministrator: true,
    name: "Dummy User",
    experience: 123,
    thumbnailID: "123"
  };
}
