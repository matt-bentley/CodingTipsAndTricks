function countWords(lines, ignoreWords) {
    if (lines === null) {
        return 0;
    }
    let wordCount = 0;
    lines.forEach(line => {
        const lineWordCount = getLineWordCount(line, ignoreWords);
        wordCount += lineWordCount;
    });
    return wordCount;
}

function getLineWordCount(line, ignoreWords) {
    if (line === null) {
        return 0;
    }
    let wordCount = 0;
    const words = line.split(" ");
    words.forEach(word => {
        if (includeWord(word, ignoreWords)) {
            wordCount++;
        }
    });
    return wordCount;
}

function includeWord(word, ignoreWords) {
    return ignoreWords === null
        || ignoreWords.length === 0
        || !ignoreWords.includes(word);
}

module.exports = countWords;