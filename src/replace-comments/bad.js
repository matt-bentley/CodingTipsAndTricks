class Forum{

    constructor(questions, answers){
        this.questions = questions;
        this.answers = answers;
    }

    // get top answers for question
    getTopAnswers(question) {
        // get answers for question
        let questionAnswers = [];
        this.answers.forEach(answer => {
            // check answer matches question
            if (answer.questionId === question.id) {
                questionAnswers.push(answer);
            }
        });
    
        // sort answers by rating
        questionAnswers = questionAnswers.sort((a, b) => {
            if (a.rating < b.rating) {
                return 1;
            }
            if (a.rating > b.rating) {
                return -1;
            }
            return 0;
        });
    
        // if more than 10 answers
        // then return top 10
        if (questionAnswers.length >= 10) {
            return questionAnswers.slice(0, 10);
        }
        else {
            return questionAnswers;
        }
    }
}

module.exports = Forum;