const Sms = require("./sms");
const Smtp = require("./smtp");

class NotificationService {

    send(message) {
        throw new Error("Method 'send()' must be implemented.");
    }

    isActive() {
        return true;
    }

    schedule(message) {
        throw new Error("Scheduling is not supported for this Notification type");
    }
}

class EmailService extends NotificationService {

    constructor(smtp){
        super();
        this.smtp = smtp;
    }

    send(message) {
        this.smtp.send(message);
    }

}

class SmsService extends NotificationService {

    constructor(sms, scheduler){
        super();
        this.sms = sms;
        this.scheduler = scheduler;
    }

    send(message) {
        this.sms.send(message);
    }

    isActive() {
        return this.scheduler.isBusinessHours();
    }
    
    schedule(message) {
        this.sms.schedule(message);
    }
}

class NotificationServiceFactory{
    constructor(scheduler){
        this.scheduler = scheduler;
        this.sms = new Sms();
        this.smtp = new Smtp();
    }

    create(channelType){
        switch (channelType) {
            case "Email":
                return new EmailService(this.smtp);
            case "SMS":
                return new SmsService(this.sms, this.scheduler);
            default:
                throw new Error(`Notification Type not supported: ${channelType}`);
        }
    }
}

module.exports = { EmailService, SmsService, NotificationServiceFactory };