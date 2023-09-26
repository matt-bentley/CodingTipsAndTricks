const expect = require('chai').expect;
const Forum = require('../../src/replace-comments/bad');
const { Question, Answer } = require('../../src/replace-comments/question');

describe('replace-comments - bad: Forum', function () {

    let forum;
    const question = new Question(1, "Does this test work?");

    beforeEach(function () {
        const otherQuestion = new Question(2, "Does this also work?");
        const answers = [];
        for(let i = 0; i < 20; i++){
            answers.push(new Answer(i,otherQuestion.id, `Answer ${i}`, i));
        }
        forum = new Forum([question, otherQuestion], answers);
    });

    it('should return empty if no matching answers', function (done) {     
        const topAnswers = forum.getTopAnswers(question);
        expect(topAnswers.length).to.equal(0);
        done();
    });

    it('should return all answers if less than 10', function (done) {
        const expectedCount = 8;
        addAnswers(expectedCount);  
        const topAnswers = forum.getTopAnswers(question);
        expect(topAnswers.length).to.equal(expectedCount);
        done();
    });

    it('should return 10 answers if more than 10', function (done) {
        const expectedCount = 12;
        addAnswers(expectedCount);  
        const topAnswers = forum.getTopAnswers(question);
        expect(topAnswers.length).to.equal(10);
        done();
    });

    it('should order answers by rating descending', function (done) {
        const expectedCount = 10;
        addAnswers(expectedCount);  
        const topAnswers = forum.getTopAnswers(question);
        expect(topAnswers[0].rating).to.equal(10);
        expect(topAnswers[9].rating).to.equal(1);
        done();
    });

    function addAnswers(count){
        for(let i = 0; i < count; i++){
            const id = i + 1;
            forum.answers.push(new Answer(id, question.id, `Answer ${i}`, id));
        }
    }
});