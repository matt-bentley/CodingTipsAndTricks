const Notifier = require('../../src/eliminate_switch/good');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('eliminate-switch - good: Notifier', function () {

    let scheduler;
    let isBusinessHours = true;
    const message = "Hello World!";

    beforeEach(function () {
        isBusinessHours = true;
        scheduler = {};
        scheduler.isBusinessHours = () =>{
            return isBusinessHours;
        }
    });

    it('should send email when in business hours and channelType: Email', function (done) {
        const notifier = new Notifier(scheduler);
        var send = sinon.spy(notifier.smtp, 'send');
        notifier.publishNotification(message, "Email");
        sinon.assert.calledOnce(send);
        done();
    });

    it('should send email when not in business hours and channelType: Email', function (done) {
        isBusinessHours = false;
        const notifier = new Notifier(scheduler);
        var send = sinon.spy(notifier.smtp, 'send');
        notifier.publishNotification(message, "Email");
        sinon.assert.calledOnce(send);
        done();
    });

    it('should send sms when in business hours and channelType: SMS', function (done) {
        const notifier = new Notifier(scheduler);
        var send = sinon.spy(notifier.sms, 'send');
        notifier.publishNotification(message, "SMS");
        sinon.assert.calledOnce(send);
        done();
    });

    it('should schedule sms when not in business hours and channelType: SMS', function (done) {
        isBusinessHours = false;
        const notifier = new Notifier(scheduler);
        var send = sinon.spy(notifier.sms, 'send');
        var schedule = sinon.spy(notifier.sms, 'schedule');
        notifier.publishNotification(message, "SMS");
        sinon.assert.notCalled(send);
        sinon.assert.calledOnce(schedule);
        done();
    });

    it('should throw error when invalid channelType', function (done) {
        const notifier = new Notifier(scheduler);
        expect(() => notifier.publishNotification(message, "Invalid")).to.throw(Error, "Notification Type not supported: Invalid");
        done();
    });
});