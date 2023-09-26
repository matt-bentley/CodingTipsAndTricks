const { EmailService, SmsService } = require('./notification-service');
const Sms = require('./sms');
const Smtp = require('./smtp');

class Notifier{

    constructor(scheduler){
        this.scheduler = scheduler;
        this.sms = new Sms();
        this.smtp = new Smtp();
    }

    publishNotification(message, channelType) {
        const notificationService = this.getNotificationService(channelType);
        if (notificationService.isActive()) {
            notificationService.send(message);
        }
        else {
            notificationService.schedule(message);
        }
    }
    
    getNotificationService(channelType){
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

module.exports = Notifier;