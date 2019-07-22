//
// Handles opening the skill
//
"use strict";
const axios = require('axios');

module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  async handle(handlerInput) {
    let speechText = "Welcome to the Diabetes Activity Tracker, you can say add an activity!";

    const { accessToken } = handlerInput.requestEnvelope.context.System.user;

    if (!accessToken) {
      speechText = 'Please authenticate with your Amazon Account to use this skill. I sent instructions for how to do this in your Alexa App';
      return handlerInput.responseBuilder
        .speak(speechText)
        .withLinkAccountCard()
        .getResponse();
    }
    const amznProfileUrl = `https://api.amazon.com/user/profile?access_token=${accessToken}`;
    try {
        const response = await axios.get(amznProfileUrl);
        speechText = `Hello, ${response.data.name.split(" ")[0]}!  How can I help you?`;

        
        
      } catch (error) {
        console.error(error);
        speechText = 'Hello!';
        return handlerInput.responseBuilder.speak(speechText).getResponse();
      }
      return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("Diabetes Self Management", speechText)
      .getResponse();
  }
};
