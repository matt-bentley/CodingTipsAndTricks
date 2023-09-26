class Notifier{

    constructor(factory){
        this.factory = factory;
    }

    publishNotification(message, channelType) {
        const notificationService = this.factory.create(channelType);
        if (notificationService.isActive()) {
            notificationService.send(message);
        }
        else {
            notificationService.schedule(message);
        }
    }
}

module.exports = Notifier;