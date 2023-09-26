class Sms{
    send(message){
        console.log(`Sending sms: ${message}`);
    }

    schedule(message){
        console.log(`Scheduling sms: ${message}`);
    }
}

module.exports = Sms;