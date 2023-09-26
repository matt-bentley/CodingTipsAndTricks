class NightClub{

    constructor(){
        this.barredList = ["0000143", "0001297"];
        this.entrants = [];
        this.queue = [];
    }

    checkNightclubEntry(person) {
        if (!this.isAllowedEntry(person)) {
            this.reject();
            return;
        }
        if (this.hasCapacity()) {
            this.allowEntry(person);
        }
        else {
            this.sendToQueue(person);
        }
    }
    
    hasCapacity() {
        const maxCapacity = 500;
        return this.entrants.length < maxCapacity;
    }
    
    isAllowedEntry(person) {
        const minimumAge = 18;
        return !person.hasFakeId
            && person.age >= minimumAge
            && !this.barredList.includes(person.identificationNumber)
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