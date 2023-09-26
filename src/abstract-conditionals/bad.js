class NightClub{

    constructor(){
        this.barredList = ["0000143", "0001297"];
        this.entrants = [];
        this.queue = [];
    }

    checkNightclubEntry(person) {
        if (person.hasFakeId
            || person.age < 18
            || this.barredList.includes(person.identificationNumber)) {
            this.reject();
        }
        else {
            if (this.entrants.length < 500) {
                this.allowEntry(person);
            }
            else {
                this.sendToQueue(person);
            }
        }
    }

    allowEntry(person){
        this.entrants.push(person);
    }

    sendToQueue(person){
        this.queue.push(person);
    }

    reject(){
        throw new Error("Person is rejected");
    }
}

module.exports = NightClub;