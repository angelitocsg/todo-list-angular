export function capitalizeWords(value: string) {
  const words = value.split(/\-|(?=[A-Z])/);
  let tag = "";
  for (let i = 0; i < words.length; i++) {
    let word = removeInvalidChars(words[i]!);
    tag += capitalizeFirstLetter(word);
  }
  return tag;
}

export function dashWords(value: string) {
  return value
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();
}

function removeInvalidChars(value: string) {
  let newWord = value;
  newWord = newWord.replace(/\{0\}/g, "_");
  newWord = newWord.replace(/\{1\}/g, "_");
  newWord = newWord.replace(/\{2\}/g, "_");
  newWord = newWord.replace(/\{3\}/g, "_");
  newWord = newWord.replace(/\{4\}/g, "_");
  newWord = newWord.replace(/\./g, "");
  newWord = newWord.replace(/\,/g, "");
  newWord = newWord.replace(/\//g, "");
  newWord = newWord.replace(/\{/g, "");
  newWord = newWord.replace(/\}/g, "");
  newWord = newWord.replace(/\[/g, "");
  newWord = newWord.replace(/\]/g, "");
  newWord = newWord.replace(/\(/g, "");
  newWord = newWord.replace(/\)/g, "");
  newWord = newWord.replace(/\'/g, "");
  newWord = newWord.replace(/\"/g, "");
  newWord = newWord.replace(/\:/g, "");
  newWord = newWord.replace(/\|/g, "");
  newWord = newWord.replace(/\!/g, "");
  newWord = newWord.replace(/\?/g, "");
  return removeAccents(newWord);
}

function removeAccents(newStringComAcento: string) {
  let str = newStringComAcento;
  const accentsHexMap: { [key: string]: RegExp } = {
    a: /[\xE0-\xE6]/g,
    A: /[\xC0-\xC6]/g,
    e: /[\xE8-\xEB]/g,
    E: /[\xC8-\xCB]/g,
    i: /[\xEC-\xEF]/g,
    I: /[\xCC-\xCF]/g,
    o: /[\xF2-\xF6]/g,
    O: /[\xD2-\xD6]/g,
    u: /[\xF9-\xFC]/g,
    U: /[\xD9-\xDC]/g,
    c: /\xE7/g,
    C: /\xC7/g,
    n: /\xF1/g,
    N: /\xD1/g,
  };

  for (let word in accentsHexMap) {
    const expressaoRegular: RegExp = accentsHexMap[word]!;
    str = str.replace(expressaoRegular, word);
  }

  return str;
}

function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
