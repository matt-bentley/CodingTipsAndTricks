const Smtp = require('./smtp');
const Sms = require('./sms');

class Notifier{

    constructor(scheduler){
        this.scheduler = scheduler;
        this.sms = new Sms();
        this.smtp = new Smtp();
    }

    publishNotification(message, channelType) {
        if (this.notificationsActive(channelType)) {
            this.sendNotification(message, channelType);
        }
        else {
            this.scheduleNotification(message, channelType);
        }
    }
    
    notificationsActive(channelType) {
        switch (channelType) {
            case "Email":
                return true;
            case "SMS":
                return this.scheduler.isBusinessHours();
            default:
                throw new Error(`No Notification Type found: ${channelType}`);
        }
    } 
    
    sendNotification(message, channelType) {
        switch (channelType) {
            case "Email":
                this.smtp.send(message);
                break;
            case "SMS":
                this.sms.send(message);
                break;
            default:
                throw new Error(`No Notification Type found: ${channelType}`);
        }
    }
    
    scheduleNotification(message, channelType) {
        switch (channelType) {
            case "Email":
                throw new Error("Scheduling is not supported for this Notification type");
            case "SMS":
                this.sms.schedule(message);
                break;
            default:
                throw new Error(`No Notification Type found: ${channelType}`);
        }
    }
}

module.exports = Notifier;