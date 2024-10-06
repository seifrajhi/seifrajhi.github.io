const WORDS_PER_MINUTE = 200;

export const getReadingTime = (content: string) => {
  if (!content) return 0;

  const clean = content.replace(/<\/?[^>]+(>|$)/g, '');
  const numberOfWords = clean.split(/\s/g).length;

  return Math.ceil(numberOfWords / WORDS_PER_MINUTE);
}