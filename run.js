var config = require("./config.json");
var Q = require("Q");
var azure = require("azure");
var sFConnector = require("./SFConnector")(config)
var sflib = require("JSForce");


var processError = function (reason) {
    console.log("Error:");
    console.log(reason);
}

var echo = function (message) {
    console.log("Echo: " + JSON.stringify(message));
    console.log("replay id: " + message.event.replayId);
}

var processMessage = function (message) {
    try {
        var sbMessage = {
            body: JSON.stringify(message.sobject),
            customProperties: {
                eventType: message.event.type,
                eventDate: message.event.createdDate,
                objectType: "Account"
            }
        }
        // serviceBusService = azure.createServiceBusService(config.sbEndpoint)
        // serviceBusService.sendTopicMessage("sf-notifications", sbMessage, function (error) {
        //     if (error) {
        //         processError(message);
        //     }
        // });
        echo(message);
    } catch (error) {
        processError(error);
    }

}

sFConnector.Listen(processMessage);