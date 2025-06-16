import emojipedia from "./emojipedia";

const meanings = emojipedia.map((emojiTerm) => {
  return emojiTerm.meaning.substring(0, 100);
});

console.log(meanings);
