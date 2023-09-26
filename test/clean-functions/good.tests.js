const expect = require('chai').expect;
const countWords = require('../../src/clean-functions/good');

describe('clean-function - good: countWords', function () {

    const ignoreWords = ["Ignore", "Exclude"];

    it('should count 0 when null', function (done) {
        const wordCount = countWords(null, ignoreWords);
        expect(wordCount).to.equal(0);
        done();
    });

    it('should count 0 when null line', function (done) {
        const wordCount = countWords([null], ignoreWords);
        expect(wordCount).to.equal(0);
        done();
    });

    it('should count 0 when empty', function (done) {
        const wordCount = countWords([], ignoreWords);
        expect(wordCount).to.equal(0);
        done();
    });

    it('should count when lines', function (done) {
        const lines = [
            "This is a line",
            "This is another line"
        ];
        const wordCount = countWords(lines, ignoreWords);
        expect(wordCount).to.equal(8);
        done();
    });

    it('should count without ignore words when lines', function (done) {
        const lines = [
            "This is Ignore a line",
            "Ignore This is another line Exclude"
        ];
        const wordCount = countWords(lines, ignoreWords);
        expect(wordCount).to.equal(8);
        done();
    });
});