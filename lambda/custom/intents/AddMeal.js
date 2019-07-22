"use strict";

const utils = require("../utils");
const axios = require('axios');

module.exports ={

  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AddMeal'
  },
  
  async handle(handlerInput) {
    const { accessToken } = handlerInput.requestEnvelope.context.System.user;
    let speechText = '';

    if (!accessToken) {
      speechText = 'You must authenticate with your Amazon Account to use this skill. I sent instructions for how to do this in your Alexa App';
      return handlerInput.responseBuilder
        .speak(speechText)
        .withLinkAccountCard()
        .getResponse();
    }

    if(handlerInput.requestEnvelope.request.dialogState === 'COMPLETED'){
      const amznProfileUrl = `https://api.amazon.com/user/profile?access_token=${accessToken}`;
      try {
        const response = await axios.get(amznProfileUrl);
        const description = handlerInput.requestEnvelope.request.intent.slots.Description.value;
        const meal = handlerInput.requestEnvelope.request.intent.slots.Meal.value;
        const bloodSugar = handlerInput.requestEnvelope.request.intent.slots.BloodSugar.value;
        speechText = `Thanks ${response.data.name}, I logged your ${meal}.`;
        utils.putItem(response.data.email, "Meal", [`${meal}`], bloodSugar, `${description}`);
        return handlerInput.responseBuilder.speak(speechText)
      .getResponse();
        } catch (error) {
        console.error(error);
        speechText = 'Hello!';
        return handlerInput.responseBuilder.speak(speechText)
        }
    
  }
  else
    return handlerInput.responseBuilder
    .addDelegateDirective()
    .getResponse();
}

};