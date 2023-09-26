class Question {
    constructor(id, message) {
        this.id = id;
        this.message = message;
    }
}

class Answer {
    constructor(id, questionId, message, rating) {
        this.id = id;
        this.questionId = questionId;
        this.message = message;
        this.rating = rating;
    }
}

module.exports = { Question, Answer }