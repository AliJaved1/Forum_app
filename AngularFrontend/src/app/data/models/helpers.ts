export function randomWord(): string {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}

// export function uuid(): string {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// }
