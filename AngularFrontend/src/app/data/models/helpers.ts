let words = [
  "run", "jump", "swim", "dance", "sing",
  "John", "Emily", "Michael", "Sarah", "David",
  "happy", "sad", "funny", "smart", "kind",
  "dog", "cat", "bird", "fish", "mouse",
  "red", "blue", "green", "yellow", "orange",
]
export function randomWord(): string {
  return words[Math.floor(Math.random() * words.length)];
}
