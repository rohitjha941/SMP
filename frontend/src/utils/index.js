export function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const textLength = text.split(' ').length;
    const readingTime = Math.ceil(textLength / wordsPerMinute);
    const result = `~${readingTime} min read`;
    return result;
}
