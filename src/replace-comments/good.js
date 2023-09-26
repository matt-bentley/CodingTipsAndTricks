class Forum {

    constructor(questions, answers) {
        this.questions = questions;
        this.answers = answers;
    }

    getTopAnswers(question) {
        let questionAnswers = this.getQuestionAnswers(question.id);
        questionAnswers = this.sortByBestRatings(questionAnswers);
        const top = 10;
        return this.takeItems(questionAnswers, top);
    }

    getQuestionAnswers(questionId) {
        const questionAnswers = [];
        this.answers.forEach(answer => {
            if (answer.questionId === questionId) {
                questionAnswers.push(answer);
            }
        });
        return questionAnswers;
    }

    sortByBestRatings(questionAnswers) {
        return questionAnswers.sort((a, b) => {
            if (a.rating < b.rating) {
                return 1;
            }
            if (a.rating > b.rating) {
                return -1;
            }
            return 0;
        });
    }

    takeItems(items, count) {
        if (items.length >= count) {
            return items.slice(0, count);
        }
        else {
            return items;
        }
    }
}

module.exports = Forum;