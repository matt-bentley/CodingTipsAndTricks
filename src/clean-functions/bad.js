function countWords(lines, ignoreWords) {
    if (lines === null) {
        return 0;
    }
    else {
        let wordCount = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i] !== null) {
                const words = lines[i].split(" ");
                for (let j = 0; j < words.length; j++) {
                    if (ignoreWords === null || !ignoreWords.includes(words[j])) {
                        wordCount++;
                    }
                }
            }
        }
        return wordCount;
    }
}

module.exports = countWords;