const expect = require('chai').expect;
const NightClub = require('../../src/abstract-conditionals/good');
const Person = require('../../src/abstract-conditionals/person');

describe('abstract-conditionals - good: NightClub', function () {

    let nightclub;

    beforeEach(function () {
        nightclub = new NightClub();
        for(let i = 0; i < 499; i++){
            const person = new Person(i.toString(), 20, false);
            nightclub.checkNightclubEntry(person);
        }
    });

    it('should allow entry to over age person', function (done) {
        const person = new Person("New1", 20, false);
        nightclub.checkNightclubEntry(person);
        expect(nightclub.entrants.length).to.equal(500);
        expect(nightclub.queue.length).to.equal(0);
        done();
    });

    it('should send person to queue if over capacity', function (done) {
        nightclub.checkNightclubEntry(new Person("New1", 20, false));
        nightclub.checkNightclubEntry(new Person("New2", 20, false));
        expect(nightclub.entrants.length).to.equal(500);
        expect(nightclub.queue.length).to.equal(1);
        done();
    });

    it('should reject person if under age', function (done) {
        expect(() => nightclub.checkNightclubEntry(new Person("New1", 17, false))).to.throw("Person is rejected");
        expect(nightclub.entrants.length).to.equal(499);
        expect(nightclub.queue.length).to.equal(0);
        done();
    });

    it('should reject person if has fake id', function (done) {
        expect(() => nightclub.checkNightclubEntry(new Person("New1", 20, true))).to.throw("Person is rejected");
        expect(nightclub.entrants.length).to.equal(499);
        expect(nightclub.queue.length).to.equal(0);
        done();
    });

    it('should reject person if barred', function (done) {
        expect(() => nightclub.checkNightclubEntry(new Person("0000143", 20, false))).to.throw("Person is rejected");
        expect(nightclub.entrants.length).to.equal(499);
        expect(nightclub.queue.length).to.equal(0);
        done();
    });
});